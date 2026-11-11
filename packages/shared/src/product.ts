import { z } from "zod";
import { PRODUCT_SORTS, REVIEW_SORTS, DEFAULT_PAGE_SIZE } from "./constants";

/** Fields shown on product cards and in listings. */
export const productSchema = z.object({
  product_id: z.number().int(),
  name: z.string(),
  price: z.coerce.number(),
  old_price: z.coerce.number().nullable(),
  image_url: z.string(),
  rating: z.coerce.number().min(0).max(5),
  type: z.string(),
  style: z.string(),
  created_at: z.coerce.string(),
});
export type Product = z.infer<typeof productSchema>;
export const productListSchema = z.array(productSchema);

export const colorSchema = z.object({ name: z.string(), hex: z.string() });
export type ProductColor = z.infer<typeof colorSchema>;

export const productDetailSchema = productSchema.extend({
  description: z.string(),
  colors: z.array(colorSchema),
  sizes: z.array(z.string()),
  images: z.array(z.string()),
});
export type ProductDetail = z.infer<typeof productDetailSchema>;

export const reviewSchema = z.object({
  review_id: z.number().int(),
  product_id: z.number().int(),
  author: z.string(),
  rating: z.number().int().min(1).max(5),
  body: z.string(),
  created_at: z.coerce.string(),
});
export type Review = z.infer<typeof reviewSchema>;

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ---- Query-string schemas (shared by API validation and web URL handling) ----

const csv = z
  .string()
  .optional()
  .transform((v) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []));

const optionalNumber = z
  .string()
  .optional()
  .transform((v) => (v === undefined || v === "" ? undefined : Number(v)))
  .pipe(z.number().nonnegative().optional());

export const productQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  type: z.string().optional(),
  style: z.string().optional(),
  minPrice: optionalNumber,
  maxPrice: optionalNumber,
  colors: csv,
  sizes: csv,
  onSale: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  sort: z.enum(PRODUCT_SORTS).default("popular"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(48).default(DEFAULT_PAGE_SIZE),
});
export type ProductQuery = z.infer<typeof productQuerySchema>;

export const reviewQuerySchema = z.object({
  sort: z.enum(REVIEW_SORTS).default("latest"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(24).default(6),
});
export type ReviewQuery = z.infer<typeof reviewQuerySchema>;

export const productIdSchema = z.coerce.number().int().positive();

export const reviewInputSchema = z.object({
  rating: z.number().int().min(1, "Pick a rating").max(5),
  body: z.string().trim().min(5, "Write at least a few words").max(1000),
});
export type ReviewInput = z.infer<typeof reviewInputSchema>;
