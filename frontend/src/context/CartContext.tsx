import { createContext } from "react";
import type { CartItem } from "../types/cart.types";
import type { Product } from "../types/product.types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | null>(null);