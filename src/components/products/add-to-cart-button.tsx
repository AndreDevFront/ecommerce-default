"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { items } = useCartStore();

  const isInCart = items.find((item) => item.id === product.id);
  const quantityInCart = isInCart ? isInCart.quantity : 0;

  const isOutOfStock = product.stock <= 0;
  const hasReachedLimit = quantityInCart >= product.stock;

  const isDisabled = isOutOfStock || hasReachedLimit;

  function handleAddToCart() {
    addToCart(product);
    toast.success("Adicionado ao carrinho!");
  }

  return (
    <Button
      size="lg"
      className={className}
      onClick={handleAddToCart}
      disabled={isDisabled}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {isOutOfStock
        ? "Esgotado"
        : hasReachedLimit
        ? "Limite Atingido"
        : "Adicionar ao Carrinho"}
    </Button>
  );
}
