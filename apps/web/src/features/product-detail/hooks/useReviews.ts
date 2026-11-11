import type { Review, ReviewQuery } from "@shop/shared";
import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../../lib/useApi";
import { fetchReviews } from "../../products/api";

const PAGE_SIZE = 6;

/** Paged reviews that accumulate ("Load more"); changing the sort starts over. */
export function useReviews(productId: number | string) {
  const [sort, setSortState] = useState<ReviewQuery["sort"]>("latest");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Review[]>([]);

  const { data, loading, error } = useApi(
    (signal) => fetchReviews(productId, { sort, page, pageSize: PAGE_SIZE }, signal),
    `${productId}:${sort}:${page}`,
  );

  useEffect(() => {
    if (!data) return;
    setItems((prev) => (data.page === 1 ? data.items : [...prev, ...data.items.filter((r) => !prev.some((p) => p.review_id === r.review_id))]));
  }, [data]);

  const setSort = useCallback((next: ReviewQuery["sort"]) => {
    setSortState(next);
    setPage(1);
  }, []);

  const total = data?.total ?? 0;
  return {
    items,
    total,
    loading,
    error,
    sort,
    setSort,
    hasMore: items.length < total,
    loadMore: () => setPage((p) => p + 1),
  };
}
