from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
import uuid
from datetime import timedelta
from PIL import Image
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from database import get_db, Base, engine
from models import Product
from schemas import (
    ProductCreate, ProductUpdate, ProductResponse, 
    LoginRequest, Token, CategoryEnum
)
from auth import (
    authenticate_user, create_access_token, verify_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kashmiri Treasures API", version="1.0.0")

# CORS configuration - supports both development and production
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "").split(",") if os.getenv("CORS_ORIGINS") else [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:8081",
    "http://127.0.0.1:8081",
    "http://localhost:8082",
    "http://127.0.0.1:8082",
    "http://localhost:5173",
    "https://kashmiricraft.com",
    "https://www.kashmiricraft.com",
]

# Filter out empty strings
CORS_ORIGINS = [origin.strip() for origin in CORS_ORIGINS if origin.strip()]

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Configuration
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "../public/uploads")
# Get absolute path
UPLOAD_DIR = os.path.abspath(UPLOAD_DIR)
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount static files for serving uploaded images
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Add exception handler for validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(f"Validation error on {request.url.path}: {exc.errors()}")
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "message": "Validation error - check required fields"}
    )

def save_uploaded_file(file: UploadFile, product_id: str) -> str:
    """Save uploaded file and return the relative path"""
    # Generate unique filename
    file_ext = os.path.splitext(file.filename)[1]
    filename = f"{product_id}_{uuid.uuid4().hex[:8]}{file_ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    # Save file
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return relative path for frontend
    return f"/uploads/{filename}"

# Authentication endpoints
@app.post("/api/auth/login")
async def login(login_data: LoginRequest):
    if not authenticate_user(login_data.username, login_data.password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password"
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": login_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Handle OPTIONS requests explicitly for all API routes
@app.options("/api/{full_path:path}")
async def options_handler(full_path: str, request: Request):
    origin = request.headers.get("origin", "")
    # Use the same CORS_ORIGINS from middleware configuration
    allowed_origins = CORS_ORIGINS
    
    # Allow the origin if it's in the allowed list, otherwise use the first allowed origin
    allow_origin = origin if origin in allowed_origins else (allowed_origins[0] if allowed_origins else "*")
    
    return JSONResponse(
        content={},
        headers={
            "Access-Control-Allow-Origin": allow_origin,
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
        }
    )

@app.get("/api/auth/me")
async def get_current_user(username: str = Depends(verify_token)):
    return {"username": username}

# Product endpoints
@app.get("/api/products")
async def get_products(
    category: Optional[CategoryEnum] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    if category:
        query = query.filter(Product.category == category.value)
    products = query.all()
    return [product.to_dict() for product in products]

@app.get("/api/products/{product_id}")
async def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product.to_dict()

@app.post("/api/products")
async def create_product(
    name: str = Form(...),
    description: str = Form(...),
    price: str = Form(...),
    original_price: Optional[str] = Form(None),
    category: str = Form(...),  # Accept as string first, validate below
    in_stock: str = Form("true"),
    rating: str = Form("0.0"),
    reviews: str = Form("0"),
    variants: Optional[str] = Form(None),
    details: Optional[str] = Form(None),
    artisan_story: Optional[str] = Form(None),
    image: UploadFile = File(...),
    additional_images: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db),
    username: str = Depends(verify_token)
):
    import json
    
    # Validate category
    try:
        category_enum = CategoryEnum(category)
    except ValueError:
        raise HTTPException(
            status_code=422,
            detail=f"Invalid category: {category}. Must be one of: {[e.value for e in CategoryEnum]}"
        )
    
    # Generate product ID
    product_id = f"{category_enum.value}-{uuid.uuid4().hex[:6]}"
    
    # Save main image
    main_image_path = save_uploaded_file(image, product_id)
    
    # Save additional images
    image_paths = [main_image_path]
    if additional_images:
        for img in additional_images:
            # Skip empty files (browsers may send empty file entries)
            if img and img.filename and img.size > 0:
                img_path = save_uploaded_file(img, product_id)
                image_paths.append(img_path)
                logger.info(f"Saved additional image: {img_path}")
    
    # Parse and serialize JSON fields (store as JSON strings in Text columns)
    variants_data = None
    if variants and variants.strip():
        try:
            variants_data = json.dumps(json.loads(variants))
        except json.JSONDecodeError:
            variants_data = None
    
    details_data = None
    if details and details.strip():
        try:
            details_data = json.dumps(json.loads(details))
        except json.JSONDecodeError:
            details_data = None
    
    images_data = json.dumps(image_paths)
    
    # Convert string fields to appropriate types
    try:
        price_float = float(price)
    except (ValueError, TypeError):
        raise HTTPException(status_code=400, detail="Invalid price value")
    
    original_price_float = None
    if original_price and original_price.strip():
        try:
            original_price_float = float(original_price)
        except (ValueError, TypeError):
            pass
    
    in_stock_bool = in_stock.lower() in ("true", "1", "yes") if isinstance(in_stock, str) else bool(in_stock)
    
    try:
        rating_float = float(rating) if rating else 0.0
    except (ValueError, TypeError):
        rating_float = 0.0
    
    try:
        reviews_int = int(reviews) if reviews else 0
    except (ValueError, TypeError):
        reviews_int = 0
    
    # Create product
    product = Product(
        id=product_id,
        name=name,
        description=description,
        price=price_float,
        original_price=original_price_float,
        image=main_image_path,
        images=images_data,
        category=category_enum.value,
        in_stock=in_stock_bool,
        rating=rating_float,
        reviews=reviews_int,
        variants=variants_data,
        details=details_data,
        artisan_story=artisan_story
    )
    
    db.add(product)
    db.commit()
    db.refresh(product)
    
    return product.to_dict()

@app.put("/api/products/{product_id}")
async def update_product(
    product_id: str,
    name: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    price: Optional[str] = Form(None),
    original_price: Optional[str] = Form(None),
    category: Optional[CategoryEnum] = Form(None),
    in_stock: Optional[str] = Form(None),
    rating: Optional[str] = Form(None),
    reviews: Optional[str] = Form(None),
    variants: Optional[str] = Form(None),
    details: Optional[str] = Form(None),
    artisan_story: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    additional_images: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db),
    username: str = Depends(verify_token)
):
    import json
    
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update fields - convert from strings (FormData sends everything as strings)
    if name is not None:
        product.name = str(name).strip()
    if description is not None:
        product.description = str(description).strip()
    if price is not None and price.strip():
        try:
            product.price = float(price)
        except (ValueError, TypeError):
            pass  # Keep existing price if conversion fails
    # Handle original_price - can be set to None to clear it
    if original_price is not None:
        original_price_str = str(original_price).strip()
        if original_price_str == "":
            product.original_price = None
        else:
            try:
                price_val = float(original_price_str)
                product.original_price = None if price_val == 0 else price_val
            except (ValueError, TypeError):
                pass  # Keep existing value if conversion fails
    if category is not None:
        product.category = category.value
    if in_stock is not None:
        # Convert string "true"/"false" to boolean
        in_stock_str = str(in_stock).strip().lower()
        product.in_stock = in_stock_str in ("true", "1", "yes", "on")
    if rating is not None and rating.strip():
        try:
            product.rating = float(rating)
        except (ValueError, TypeError):
            pass  # Keep existing rating if conversion fails
    if reviews is not None and reviews.strip():
        try:
            product.reviews = int(reviews)
        except (ValueError, TypeError):
            pass  # Keep existing reviews if conversion fails
    if variants is not None:
        if variants and variants.strip():
            try:
                product.variants = json.dumps(json.loads(variants))
            except json.JSONDecodeError:
                product.variants = None
        else:
            product.variants = None
    if details is not None:
        if details and details.strip():
            try:
                product.details = json.dumps(json.loads(details))
            except json.JSONDecodeError:
                product.details = None
        else:
            product.details = None
    if artisan_story is not None:
        # Allow clearing artisan_story by sending empty string
        product.artisan_story = artisan_story if artisan_story.strip() else None
    
    # Update images if provided
    if image:
        # Delete old main image if exists
        if product.image and os.path.exists(os.path.join(UPLOAD_DIR, os.path.basename(product.image))):
            try:
                os.remove(os.path.join(UPLOAD_DIR, os.path.basename(product.image)))
            except:
                pass
        product.image = save_uploaded_file(image, product_id)
        # Parse existing images, update, and serialize back
        existing_images = []
        if product.images:
            try:
                existing_images = json.loads(product.images) if isinstance(product.images, str) else product.images
            except:
                existing_images = []
        product.images = json.dumps([product.image] + (existing_images[1:] if existing_images else []))
    
    if additional_images:
        new_image_paths = []
        for img in additional_images:
            # Skip empty files (browsers may send empty file entries)
            if img and img.filename and img.size > 0:
                img_path = save_uploaded_file(img, product_id)
                new_image_paths.append(img_path)
                logger.info(f"Saved additional image (update): {img_path}")
        
        if new_image_paths:
            # Parse existing images and combine - keep existing additional images too
            existing_images = []
            if product.images:
                try:
                    existing_images = json.loads(product.images) if isinstance(product.images, str) else product.images
                except:
                    existing_images = []
            # Combine main image + new images + existing additional images (excluding main)
            all_images = [product.image] + new_image_paths + (existing_images[1:] if len(existing_images) > 1 else [])
            product.images = json.dumps(all_images)
    
    db.commit()
    db.refresh(product)
    
    return product.to_dict()

@app.delete("/api/products/{product_id}")
async def delete_product(
    product_id: str,
    db: Session = Depends(get_db),
    username: str = Depends(verify_token)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Delete associated images
    image_list = [product.image]
    if product.images:
        try:
            parsed_images = json.loads(product.images) if isinstance(product.images, str) else product.images
            if isinstance(parsed_images, list):
                image_list.extend(parsed_images)
        except:
            pass
    
    for img_path in image_list:
        if img_path:
            full_path = os.path.join(UPLOAD_DIR, os.path.basename(img_path))
            if os.path.exists(full_path):
                try:
                    os.remove(full_path)
                except:
                    pass
    
    db.delete(product)
    db.commit()
    
    return {"message": "Product deleted successfully"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
