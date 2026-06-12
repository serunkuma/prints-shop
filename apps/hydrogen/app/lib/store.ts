import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface UIState {
  cartOpen: boolean;
  mobileMenuOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      cartOpen: false,
      mobileMenuOpen: false,
      setCartOpen: (open) => set({cartOpen: open}),
      toggleCart: () => set((s) => ({cartOpen: !s.cartOpen})),
      setMobileMenuOpen: (open) => set({mobileMenuOpen: open}),
      toggleMobileMenu: () => set((s) => ({mobileMenuOpen: !s.mobileMenuOpen})),
    }),
    {name: 'kumachi-ui'},
  ),
);
