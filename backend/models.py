from sqlalchemy import Column, String, Integer, Float, Boolean, Text
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime
from database import Base
import json

class Product(Base):
    __tablename__ = "products"

    id = Column(String(255), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=True)
    image = Column(String(500), nullable=False)
    images = Column(Text, nullable=False, default='[]')  # Store as JSON string
    category = Column(String(50), nullable=False)
    rating = Column(Float, default=0.0)
    reviews = Column(Integer, default=0)
    in_stock = Column(Boolean, default=True)
    variants = Column(Text, nullable=True)  # Store as JSON string
    details = Column(Text, nullable=True)  # Store as JSON string
    artisan_story = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        # Parse JSON strings to objects
        images = []
        if self.images:
            try:
                images = json.loads(self.images) if isinstance(self.images, str) else self.images
            except:
                images = []
        
        variants = None
        if self.variants:
            try:
                variants = json.loads(self.variants) if isinstance(self.variants, str) else self.variants
            except:
                variants = None
        
        details = None
        if self.details:
            try:
                details = json.loads(self.details) if isinstance(self.details, str) else self.details
            except:
                details = None
        
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "originalPrice": self.original_price,
            "image": self.image,
            "images": images if isinstance(images, list) else [],
            "category": self.category,
            "rating": self.rating,
            "reviews": self.reviews,
            "inStock": self.in_stock,
            "variants": variants,
            "details": details,
            "artisanStory": self.artisan_story,
        }
