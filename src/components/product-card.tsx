"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/lib/store";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import styles from "./product-card.module.css";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
    <div className={styles.card}>
      <Link
        href={`/products/${product.slug}`}
        className={styles.imageContainer}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            className={styles.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Sem imagem
          </div>
        )}
      </Link>

      <div className={styles.content}>
        <Link href={`/products/${product.slug}`}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>

        <p className={styles.description}>{product.description}</p>
        <span className={styles.price}>{formatPrice(product.price)}</span>

        <div className={styles.footer}>
          <Button
            className={`w-full gap-2 rounded font-semibold transition-colors ${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-black text-white hover:bg-gray-800 cursor-pointer"
            }`}
            onClick={handleAddToCart}
            disabled={isDisabled}
          >
            <ShoppingCart className="h-4 w-4" />
            {isOutOfStock
              ? "Esgotado"
              : hasReachedLimit
              ? "Limite Atingido"
              : "Comprar agora"}
          </Button>
        </div>
      </div>
    </div>
  );
}
