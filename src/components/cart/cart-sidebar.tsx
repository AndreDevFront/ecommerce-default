"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store";

import { formatPrice } from "@/lib/formatters";
import styles from "./cart-sidebar.module.css";

import Link from "next/link";
import { cn } from "../../../lib/utils";

export function CartSidebar() {
  const { items, removeFromCart, updateQuantity, total } = useCartStore();
  const formattedTotal = formatPrice(total());

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle>Seu Carrinho ({items.length})</SheetTitle>
        </SheetHeader>
        <SheetDescription className="sr-only">
          Revise os itens selecionados antes de finalizar a compra.
        </SheetDescription>

        <ScrollArea className="flex-1 -mr-4 pr-4">
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag className={styles.emptyIcon} />
              <p className={styles.emptyText}>Seu carrinho está vazio.</p>
              <SheetTrigger asChild>
                <Button variant="link">Começar a comprar</Button>
              </SheetTrigger>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.imageContainer}>
                    {item.imageUrl && (
                      <a
                        href={`/products/${item.slug}`}
                        title={item.name}
                        className={styles.imageLink}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className={styles.image}
                          sizes="80px"
                          priority
                        />
                      </a>
                    )}
                  </div>

                  <div className={styles.itemDetails}>
                    <div className={styles.itemHeader}>
                      <span className={styles.itemTitle}>{item.name}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={styles.removeButton}
                        title="Remover item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className={styles.itemFooter}>
                      <div className={styles.quantityControls}>
                        <button
                          onClick={() => updateQuantity(item.id, "decrease")}
                          className={styles.quantityBtn}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className={styles.quantityValue}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, "increase")}
                          className={styles.quantityBtn}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className={styles.price}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>{formattedTotal}</span>
            </div>

            <SheetClose asChild>
              <Link
                href="/checkout"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  styles.checkoutBtn
                )}
              >
                Finalizar Compra
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
