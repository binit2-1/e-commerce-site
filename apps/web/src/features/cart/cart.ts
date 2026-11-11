export interface CartItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  promoCode: string | null;
}

export type CartAction =
  | { type: "add"; item: CartItem }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "applyPromo"; code: string }
  | { type: "clearPromo" }
  | { type: "clear" };

export const MAX_QUANTITY = 10;
export const DELIVERY_FEE = 15;
/** Demo promo codes: code -> percent off the subtotal. */
export const PROMO_CODES: Record<string, number> = { SHOP20: 20 };

export const initialCartState: CartState = { items: [], promoCode: null };

export const lineKey = (i: Pick<CartItem, "productId" | "size" | "color">) => `${i.productId}:${i.size}:${i.color}`;

const clampQty = (n: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.floor(n)));

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.item);
      const existing = state.items.find((i) => lineKey(i) === key);
      const items = existing
        ? state.items.map((i) =>
            lineKey(i) === key ? { ...i, quantity: clampQty(i.quantity + action.item.quantity) } : i,
          )
        : [...state.items, { ...action.item, quantity: clampQty(action.item.quantity) }];
      return { ...state, items };
    }
    case "setQuantity":
      return {
        ...state,
        items: state.items.map((i) => (lineKey(i) === action.key ? { ...i, quantity: clampQty(action.quantity) } : i)),
      };
    case "remove":
      return { ...state, items: state.items.filter((i) => lineKey(i) !== action.key) };
    case "applyPromo": {
      const code = action.code.trim().toUpperCase();
      return code in PROMO_CODES ? { ...state, promoCode: code } : state;
    }
    case "clearPromo":
      return { ...state, promoCode: null };
    case "clear":
      return initialCartState;
  }
}

const cents = (n: number) => Math.round(n * 100) / 100;

export function selectTotals(state: CartState) {
  const subtotal = cents(state.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  const discountPercent = state.promoCode ? (PROMO_CODES[state.promoCode] ?? 0) : 0;
  const discount = cents((subtotal * discountPercent) / 100);
  const delivery = state.items.length > 0 ? DELIVERY_FEE : 0;
  return { subtotal, discountPercent, discount, delivery, total: cents(subtotal - discount + delivery) };
}

export const selectCount = (state: CartState) => state.items.reduce((n, i) => n + i.quantity, 0);

// ---- persistence ----

const STORAGE_KEY = "shop.cart.v1";

function isItem(x: unknown): x is CartItem {
  if (typeof x !== "object" || x === null) return false;
  const i = x as Record<string, unknown>;
  return (
    typeof i.productId === "number" &&
    typeof i.name === "string" &&
    typeof i.image === "string" &&
    typeof i.price === "number" &&
    typeof i.size === "string" &&
    typeof i.color === "string" &&
    typeof i.quantity === "number"
  );
}

export function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialCartState;
    const parsed = JSON.parse(raw) as { items?: unknown; promoCode?: unknown };
    const items = Array.isArray(parsed.items) ? parsed.items.filter(isItem).map((i) => ({ ...i, quantity: clampQty(i.quantity) })) : [];
    const promoCode = typeof parsed.promoCode === "string" && parsed.promoCode in PROMO_CODES ? parsed.promoCode : null;
    return { items, promoCode };
  } catch {
    return initialCartState;
  }
}

export function saveCart(state: CartState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable (private mode, quota): keep working in memory */
  }
}
