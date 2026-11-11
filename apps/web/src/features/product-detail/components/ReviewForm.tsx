import { useState, type FormEvent } from "react";
import Button from "../../../components/ui/Button";
import { apiSend } from "../../../lib/api-client";

interface ReviewFormProps {
  productId: number;
  onPosted: () => void;
  onCancel: () => void;
}

const ReviewForm = ({ productId, onPosted, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await apiSend("POST", `/api/products/${productId}/reviews`, { rating, body });
      onPosted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post your review");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-5 rounded-[20px] border border-line p-5 lg:p-7">
      <fieldset>
        <legend className="font-body-bold text-lg">Your rating</legend>
        <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => setRating(n)}
              className={`text-3xl leading-none ${n <= rating ? "text-star" : "text-black/15"}`}
            >
              ★
            </button>
          ))}
        </div>
      </fieldset>
      <label className="mt-4 block">
        <span className="font-body-bold text-lg">Your review</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={1000}
          className="mt-2 min-h-24 w-full rounded-[20px] bg-surface px-5 py-3 outline-none focus:ring-2 focus:ring-black/20"
          placeholder="What did you think?"
        />
      </label>
      <p role="alert" className="mt-2 min-h-5 text-sm text-sale">
        {error}
      </p>
      <div className="mt-2 flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Posting…" : "Post review"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
