import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-kashmir.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Kashmiri heritage - Pashmina shawl with dry fruits and saffron against mountain backdrop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-2xl">
          <span className="inline-block text-accent font-medium tracking-[0.25em] uppercase text-sm mb-6 animate-fade-in-up">
            Since 1947
          </span>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Authentic Kashmiri Heritage,{" "}
            <span className="text-primary italic">Crafted with Love</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Experience the timeless elegance of handcrafted Pashmina shawls and 
            the pure taste of Kashmiri dry fruits. Each piece tells a story of 
            generations of artisan mastery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/shawls">Shop Royal Pashmina</Link>
            </Button>
            <Button variant="olive" size="xl" asChild>
              <Link to="/dry-fruits">Shop Nut Bazaar</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border/30 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <span className="block font-serif text-3xl font-semibold text-foreground">75+</span>
              <span className="text-sm text-muted-foreground">Years of Heritage</span>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="text-center">
              <span className="block font-serif text-3xl font-semibold text-foreground">50K+</span>
              <span className="text-sm text-muted-foreground">Happy Customers</span>
            </div>
            <div className="w-px h-12 bg-border/50 hidden sm:block" />
            <div className="text-center hidden sm:block">
              <span className="block font-serif text-3xl font-semibold text-foreground">100%</span>
              <span className="text-sm text-muted-foreground">Authentic Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
