"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
};

export type WishlistItem = {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
};

type CartState = {
  items: CartLine[];
  wishlist: WishlistItem[];
  isCartOpen: boolean;
  isMobileNavOpen: boolean;
  addItem: (item: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: number, color?: string, size?: string) => void;
  updateQuantity: (
    productId: number,
    quantity: number,
    color?: string,
    size?: string
  ) => void;
  clearCart: () => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (productId: number) => boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  itemCount: () => number;
  subtotal: () => number;
};

function lineKey(productId: number, color?: string, size?: string) {
  return `${productId}::${color ?? ""}::${size ?? ""}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      isCartOpen: false,
      isMobileNavOpen: false,

      addItem: (item) => {
        const qty = item.quantity ?? 1;
        set((state) => {
          const key = lineKey(item.productId, item.color, item.size);
          const existing = state.items.find(
            (i) => lineKey(i.productId, i.color, i.size) === key
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                lineKey(i.productId, i.color, i.size) === key
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
              isCartOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, quantity: qty }],
            isCartOpen: true,
          };
        });
      },

      removeItem: (productId, color, size) => {
        const key = lineKey(productId, color, size);
        set((state) => ({
          items: state.items.filter(
            (i) => lineKey(i.productId, i.color, i.size) !== key
          ),
        }));
      },

      updateQuantity: (productId, quantity, color, size) => {
        const key = lineKey(productId, color, size);
        if (quantity <= 0) {
          get().removeItem(productId, color, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            lineKey(i.productId, i.color, i.size) === key
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleWishlist: (item) => {
        set((state) => {
          const exists = state.wishlist.some(
            (w) => w.productId === item.productId
          );
          return {
            wishlist: exists
              ? state.wishlist.filter((w) => w.productId !== item.productId)
              : [...state.wishlist, item],
          };
        });
      },

      isInWishlist: (productId) =>
        get().wishlist.some((w) => w.productId === productId),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
      openMobileNav: () => set({ isMobileNavOpen: true }),
      closeMobileNav: () => set({ isMobileNavOpen: false }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "haa-cart-v1",
      partialize: (state) => ({
        items: state.items,
        wishlist: state.wishlist,
      }),
    }
  )
);
