import { Shield, Leaf, Award, Truck, Heart, Sparkles } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Authentic",
      description:
        "Every product is sourced directly from Kashmir with certificates of authenticity.",
    },
    {
      icon: Leaf,
      title: "Ethically Sourced",
      description:
        "We work closely with local artisans and farmers, ensuring fair wages and sustainable practices.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "Rigorous quality checks ensure only the finest products reach your doorstep.",
    },
    {
      icon: Truck,
      title: "Worldwide Shipping",
      description:
        "Secure delivery to over 50+ countries with careful packaging and tracking.",
    },
    {
      icon: Heart,
      title: "Handcrafted with Love",
      description:
        "Each piece is handmade by skilled artisans preserving centuries-old techniques.",
    },
    {
      icon: Sparkles,
      title: "GI Certified",
      description:
        "Our Pashmina products carry the Geographical Indication tag of authenticity.",
    },
  ];

  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium tracking-[0.25em] uppercase text-sm mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            The Kashmir Promise
          </h2>
          <p className="text-muted-foreground text-lg">
            Our commitment to quality, authenticity, and heritage sets us apart
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 bg-card rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
