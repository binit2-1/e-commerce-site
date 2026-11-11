import { z } from "zod";

export const MAX_QUANTITY = 10;
export const DELIVERY_FEE = 15;
/** Demo promo codes: code -> percent off the subtotal. */
export const PROMO_CODES: Record<string, number> = { SHOP20: 20 };

// ---- cart ----

export const cartItemInputSchema = z.object({
  productId: z.number().int().positive(),
  size: z.string().min(1).max(20),
  color: z.string().min(1).max(30),
  quantity: z.number().int().min(1).max(MAX_QUANTITY),
});
export const cartInputSchema = z.object({ items: z.array(cartItemInputSchema).max(50) });
export type CartItemInput = z.infer<typeof cartItemInputSchema>;

/** A cart line as the web app uses it (product details joined in). */
export interface CartLine extends CartItemInput {
  name: string;
  image: string;
  price: number;
}

// ---- totals (used by the cart page and by the server when placing an order) ----

const cents = (n: number) => Math.round(n * 100) / 100;

export function computeTotals(subtotalRaw: number, hasItems: boolean, promoCode: string | null) {
  const subtotal = cents(subtotalRaw);
  const discountPercent = promoCode ? (PROMO_CODES[promoCode] ?? 0) : 0;
  const discount = cents((subtotal * discountPercent) / 100);
  const delivery = hasItems ? DELIVERY_FEE : 0;
  return { subtotal, discountPercent, discount, delivery, total: cents(subtotal - discount + delivery) };
}

// ---- orders ----

export const checkoutSchema = z.object({
  shippingName: z.string().trim().min(1, "Name is required").max(100),
  shippingAddress: z.string().trim().min(5, "Enter your full address").max(300),
  promoCode: z.string().trim().toUpperCase().max(30).optional(),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export interface OrderSummary {
  order_id: number;
  status: string;
  total: number;
  item_count: number;
  created_at: string;
}

export interface OrderItem {
  product_id: number | null;
  name: string;
  image_url: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  order_id: number;
  status: string;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  promo_code: string | null;
  shipping_name: string;
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}
