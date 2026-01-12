"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  Loader2,
  LogOut,
  MapPin,
  Package,
  QrCode,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { formatPrice } from "@/lib/formatters";
import { AdminOrder } from "@/types/admin-types";
import { toast } from "sonner";
import styles from "./page.module.css";

const STATUS_MAP: Record<string, string> = {
  PENDING: "Pendente",
  PAID: "Pago",
  CANCELED: "Cancelado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
};

interface OrdersResponse {
  data: AdminOrder[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

async function getOrders(page: number): Promise<OrdersResponse> {
  const { "velas-token": token } = parseCookies();

  if (!token) throw new Error("Unauthorized");

  const response = await api(`/orders?page=${page}&perPage=10`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Unauthorized");
    toast.error("Erro ao buscar pedidos");
    throw new Error("Erro ao buscar pedidos");
  }

  return response.json();
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-orders", page],
    queryFn: () => getOrders(page),
    retry: false,
  });

  const orders = data?.data || [];
  const meta = data?.meta;

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

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PAID":
        return styles.statusPAID;
      case "PENDING":
        return styles.statusPENDING;
      case "CANCELED":
        return styles.statusCANCELED;
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-red-500 font-medium">
          {error instanceof Error ? error.message : "Erro desconhecido"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm underline text-gray-500"
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
        <div className={styles.headerActions}>
          <span className={styles.totalCount}>
            Total: <strong>{meta?.total || 0}</strong>
          </span>
          <button onClick={() => logout()} className={styles.btnLogout}>
            Sair <LogOut size={14} />
          </button>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <div className="overflow-x-auto">
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>ID / Data</th>
                <th className={styles.th}>Cliente</th>
                <th className={styles.th}>Itens</th>
                <th className={styles.th}>Pagamento</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Total</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className={styles.row}>
                    <td className={styles.cell}>
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs bg-gray-100 p-1 rounded w-fit text-gray-600 border border-gray-200">
                          #{order.id.slice(0, 8)}
                        </span>
                        <span className={styles.date}>
                          {new Date(order.createdAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
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
                      </div>
                    </td>

                    <td className={styles.cell}>
                      <div className={styles.itemsList}>
                        {order.items.map((item) => (
                          <div key={item.id} className={styles.itemRow}>
                            <span className="font-bold mr-1">
                              {item.quantity}x
                            </span>{" "}
                            {item.productName}
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className={styles.cell}>
                      <div
                        className={`${styles.paymentBadge} ${
                          order.paymentMethod === "pix"
                            ? "border-emerald-200 text-emerald-700"
                            : "border-blue-200 text-blue-700"
                        }`}
                      >
                        {order.paymentMethod === "pix" ? (
                          <>
                            <QrCode size={14} />
                            <span>PIX</span>
                          </>
                        ) : (
                          <>
                            <CreditCard size={14} />
                            <span>Cartão</span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className={styles.cell}>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {STATUS_MAP[order.status] || order.status}{" "}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      <span className={styles.total}>
                        {formatPrice(order.total)}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className={styles.btnView}
                      >
                        <Eye size={14} /> Ver
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Página <span className="font-medium text-gray-900">{page}</span> de{" "}
            <span className="font-medium text-gray-900">
              {meta?.totalPages || 1}
            </span>
          </div>
          <div className={styles.paginationButtons}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
              className={styles.btnNav}
            >
              <ChevronLeft size={16} /> Anterior
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!meta || page >= meta.totalPages || isLoading}
              className={styles.btnNav}
            >
              Próximo <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Detalhes do Pedido #{selectedOrder.id.slice(0, 8)}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className={styles.btnClose}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailSection}>
                <div className={styles.detailTitle}>
                  <MapPin size={14} /> Endereço de Entrega
                </div>
                <div className={styles.detailCard}>
                  <p>
                    <strong>Endereço:</strong> {selectedOrder.customer.street}
                  </p>

                  {selectedOrder.customer.neighborhood && (
                    <p>
                      <strong>Bairro:</strong>{" "}
                      {selectedOrder.customer.neighborhood}
                    </p>
                  )}

                  <p>
                    <strong>Cidade:</strong> {selectedOrder.customer.city}{" "}
                    {selectedOrder.customer.state &&
                      `- ${selectedOrder.customer.state}`}
                  </p>
                  <p>
                    <strong>CEP:</strong> {selectedOrder.customer.zipCode}
                  </p>
                </div>
              </div>

              <div className={styles.detailSection}>
                <div className={styles.detailTitle}>
                  <Package size={14} /> Resumo
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.detailRow}>
                    <span>Status</span>
                    <span className="font-medium">
                      {STATUS_MAP[selectedOrder.status] || selectedOrder.status}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Método</span>
                    <span className="uppercase">
                      {selectedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total Pago</span>
                    <span className="font-bold text-green-700 text-lg">
                      {formatPrice(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
