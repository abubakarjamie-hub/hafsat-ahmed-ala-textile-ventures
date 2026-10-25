export type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: string;
  compareAtPrice: string | null;
  currency: string;
  category: string;
  badge: string | null;
  rating: string;
  reviewCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  materials: string;
  specifications: Record<string, string>;
  features: string[];
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
};

export const seedProducts: SeedProduct[] = [
  {
    slug: "premium-ankara-fabric",
    name: "Premium Ankara Fabric",
    description:
      "Discover beautiful, high-quality fabrics selected for elegance, durability, and exceptional style. Perfect for traditional outfits, special occasions, and creative fashion designs.",
    longDescription:
      "Crafted from high-quality 100% cotton wax print, this premium Ankara fabric delivers unmatched vibrancy, comfort, and durability. The bold geometric patterns and rich color saturation make it a versatile staple for traditional attire, contemporary fashion, and special occasions. Each yard is carefully inspected to ensure consistent print quality and fabric integrity.",
    price: "18500",
    compareAtPrice: "25000",
    currency: "NGN",
    category: "Ankara",
    badge: "New Arrival",
    rating: "4.8",
    reviewCount: 128,
    images: [
      "/images/products/ankara-main.jpg",
      "/images/products/ankara-1.jpg",
      "/images/products/ankara-2.jpg",
      "/images/products/ankara-3.jpg",
      "/images/products/texture-closeup.jpg",
    ],
    colors: [
      { name: "Royal Multicolor", hex: "#1a365d" },
      { name: "Gold Accent", hex: "#C69A32" },
      { name: "Emerald Burst", hex: "#276749" },
      { name: "Crimson Classic", hex: "#9B2C2C" },
    ],
    sizes: ["2 Yards", "4 Yards", "6 Yards", "8 Yards", "12 Yards"],
    materials:
      "100% premium cotton wax print. Machine wash cold on gentle cycle. Do not bleach. Iron on medium heat on reverse side. Hang dry recommended to preserve color vibrancy.",
    specifications: {
      "Fabric Type": "Cotton Wax Print (Ankara)",
      Width: "45 inches (114 cm)",
      Weight: "Medium-weight",
      Origin: "Premium African print",
      "Care Level": "Easy care",
      "Print Method": "Wax resist dye",
    },
    features: [
      "Vibrant fade-resistant print",
      "Soft & breathable cotton",
      "Suitable for traditional & modern designs",
      "Consistent pattern alignment",
      "Unisex styling versatility",
    ],
    stock: 86,
    isFeatured: true,
    isNew: true,
  },
  {
    slug: "luxury-lace-fabric",
    name: "Luxury Lace Fabric",
    description:
      "Exquisite lace with delicate floral motifs and soft drape. Ideal for bridal wear, evening gowns, and elegant traditional ensembles.",
    longDescription:
      "Our luxury lace fabric features intricate floral embroidery on a soft, fine mesh base. Designed for special occasions, bridal wear, and high-end fashion pieces. The refined texture and elegant finish elevate any garment with timeless sophistication.",
    price: "32000",
    compareAtPrice: "40000",
    currency: "NGN",
    category: "Lace",
    badge: "Best Seller",
    rating: "4.9",
    reviewCount: 86,
    images: [
      "/images/products/lace-main.jpg",
      "/images/products/lace-1.jpg",
      "/images/products/silk-1.jpg",
      "/images/products/texture-1.jpg",
    ],
    colors: [
      { name: "Ivory Cream", hex: "#F5F0E6" },
      { name: "Soft Gold", hex: "#D4AF37" },
      { name: "Blush Pink", hex: "#E8B4B8" },
      { name: "Classic White", hex: "#FFFFFF" },
    ],
    sizes: ["2 Yards", "4 Yards", "5 Yards", "6 Yards"],
    materials:
      "Premium polyester lace with embroidered detailing. Hand wash cold recommended. Lay flat to dry. Cool iron if needed with a pressing cloth.",
    specifications: {
      "Fabric Type": "Embroidered Lace",
      Width: "50 inches",
      Weight: "Lightweight",
      Stretch: "Slight give",
      Opacity: "Semi-sheer",
    },
    features: [
      "Intricate floral embroidery",
      "Soft elegant drape",
      "Bridal & occasion ready",
      "Fine mesh base",
    ],
    stock: 42,
    isFeatured: true,
    isNew: false,
  },
  {
    slug: "elegant-brocade",
    name: "Elegant Brocade",
    description:
      "Rich brocade with metallic gold motifs on deep navy. A statement fabric for ceremonial wear and luxury fashion.",
    longDescription:
      "This elegant brocade combines deep navy grounding with luminous gold damask patterns. Heavy enough for structured garments yet refined in hand-feel, it is perfect for agbada, formal gowns, and ceremonial attire.",
    price: "27500",
    compareAtPrice: null,
    currency: "NGN",
    category: "Brocade",
    badge: null,
    rating: "4.7",
    reviewCount: 54,
    images: [
      "/images/products/brocade-main.jpg",
      "/images/products/brocade-1.jpg",
      "/images/products/brocade-2.jpg",
      "/images/products/hausa-1.jpg",
    ],
    colors: [
      { name: "Navy & Gold", hex: "#071D38" },
      { name: "Burgundy Gold", hex: "#6B1D2A" },
      { name: "Emerald Gold", hex: "#1A4D3E" },
      { name: "Black Gold", hex: "#111111" },
    ],
    sizes: ["3 Yards", "5 Yards", "6 Yards", "8 Yards"],
    materials:
      "Polyester-blend brocade with metallic yarn. Dry clean recommended for best longevity. Cool iron on reverse.",
    specifications: {
      "Fabric Type": "Metallic Brocade",
      Width: "58 inches",
      Weight: "Heavyweight",
      Finish: "Lustrous damask",
    },
    features: [
      "Metallic gold motifs",
      "Structured heavyweight hand",
      "Ceremonial & formal wear",
      "Rich color depth",
    ],
    stock: 35,
    isFeatured: true,
    isNew: false,
  },
  {
    slug: "traditional-hausa-fabric",
    name: "Traditional Hausa Fabric",
    description:
      "Authentic woven-style Hausa textile in indigo and gold. Celebrated for cultural elegance and lasting quality.",
    longDescription:
      "Inspired by classic Northern Nigerian weaving traditions, this fabric features bold indigo grounding with gold accent striping. Ideal for traditional ensembles, turbans, and modern reinterpretations of Hausa style.",
    price: "22000",
    compareAtPrice: "28000",
    currency: "NGN",
    category: "Traditional",
    badge: "Limited",
    rating: "4.8",
    reviewCount: 71,
    images: [
      "/images/products/hausa-main.jpg",
      "/images/products/hausa-1.jpg",
      "/images/products/rolls-1.jpg",
      "/images/products/market-1.jpg",
    ],
    colors: [
      { name: "Indigo Gold", hex: "#1e3a5f" },
      { name: "Deep Indigo", hex: "#0f2744" },
      { name: "Sand & Gold", hex: "#c2a46d" },
    ],
    sizes: ["4 Yards", "6 Yards", "8 Yards", "10 Yards"],
    materials:
      "Cotton-rich woven blend. Gentle machine wash cold. Line dry. Medium iron.",
    specifications: {
      "Fabric Type": "Traditional Woven-Style",
      Width: "48 inches",
      Weight: "Medium-heavy",
      Pattern: "Stripe & accent weave",
    },
    features: [
      "Cultural heritage design",
      "Durable woven hand",
      "Indigo & gold palette",
      "Ideal for traditional attire",
    ],
    stock: 28,
    isFeatured: true,
    isNew: true,
  },
  {
    slug: "premium-silk-blend",
    name: "Premium Silk Blend",
    description:
      "Lustrous silk-blend fabric with a fluid drape. Perfect for flowing gowns, hijabs, and refined occasion wear.",
    longDescription:
      "A refined silk-blend that catches light beautifully while remaining practical for everyday luxury. Smooth hand-feel and graceful movement make it a favorite for dresses, scarves, and layered looks.",
    price: "24500",
    compareAtPrice: "30000",
    currency: "NGN",
    category: "Silk",
    badge: null,
    rating: "4.6",
    reviewCount: 39,
    images: [
      "/images/products/silk-1.jpg",
      "/images/products/silk-2.jpg",
      "/images/products/texture-1.jpg",
      "/images/products/lace-1.jpg",
    ],
    colors: [
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Ruby", hex: "#9B1B30" },
      { name: "Midnight", hex: "#0B1426" },
      { name: "Pearl", hex: "#F8F6F0" },
    ],
    sizes: ["2 Yards", "4 Yards", "6 Yards"],
    materials:
      "Silk-polyester blend. Hand wash or dry clean. Cool iron on reverse. Store away from direct sunlight.",
    specifications: {
      "Fabric Type": "Silk Blend",
      Width: "44 inches",
      Weight: "Lightweight",
      Sheen: "Soft lustre",
    },
    features: [
      "Fluid elegant drape",
      "Soft lustrous finish",
      "Comfortable silk blend",
      "Occasion & everyday luxury",
    ],
    stock: 50,
    isFeatured: false,
    isNew: false,
  },
  {
    slug: "designer-wax-print",
    name: "Designer Wax Print",
    description:
      "Exclusive designer wax print with contemporary motifs. Bold, modern, and made for standout creations.",
    longDescription:
      "A contemporary take on classic wax print, featuring exclusive designer motifs and a balanced color story. Ideal for fashion-forward tailoring, ready-to-wear, and statement traditional pieces.",
    price: "19500",
    compareAtPrice: null,
    currency: "NGN",
    category: "Ankara",
    badge: "New Arrival",
    rating: "4.5",
    reviewCount: 22,
    images: [
      "/images/products/ankara-4.jpg",
      "/images/products/ankara-2.jpg",
      "/images/products/ankara-3.jpg",
      "/images/products/rolls-2.jpg",
    ],
    colors: [
      { name: "Sunset Multi", hex: "#C05621" },
      { name: "Ocean Multi", hex: "#2B6CB0" },
      { name: "Forest Multi", hex: "#276749" },
    ],
    sizes: ["4 Yards", "6 Yards", "8 Yards", "12 Yards"],
    materials:
      "100% cotton designer wax print. Cold wash, mild detergent. Hang dry. Warm iron reverse side.",
    specifications: {
      "Fabric Type": "Designer Cotton Wax Print",
      Width: "45 inches",
      Weight: "Medium",
      Collection: "Contemporary",
    },
    features: [
      "Exclusive designer motifs",
      "Bold contemporary palette",
      "Premium cotton hand",
      "Fashion-forward versatility",
    ],
    stock: 60,
    isFeatured: false,
    isNew: true,
  },
];
