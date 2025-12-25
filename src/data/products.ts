export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: 'shawls' | 'pherans' | 'handbags' | 'dry-fruits' | 'gift-hampers';
  rating: number;
  reviews: number;
  inStock: boolean;
  variants?: { name: string; options: string[] }[];
  details: {
    material?: string;
    dimensions?: string;
    weight?: string;
    origin?: string;
    careInstructions?: string;
    shelfLife?: string;
  };
  artisanStory?: string;
}

import shawlImage from "@/assets/shawls/pashmina-shawl.jpg";
import pheranImage from "@/assets/pherans/pheran.jpg";
import handbagImage from "@/assets/handbags/handbag.jpg";
import dryFruitsImage from "@/assets/dry-fruits/dry-fruits.jpg";
import giftHamperImage from "@/assets/gift-hampers/gift-hamper.jpg";

export const products: Product[] = [
  // Shawls
  {
    id: "shawl-001",
    name: "Royal Kashmiri Pashmina",
    description: "Exquisitely handwoven pure pashmina shawl featuring intricate Kashmiri embroidery. Each piece takes over 200 hours to complete.",
    price: 45000,
    originalPrice: 55000,
    image: shawlImage,
    images: [shawlImage],
    category: "shawls",
    rating: 5,
    reviews: 128,
    inStock: true,
    variants: [
      { name: "Color", options: ["Ivory", "Maroon", "Navy", "Black"] },
      { name: "Size", options: ["Small (70x200cm)", "Large (100x200cm)"] }
    ],
    details: {
      material: "100% Pure Pashmina (Cashmere)",
      dimensions: "70cm x 200cm",
      weight: "250g",
      origin: "Srinagar, Kashmir",
      careInstructions: "Dry clean only. Store in breathable fabric bag."
    },
    artisanStory: "Crafted by Master Weaver Mohammad Yusuf, whose family has been creating pashminas for 5 generations in Srinagar."
  },
  {
    id: "shawl-002",
    name: "Jamawar Heritage Shawl",
    description: "Luxurious jamawar shawl with traditional paisley patterns, handcrafted using ancient weaving techniques.",
    price: 65000,
    originalPrice: 75000,
    image: shawlImage,
    images: [shawlImage],
    category: "shawls",
    rating: 5,
    reviews: 89,
    inStock: true,
    variants: [
      { name: "Color", options: ["Burgundy", "Emerald", "Gold"] }
    ],
    details: {
      material: "Pure Pashmina with Silk Thread",
      dimensions: "100cm x 200cm",
      weight: "350g",
      origin: "Srinagar, Kashmir"
    }
  },
  {
    id: "shawl-003",
    name: "Embroidered Pashmina Stole",
    description: "Elegant pashmina stole with delicate hand embroidery, perfect for special occasions.",
    price: 28000,
    image: shawlImage,
    images: [shawlImage],
    category: "shawls",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    variants: [
      { name: "Color", options: ["Blush Pink", "Sky Blue", "Cream"] }
    ],
    details: {
      material: "100% Pure Pashmina",
      dimensions: "60cm x 180cm",
      weight: "180g",
      origin: "Srinagar, Kashmir"
    }
  },
  // Pherans
  {
    id: "pheran-001",
    name: "Traditional Kashmiri Pheran",
    description: "Authentic Kashmiri pheran with intricate aari embroidery, perfect for cold weather and cultural celebrations.",
    price: 12000,
    originalPrice: 15000,
    image: pheranImage,
    images: [pheranImage],
    category: "pherans",
    rating: 4.9,
    reviews: 67,
    inStock: true,
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL", "XXL"] },
      { name: "Color", options: ["Maroon", "Navy", "Black", "Cream"] }
    ],
    details: {
      material: "Premium Wool Blend",
      origin: "Srinagar, Kashmir",
      careInstructions: "Dry clean recommended"
    }
  },
  {
    id: "pheran-002",
    name: "Designer Pheran Kurta",
    description: "Modern interpretation of traditional pheran with contemporary cuts and elegant embroidery work.",
    price: 18000,
    image: pheranImage,
    images: [pheranImage],
    category: "pherans",
    rating: 4.7,
    reviews: 45,
    inStock: true,
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL"] }
    ],
    details: {
      material: "Silk Blend",
      origin: "Kashmir"
    }
  },
  // Handbags
  {
    id: "handbag-001",
    name: "Kashmiri Crewel Handbag",
    description: "Stunning handbag featuring traditional Kashmiri crewel embroidery on premium leather.",
    price: 8500,
    originalPrice: 10000,
    image: handbagImage,
    images: [handbagImage],
    category: "handbags",
    rating: 4.8,
    reviews: 92,
    inStock: true,
    variants: [
      { name: "Color", options: ["Brown", "Black", "Tan"] }
    ],
    details: {
      material: "Genuine Leather with Hand Embroidery",
      dimensions: "30cm x 25cm x 12cm",
      origin: "Kashmir"
    }
  },
  {
    id: "handbag-002",
    name: "Papier Mache Clutch",
    description: "Exquisite clutch featuring authentic Kashmiri papier mache artwork with gold leaf detailing.",
    price: 4500,
    image: handbagImage,
    images: [handbagImage],
    category: "handbags",
    rating: 4.9,
    reviews: 78,
    inStock: true,
    variants: [
      { name: "Design", options: ["Floral", "Paisley", "Chinar Leaf"] }
    ],
    details: {
      material: "Papier Mache with Lacquer Finish",
      dimensions: "25cm x 15cm x 5cm",
      origin: "Srinagar, Kashmir"
    }
  },
  // Dry Fruits
  {
    id: "dryfruit-001",
    name: "Premium Kashmiri Walnuts",
    description: "Hand-picked premium quality walnuts from the valleys of Kashmir. Known for their rich taste and nutritional value.",
    price: 1200,
    originalPrice: 1500,
    image: dryFruitsImage,
    images: [dryFruitsImage],
    category: "dry-fruits",
    rating: 4.9,
    reviews: 312,
    inStock: true,
    variants: [
      { name: "Weight", options: ["250g", "500g", "1kg"] }
    ],
    details: {
      origin: "Kashmir Valley",
      shelfLife: "6 months from packaging",
      careInstructions: "Store in cool, dry place"
    }
  },
  {
    id: "dryfruit-002",
    name: "Kashmiri Saffron (Kesar)",
    description: "Grade A+ pure Kashmiri saffron, known for its intense aroma and deep color. Perfect for cooking and health benefits.",
    price: 3500,
    image: dryFruitsImage,
    images: [dryFruitsImage],
    category: "dry-fruits",
    rating: 5,
    reviews: 245,
    inStock: true,
    variants: [
      { name: "Weight", options: ["1g", "2g", "5g"] }
    ],
    details: {
      origin: "Pampore, Kashmir",
      shelfLife: "2 years from packaging"
    }
  },
  {
    id: "dryfruit-003",
    name: "Organic Almonds",
    description: "Premium organic almonds sourced from Kashmir. Rich in protein and healthy fats.",
    price: 950,
    image: dryFruitsImage,
    images: [dryFruitsImage],
    category: "dry-fruits",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    variants: [
      { name: "Weight", options: ["250g", "500g", "1kg"] }
    ],
    details: {
      origin: "Kashmir",
      shelfLife: "6 months"
    }
  },
  // Gift Hampers
  {
    id: "gift-001",
    name: "Royal Kashmir Collection",
    description: "Luxurious gift hamper featuring the finest Kashmiri products - saffron, walnuts, almonds, and dried apricots in an elegant wooden box.",
    price: 5500,
    originalPrice: 6500,
    image: giftHamperImage,
    images: [giftHamperImage],
    category: "gift-hampers",
    rating: 5,
    reviews: 156,
    inStock: true,
    variants: [
      { name: "Size", options: ["Standard", "Premium", "Luxury"] }
    ],
    details: {
      weight: "1.5kg (approx)",
      origin: "Kashmir",
      shelfLife: "3 months from packaging"
    }
  },
  {
    id: "gift-002",
    name: "Wellness Gift Box",
    description: "Curated wellness hamper with organic honey, saffron, dried fruits and herbal tea from Kashmir.",
    price: 3800,
    image: giftHamperImage,
    images: [giftHamperImage],
    category: "gift-hampers",
    rating: 4.9,
    reviews: 98,
    inStock: true,
    details: {
      weight: "1kg (approx)",
      origin: "Kashmir"
    }
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};
