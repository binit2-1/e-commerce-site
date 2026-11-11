import type { ProductQuery } from "@shop/shared";
import { useApi } from "../../../lib/useApi";
import { fetchProductList } from "../../products/api";
import { toSearchParams } from "../params";

export function useProductList(query: ProductQuery) {
  return useApi((signal) => fetchProductList(query, signal), toSearchParams(query).toString());
}
