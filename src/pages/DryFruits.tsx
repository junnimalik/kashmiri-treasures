import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import heroImage from "@/assets/dryfruits-collection.jpg";

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

        {/* Products Grid - Auto-loads from src/assets/dry-fruits/ */}
        <ProductGallery category="dry-fruits" />

        <Footer />
      </div>
    </>
  );
};

export default DryFruits;
