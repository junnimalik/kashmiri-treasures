import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { apiService, Product } from "@/lib/api";
import { useEffect, useState } from "react";

interface ProductGalleryProps {
  category: 'shawls' | 'pherans' | 'handbags' | 'dry-fruits' | 'gift-hampers';
}

const ProductGallery = ({ category }: ProductGalleryProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await apiService.getProducts(category);
        setProducts(data);
      } catch (error: any) {
        console.error("Failed to load products:", error);
        // Set empty array on error to prevent crashes
        setProducts([]);
        toast({
          title: "Error Loading Products",
          description: error.message || "Failed to load products. Please check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small delay to prevent blocking initial render
    const timer = setTimeout(() => {
      loadProducts();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [category]);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No products added yet.</p>
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
            <p className="text-muted-foreground">{products.length} exquisite pieces</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group card-product block"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                <img 
                  src={
                    product.image.startsWith('http://') || product.image.startsWith('https://')
                      ? product.image
                      : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${product.image.startsWith('/') ? '' : '/'}${product.image}`
                  }
                  alt={product.name}
                  className="w-full h-full object-cover image-zoom"
                />
                {product.originalPrice && (
                  <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
                <button 
                  className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toast({
                      title: "Added to Wishlist",
                      description: "Item saved for later",
                    });
                  }}
                >
                  <Heart className="w-5 h-5 text-foreground" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="hero" 
                    className="w-full" 
                    size="lg"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-card rounded-b-lg">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted'}`} 
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-primary">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;