import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage";
import { paths } from "./paths";
import RootLayout from "./RootLayout";

// Each page is lazy-loaded into its own chunk.
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <div className="p-10 text-center">Loading…</div>,
    children: [
      { index: true, lazy: async () => ({ Component: (await import("../pages/HomePage")).default }) },
      { path: paths.shop, lazy: async () => ({ Component: (await import("../pages/CategoryPage")).default }) },
      {
        path: paths.product(),
        lazy: async () => ({ Component: (await import("../pages/ProductDetailPage")).default }),
      },
      { path: paths.cart, lazy: async () => ({ Component: (await import("../pages/CartPage")).default }) },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
