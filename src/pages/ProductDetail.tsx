import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { apiService, Product } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  Shield, 
  RefreshCcw, 
  ChevronRight,
  Minus,
  Plus,
  Check
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const data = await apiService.getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
        setProduct(undefined);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (product) {
      const loadRelated = async () => {
        try {
          const allProducts = await apiService.getProducts(product.category);
          setRelatedProducts(allProducts.filter(p => p.id !== product.id).slice(0, 4));
        } catch (error) {
          console.error("Failed to load related products:", error);
        }
      };
      loadRelated();
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button variant="hero" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    const variantString = Object.entries(selectedVariants)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      variant: variantString || undefined,
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a real app, this would navigate to checkout
    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting you to secure checkout...",
    });
  };

  const getCategoryPath = (category: string) => {
    switch(category) {
      case 'shawls': return '/shawls';
      case 'pherans': return '/pherans';
      case 'handbags': return '/handbags';
      case 'dry-fruits': return '/dry-fruits';
      case 'gift-hampers': return '/gift-hampers';
      default: return '/';
    }
  };

  const getCategoryName = (category: string) => {
    switch(category) {
      case 'shawls': return 'Shawls';
      case 'pherans': return 'Pherans';
      case 'handbags': return 'Handbags';
      case 'dry-fruits': return 'Dry Fruits';
      case 'gift-hampers': return 'Gift Hampers';
      default: return category;
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | Royal Pashmina and Nut Bazaar</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-24 pb-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={getCategoryPath(product.category)} className="hover:text-foreground transition-colors">
              {getCategoryName(product.category)}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                <img 
                  src={
                    product.image.startsWith('/uploads') || product.image.startsWith('/')
                      ? `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${product.image}`
                      : product.image
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(0, 4).map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted border-2 border-primary/30">
                    <img 
                      src={
                        img.startsWith('/uploads') || img.startsWith('/')
                          ? `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${img}`
                          : img
                      }
                      alt={`${product.name} ${i+1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Variants */}
              {product.variants?.map((variant) => (
                <div key={variant.name} className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {variant.name}: <span className="text-muted-foreground">{selectedVariants[variant.name] || 'Select'}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.name]: option }))}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          selectedVariants[variant.name] === option
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                    {product.inStock ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" /> In Stock
                      </span>
                    ) : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="olive" 
                  size="xl" 
                  className="flex-1"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  onClick={() => {
                    setIsWishlisted(!isWishlisted);
                    toast({
                      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
                      description: isWishlisted ? "Item removed from your wishlist" : "Item saved for later",
                    });
                  }}
                  className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-xs text-muted-foreground">Authentic Guarantee</span>
                </div>
                <div className="text-center">
                  <RefreshCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-xs text-muted-foreground">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details & Artisan Story */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Details */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-serif text-xl font-semibold mb-4">Product Details</h3>
              {product.details && Object.keys(product.details).length > 0 ? (
                <dl className="space-y-3">
                  {product.details.material && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <dt className="text-muted-foreground">Material</dt>
                      <dd className="font-medium">{product.details.material}</dd>
                    </div>
                  )}
                  {product.details.dimensions && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <dt className="text-muted-foreground">Dimensions</dt>
                      <dd className="font-medium">{product.details.dimensions}</dd>
                    </div>
                  )}
                  {product.details.weight && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <dt className="text-muted-foreground">Weight</dt>
                      <dd className="font-medium">{product.details.weight}</dd>
                    </div>
                  )}
                  {product.details.origin && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <dt className="text-muted-foreground">Origin</dt>
                      <dd className="font-medium">{product.details.origin}</dd>
                    </div>
                  )}
                  {product.details.shelfLife && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <dt className="text-muted-foreground">Shelf Life</dt>
                      <dd className="font-medium">{product.details.shelfLife}</dd>
                    </div>
                  )}
                  {product.details.careInstructions && (
                    <div className="flex justify-between py-2">
                      <dt className="text-muted-foreground">Care</dt>
                      <dd className="font-medium text-right max-w-[60%]">{product.details.careInstructions}</dd>
                    </div>
                  )}
                </dl>
              ) : (
                <p className="text-muted-foreground">No additional details available for this product.</p>
              )}
            </div>

            {/* Artisan Story */}
            {product.artisanStory && (
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
                <h3 className="font-serif text-xl font-semibold mb-4">Artisan Story</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.artisanStory}
                </p>
                <div className="mt-4 p-4 bg-background/50 rounded-lg">
                  <p className="text-sm italic text-foreground">
                    "Every piece we create carries the soul of Kashmir and the dedication of generations."
                  </p>
                </div>
              </div>
            )}

            {/* Customer Info Box */}
            <div className="md:col-span-2 bg-muted/30 rounded-xl p-6 border border-border">
              <h3 className="font-serif text-xl font-semibold mb-4">Important Information</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Shipping</h4>
                  <p className="text-sm text-muted-foreground">Free shipping on orders above ₹2,000. Delivery within 5-7 business days.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Returns</h4>
                  <p className="text-sm text-muted-foreground">Easy 15-day returns. Product must be unused with original tags.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Authenticity</h4>
                  <p className="text-sm text-muted-foreground">Each product comes with a certificate of authenticity.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Support</h4>
                  <p className="text-sm text-muted-foreground">24/7 customer support. WhatsApp: +91 9876543210</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <h2 className="font-serif text-2xl font-semibold mb-8">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link 
                  key={p.id} 
                  to={`/product/${p.id}`}
                  className="group card-product"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img 
                      src={
                        p.image.startsWith('/uploads') || p.image.startsWith('/')
                          ? `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${p.image}`
                          : p.image
                      }
                      alt={p.name}
                      className="w-full h-full object-cover image-zoom"
                    />
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-primary font-semibold">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
