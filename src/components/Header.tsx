import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Royal Pashmina", href: "#pashmina" },
    { name: "Nut Bazaar", href: "#nutbazaar" },
    { name: "Collections", href: "#collections" },
    { name: "Our Story", href: "#story" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <span className="font-serif text-2xl font-semibold text-foreground tracking-wide">
              Kashmir
            </span>
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Heritage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
              >
                {link.name}
              </a>
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
            <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-foreground/70" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                0
              </span>
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
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
