import type { Paginated, Product, ProductDetail, ProductQuery, Review, ReviewQuery } from "@shop/shared";
import { pool } from "../../db/pool.js";

const CARD_COLUMNS = `product_id, name, price::float8 AS price, old_price::float8 AS old_price,
  image_url, rating::float8 AS rating, type, style, created_at`;

const DETAIL_COLUMNS = `${CARD_COLUMNS}, description, colors, sizes, images`;

// Whitelisted ORDER BY fragments: user input only selects a key, never reaches SQL.
const PRODUCT_ORDER: Record<ProductQuery["sort"], string> = {
  popular: "rating DESC, product_id ASC",
  newest: "created_at DESC, product_id DESC",
  price_asc: "price ASC, product_id ASC",
  price_desc: "price DESC, product_id ASC",
};

const REVIEW_ORDER: Record<ReviewQuery["sort"], string> = {
  latest: "created_at DESC, review_id DESC",
  oldest: "created_at ASC, review_id ASC",
  rating: "rating DESC, created_at DESC",
};

function buildWhere(q: ProductQuery) {
  const clauses: string[] = [];
  const params: unknown[] = [];
  const add = (sql: string, value: unknown) => {
    params.push(value);
    clauses.push(sql.replace("?", `$${params.length}`));
  };

  if (q.q) add("position(lower(?) in lower(name)) > 0", q.q);
  if (q.type) add("type = ?", q.type);
  if (q.style) add("style = ?", q.style);
  if (q.minPrice !== undefined) add("price >= ?", q.minPrice);
  if (q.maxPrice !== undefined) add("price <= ?", q.maxPrice);
  if (q.colors.length) {
    add("EXISTS (SELECT 1 FROM jsonb_array_elements(colors) c WHERE c->>'name' = ANY(?::text[]))", q.colors);
  }
  if (q.sizes.length) add("sizes && ?::text[]", q.sizes);
  if (q.onSale) clauses.push("old_price IS NOT NULL");

  return { where: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", params };
}

export const productsRepository = {
  async search(q: ProductQuery): Promise<Paginated<Product>> {
    const { where, params } = buildWhere(q);
    const limitIdx = params.length + 1;
    const offsetIdx = params.length + 2;

    const [rows, count] = await Promise.all([
      pool.query(
        `SELECT ${CARD_COLUMNS} FROM products ${where}
         ORDER BY ${PRODUCT_ORDER[q.sort]} LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
        [...params, q.pageSize, (q.page - 1) * q.pageSize],
      ),
      pool.query<{ total: number }>(`SELECT count(*)::int AS total FROM products ${where}`, params),
    ]);

    return { items: rows.rows, total: count.rows[0]?.total ?? 0, page: q.page, pageSize: q.pageSize };
  },

  async findNewest(limit?: number): Promise<Product[]> {
    const { rows } = await pool.query(
      `SELECT ${CARD_COLUMNS} FROM products ORDER BY created_at DESC, product_id DESC${limit ? " LIMIT $1" : ""}`,
      limit ? [limit] : [],
    );
    return rows;
  },

  async findTopRated(limit?: number): Promise<Product[]> {
    const { rows } = await pool.query(
      `SELECT ${CARD_COLUMNS} FROM products ORDER BY rating DESC, product_id ASC${limit ? " LIMIT $1" : ""}`,
      limit ? [limit] : [],
    );
    return rows;
  },

  async findById(id: number): Promise<ProductDetail | null> {
    const { rows } = await pool.query(`SELECT ${DETAIL_COLUMNS} FROM products WHERE product_id = $1`, [id]);
    return rows[0] ?? null;
  },

  /** Same type first, then same style, then by rating. */
  async findRelated(id: number, limit: number): Promise<Product[]> {
    const { rows } = await pool.query(
      `SELECT ${CARD_COLUMNS} FROM products
       WHERE product_id <> $1
       ORDER BY (type = (SELECT type FROM products WHERE product_id = $1)) DESC,
                (style = (SELECT style FROM products WHERE product_id = $1)) DESC,
                rating DESC, product_id ASC
       LIMIT $2`,
      [id, limit],
    );
    return rows;
  },

  async findReviews(id: number, q: ReviewQuery): Promise<Paginated<Review>> {
    const [rows, count] = await Promise.all([
      pool.query(
        `SELECT review_id, product_id, author, rating, body, created_at FROM reviews
         WHERE product_id = $1 ORDER BY ${REVIEW_ORDER[q.sort]} LIMIT $2 OFFSET $3`,
        [id, q.pageSize, (q.page - 1) * q.pageSize],
      ),
      pool.query<{ total: number }>("SELECT count(*)::int AS total FROM reviews WHERE product_id = $1", [id]),
    ]);
    return { items: rows.rows, total: count.rows[0]?.total ?? 0, page: q.page, pageSize: q.pageSize };
  },
};
