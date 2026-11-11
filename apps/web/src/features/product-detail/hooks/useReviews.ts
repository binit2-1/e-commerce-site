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
  const [nonce, setNonce] = useState(0);

  const { data, loading, error } = useApi(
    (signal) => fetchReviews(productId, { sort, page, pageSize: PAGE_SIZE }, signal),
    `${productId}:${sort}:${page}:${nonce}`,
  );

  useEffect(() => {
    if (!data) return;
    setItems((prev) => (data.page === 1 ? data.items : [...prev, ...data.items.filter((r) => !prev.some((p) => p.review_id === r.review_id))]));
  }, [data]);

  const setSort = useCallback((next: ReviewQuery["sort"]) => {
    setSortState(next);
    setPage(1);
  }, []);

  /** Start over from page 1 (after posting a review). */
  const refresh = useCallback(() => {
    setPage(1);
    setNonce((n) => n + 1);
  }, []);

  const total = data?.total ?? 0;
  return {
    items,
    total,
    loading,
    error,
    sort,
    setSort,
    refresh,
    hasMore: items.length < total,
    loadMore: () => setPage((p) => p + 1),
  };
}
