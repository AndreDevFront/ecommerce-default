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
  street: string;
  number: string;
  neighborhood: string;
  complement?: string | null;
  city: string;
  address: string;
  zipCode: string;
  state: string;
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
