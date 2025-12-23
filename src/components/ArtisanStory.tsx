import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import artisanImage from "@/assets/artisan.jpg";

const ArtisanStory = () => {
  return (
    <section id="story" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={artisanImage}
                alt="Kashmiri artisan weaving traditional Pashmina"
                className="w-full h-auto object-cover"
              />
              
              {/* Play Button Overlay */}
              <button className="absolute inset-0 flex items-center justify-center bg-foreground/20 hover:bg-foreground/30 transition-colors group">
                <div className="w-20 h-20 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-8 h-8 text-primary ml-1" />
                </div>
              </button>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border-2 border-accent/30 rounded-2xl -z-10" />
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full -z-10" />
          </div>

          {/* Content */}
          <div>
            <span className="text-accent font-medium tracking-[0.25em] uppercase text-sm mb-4 block">
              Our Heritage
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Preserving the Art of{" "}
              <span className="text-primary italic">Kashmiri Craftsmanship</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                For over seven decades, our artisans have woven stories into every 
                thread of our Pashmina shawls. The intricate sozni embroidery and 
                kani weaving techniques have been passed down through generations, 
                creating pieces that are not just garments but heirlooms.
              </p>
              <p>
                Our partnership with local farming communities ensures that the 
                finest walnuts, almonds, and saffron reach you directly from 
                Kashmir's pristine valleys, supporting sustainable practices and 
                fair trade principles.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              <div>
                <span className="block font-serif text-4xl font-semibold text-foreground">
                  200+
                </span>
                <span className="text-muted-foreground text-sm">
                  Artisan Families
                </span>
              </div>
              <div>
                <span className="block font-serif text-4xl font-semibold text-foreground">
                  15+
                </span>
                <span className="text-muted-foreground text-sm">
                  Partner Farms
                </span>
              </div>
              <div>
                <span className="block font-serif text-4xl font-semibold text-foreground">
                  GI
                </span>
                <span className="text-muted-foreground text-sm">
                  Certified
                </span>
              </div>
            </div>

            <Button variant="hero" size="lg" className="mt-10">
              Learn Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanStory;
