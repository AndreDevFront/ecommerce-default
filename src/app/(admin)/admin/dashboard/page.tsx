"use client";

import { formatPrice } from "@/lib/formatters";
import { getDashboardMetrics } from "@/services/dashboard";
import {
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: getDashboardMetrics,
    refetchInterval: 1000 * 60,
  });

  if (isLoading) {
    return (
      <div className={styles.boxIsLoading}>
        <Loader2 className={styles.loader2} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          Erro ao carregar os dados. Verifique se o backend está rodando.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Visão Geral</h1>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Faturamento Total</span>
            <div className={`${styles.iconContainer} ${styles.iconGreen}`}>
              <CurrencyDollarIcon className="h-6 w-6" />
            </div>
          </div>
          <p className={styles.cardValue}>
            {formatPrice(data.metrics.revenue)}
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Vendas Realizadas</span>
            <div className={`${styles.iconContainer} ${styles.iconBlue}`}>
              <ShoppingBagIcon className="h-6 w-6" />
            </div>
          </div>
          <p className={styles.cardValue}>{data.metrics.orders}</p>
        </div>
      </div>

      <div>
        <h2 className={styles.sectionTitle}>
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
          Alerta de Estoque Baixo
        </h2>

        <div className={styles.tableCard}>
          <div className={styles.tableWrapper}>
            {data.lowStockProducts.length === 0 ? (
              <div className="p-6 text-gray-500 text-center">
                Tudo certo! Nenhum produto com estoque crítico. 👏
              </div>
            ) : (
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.th}>Produto</th>
                    <th className={`${styles.th} text-right`}>Preço</th>
                    <th className={`${styles.th} text-center`}>Estoque</th>
                    <th className={`${styles.th} text-center`}>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.lowStockProducts.map((product) => (
                    <tr key={product.id} className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.productName}>
                          {product.name}
                        </span>
                      </td>
                      <td className={`${styles.td} text-right`}>
                        {formatPrice(product.price)}
                      </td>
                      <td className={`${styles.td} text-center`}>
                        <span className={styles.stockCritical}>
                          {product.stock} un
                        </span>
                      </td>
                      <td className={`${styles.td} text-center`}>
                        <span className={styles.badge}>Crítico</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
