import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { getProductImages } from "@/lib/imageLoader";

interface ProductGalleryProps {
  category: 'shawls' | 'pherans' | 'handbags' | 'dry-fruits' | 'gift-hampers';
}

const ProductGallery = ({ category }: ProductGalleryProps) => {
  const images = getProductImages(category);
  
  // If no images found, show a placeholder message
  if (images.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No products added yet.</p>
          <p className="text-sm text-muted-foreground">
            Add images to: <code className="bg-muted px-2 py-1 rounded">src/assets/{category}/</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-2">Our Collection</h2>
            <p className="text-muted-foreground">{images.length} exquisite pieces</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div key={index} className="group card-product">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                <img 
                  src={image} 
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover image-zoom"
                />
                <button className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                  <Heart className="w-5 h-5 text-foreground" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="hero" className="w-full" size="lg">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-card rounded-b-lg">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < 5 ? 'text-accent fill-accent' : 'text-muted'}`} 
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(5.0)</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                  Product {index + 1}
                </h3>
                <p className="text-sm text-muted-foreground">Contact us for pricing and details</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;

