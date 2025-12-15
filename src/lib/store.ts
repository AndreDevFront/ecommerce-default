import { Product } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, action: "increase" | "decrease") => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const items = get().items;
        const productExists = items.find((item) => item.id === product.id);

        if (productExists) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId, action) => {
        const items = get().items;
        set({
          items: items.map((item) => {
            if (item.id === productId) {
              const newQuantity =
                action === "increase" ? item.quantity + 1 : item.quantity - 1;

              return { ...item, quantity: Math.max(1, newQuantity) };
            }
            return item;
          }),
        });
      },

      clearCart: () => set({ items: [] }),

      total: () => {
        return get().items.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
      },
    }),
    {
      name: "velas-cart-storage",
    }
  )
);
