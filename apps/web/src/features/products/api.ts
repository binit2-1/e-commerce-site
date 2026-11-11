import type { Paginated, Product, ProductDetail, ProductQuery, Review, ReviewQuery } from "@shop/shared";
import { apiGet } from "../../lib/api-client";
import { toSearchParams } from "../catalog/params";

export type ProductList = "all" | "new-arrivals" | "best-sellers";

const paths: Record<ProductList, string> = {
  all: "/api/products",
  "new-arrivals": "/api/products/new-arrivals",
  "best-sellers": "/api/products/best-sellers",
};

export const fetchProducts = (list: ProductList, signal?: AbortSignal) =>
  apiGet<Product[]>(paths[list], signal);

export const fetchProductList = (query: ProductQuery, signal?: AbortSignal) =>
  apiGet<Paginated<Product>>(`/api/products?${toSearchParams(query)}`, signal);

export const fetchProduct = (id: number | string, signal?: AbortSignal) =>
  apiGet<ProductDetail>(`/api/products/${id}`, signal);

export const fetchRelatedProducts = (id: number | string, signal?: AbortSignal) =>
  apiGet<Product[]>(`/api/products/${id}/related`, signal);

export const fetchReviews = (id: number | string, query: Partial<ReviewQuery>, signal?: AbortSignal) => {
  const params = new URLSearchParams();
  if (query.sort) params.set("sort", query.sort);
  if (query.page) params.set("page", String(query.page));
  if (query.pageSize) params.set("pageSize", String(query.pageSize));
  return apiGet<Paginated<Review>>(`/api/products/${id}/reviews?${params}`, signal);
};
