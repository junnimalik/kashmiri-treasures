import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import heroImage from "@/assets/handbags-collection.jpg";

const Handbags = () => {
  return (
    <>
      <Helmet>
        <title>Kashmiri Handbags & Accessories | Royal Pashmina and Nut Bazaar</title>
        <meta name="description" content="Shop exquisite Kashmiri handbags and accessories. Handcrafted with traditional embroidery and premium materials." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img src={heroImage} alt="Handbags Collection" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block text-accent font-medium tracking-[0.25em] uppercase text-sm mb-4">
                Artisan Accessories
              </span>
              <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground leading-tight mb-4">
                Handbags & <span className="text-primary italic">Accessories</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Carry a piece of Kashmir with you. Our handbags blend traditional craftsmanship with modern elegance.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid - Auto-loads from src/assets/handbags/ */}
        <ProductGallery category="handbags" />

        <Footer />
      </div>
    </>
  );
};

export default Handbags;
