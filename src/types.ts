export interface ColorVariant {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[]; // [primary_image, hover_image]
  rating: number;
  reviewCount: number;
  stock: number;
  colors: ColorVariant[];
  sizes?: string[];
  description: string;
  features: string[];
  badge?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  flashSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ColorVariant;
  selectedSize?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  verified: boolean;
  productName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
