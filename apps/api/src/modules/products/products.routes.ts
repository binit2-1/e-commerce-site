import { Router } from "express";
import { getBestSellers, getNewArrivals, getProducts } from "./products.controller.js";

export const productsRouter = Router();

// Specific routes must be registered before any parameterised route (e.g. /:id).
productsRouter.get("/new-arrivals", getNewArrivals);
productsRouter.get("/best-sellers", getBestSellers);
productsRouter.get("/", getProducts);
