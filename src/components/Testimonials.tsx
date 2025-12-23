import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      text: "The Pashmina shawl I received is absolutely exquisite. The embroidery work is so intricate and delicate. It's become my most treasured possession.",
      product: "Kashmiri Embroidered Pashmina",
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      location: "London, UK",
      rating: 5,
      text: "I've never tasted walnuts this fresh and flavorful. The saffron quality is exceptional too. Definitely ordering more for the festive season!",
      product: "Premium Dry Fruits Collection",
    },
    {
      id: 3,
      name: "Ananya Reddy",
      location: "Bangalore, India",
      rating: 5,
      text: "The gift hamper was perfect for my mother's birthday. The packaging was beautiful and the products inside were of the highest quality.",
      product: "Heritage Gift Hamper",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium tracking-[0.25em] uppercase text-sm mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from people who have experienced the magic of Kashmir
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative p-8 bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Product */}
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full mb-6">
                {testimonial.product}
              </span>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-serif text-xl font-semibold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="block font-medium text-foreground">
                    {testimonial.name}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {testimonial.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
