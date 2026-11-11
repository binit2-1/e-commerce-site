import { createBrowserRouter } from "react-router-dom";
import CartPage from "../pages/CartPage";
import CategoryPage from "../pages/CategoryPage";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import RootLayout from "./RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/category", element: <CategoryPage /> },
      { path: "/product", element: <ProductDetailPage /> },
      { path: "/cart", element: <CartPage /> },
    ],
  },
]);
