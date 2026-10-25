import type { ProductColor } from "@/db/schema";

export type StoreProduct = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt: number | null;
  description: string;
  image: string;
  gallery: string[];
  colors: ProductColor[];
  specifications: Record<string, string>;
  careInstructions: string | null;
  quantityUnit: string;
  stock: number;
  isNew: boolean;
  displayOrder: number;
};

export const fallbackProducts: StoreProduct[] = [
  {
    id: 1,
    slug: "premium-ankara-fabric",
    name: "Premium Ankara Fabric",
    category: "Ankara",
    price: 7800,
    compareAt: null,
    description:
      "Discover beautiful, high-quality fabrics selected for elegance, durability, and exceptional style. Perfect for traditional outfits, special occasions, and creative fashion designs.",
    image: "/images/premium-ankara.jpg",
    gallery: [
      "/images/premium-ankara.jpg",
      "/images/ankara-drape.jpg",
      "/images/ankara-folded.jpg",
      "/images/fabric-detail.jpg",
    ],
    colors: [
      { name: "Midnight garden", hex: "#071d38" },
      { name: "Golden bloom", hex: "#c69a32" },
      { name: "Heritage indigo", hex: "#506b82" },
      { name: "Ivory filigree", hex: "#e9e1d1" },
    ],
    specifications: {
      "Fabric type": "Premium Ankara wax print",
      Composition: "Cotton blend",
      Width: "Approx. 45 in / 114 cm",
      "Sold by": "1 yard",
      Origin: "Curated for Hafsat Ahmed Ala Textile Ventures",
    },
    careInstructions: "Hand wash or gentle machine wash in cool water. Wash separately for the first wash; line dry in shade and iron on a medium setting.",
    quantityUnit: "yard",
    stock: 48,
    isNew: true,
    displayOrder: 1,
  },
  {
    id: 2,
    slug: "luxury-lace-fabric",
    name: "Luxury Lace Fabric",
    category: "Lace",
    price: 14500,
    compareAt: null,
    description:
      "An elegant embroidered lace with delicate floral detail, chosen for occasionwear, celebrations, and memorable custom designs.",
    image: "/images/luxury-lace.jpg",
    gallery: ["/images/luxury-lace.jpg"],
    colors: [
      { name: "Champagne", hex: "#dfcfad" },
      { name: "Soft ivory", hex: "#f2eee5" },
      { name: "Warm sand", hex: "#b9a07d" },
    ],
    specifications: {
      "Fabric type": "Embroidered lace",
      Composition: "Polyester lace blend",
      Width: "Approx. 54 in / 137 cm",
      "Sold by": "1 yard",
    },
    careInstructions: "Store folded in a cool, dry place. Hand wash gently in cool water and avoid wringing or direct high heat.",
    quantityUnit: "yard",
    stock: 22,
    isNew: false,
    displayOrder: 2,
  },
  {
    id: 3,
    slug: "elegant-brocade",
    name: "Elegant Brocade",
    category: "Brocade",
    price: 11200,
    compareAt: null,
    description:
      "A lustrous woven brocade with understated gold detail and a beautifully structured drape for refined occasionwear.",
    image: "/images/elegant-brocade.jpg",
    gallery: ["/images/elegant-brocade.jpg"],
    colors: [
      { name: "Emerald gold", hex: "#174b3b" },
      { name: "Midnight navy", hex: "#071d38" },
      { name: "Antique gold", hex: "#b58a32" },
    ],
    specifications: {
      "Fabric type": "Woven brocade",
      Composition: "Polyester brocade blend",
      Width: "Approx. 48 in / 122 cm",
      "Sold by": "1 yard",
    },
    careInstructions: "Dry clean recommended to preserve the woven finish. If washing at home, use cool water and a gentle detergent.",
    quantityUnit: "yard",
    stock: 16,
    isNew: false,
    displayOrder: 3,
  },
  {
    id: 4,
    slug: "heritage-hausa-atampa",
    name: "Heritage Hausa Atampa",
    category: "Traditional",
    price: 6500,
    compareAt: null,
    description:
      "A heritage-inspired indigo textile with crisp geometric bands and a tactile woven character—made for timeless, expressive styling.",
    image: "/images/heritage-haua.jpg",
    gallery: ["/images/heritage-haua.jpg"],
    colors: [
      { name: "Indigo cream", hex: "#183e67" },
      { name: "Deep indigo", hex: "#071d38" },
      { name: "Natural cream", hex: "#e8dcc4" },
    ],
    specifications: {
      "Fabric type": "Traditional atampa-inspired cotton",
      Composition: "Cotton",
      Width: "Approx. 45 in / 114 cm",
      "Sold by": "1 yard",
    },
    careInstructions: "Hand wash separately in cool water. Use a mild detergent and dry in the shade to help maintain the indigo colour.",
    quantityUnit: "yard",
    stock: 31,
    isNew: false,
    displayOrder: 4,
  },
];

export function formatNaira(amount: number): string {
  return `₦${new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(amount)}`;
}
