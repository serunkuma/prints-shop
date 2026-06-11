import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  handle: string;
  title: string;
  artist: string;
  size: string;
  frame: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, frame: string) => void;
  updateQuantity: (productId: string, size: string, frame: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
};

function itemKey(item: Pick<CartItem, "productId" | "size" | "frame">) {
  return `${item.productId}-${item.size}-${item.frame}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const key = itemKey(item);
          const exists = state.items.find((current) => itemKey(current) === key);
          if (exists) {
            return {
              items: state.items.map((current) =>
                itemKey(current) === key
                  ? { ...current, quantity: current.quantity + item.quantity }
                  : current,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (productId, size, frame) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.size === size && item.frame === frame),
          ),
        })),
      updateQuantity: (productId, size, frame, quantity) =>
        set((state) => ({
          items:
            quantity === 0
              ? state.items.filter(
                  (item) => !(item.productId === productId && item.size === size && item.frame === frame),
                )
              : state.items.map((item) =>
                  item.productId === productId && item.size === size && item.frame === frame
                    ? { ...item, quantity }
                    : item,
                ),
        })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: "kumachi-cart" },
  ),
);
