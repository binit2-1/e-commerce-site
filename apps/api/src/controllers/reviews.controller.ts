import { productIdSchema, reviewInputSchema } from "@shop/shared";
import type { Request, Response } from "express";
import { pool } from "../db.js";

export async function createReview(req: Request, res: Response) {
  const productId = productIdSchema.parse(req.params.id);
  const { rating, body } = reviewInputSchema.parse(req.body);

  const product = await pool.query("SELECT 1 FROM products WHERE product_id = $1", [productId]);
  if (!product.rowCount) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO reviews (product_id, user_id, author, rating, body)
       SELECT $1, user_id, name, $3, $4 FROM users WHERE user_id = $2
       RETURNING review_id, product_id, author, rating, body, created_at`,
      [productId, req.userId, rating, body],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      res.status(409).json({ error: "You have already reviewed this product" });
      return;
    }
    throw err;
  }
}
