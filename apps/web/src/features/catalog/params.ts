import { productQuerySchema, type ProductQuery } from "@shop/shared";

export const PRICE_MIN = 0;
export const PRICE_MAX = 300;

/** Read catalog filters from the URL. Invalid values fall back to defaults. */
export function parseCatalogParams(sp: URLSearchParams): ProductQuery {
  const parsed = productQuerySchema.safeParse(Object.fromEntries(sp.entries()));
  return parsed.success ? parsed.data : productQuerySchema.parse({});
}

/** Serialise filters, omitting defaults so URLs stay short and shareable. */
export function toSearchParams(q: Partial<ProductQuery>): URLSearchParams {
  const sp = new URLSearchParams();
  if (q.q) sp.set("q", q.q);
  if (q.type) sp.set("type", q.type);
  if (q.style) sp.set("style", q.style);
  if (q.minPrice !== undefined) sp.set("minPrice", String(q.minPrice));
  if (q.maxPrice !== undefined) sp.set("maxPrice", String(q.maxPrice));
  if (q.colors?.length) sp.set("colors", q.colors.join(","));
  if (q.sizes?.length) sp.set("sizes", q.sizes.join(","));
  if (q.onSale) sp.set("onSale", "true");
  if (q.sort && q.sort !== "popular") sp.set("sort", q.sort);
  if (q.page && q.page > 1) sp.set("page", String(q.page));
  if (q.pageSize) sp.set("pageSize", String(q.pageSize));
  return sp;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function catalogTitle(q: ProductQuery): string {
  if (q.q) return `Results for "${q.q}"`;
  if (q.style) return cap(q.style);
  if (q.onSale) return "On Sale";
  if (q.type) return cap(q.type);
  return "All Products";
}
