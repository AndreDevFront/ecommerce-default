export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  attributes: Record<string, string>;
  imageUrl: string | null;
  createdAt: string;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductDetailsResponse {
  product: Product;
}
