import { REVIEW_SORTS, type Review, type ReviewQuery } from "@shop/shared";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { paths } from "../../../app/paths";
import { Check, Sliders } from "../../../components/icons";
import Button from "../../../components/ui/Button";
import StarRating from "../../../components/ui/StarRating";
import { formatDate } from "../../../lib/format";
import { useAuth } from "../../auth/useAuth";
import { useReviews } from "../hooks/useReviews";
import ReviewForm from "./ReviewForm";

const sortLabels: Record<ReviewQuery["sort"], string> = { latest: "Latest", oldest: "Oldest", rating: "Top rated" };

const ReviewCard = ({ review }: { review: Review }) => (
  <li className="rounded-[20px] border border-line p-5 lg:p-7">
    <StarRating rating={review.rating} size={20} showValue={false} />
    <div className="mt-3 flex items-center gap-1.5">
      <h3 className="font-body-bold text-base lg:text-xl">{review.author}</h3>
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#01ab31] text-white" title="Verified buyer">
        <Check width={12} height={12} strokeWidth={3} />
      </span>
    </div>
    <p className="mt-2 text-sm text-black/60 lg:text-base">&ldquo;{review.body}&rdquo;</p>
    <p className="mt-4 text-sm text-muted lg:text-base">Posted on {formatDate(review.created_at)}</p>
  </li>
);

const ReviewList = ({ productId }: { productId: number }) => {
  const { items, total, loading, error, sort, setSort, refresh, hasMore, loadMore } = useReviews(productId);
  const { user } = useAuth();
  const location = useLocation();
  const [writing, setWriting] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-body-bold text-xl lg:text-2xl">
          All Reviews <span className="text-base text-muted">({total})</span>
        </h2>
        <div className="flex items-center gap-2.5">
          <span className="hidden h-11 w-11 items-center justify-center rounded-full bg-surface sm:flex" aria-hidden>
            <Sliders width={18} height={18} />
          </span>
          <label className="sr-only" htmlFor="review-sort">
            Sort reviews
          </label>
          <select
            id="review-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as ReviewQuery["sort"])}
            className="h-11 rounded-full bg-surface px-5 text-sm outline-none"
          >
            {REVIEW_SORTS.map((s) => (
              <option key={s} value={s}>
                {sortLabels[s]}
              </option>
            ))}
          </select>
          {user ? (
            <Button onClick={() => setWriting((v) => !v)} className="h-11 px-5 py-0 text-sm">
              Write a Review
            </Button>
          ) : (
            <Link
              to={`${paths.login}?next=${encodeURIComponent(location.pathname)}`}
              className="flex h-11 items-center rounded-full bg-black px-5 text-sm text-white"
            >
              Log in to review
            </Link>
          )}
        </div>
      </div>

      {writing && (
        <ReviewForm
          productId={productId}
          onCancel={() => setWriting(false)}
          onPosted={() => {
            setWriting(false);
            refresh();
          }}
        />
      )}

      {error && items.length === 0 ? (
        <p className="mt-6 rounded-[20px] bg-surface p-6 text-center">Couldn&apos;t load reviews.</p>
      ) : items.length === 0 && !loading ? (
        <p className="mt-6 rounded-[20px] bg-surface p-6 text-center">No reviews yet.</p>
      ) : (
        <ul className="mt-5 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {items.map((r) => (
            <ReviewCard key={r.review_id} review={r} />
          ))}
        </ul>
      )}

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline" disabled={loading} onClick={loadMore} className="px-12">
            {loading ? "Loading…" : "Load More Reviews"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
