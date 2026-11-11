import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { PROMO_CODES, cartReducer, loadCart, saveCart, selectCount, selectTotals, type CartItem } from "./cart";
import { CartContext, type CartContextValue } from "./cartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => saveCart(state), [state]);

  const addItem = useCallback((item: CartItem) => dispatch({ type: "add", item }), []);
  const setQuantity = useCallback((key: string, quantity: number) => dispatch({ type: "setQuantity", key, quantity }), []);
  const removeItem = useCallback((key: string) => dispatch({ type: "remove", key }), []);
  const clearPromo = useCallback(() => dispatch({ type: "clearPromo" }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const applyPromo = useCallback((code: string) => {
    const valid = code.trim().toUpperCase() in PROMO_CODES;
    if (valid) dispatch({ type: "applyPromo", code });
    return valid;
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      count: selectCount(state),
      totals: selectTotals(state),
      addItem,
      setQuantity,
      removeItem,
      applyPromo,
      clearPromo,
      clear,
    }),
    [state, addItem, setQuantity, removeItem, applyPromo, clearPromo, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
