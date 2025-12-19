export interface AdminOrderItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface AdminCustomer {
  name: string;
  email: string;
  city: string;
  address: string;
  zipCode: string;
}

export interface AdminOrder {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  customer: AdminCustomer;
  items: AdminOrderItem[];
  paymentMethod: "card" | "pix";
}
