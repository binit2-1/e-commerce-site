import type { Product } from "@shop/shared";
import { useEffect, useState } from "react";
import { fetchProducts, type ProductList } from "../api";

export function useProducts(list: ProductList) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchProducts(list, controller.signal)
      .then(setProducts)
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [list]);

  return { products, loading, error };
}
