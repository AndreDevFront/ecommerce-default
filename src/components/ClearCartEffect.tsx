"use client";

import { useCartStore } from "@/lib/store";
import { useEffect } from "react";

export function ClearCartEffect() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
