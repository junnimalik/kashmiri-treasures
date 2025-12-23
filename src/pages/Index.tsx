import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandShowcase from "@/components/BrandShowcase";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import ArtisanStory from "@/components/ArtisanStory";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Kashmir Heritage | Royal Pashmina & Nut Bazaar - Authentic Kashmiri Products</title>
        <meta 
          name="description" 
          content="Discover authentic Kashmiri heritage products. Shop handcrafted Pashmina shawls, traditional Pherans, premium dry fruits, and saffron. 100% authentic, ethically sourced."
        />
        <meta 
          name="keywords" 
          content="Kashmiri Pashmina, Pashmina shawls, Kashmiri dry fruits, saffron, Pheran, handcrafted, artisan, Kashmir"
        />
        <link rel="canonical" href="https://kashmirheritage.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Kashmir Heritage | Authentic Kashmiri Products" />
        <meta property="og:description" content="Experience timeless Kashmiri elegance with handcrafted Pashmina and premium dry fruits." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Kashmir Heritage",
            "description": "Authentic Kashmiri heritage products - Royal Pashmina and Nut Bazaar",
            "url": "https://kashmirheritage.com",
            "logo": "https://kashmirheritage.com/logo.png",
            "sameAs": [
              "https://facebook.com/kashmirheritage",
              "https://instagram.com/kashmirheritage",
              "https://twitter.com/kashmirheritage"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <BrandShowcase />
          <CategoryGrid />
          <FeaturedProducts />
          <ArtisanStory />
          <WhyChooseUs />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
