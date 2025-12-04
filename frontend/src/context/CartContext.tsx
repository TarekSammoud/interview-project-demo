import { createContext, useContext, useState, type ReactNode } from "react";

interface Produit {
  id: number
}

interface Garniture {
  id: number
}

interface CartItem {
  produit: Produit;
  garnitures?: Garniture[];
}

interface CartContextType {
  items: CartItem[];
  garnitures: Garniture[];
  addItem: (item: CartItem) => void;
  removeItem: (produitId: number) => void;
  addGarniture: (garniture: Garniture) => void;
  removeGarniture: (garnitureId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [garnitures, setGarnitures] = useState<Garniture[]>([]);

  const addItem = (item: CartItem) => setItems(prev => [...prev, item]);
  const removeItem = (produitId: number) =>
    setItems(prev => prev.filter(i => i.produit.id !== produitId));

  const addGarniture = (garniture: Garniture) => setGarnitures(prev => [...prev, garniture]);
  const removeGarniture = (garnitureId: number) =>
    setGarnitures(prev => prev.filter(e => e.id !== garnitureId));

  const clearCart = () => {
    setItems([]);
    setGarnitures([]);
  };

  return (
    <CartContext.Provider value={{ items, garnitures, addItem, removeItem, addGarniture, removeGarniture, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
