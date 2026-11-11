import { Router } from "express";
import {
  getBestSellers,
  getNewArrivals,
  getProduct,
  getProductReviews,
  getProducts,
  getRelatedProducts,
} from "../controllers/products.controller.js";

const router = Router();

// Fixed paths first, then the /:id routes.
router.get("/new-arrivals", getNewArrivals);
router.get("/best-sellers", getBestSellers);
router.get("/", getProducts);
router.get("/:id/related", getRelatedProducts);
router.get("/:id/reviews", getProductReviews);
router.get("/:id", getProduct);

export default router;
