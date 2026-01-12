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
