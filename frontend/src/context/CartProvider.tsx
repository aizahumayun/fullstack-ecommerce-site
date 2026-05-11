import { useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../types/cart.types";
import type { Product } from "../types/product.types";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add item to cart or update quantity if it already exists
  const addToCart = (product: Product) => {
    const existing = cartItems.find(
      (item) => item.productId._id === product._id
    );

    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }

    setCartItems((prev) => [
      ...prev,
      { productId: product, quantity: 1, size: product.size },
    ]);
  };

  // Remove item from cart

  const removeFromCart = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.productId._id !== productId)
    );
  };
  // Calculate total price of items in cart
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );
  // Provide cart state and actions to children components
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};