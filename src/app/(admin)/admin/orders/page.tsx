"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";

import { api } from "@/lib/api";
import { formatPrice } from "@/lib/formatters";
import { AdminOrder } from "@/types/admin-types";
import { CreditCard, QrCode } from "lucide-react";
import { toast } from "sonner";
import styles from "./page.module.css";

async function getOrders(): Promise<AdminOrder[]> {
  const { "velas-token": token } = parseCookies();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await api("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    toast.error("Erro ao buscar pedidos");
    throw new Error("Erro ao buscar pedidos");
  }

  const data = await response.json();
  return data.orders;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getOrders,
    retry: false,
  });

  //logout
  function logout() {
    document.cookie = "velas-token=; path=/; max-age=0;";
    router.push("/login");
  }

  useEffect(() => {
    if (isError) {
      if (error instanceof Error && error.message === "Unauthorized") {
        router.push("/login");
      }
    }
  }, [isError, error, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-medium">
          {error instanceof Error ? error.message : "Erro desconhecido"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm underline text-gray-500 hover:text-gray-800"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Gerenciamento de Pedidos</h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-500">
            Total: <strong>{orders.length}</strong> pedidos
          </span>
          <button
            onClick={() => logout()}
            className="text-xs text-red-500 hover:underline"
          >
            Sair
          </button>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>ID / Data</th>
              <th className={styles.th}>Cliente</th>
              <th className={styles.th}>Itens</th>
              <th className={styles.th}>Pagamento</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  Nenhum pedido encontrado.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className={styles.row}>
                  <td className={styles.cell}>
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs bg-gray-100 p-1 rounded w-fit">
                        #{order.id.slice(0, 8)}
                      </span>
                      <span className={styles.date}>
                        {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>

                  <td className={styles.cell}>
                    <div className={styles.customerInfo}>
                      <span className={styles.customerName}>
                        {order.customer.name}
                      </span>
                      <span className={styles.customerEmail}>
                        {order.customer.email}
                      </span>
                      <span className="text-xs text-slate-700 mt-1 clear-both block">
                        {order.customer.city}
                      </span>
                    </div>
                  </td>

                  <td className={styles.cell}>
                    <div className={styles.itemsList}>
                      {order.items.map((item) => (
                        <div key={item.id} className={styles.itemRow}>
                          {item.quantity}x {item.productName}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className={styles.cell}>
                    <div className={styles.paymentBadge}>
                      {order.paymentMethod === "pix" ? (
                        <>
                          <QrCode size={14} className="text-emerald-400" />
                          <span>PIX</span>
                        </>
                      ) : (
                        <>
                          <CreditCard size={14} className="text-blue-400" />
                          <span>Cartão</span>
                        </>
                      )}
                    </div>
                  </td>

                  <td className={styles.cell}>
                    <span className={styles.statusBadge}>{order.status}</span>
                  </td>

                  <td className={styles.cell}>
                    <span className={styles.total}>
                      {formatPrice(order.total)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
