import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import pashminaImage from "@/assets/pashmina-shawl.jpg";
import pheranImage from "@/assets/pheran.jpg";
import handbagImage from "@/assets/handbag.jpg";
import dryFruitsImage from "@/assets/dry-fruits.jpg";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Kashmiri Embroidered Pashmina",
      price: 24999,
      originalPrice: 29999,
      image: pashminaImage,
      rating: 4.9,
      reviews: 128,
      brand: "Royal Pashmina",
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Traditional Velvet Pheran",
      price: 18999,
      originalPrice: null,
      image: pheranImage,
      rating: 4.8,
      reviews: 86,
      brand: "Royal Pashmina",
      badge: "New Arrival",
    },
    {
      id: 3,
      name: "Artisan Papier-Mâché Bag",
      price: 8999,
      originalPrice: 10999,
      image: handbagImage,
      rating: 4.7,
      reviews: 54,
      brand: "Royal Pashmina",
      badge: null,
    },
    {
      id: 4,
      name: "Premium Kashmiri Dry Fruits",
      price: 2499,
      originalPrice: 2999,
      image: dryFruitsImage,
      rating: 4.9,
      reviews: 312,
      brand: "Nut Bazaar",
      badge: "Popular",
    },
  ];

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group card-product bg-card rounded-xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover image-zoom"
                />
                
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {product.badge}
                  </span>
                )}

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
                  {product.brand}
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
