import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Heart, Users, Globe, CheckCircle } from "lucide-react";
import heroImage from "@/assets/about-hero.jpg";
import artisanImage from "@/assets/artisan.jpg";

const values = [
  {
    icon: Award,
    title: "Authenticity",
    description: "Every product is 100% genuine Kashmiri, sourced directly from local artisans and farms."
  },
  {
    icon: Heart,
    title: "Heritage Preservation",
    description: "We support traditional craftsmanship, ensuring ancient techniques are passed to new generations."
  },
  {
    icon: Users,
    title: "Fair Trade",
    description: "Artisans receive fair compensation, supporting their families and communities."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Bringing Kashmir's finest to doorsteps worldwide with premium packaging and care."
  }
];

const milestones = [
  { year: "1947", event: "Our journey began in the valleys of Kashmir" },
  { year: "1975", event: "Expanded to include premium dry fruits" },
  { year: "2000", event: "First international export to UAE" },
  { year: "2015", event: "Launched online presence" },
  { year: "2024", event: "Serving 50,000+ happy customers globally" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>Our Story | Royal Pashmina and Nut Bazaar</title>
        <meta name="description" content="Discover the story behind Royal Pashmina and Nut Bazaar. 75+ years of preserving Kashmiri heritage through authentic craftsmanship and premium products." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img src={heroImage} alt="Our Heritage" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block text-accent font-medium tracking-[0.25em] uppercase text-sm mb-4">
                Since 1947
              </span>
              <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground leading-tight mb-4">
                Our <span className="text-primary italic">Story</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Three generations of dedication to preserving Kashmir's rich heritage through authentic craftsmanship and premium organic products.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4 block">
                  The Beginning
                </span>
                <h2 className="font-serif text-4xl font-semibold text-foreground mb-6">
                  A Legacy of Excellence
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Royal Pashmina and Nut Bazaar was born from a simple dream - to share the exquisite treasures of Kashmir with the world. What started as a small family workshop in the heart of Srinagar has grown into a trusted name for authentic Kashmiri products.
                  </p>
                  <p>
                    Our founder, inspired by the master weavers and farmers of the valley, dedicated his life to preserving these ancient traditions. Today, we continue his legacy, working directly with over 200 artisan families and organic farms across Kashmir.
                  </p>
                  <p>
                    Every Pashmina shawl tells a story of months of painstaking work. Every handful of dry fruits carries the essence of Kashmir's pristine valleys. We are merely custodians of this heritage, committed to bringing it to you in its purest form.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={artisanImage} 
                  alt="Kashmiri Artisan at Work" 
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
                  <span className="block font-serif text-4xl font-bold">75+</span>
                  <span className="text-sm">Years of Heritage</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4 block">
                What We Stand For
              </span>
              <h2 className="font-serif text-4xl font-semibold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground">
                These principles guide everything we do, from sourcing to delivery.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4 block">
                Our Journey
              </span>
              <h2 className="font-serif text-4xl font-semibold text-foreground">
                Milestones
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-8 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-serif font-bold text-lg">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-primary/20 mt-2" />
                    )}
                  </div>
                  <div className="pt-3">
                    <span className="text-primary font-semibold">{milestone.year}</span>
                    <p className="text-foreground font-medium text-lg">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promise Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl font-semibold mb-8">Our Promise to You</h2>
              <div className="grid sm:grid-cols-3 gap-8">
                {["100% Authentic Products", "Ethical & Sustainable", "Satisfaction Guaranteed"].map((promise) => (
                  <div key={promise} className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent" />
                    <span className="font-medium">{promise}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
