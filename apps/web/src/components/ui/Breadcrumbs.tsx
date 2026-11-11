import { Link } from "react-router-dom";
import { ChevronRight } from "../icons";

export interface Crumb {
  label: string;
  to?: string;
}

const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="py-5 text-sm lg:py-6 lg:text-base">
    <ol className="flex flex-wrap items-center gap-1.5">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {item.to && !last ? (
              <Link to={item.to} className="text-muted hover:text-black">
                {item.label}
              </Link>
            ) : (
              <span aria-current={last ? "page" : undefined}>{item.label}</span>
            )}
            {!last && <ChevronRight width={16} height={16} className="text-muted" />}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
