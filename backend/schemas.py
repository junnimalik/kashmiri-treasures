from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum

class CategoryEnum(str, Enum):
    shawls = "shawls"
    pherans = "pherans"
    handbags = "handbags"
    dry_fruits = "dry-fruits"
    gift_hampers = "gift-hampers"

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    originalPrice: Optional[float] = Field(None, alias="original_price")
    category: CategoryEnum
    inStock: bool = Field(True, alias="in_stock")
    rating: float = 0.0
    reviews: int = 0
    variants: Optional[List[Dict[str, Any]]] = None
    details: Optional[Dict[str, Any]] = None
    artisanStory: Optional[str] = Field(None, alias="artisan_story")
    
    class Config:
        populate_by_name = True  # Allow both alias and field name

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    category: Optional[CategoryEnum] = None
    in_stock: Optional[bool] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    image: Optional[str] = None
    images: Optional[List[str]] = None
    variants: Optional[List[Dict[str, Any]]] = None
    details: Optional[Dict[str, Any]] = None
    artisan_story: Optional[str] = None

class ProductResponse(ProductBase):
    id: str
    image: str
    images: List[str]
    
    class Config:
        from_attributes = True
        populate_by_name = True  # Allow both alias and field name

class LoginRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
