import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to our family!",
        description: "Thank you for subscribing. You'll receive our latest updates soon.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-medium tracking-[0.25em] uppercase text-sm mb-4 block text-primary-foreground/70">
            Stay Connected
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Join Our Kashmir Heritage Family
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Be the first to know about new collections, artisan stories, exclusive 
            offers, and traditional recipes from Kashmir.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
            />
            <Button
              type="submit"
              variant="accent"
              size="xl"
              className="whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-primary-foreground/60 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
