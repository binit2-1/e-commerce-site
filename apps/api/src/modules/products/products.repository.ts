import type { Product } from "@shop/shared";
import { pool } from "../../db/pool.js";

const COLUMNS = "product_id, name, price::float8 AS price, image_url, rating::float8 AS rating, created_at";

async function list(orderBy: string, limit?: number): Promise<Product[]> {
  const { rows } = await pool.query(
    `SELECT ${COLUMNS} FROM products ORDER BY ${orderBy}${limit ? " LIMIT $1" : ""}`,
    limit ? [limit] : [],
  );
  return rows;
}

export const productsRepository = {
  findAll: () => list("product_id ASC"),
  findNewest: (limit?: number) => list("created_at DESC", limit),
  findTopRated: (limit?: number) => list("rating DESC, product_id ASC", limit),
};
