"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ProductsResponse } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { formatPrice } from "@/lib/formatters";
import Image from "next/image";
import styles from "./products.module.css";

export default function ProductsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api("/products");
      const json: ProductsResponse = await response.json();
      return json.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api(`/products/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      toast.success("Produto excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Erro ao excluir produto.");
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Produtos</h1>
        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        {isLoading ? (
          <div className={styles.boxIsLoading}>
            <Loader2 className={styles.loader2} />
          </div>
        ) : isError ? (
          <div className="p-10 text-center text-red-500">
            Erro ao carregar produtos.
          </div>
        ) : (
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Imagem</th>
                <th className={styles.th}>Nome</th>
                <th className={styles.th}>Preço</th>
                <th className={`${styles.th} hidden md:table-cell`}>Estoque</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {data?.map((product) => (
                <tr key={product.id} className={styles.tr}>
                  <td className={styles.td}>
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        className={styles.productImage}
                        width={150}
                        height={150}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                        Sem foto
                      </div>
                    )}
                  </td>
                  <td className={styles.td}>
                    <span className={styles.productName}>{product.name}</span>
                  </td>
                  <td className={styles.td}>{formatPrice(product.price)}</td>
                  <td className={`${styles.td} hidden md:table-cell`}>
                    {product.stock} un.
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <button className={styles.editBtn}>
                          <Pencil className="h-4 w-4" />
                        </button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className={styles.deleteBtn}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Essa ação não pode ser desfeita. O produto{" "}
                              <strong>{product.name}</strong> será removido
                              permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(product.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
