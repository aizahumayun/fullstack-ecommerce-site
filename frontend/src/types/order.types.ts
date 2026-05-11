import type { Product } from "./product.types";

export interface OrderItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface Order {
  _id: string;
  customerName: string;
  email: string;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  items: OrderItem[];
  createdAt: string;
}