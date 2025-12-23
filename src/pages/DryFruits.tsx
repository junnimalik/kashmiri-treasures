import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star, Leaf } from "lucide-react";
import heroImage from "@/assets/dryfruits-collection.jpg";
import dryFruitsImage from "@/assets/dry-fruits.jpg";

const products = [
  { id: 1, name: "Premium Kashmiri Almonds", price: 1299, originalPrice: 1599, rating: 5, reviews: 128, tag: "Bestseller", weight: "500g" },
  { id: 2, name: "Organic Walnuts", price: 899, originalPrice: 1099, rating: 5, reviews: 94, tag: "Organic", weight: "500g" },
  { id: 3, name: "Kashmiri Saffron", price: 2499, originalPrice: 2999, rating: 5, reviews: 67, tag: "Premium", weight: "5g" },
  { id: 4, name: "Dried Apricots", price: 599, originalPrice: 749, rating: 4, reviews: 82, tag: null, weight: "250g" },
  { id: 5, name: "Mixed Dry Fruits Box", price: 1999, originalPrice: 2499, rating: 5, reviews: 156, tag: "Value Pack", weight: "1kg" },
  { id: 6, name: "Cashew Nuts Premium", price: 1499, originalPrice: 1799, rating: 4, reviews: 73, tag: null, weight: "500g" },
];

const DryFruits = () => {
  return (
    <>
      <Helmet>
        <title>Premium Kashmiri Dry Fruits | Royal Pashmina and Nut Bazaar</title>
        <meta name="description" content="Shop authentic Kashmiri dry fruits - almonds, walnuts, saffron, apricots. 100% organic, farm-sourced from the valleys of Kashmir." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img src={heroImage} alt="Dry Fruits Collection" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block text-olive font-medium tracking-[0.25em] uppercase text-sm mb-4">
                From Kashmir Valley
              </span>
              <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground leading-tight mb-4">
                Premium <span className="text-olive italic">Dry Fruits</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Handpicked from the pristine valleys of Kashmir. Pure, organic, and packed with natural goodness.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
              <div>
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-2">Our Collection</h2>
                <p className="text-muted-foreground">{products.length} premium products</p>
              </div>
              <div className="flex gap-4">
                <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group card-product">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <img 
                      src={dryFruitsImage} 
                      alt={product.name}
                      className="w-full h-full object-cover image-zoom"
                    />
                    {product.tag && (
                      <span className={`absolute top-4 left-4 ${product.tag === 'Organic' ? 'bg-olive' : 'bg-primary'} text-primary-foreground text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1`}>
                        {product.tag === 'Organic' && <Leaf className="w-3 h-3" />}
                        {product.tag}
                      </span>
                    )}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                      <Heart className="w-5 h-5 text-foreground" />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="olive" className="w-full" size="lg">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < product.rating ? 'text-accent fill-accent' : 'text-muted'}`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-foreground mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.weight}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">₹{product.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DryFruits;
