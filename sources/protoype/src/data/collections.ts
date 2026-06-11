import type { Collection } from "@/lib/types";
import { products } from "./products";

export const collections: Collection[] = [
  {
    id: "featured",
    handle: "featured",
    title: "Featured Prints",
    description: "Our curators' selection of standout pieces across genres and regions.",
    image: "/images/hero-lion-print.jpg",
    productCount: 6,
    products: products.slice(0, 6),
  },
  {
    id: "new-arrivals",
    handle: "new-arrivals",
    title: "New Arrivals",
    description: "Fresh from the studio — the latest additions to our collection.",
    image: "/images/hero-figures-print.jpg",
    productCount: 4,
    products: products.filter((p) => p.tags.includes("New")),
  },
  {
    id: "sale",
    handle: "sale",
    title: "Sale",
    description: "Limited-time pricing on selected prints.",
    image: "/images/collection-print-02.jpg",
    productCount: 1,
    products: products.filter((p) => p.tags.includes("Sale")),
  },
  {
    id: "all",
    handle: "all",
    title: "All Prints",
    description: "The complete Kumachi Prints catalog.",
    image: "/images/hero-lion-print.jpg",
    productCount: products.length,
    products,
  },
];

export const getCollectionByHandle = (handle: string): Collection | undefined =>
  collections.find((c) => c.handle === handle);
