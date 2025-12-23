import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    "Fashion": [
      { name: "Pashmina Shawls", href: "/shawls" },
      { name: "Pherans", href: "/pherans" },
      { name: "Handbags", href: "/handbags" },
    ],
    "Food & Gifts": [
      { name: "Dry Fruits", href: "/dry-fruits" },
      { name: "Gift Hampers", href: "/gift-hampers" },
    ],
    "Customer Care": [
      { name: "Track Order", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "Returns & Exchange", href: "#" },
      { name: "FAQs", href: "#" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Our Artisans", href: "/about" },
      { name: "Contact Us", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-semibold text-primary-foreground leading-tight block">
                Royal Pashmina
              </span>
              <span className="block text-xs tracking-[0.2em] text-primary-foreground/60 uppercase mt-1">
                and Nut Bazaar
              </span>
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed mb-6 max-w-sm">
              Bringing the timeless elegance of Kashmiri craftsmanship and the 
              pure essence of Himalayan produce to homes worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-primary-foreground/70">
              <a href="tel:+911234567890" className="flex items-center gap-3 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +91 123 456 7890
              </a>
              <a href="mailto:hello@kashmirheritage.com" className="flex items-center gap-3 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
                hello@kashmirheritage.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Lal Chowk, Srinagar, Kashmir 190001</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif text-lg font-semibold text-primary-foreground mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Royal Pashmina and Nut Bazaar. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
