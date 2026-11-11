import { createContext } from "react";
import type { CartItem, CartState } from "./cart";

export interface CartContextValue {
  state: CartState;
  count: number;
  totals: { subtotal: number; discountPercent: number; discount: number; delivery: number; total: number };
  addItem: (item: CartItem) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  /** Returns false when the code is unknown. */
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  clear: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
