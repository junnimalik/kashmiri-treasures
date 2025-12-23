import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import pashminaImage from "@/assets/pashmina-shawl.jpg";
import dryFruitsImage from "@/assets/dry-fruits.jpg";

const BrandShowcase = () => {
  const brands = [
    {
      id: "pashmina",
      name: "Royal Pashmina",
      tagline: "Elegance Woven in Every Thread",
      description:
        "Discover our exquisite collection of handcrafted Pashmina shawls, traditional Pherans, and artisan accessories. Each piece is a masterpiece of Kashmiri craftsmanship, passed down through generations.",
      image: pashminaImage,
      buttonVariant: "hero" as const,
      href: "#pashmina",
      features: ["Hand-embroidered", "Pure Cashmere", "GI Certified"],
    },
    {
      id: "nutbazaar",
      name: "Nut Bazaar",
      tagline: "Nature's Finest, From Kashmir's Heart",
      description:
        "Savor the authentic taste of Kashmiri dry fruits and premium saffron. Sourced directly from local farms, our products bring the wholesome goodness of the Himalayan valleys to your home.",
      image: dryFruitsImage,
      buttonVariant: "olive" as const,
      href: "#nutbazaar",
      features: ["Farm Fresh", "Organic", "Premium Quality"],
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium tracking-[0.25em] uppercase text-sm mb-4 block">
            Our Brands
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Two Traditions, One Heritage
          </h2>
          <p className="text-muted-foreground text-lg">
            Bringing you the finest of Kashmir through luxury fashion and organic wellness
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover image-zoom"
                />
              </div>
              
              <div className="p-8 lg:p-10">
                <span className="text-accent font-medium text-sm tracking-wide uppercase">
                  {brand.tagline}
                </span>
                <h3 className="font-serif text-3xl font-semibold text-foreground mt-2 mb-4">
                  {brand.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {brand.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {brand.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-4 py-1.5 bg-muted text-muted-foreground text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button variant={brand.buttonVariant} size="lg" asChild>
                  <a href={brand.href} className="group/btn">
                    Explore Collection
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
