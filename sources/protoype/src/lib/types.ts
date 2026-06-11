export interface Product {
  id: string;
  handle: string;
  title: string;
  artist: string;
  artistId: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images: string[];
  roomMockups: string[];
  description: string;
  colors: string[];
  region: string;
  genre: string;
  sizes: string[];
  materials: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  sku: string;
  variantId?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  title: string;
  price: number;
  size: string;
  material: string;
  frame: string;
  available: boolean;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
  productCount: number;
  products: Product[];
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  location: string;
  bio: string;
  portrait: string;
  printCount: number;
  instagram?: string;
  website?: string;
}

export interface SeriesDrop {
  id: string;
  handle: string;
  title: string;
  heroImage: string;
  publishDate: string;
  status: "draft" | "scheduled" | "live" | "archived";
  description: string;
  artistId?: string;
  collectionHandle?: string;
  featuredProductIds: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  material: string;
  frame: string;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}
