# Routing guide (React Router v7, `apps/web`)

## Recommended approach

Use **data-router mode** (`createBrowserRouter` + `RouterProvider`), which we already have. It gives lazy routes, per-route error boundaries, loaders and scroll restoration without extra libraries.

### Rules

1. **One route table, in one file** — `src/app/router.tsx`. Pages never declare `<Routes>` themselves.
2. **Nested layouts via `<Outlet />`.** `RootLayout` (top banner + navbar) wraps every page. Add further layout routes (e.g. an account area) as parents, not by copy-pasting wrappers.
3. **Central path constants** — `src/app/paths.ts`. Links and `navigate()` calls use `paths.product(id)`, never string literals. Renaming a URL is then a one-line change.
4. **Lazy-load pages** with the route `lazy` property so each page is its own chunk. The home page stays eager-friendly because it is the entry route, but lazy works for it too.
5. **Pages are thin.** `src/pages/*Page.tsx` only composes feature components; data fetching and logic live in `src/features/<feature>/`.
6. **Dynamic segments use params.** `/products/:productId` → `useParams()` in the page; validate/parse the param there.
7. **Handle failure paths.** A root `errorElement` for thrown errors and a catch-all `path: "*"` route for 404.
8. **Navigation uses `<Link>` / `<NavLink>`**, not `<a href>`: no full page reload, and `NavLink` gives active styling.
9. **`<ScrollRestoration />`** in the root layout so navigation scrolls to top / restores position.
10. **Fetching:** keep the `useProducts`-style hooks for now. If a page needs data before it renders, move that fetch into a route `loader` — the route table is already set up for it.

### Route map

| URL                    | Page                | Notes                                                                 |
| ---------------------- | ------------------- | --------------------------------------------------------------------- |
| `/`                    | `HomePage`          | index route                                                           |
| `/shop`                | `CategoryPage`      | query: `q, type, style, minPrice, maxPrice, colors, sizes, onSale, sort, page` |
| `/products/:productId` | `ProductDetailPage` | dynamic segment; invalid / unknown id renders the 404 view            |
| `/cart`                | `CartPage`          | cart is stored in the browser (`localStorage`)                        |
| `*`                    | `NotFoundPage`      | catch-all                                                             |

Query string state (filters, sort, page) belongs in `useSearchParams`, not in the path. The category page parses it with `parseCatalogParams` (`features/catalog/params.ts`), which shares its zod schema with the API, and omits default values when writing URLs.

### Adding a page

1. Create `src/pages/FooPage.tsx` (default export).
2. Add `foo: "/foo"` to `src/app/paths.ts`.
3. Add `{ path: paths.foo, lazy: () => import(...) }` to `src/app/router.tsx`.
4. Link to it with `<Link to={paths.foo}>`.
