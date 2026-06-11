import { create } from "zustand";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  material: string;
  frame: string;
}

interface AppState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;

  cartItems: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  cartCount: () => number;
  cartSubtotal: () => number;

  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  theme: "light",
  toggleTheme: () =>
    set((state: AppState) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      return { theme: newTheme };
    }),
  setTheme: (theme: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },

  cartItems: [],
  cartOpen: false,
  setCartOpen: (open: boolean) => set({ cartOpen: open }),
  addToCart: (item: CartItem) =>
    set((state: AppState) => ({ cartItems: [...state.cartItems, item] })),
  removeFromCart: (index: number) =>
    set((state: AppState) => ({
      cartItems: state.cartItems.filter((_: CartItem, i: number) => i !== index),
    })),
  updateQuantity: (index: number, quantity: number) =>
    set((state: AppState) => ({
      cartItems: state.cartItems.map((item: CartItem, i: number) =>
        i === index ? { ...item, quantity } : item
      ),
    })),
  cartCount: () => get().cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
  cartSubtotal: () =>
    get().cartItems.reduce(
      (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
      0
    ),

  mobileMenuOpen: false,
  setMobileMenuOpen: (open: boolean) => set({ mobileMenuOpen: open }),
}));
