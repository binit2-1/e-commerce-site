import { Router } from "express";
import {
  getBestSellers,
  getNewArrivals,
  getProduct,
  getProductReviews,
  getProducts,
  getRelatedProducts,
} from "../controllers/products.controller.js";
import { createReview } from "../controllers/reviews.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Fixed paths first, then the /:id routes.
router.get("/new-arrivals", getNewArrivals);
router.get("/best-sellers", getBestSellers);
router.get("/", getProducts);
router.get("/:id/related", getRelatedProducts);
router.get("/:id/reviews", getProductReviews);
router.post("/:id/reviews", requireAuth, createReview);
router.get("/:id", getProduct);

export default router;
