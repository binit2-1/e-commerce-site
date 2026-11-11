import { productIdSchema, productQuerySchema, reviewQuerySchema, type ProductQuery, type ReviewQuery } from "@shop/shared";
import type { Request, Response } from "express";
import { pool } from "../db.js";

// numeric columns come back from pg as strings, so cast them to numbers in SQL.
const CARD = `product_id, name, price::float8 AS price, old_price::float8 AS old_price,
  image_url, rating::float8 AS rating, type, style, created_at`;
const DETAIL = `${CARD}, description, colors, sizes, images`;

const PRODUCT_ORDER: Record<ProductQuery["sort"], string> = {
  popular: "rating DESC, product_id",
  newest: "created_at DESC, product_id DESC",
  price_asc: "price, product_id",
  price_desc: "price DESC, product_id",
};

const REVIEW_ORDER: Record<ReviewQuery["sort"], string> = {
  latest: "created_at DESC, review_id DESC",
  oldest: "created_at, review_id",
  rating: "rating DESC, created_at DESC",
};

export async function getProducts(req: Request, res: Response) {
  const q = productQuerySchema.parse(req.query);

  // Build "WHERE a = $1 AND b >= $2 ..." with matching params.
  const where: string[] = [];
  const params: unknown[] = [];
  const add = (sql: string, value: unknown) => {
    params.push(value);
    where.push(sql.replace("?", `$${params.length}`));
  };
  if (q.q) add("position(lower(?) in lower(name)) > 0", q.q);
  if (q.type) add("type = ?", q.type);
  if (q.style) add("style = ?", q.style);
  if (q.minPrice !== undefined) add("price >= ?", q.minPrice);
  if (q.maxPrice !== undefined) add("price <= ?", q.maxPrice);
  if (q.colors.length) add("EXISTS (SELECT 1 FROM jsonb_array_elements(colors) c WHERE c->>'name' = ANY(?::text[]))", q.colors);
  if (q.sizes.length) add("sizes && ?::text[]", q.sizes);
  if (q.onSale) where.push("old_price IS NOT NULL");
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const items = await pool.query(
    `SELECT ${CARD} FROM products ${whereSql} ORDER BY ${PRODUCT_ORDER[q.sort]}
     LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, q.pageSize, (q.page - 1) * q.pageSize],
  );
  const count = await pool.query(`SELECT count(*)::int AS total FROM products ${whereSql}`, params);

  res.json({ items: items.rows, total: count.rows[0].total, page: q.page, pageSize: q.pageSize });
}

export async function getNewArrivals(_req: Request, res: Response) {
  const { rows } = await pool.query(`SELECT ${CARD} FROM products ORDER BY created_at DESC, product_id DESC`);
  res.json(rows);
}

export async function getBestSellers(_req: Request, res: Response) {
  const { rows } = await pool.query(`SELECT ${CARD} FROM products ORDER BY rating DESC, product_id`);
  res.json(rows);
}

export async function getProduct(req: Request, res: Response) {
  const id = productIdSchema.parse(req.params.id);
  const { rows } = await pool.query(`SELECT ${DETAIL} FROM products WHERE product_id = $1`, [id]);
  if (!rows[0]) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(rows[0]);
}

// Same type first, then same style, then best rated.
export async function getRelatedProducts(req: Request, res: Response) {
  const id = productIdSchema.parse(req.params.id);
  const { rows } = await pool.query(
    `SELECT ${CARD} FROM products
     WHERE product_id <> $1
     ORDER BY (type = (SELECT type FROM products WHERE product_id = $1)) DESC,
              (style = (SELECT style FROM products WHERE product_id = $1)) DESC,
              rating DESC, product_id
     LIMIT 4`,
    [id],
  );
  res.json(rows);
}

export async function getProductReviews(req: Request, res: Response) {
  const id = productIdSchema.parse(req.params.id);
  const q = reviewQuerySchema.parse(req.query);

  const exists = await pool.query("SELECT 1 FROM products WHERE product_id = $1", [id]);
  if (!exists.rowCount) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const items = await pool.query(
    `SELECT review_id, product_id, author, rating, body, created_at FROM reviews
     WHERE product_id = $1 ORDER BY ${REVIEW_ORDER[q.sort]} LIMIT $2 OFFSET $3`,
    [id, q.pageSize, (q.page - 1) * q.pageSize],
  );
  const count = await pool.query("SELECT count(*)::int AS total FROM reviews WHERE product_id = $1", [id]);

  res.json({ items: items.rows, total: count.rows[0].total, page: q.page, pageSize: q.pageSize });
}
