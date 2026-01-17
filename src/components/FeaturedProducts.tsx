import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiService, Product } from "@/lib/api";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await apiService.getProducts();
        // Get first 4 products as featured
        setProducts(allProducts.slice(0, 4));
      } catch (error) {
        console.error("Failed to load featured products:", error);
        // Set empty array on error to prevent crashes
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small delay to prevent blocking initial render
    const timer = setTimeout(() => {
      loadProducts();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-accent font-medium tracking-[0.25em] uppercase text-sm mb-4 block">
              Featured
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">
              Handpicked for You
            </h2>
          </div>
          <Button variant="outline" size="lg" className="mt-6 md:mt-0">
            View All Products
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading featured products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products available.</p>
          </div>
        ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group card-product bg-card rounded-xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={
                      product.image.startsWith('http://') || product.image.startsWith('https://')
                        ? product.image
                        : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${product.image.startsWith('/') ? '' : '/'}${product.image}`
                    }
                  alt={product.name}
                  className="w-full h-full object-cover image-zoom"
                />

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <button className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>

                {/* Hover Add to Cart */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Button variant="default" className="w-full" size="lg">
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                    {product.category}
                </span>
                <h3 className="font-serif text-lg font-medium text-foreground mt-1 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through text-sm">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
