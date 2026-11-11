import { PROMO_CODES, checkoutSchema, computeTotals } from "@shop/shared";
import type { Request, Response } from "express";
import { pool } from "../db.js";

export async function createOrder(req: Request, res: Response) {
  const { shippingName, shippingAddress, promoCode } = checkoutSchema.parse(req.body);
  if (promoCode && !(promoCode in PROMO_CODES)) {
    res.status(400).json({ error: "That promo code isn't valid" });
    return;
  }

  const db = await pool.connect();
  try {
    await db.query("BEGIN");

    // Prices come from the products table, never from the browser.
    const { rows: lines } = await db.query(
      `SELECT c.product_id, p.name, p.image_url, p.price::float8 AS price, c.size, c.color, c.quantity
       FROM cart_items c JOIN products p USING (product_id) WHERE c.user_id = $1`,
      [req.userId],
    );
    if (lines.length === 0) {
      await db.query("ROLLBACK");
      res.status(400).json({ error: "Your cart is empty" });
      return;
    }

    const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    const t = computeTotals(subtotal, true, promoCode ?? null);

    const { rows } = await db.query(
      `INSERT INTO orders (user_id, subtotal, discount, delivery, total, promo_code, shipping_name, shipping_address)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING order_id`,
      [req.userId, t.subtotal, t.discount, t.delivery, t.total, promoCode ?? null, shippingName, shippingAddress],
    );
    const orderId: number = rows[0].order_id;

    for (const l of lines) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, name, image_url, price, size, color, quantity)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [orderId, l.product_id, l.name, l.image_url, l.price, l.size, l.color, l.quantity],
      );
    }
    await db.query("DELETE FROM cart_items WHERE user_id = $1", [req.userId]);

    await db.query("COMMIT");
    res.status(201).json({ order_id: orderId });
  } catch (err) {
    await db.query("ROLLBACK");
    throw err;
  } finally {
    db.release();
  }
}

export async function listOrders(req: Request, res: Response) {
  const { rows } = await pool.query(
    `SELECT o.order_id, o.status, o.total::float8 AS total, o.created_at,
            COALESCE((SELECT sum(quantity) FROM order_items i WHERE i.order_id = o.order_id), 0)::int AS item_count
     FROM orders o WHERE o.user_id = $1 ORDER BY o.created_at DESC, o.order_id DESC`,
    [req.userId],
  );
  res.json(rows);
}

export async function getOrder(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  // user_id is part of the WHERE, so other people's orders look like they don't exist.
  const order = await pool.query(
    `SELECT order_id, status, subtotal::float8 AS subtotal, discount::float8 AS discount, delivery::float8 AS delivery,
            total::float8 AS total, promo_code, shipping_name, shipping_address, created_at
     FROM orders WHERE order_id = $1 AND user_id = $2`,
    [id, req.userId],
  );
  if (!order.rows[0]) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  const items = await pool.query(
    `SELECT product_id, name, image_url, price::float8 AS price, size, color, quantity
     FROM order_items WHERE order_id = $1 ORDER BY item_id`,
    [id],
  );
  res.json({ ...order.rows[0], items: items.rows });
}
