import { describe, expect, it } from "vitest";
import { cartReducer, initialCartState, lineKey, selectCount, selectTotals, type CartItem } from "./cart";

const shirt: CartItem = { productId: 1, name: "Shirt", image: "x.png", price: 145, size: "Large", color: "White", quantity: 1 };
const jeans: CartItem = { productId: 2, name: "Jeans", image: "y.png", price: 240, size: "Large", color: "Blue", quantity: 1 };

describe("cartReducer", () => {
  it("merges identical product/size/color lines", () => {
    let s = cartReducer(initialCartState, { type: "add", item: shirt });
    s = cartReducer(s, { type: "add", item: { ...shirt, quantity: 2 } });
    expect(s.items).toHaveLength(1);
    expect(s.items[0]?.quantity).toBe(3);
  });

  it("keeps different sizes as separate lines", () => {
    let s = cartReducer(initialCartState, { type: "add", item: shirt });
    s = cartReducer(s, { type: "add", item: { ...shirt, size: "Small" } });
    expect(s.items).toHaveLength(2);
  });

  it("clamps quantity between 1 and 10", () => {
    let s = cartReducer(initialCartState, { type: "add", item: shirt });
    s = cartReducer(s, { type: "setQuantity", key: lineKey(shirt), quantity: 0 });
    expect(s.items[0]?.quantity).toBe(1);
    s = cartReducer(s, { type: "setQuantity", key: lineKey(shirt), quantity: 99 });
    expect(s.items[0]?.quantity).toBe(10);
  });

  it("removes a line", () => {
    let s = cartReducer(initialCartState, { type: "add", item: shirt });
    s = cartReducer(s, { type: "remove", key: lineKey(shirt) });
    expect(s.items).toEqual([]);
  });

  it("only accepts known promo codes (case-insensitive)", () => {
    expect(cartReducer(initialCartState, { type: "applyPromo", code: "nope" }).promoCode).toBeNull();
    expect(cartReducer(initialCartState, { type: "applyPromo", code: " shop20 " }).promoCode).toBe("SHOP20");
  });
});

describe("selectTotals", () => {
  it("is zero for an empty cart (no delivery fee)", () => {
    expect(selectTotals(initialCartState)).toEqual({ subtotal: 0, discountPercent: 0, discount: 0, delivery: 0, total: 0 });
  });

  it("matches the template example: subtotal, -20%, delivery", () => {
    const items = [{ ...shirt }, { ...jeans }, { ...shirt, productId: 3, price: 180 }];
    const t = selectTotals({ items, promoCode: "SHOP20" });
    expect(t).toEqual({ subtotal: 565, discountPercent: 20, discount: 113, delivery: 15, total: 467 });
  });

  it("multiplies by quantity and counts items", () => {
    const state = { items: [{ ...shirt, quantity: 2 }, jeans], promoCode: null };
    expect(selectTotals(state).subtotal).toBe(530);
    expect(selectCount(state)).toBe(3);
  });
});
