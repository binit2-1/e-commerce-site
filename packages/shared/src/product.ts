import { z } from "zod";

export const productSchema = z.object({
  product_id: z.number().int(),
  name: z.string(),
  price: z.coerce.number(),
  image_url: z.string(),
  rating: z.coerce.number().min(0).max(5),
  created_at: z.coerce.string(),
});

export type Product = z.infer<typeof productSchema>;
export const productListSchema = z.array(productSchema);
