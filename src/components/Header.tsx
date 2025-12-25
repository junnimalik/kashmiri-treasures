import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  const navLinks = [
    { 
      name: "Shawls", 
      href: "/shawls",
    },
    { 
      name: "Pherans", 
      href: "/pherans",
    },
    { 
      name: "Handbags", 
      href: "/handbags",
    },
    { 
      name: "Dry Fruits", 
      href: "/dry-fruits",
    },
    { 
      name: "Gift Hampers", 
      href: "/gift-hampers",
    },
    { 
      name: "Our Story", 
      href: "/about",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Text */}
            <div className="flex flex-col items-start">
              <span className="font-serif text-xl md:text-2xl font-bold text-foreground tracking-wide leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent group-hover:from-accent group-hover:via-primary group-hover:to-accent transition-all duration-300">
                Royal Pashmina
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground uppercase font-medium">
                <span className="inline-block border-l-2 border-accent pl-2">and Nut Bazaar</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Search className="w-5 h-5 text-foreground/70" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
              <Heart className="w-5 h-5 text-foreground/70" />
            </button>
            <button 
              className="p-2 hover:bg-muted rounded-full transition-colors relative"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingBag className="w-5 h-5 text-foreground/70" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;