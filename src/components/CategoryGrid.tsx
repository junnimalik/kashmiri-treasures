import pashminaImage from "@/assets/pashmina-shawl.jpg";
import pheranImage from "@/assets/pheran.jpg";
import handbagImage from "@/assets/handbag.jpg";
import dryFruitsImage from "@/assets/dry-fruits.jpg";
import giftHamperImage from "@/assets/gift-hamper.jpg";

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: "Pashmina Shawls",
      count: "48 Products",
      image: pashminaImage,
      href: "#shawls",
      brand: "pashmina",
    },
    {
      id: 2,
      name: "Pherans",
      count: "24 Products",
      image: pheranImage,
      href: "#pherans",
      brand: "pashmina",
    },
    {
      id: 3,
      name: "Handbags & Accessories",
      count: "36 Products",
      image: handbagImage,
      href: "#accessories",
      brand: "pashmina",
    },
    {
      id: 4,
      name: "Dry Fruits & Saffron",
      count: "52 Products",
      image: dryFruitsImage,
      href: "#dryfruits",
      brand: "nutbazaar",
    },
    {
      id: 5,
      name: "Gift Hampers",
      count: "18 Products",
      image: giftHamperImage,
      href: "#hampers",
      brand: "both",
    },
  ];

  return (
    <section id="collections" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium tracking-[0.25em] uppercase text-sm mb-4 block">
            Shop by Category
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">
            Curated Collections
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={category.href}
              className={`group relative overflow-hidden rounded-xl card-product ${
                index === 0 || index === 4 ? "lg:col-span-1 lg:row-span-2" : ""
              } ${index === 0 ? "col-span-2 lg:col-span-1" : ""} ${
                index === 4 ? "col-span-2 lg:col-span-1" : ""
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className={`relative ${index === 0 || index === 4 ? "aspect-[3/4]" : "aspect-square"} overflow-hidden`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-primary-foreground/80 text-sm font-medium">
                    {category.count}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary-foreground mt-1">
                    {category.name}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-primary-foreground font-medium px-6 py-2 bg-primary/90 rounded-full text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Collection
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
