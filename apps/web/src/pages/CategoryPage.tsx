import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { paths } from "../app/paths";
import Container from "../components/layout/Container";
import { Sliders } from "../components/icons";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Pagination from "../components/ui/Pagination";
import FilterPanel from "../features/catalog/components/FilterPanel";
import SortSelect from "../features/catalog/components/SortSelect";
import { useProductList } from "../features/catalog/hooks/useProductList";
import { catalogTitle, parseCatalogParams, toSearchParams } from "../features/catalog/params";
import ProductCard from "../features/products/components/ProductCard";

const CategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const query = parseCatalogParams(searchParams);
  const { data, loading, error } = useProductList(query);

  const update = (next: Partial<typeof query>, resetPage = true) =>
    setSearchParams(toSearchParams({ ...query, ...next, page: resetPage ? 1 : (next.page ?? query.page), pageSize: undefined }));

  const title = catalogTitle(query);
  const total = data?.total ?? 0;
  const pageCount = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;
  const from = data && total > 0 ? (data.page - 1) * data.pageSize + 1 : 0;
  const to = data ? Math.min(total, data.page * data.pageSize) : 0;

  const renderPanel = (onClose?: () => void) => (
    // Remount when the URL changes so the draft re-syncs with the applied filters.
    <FilterPanel
      key={searchParams.toString()}
      value={query}
      onClose={onClose}
      onApply={(f) => {
        update(f);
        setDrawerOpen(false);
      }}
      onClear={() => {
        setSearchParams(query.q ? toSearchParams({ q: query.q }) : {});
        setDrawerOpen(false);
      }}
    />
  );

  return (
    <>
      <Container>
        <div>
          <Breadcrumbs
            items={[
              { label: "Home", to: paths.home },
              { label: "Shop", to: query.style || query.type || query.onSale || query.q ? paths.shop : undefined },
              ...(query.style || query.type || query.onSale || query.q ? [{ label: title }] : []),
            ]}
          />
        </div>

        <div className="pb-16 lg:grid lg:grid-cols-[295px_1fr] lg:gap-5 lg:pb-24">
          <aside className="hidden lg:block">{renderPanel()}</aside>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h1 className="font-display text-2xl lg:text-[32px]">{title}</h1>
              <button
                type="button"
                aria-label="Open filters"
                onClick={() => setDrawerOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface lg:hidden"
              >
                <Sliders width={18} height={18} />
              </button>
              <div className="flex w-full items-center justify-between gap-3 lg:w-auto lg:gap-4">
                <p className="whitespace-nowrap text-xs text-muted sm:text-sm lg:text-base" aria-live="polite">
                  {data ? `Showing ${from}-${to} of ${total} Products` : "Loading…"}
                </p>
                <SortSelect value={query.sort} onChange={(sort) => update({ sort })} />
              </div>
            </div>

            {error && !data ? (
              <p className="mt-10 rounded-[20px] bg-surface p-8 text-center">
                Couldn&apos;t load products. Please try again in a moment.
              </p>
            ) : data && data.items.length === 0 ? (
              <div className="mt-10 rounded-[20px] bg-surface p-10 text-center">
                <p className="font-body-bold text-xl">No products match your filters</p>
                <button type="button" onClick={() => setSearchParams({})} className="mt-3 underline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                className={`mt-5 grid grid-cols-2 gap-x-4 gap-y-6 transition-opacity lg:mt-6 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-9 ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {data?.items.map((p) => <ProductCard key={p.product_id} {...p} />)}
              </div>
            )}

            <div className="mt-10">
              <Pagination
                page={data?.page ?? query.page}
                pageCount={pageCount}
                onChange={(page) => {
                  update({ page }, false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </div>
      </Container>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-[20px] bg-white px-5 pb-6 pt-6">
            {renderPanel(() => setDrawerOpen(false))}
          </div>
        </div>
      )}

    </>
  );
};

export default CategoryPage;
