import type { Product } from "./product.types";

export interface CartItem {
    productId: Product;
    quantity: number;
    size: string;
}

export interface Cart {
    _id?: string;
    customer: string;
    items: CartItem[];
    totalPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
}