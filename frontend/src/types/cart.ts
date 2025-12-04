import type { Garniture } from "./garniture";
import type { Produit } from "./produit";

export interface CartItem {
  produit: Produit;
  garnitures: Garniture[];

}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}