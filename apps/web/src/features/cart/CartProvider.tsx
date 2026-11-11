import type { CartItemInput } from "@shop/shared";
import { useCallback, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import { apiSend } from "../../lib/api-client";
import { useAuth } from "../auth/useAuth";
import { PROMO_CODES, cartReducer, loadCart, saveCart, selectCount, selectTotals, type CartItem } from "./cart";
import { CartContext, type CartContextValue } from "./cartContext";

const toInput = (i: CartItem): CartItemInput => ({
  productId: i.productId,
  size: i.size,
  color: i.color,
  quantity: i.quantity,
});

/**
 * The cart always lives in the browser (localStorage). When someone is logged in it is also
 * mirrored to the server: on login the guest cart is merged into the saved one, afterwards
 * every change is pushed (debounced).
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  const latest = useRef(state);
  const syncedUser = useRef<number | null>(null); // user whose saved cart has been merged in
  useEffect(() => {
    latest.current = state;
    saveCart(state);
  }, [state]);

  // Login / logout
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (syncedUser.current !== null) dispatch({ type: "clear" }); // just logged out: don't leave their cart behind
      syncedUser.current = null;
      return;
    }
    if (syncedUser.current === user.user_id) return;

    let cancelled = false;
    apiSend<{ items: CartItem[] }>("POST", "/api/cart/merge", { items: latest.current.items.map(toInput) })
      .then((saved) => {
        if (cancelled) return;
        syncedUser.current = user.user_id;
        dispatch({ type: "replace", items: saved.items });
      })
      .catch(() => {
        /* offline / server error: keep the local cart, retry on next login */
      });
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  // Push changes while logged in
  useEffect(() => {
    if (!user || syncedUser.current !== user.user_id) return;
    const timer = setTimeout(() => {
      apiSend("PUT", "/api/cart", { items: state.items.map(toInput) }).catch(() => {});
    }, 400);
    return () => clearTimeout(timer);
  }, [state.items, user]);

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
  /** Save the cart to the server right now (used before placing an order). */
  const syncNow = useCallback(async () => {
    await apiSend("PUT", "/api/cart", { items: latest.current.items.map(toInput) });
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
      syncNow,
    }),
    [state, addItem, setQuantity, removeItem, applyPromo, clearPromo, clear, syncNow],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
