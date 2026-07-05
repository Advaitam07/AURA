import { Product, Review, FAQItem } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "headphones-1",
    name: "AURA Eclipse ANC Headphones",
    brand: "AURA Audio",
    category: "Electronics",
    price: 399,
    originalPrice: 499,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    reviewCount: 142,
    stock: 12,
    colors: [
      { name: "Obsidian Black", value: "#111111" },
      { name: "Sand Alabaster", value: "#E5E1D8" },
      { name: "Sleek Titanium", value: "#A1A1AA" }
    ],
    sizes: ["Standard Fit"],
    description: "Designed for acoustical perfection, the AURA Eclipse offers zero-latency adaptive active noise cancellation paired with a handcrafted aluminum chassis and full-grain leather headband.",
    features: [
      "Custom 40mm beryllium dynamic drivers",
      "Up to 45 hours of battery life with ANC enabled",
      "Ultra-low latency Bluetooth 5.4 or USB-C analog audio",
      "Precision-machined rotary volume controllers"
    ],
    badge: "SALE",
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    flashSale: true
  },
  {
    id: "perfume-1",
    name: "AURA Travertine No. 5 Perfume",
    brand: "AURA Beauty",
    category: "Beauty",
    price: 185,
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    reviewCount: 98,
    stock: 8,
    colors: [
      { name: "Amber Infusion", value: "#D97706" }
    ],
    sizes: ["50ml", "100ml"],
    description: "An olfactory narrative carved in travertine stone. Warm amber, crushed pine needle, and raw vetiver merge to create a fragrance that is deeply grounded yet ethereal.",
    features: [
      "Top Notes: Bergamot, Crushed Pine Needle",
      "Heart Notes: Travertine Mineral Accord, Vetiver",
      "Base Notes: Deep Amber, Warm Cedarwood",
      "Sourced from organic, bio-dynamic flower estates in Grasse"
    ],
    badge: "EXCLUSIVE",
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    flashSale: false
  },
  {
    id: "watch-1",
    name: "AURA Horizon Smartwatch",
    brand: "AURA Chronos",
    category: "Electronics",
    price: 320,
    originalPrice: 380,
    discount: 15,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    reviewCount: 75,
    stock: 24,
    colors: [
      { name: "Alabaster Gold", value: "#EEDC82" },
      { name: "Onyx Charcoal", value: "#2D2D2D" }
    ],
    sizes: ["41mm", "45mm"],
    description: "A masterful convergence of horology and modern sensory metrics. Features a continuous LTPO crystal display set within a seamless bead-blasted ceramic and grade-5 titanium frame.",
    features: [
      "Continuous health and circadian tracking sensors",
      "Bespoke sculptural UI watchfaces that react to light",
      "Sapphire crystal display cover with anti-reflective finish",
      "Custom fast-charge dock carved in solid walnut wood"
    ],
    badge: "NEW ARRIVAL",
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    flashSale: true
  },
  {
    id: "furniture-1",
    name: "AURA Arch Lounge Chair",
    brand: "AURA Atrium",
    category: "Furniture",
    price: 1250,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 5.0,
    reviewCount: 36,
    stock: 4,
    colors: [
      { name: "Walnut & Bouclé", value: "#D2B48C" },
      { name: "Ash & Obsidian Wool", value: "#1C1917" }
    ],
    description: "Designed by Studio Atrium, the Arch Lounge Chair pairs solid bent walnut wood with premium textured Italian bouclé upholstery, carving a timeless architectural silhouette.",
    features: [
      "FSC-certified solid black walnut shell",
      "High-density ergonomic cold-pour foam comfort layer",
      "Hand-upholstered in high-grade Belgian bouclé yarn",
      "Hidden 360-degree silent ball-bearing swivel mechanism"
    ],
    badge: "DESIGN CLASSIC",
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    flashSale: false
  },
  {
    id: "accessory-1",
    name: "AURA Atelier Vachetta Wallet",
    brand: "AURA Atelier",
    category: "Accessories",
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1588444839799-beca81373619?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    reviewCount: 240,
    stock: 50,
    colors: [
      { name: "Natural Vachetta", value: "#C68E65" },
      { name: "Cognac Brown", value: "#8B5A2B" },
      { name: "Verdant Green", value: "#1E3F20" }
    ],
    description: "Handcrafted from vegetable-tanned French Vachetta leather that will develop an elegant amber patina unique to your touch and journey over the years.",
    features: [
      "Ultra-slim origami single-fold card arrangement",
      "Saddle-stitched by hand with waxed French linen thread",
      "Accommodates up to 8 cards plus unfolded bank notes",
      "Polished edge details with organic beeswax sealant"
    ],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    flashSale: false
  },
  {
    id: "decor-1",
    name: "AURA Travertine Brutalist Vase",
    brand: "AURA Atrium",
    category: "Home Decor",
    price: 210,
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.7,
    reviewCount: 62,
    stock: 15,
    colors: [
      { name: "Ivory Travertine", value: "#EDE6D6" }
    ],
    description: "Carved from a single block of raw travertine stone, this vase features rugged architectural ridges and beautiful organic voids created by geothermal activity.",
    features: [
      "100% natural, unpolished travertine marble block",
      "Waterproof interior sealant coat for fresh floral displays",
      "Brutalist geometric architecture with natural pitted details",
      "Weight: 3.8kg - incredibly sturdy and weighted base"
    ],
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    flashSale: false
  },
  {
    id: "apparel-1",
    name: "AURA Merino Wool Resort Knit",
    brand: "AURA Atelier",
    category: "Fashion",
    price: 245,
    images: [
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    reviewCount: 110,
    stock: 18,
    colors: [
      { name: "Oatmeal Cream", value: "#F5F2EB" },
      { name: "Forest Olive", value: "#3B4D3A" },
      { name: "Ink Obsidian", value: "#0F172A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Spun from ultra-fine 18.5-micron Australian merino wool with a relaxed open polo collar silhouette, designed to transcend seasons with effortless sophistication.",
    features: [
      "100% biodegradable and ethical merino wool fibers",
      "Naturally thermo-regulating, anti-microbial, and wrinkle-resistant",
      "Elegant ribbed collar and seamless visual shoulder seams",
      "Pre-washed to ensure lifelong structural softness and fit"
    ],
    badge: "BEST SELLER",
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    flashSale: false
  },
  {
    id: "sports-1",
    name: "AURA Kinetic Leather Dumbbells",
    brand: "AURA Kinetic",
    category: "Sports",
    price: 450,
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    reviewCount: 48,
    stock: 5,
    colors: [
      { name: "Walnut & Espresso", value: "#3B2F2F" }
    ],
    description: "Elevate your movement space. Crafted from rich walnut wood handles with hand-stitched premium calfskin leather grips and mirror-polished solid brass end-caps.",
    features: [
      "Includes two 5lb architectural hand-weights",
      "Hand-turned American black walnut wood core",
      "Hand-stitched leather casing absorbs ambient hand warmth",
      "Designed as sculpture to be displayed openly, not hidden away"
    ],
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    flashSale: true
  }
];

export const CATEGORIES = [
  { name: "Electronics", count: 24, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800" },
  { name: "Beauty", count: 18, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800" },
  { name: "Furniture", count: 12, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800" },
  { name: "Accessories", count: 32, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800" },
  { name: "Fashion", count: 45, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" },
  { name: "Home Decor", count: 15, image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800" },
  { name: "Sports", count: 9, image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800" }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Eleanor Sterling",
    rating: 5,
    comment: "The level of craftsmanship in the AURA headphones is absolute luxury. The active noise cancellation feels organic, and they look like sculptural art sitting on my desk.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    date: "June 24, 2026",
    verified: true,
    productName: "AURA Eclipse ANC Headphones"
  },
  {
    id: "r2",
    name: "Marcus Aurel",
    rating: 5,
    comment: "I have bought many lounge chairs over the years, but the bent walnut detail on the Arch Chair is supreme. It fits my posture beautifully and the bouclé is top-tier fabric.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    date: "May 18, 2026",
    verified: true,
    productName: "AURA Arch Lounge Chair"
  },
  {
    id: "r3",
    name: "Sienna Vance",
    rating: 4.8,
    comment: "The perfume is hypnotic. It starts with a crisp forest scent and settles into an amazing mineral stone finish. I've had five people ask what I'm wearing today.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    date: "July 02, 2026",
    verified: true,
    productName: "AURA Travertine No. 5 Perfume"
  },
  {
    id: "r4",
    name: "Liam Thorne",
    rating: 5,
    comment: "The Smartwatch was delivered in a solid, heavy box containing walnut elements. The watch face design is so clean, light miles ahead of standard smartwatch interfaces.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    date: "June 12, 2026",
    verified: true,
    productName: "AURA Horizon Smartwatch"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "How is AURA different from conventional e-commerce stores?",
    answer: "AURA is a design-centric atelier. We don't believe in mass-produced templates or products. Every piece in our curation is handcrafted in small batches, using responsibly sourced premium materials like titanium, certified FSC walnut, and Vachetta leather."
  },
  {
    question: "What is your shipping and dynamic delivery framework?",
    answer: "We provide complimentary secure climate-controlled express shipping worldwide on orders above $150. All products are nestled within premium custom sensory packaging to guarantee unboxing is as memorable as using the product itself."
  },
  {
    question: "Do your leather products develop a natural patina?",
    answer: "Yes, our natural French Vachetta leather is entirely vegetable-tanned without synthetic polymer coats. It absorbs oils from your skin and darkens into a stunning, golden-honey tone that becomes uniquely yours."
  },
  {
    question: "What is the warranty coverage on smart electronics?",
    answer: "All AURA electronics, including our Eclipse headphones and Horizon smartwatch, are backed by an extensive 3-year luxury concierge warranty covering mechanical, sensory, and electronic components."
  },
  {
    question: "Can I customize the sizing or finishes of furniture?",
    answer: "Absolutely. Our Studio Atrium offers custom wood stains, metal platings, and high-end fabric upholsteries. Please get in touch with our Premium Support team via the Contact section to initiate a custom commission."
  }
];

export const INSTAGRAM_POSTS = [
  { id: "p1", likes: "2.4k", comments: "128", url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800" },
  { id: "p2", likes: "1.8k", comments: "94", url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800" },
  { id: "p3", likes: "3.1k", comments: "165", url: "https://images.unsplash.com/photo-1449241713241-236c2536b1f0?auto=format&fit=crop&q=80&w=800" },
  { id: "p4", likes: "1.2k", comments: "52", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
  { id: "p5", likes: "2.7k", comments: "141", url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800" },
  { id: "p6", likes: "4.2k", comments: "210", url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" }
];
