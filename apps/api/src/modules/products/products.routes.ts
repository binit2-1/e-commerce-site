import { Router } from "express";
import {
  getBestSellers,
  getNewArrivals,
  getProduct,
  getProductReviews,
  getProducts,
  getRelatedProducts,
} from "./products.controller.js";

export const productsRouter = Router();

// Specific routes must be registered before any parameterised route (/:id).
productsRouter.get("/new-arrivals", getNewArrivals);
productsRouter.get("/best-sellers", getBestSellers);
productsRouter.get("/", getProducts);
productsRouter.get("/:id/related", getRelatedProducts);
productsRouter.get("/:id/reviews", getProductReviews);
productsRouter.get("/:id", getProduct);
