import { pageItems } from "../../lib/pagination";
import { ArrowLeft, ArrowRight } from "../icons";

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

const navBtn =
  "flex items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-sm hover:bg-surface disabled:opacity-40 disabled:hover:bg-transparent";

const Pagination = ({ page, pageCount, onChange }: PaginationProps) => {
  if (pageCount <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex items-center justify-between border-t border-line pt-5">
      <button type="button" className={navBtn} disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <ArrowLeft width={16} height={16} /> <span className="hidden sm:inline">Previous</span>
      </button>

      <ul className="flex items-center gap-1">
        {pageItems(page, pageCount).map((item, i) =>
          item === "gap" ? (
            <li key={`gap-${i}`} className="px-2 text-muted" aria-hidden>
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                aria-current={item === page ? "page" : undefined}
                onClick={() => onChange(item)}
                className={`h-10 w-10 rounded-lg text-sm ${
                  item === page ? "bg-surface font-body-medium text-black" : "text-muted hover:bg-surface"
                }`}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>

      <button type="button" className={navBtn} disabled={page >= pageCount} onClick={() => onChange(page + 1)}>
        <span className="hidden sm:inline">Next</span> <ArrowRight width={16} height={16} />
      </button>
    </nav>
  );
};

export default Pagination;
