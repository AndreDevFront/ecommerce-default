const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
}

export interface DashboardMetrics {
  metrics: {
    revenue: number;
    orders: number;
  };
  lowStockProducts: Product[];
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const response = await fetch(`${API_URL}/dashboard/metrics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar métricas do dashboard");
  }

  return await response.json();
}
