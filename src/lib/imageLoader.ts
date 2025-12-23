// Dynamically load all images from product folders
// Just drop images into the respective folder and they'll automatically appear!

const shawlImages = import.meta.glob('@/assets/shawls/*.(jpg|jpeg|png|webp)', { eager: true, as: 'url' });
const pheranImages = import.meta.glob('@/assets/pherans/*.(jpg|jpeg|png|webp)', { eager: true, as: 'url' });
const handbagImages = import.meta.glob('@/assets/handbags/*.(jpg|jpeg|png|webp)', { eager: true, as: 'url' });
const dryFruitImages = import.meta.glob('@/assets/dry-fruits/*.(jpg|jpeg|png|webp)', { eager: true, as: 'url' });
const giftHamperImages = import.meta.glob('@/assets/gift-hampers/*.(jpg|jpeg|png|webp)', { eager: true, as: 'url' });

// Helper function to convert glob results to array of URLs
const globToArray = (globResult: Record<string, string>): string[] => {
  return Object.values(globResult);
};

export const getProductImages = (category: 'shawls' | 'pherans' | 'handbags' | 'dry-fruits' | 'gift-hampers'): string[] => {
  switch (category) {
    case 'shawls':
      return globToArray(shawlImages);
    case 'pherans':
      return globToArray(pheranImages);
    case 'handbags':
      return globToArray(handbagImages);
    case 'dry-fruits':
      return globToArray(dryFruitImages);
    case 'gift-hampers':
      return globToArray(giftHamperImages);
    default:
      return [];
  }
};

// Get all images from all categories
export const getAllProductImages = () => ({
  shawls: globToArray(shawlImages),
  pherans: globToArray(pheranImages),
  handbags: globToArray(handbagImages),
  dryFruits: globToArray(dryFruitImages),
  giftHampers: globToArray(giftHamperImages),
});

