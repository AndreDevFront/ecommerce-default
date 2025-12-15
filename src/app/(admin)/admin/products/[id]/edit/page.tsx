"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ProductForm } from "@/components/products/product-form";
import { api } from "@/lib/api";
import { ProductDetailsResponse } from "@/types/product";

import styles from "./edit-product.module.css";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await api(`/products/${productId}`);
      if (!response.ok) throw new Error("Erro ao buscar");
      const json: ProductDetailsResponse = await response.json();
      return json.product;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="p-8 text-center text-red-500">
        Produto não encontrado.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para lista
        </Link>
      </div>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Editar Produto</h1>
          <p className={styles.subtitle}>
            Alterar informações de <strong>{product.name}</strong>.
          </p>
        </div>
      </div>

      <ProductForm initialData={product} />
    </div>
  );
}
