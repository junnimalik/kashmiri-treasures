import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star } from "lucide-react";
import heroImage from "@/assets/pherans-collection.jpg";
import pheranImage from "@/assets/pheran.jpg";

const products = [
  { id: 1, name: "Maroon Tilla Pheran", price: 18999, originalPrice: 22999, rating: 5, reviews: 34, tag: "Bestseller" },
  { id: 2, name: "Navy Aari Embroidered", price: 24999, originalPrice: 28999, rating: 5, reviews: 28, tag: "Premium" },
  { id: 3, name: "Emerald Sozni Pheran", price: 32999, originalPrice: 38999, rating: 4, reviews: 19, tag: "New" },
  { id: 4, name: "Cream Cotton Pheran", price: 8999, originalPrice: 11999, rating: 4, reviews: 67, tag: null },
  { id: 5, name: "Black Velvet Pheran", price: 15999, originalPrice: 19999, rating: 5, reviews: 42, tag: null },
  { id: 6, name: "Royal Blue Kashmiri", price: 21999, originalPrice: 25999, rating: 5, reviews: 23, tag: "Artisan" },
];

const Pherans = () => {
  return (
    <>
      <Helmet>
        <title>Traditional Pherans | Royal Pashmina and Nut Bazaar</title>
        <meta name="description" content="Explore our collection of traditional Kashmiri Pherans. Elegant, warm, and beautifully embroidered by skilled artisans." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img src={heroImage} alt="Pherans Collection" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block text-accent font-medium tracking-[0.25em] uppercase text-sm mb-4">
                Traditional Elegance
              </span>
              <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground leading-tight mb-4">
                Kashmiri <span className="text-primary italic">Pherans</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                The iconic Kashmiri garment, perfect for warmth and elegance. Each piece features intricate embroidery and premium fabrics.
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
                <p className="text-muted-foreground">{products.length} beautiful pieces</p>
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
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img 
                      src={pheranImage} 
                      alt={product.name}
                      className="w-full h-full object-cover image-zoom"
                    />
                    {product.tag && (
                      <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                        {product.tag}
                      </span>
                    )}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                      <Heart className="w-5 h-5 text-foreground" />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="hero" className="w-full" size="lg">
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
                    <h3 className="font-serif text-lg font-medium text-foreground mb-2">{product.name}</h3>
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

export default Pherans;
