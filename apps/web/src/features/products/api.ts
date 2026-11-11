import type { Product } from "@shop/shared";
import { apiGet } from "../../lib/api-client";

export type ProductList = "all" | "new-arrivals" | "best-sellers";

const paths: Record<ProductList, string> = {
  all: "/api/products",
  "new-arrivals": "/api/products/new-arrivals",
  "best-sellers": "/api/products/best-sellers",
};

export const fetchProducts = (list: ProductList, signal?: AbortSignal) =>
  apiGet<Product[]>(paths[list], signal);
