import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartItem } from "../types/cart";

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<any>(null);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: CartItem) {
    setCart((prev) => [...prev, item]);
  }

  function removeFromCart(index:number) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
