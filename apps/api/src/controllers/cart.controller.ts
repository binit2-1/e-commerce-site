import { cartInputSchema, type CartItemInput } from "@shop/shared";
import type { Request, Response } from "express";
import type { PoolClient } from "pg";
import { pool } from "../db.js";

const CART_SQL = `
  SELECT c.product_id AS "productId", p.name, p.image_url AS image, p.price::float8 AS price,
         c.size, c.color, c.quantity
  FROM cart_items c JOIN products p USING (product_id)
  WHERE c.user_id = $1 ORDER BY c.added_at, p.name`;

const readCart = async (userId: number, db: Pick<PoolClient, "query"> = pool) =>
  (await db.query(CART_SQL, [userId])).rows;

async function upsert(db: PoolClient, userId: number, items: CartItemInput[], onConflict: string) {
  for (const i of items) {
    await db.query(
      `INSERT INTO cart_items (user_id, product_id, size, color, quantity) VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, product_id, size, color) DO UPDATE SET quantity = ${onConflict}`,
      [userId, i.productId, i.size, i.color, i.quantity],
    );
  }
}

async function inTransaction<T>(fn: (db: PoolClient) => Promise<T>): Promise<T> {
  const db = await pool.connect();
  try {
    await db.query("BEGIN");
    const result = await fn(db);
    await db.query("COMMIT");
    return result;
  } catch (err) {
    await db.query("ROLLBACK");
    throw err;
  } finally {
    db.release();
  }
}

export async function getCart(req: Request, res: Response) {
  res.json({ items: await readCart(req.userId!) });
}

/** Replace the saved cart with exactly these items. */
export async function putCart(req: Request, res: Response) {
  const { items } = cartInputSchema.parse(req.body);
  const saved = await inTransaction(async (db) => {
    await db.query("DELETE FROM cart_items WHERE user_id = $1", [req.userId]);
    await upsert(db, req.userId!, items, "EXCLUDED.quantity");
    return readCart(req.userId!, db);
  });
  res.json({ items: saved });
}

/** Add a guest cart to the saved one (keeps the larger quantity so repeating it is harmless). */
export async function mergeCart(req: Request, res: Response) {
  const { items } = cartInputSchema.parse(req.body);
  const saved = await inTransaction(async (db) => {
    await upsert(db, req.userId!, items, "GREATEST(cart_items.quantity, EXCLUDED.quantity)");
    return readCart(req.userId!, db);
  });
  res.json({ items: saved });
}
