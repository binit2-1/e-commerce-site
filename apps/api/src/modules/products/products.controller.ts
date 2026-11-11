import { productIdSchema, productQuerySchema, reviewQuerySchema } from "@shop/shared";
import type { Request, Response } from "express";
import { productsService } from "./products.service.js";

export async function getProducts(req: Request, res: Response) {
  res.json(await productsService.search(productQuerySchema.parse(req.query)));
}

export async function getNewArrivals(_req: Request, res: Response) {
  res.json(await productsService.getNewArrivals());
}

export async function getBestSellers(_req: Request, res: Response) {
  res.json(await productsService.getBestSellers());
}

export async function getProduct(req: Request, res: Response) {
  res.json(await productsService.getById(productIdSchema.parse(req.params.id)));
}

export async function getRelatedProducts(req: Request, res: Response) {
  res.json(await productsService.getRelated(productIdSchema.parse(req.params.id)));
}

export async function getProductReviews(req: Request, res: Response) {
  const id = productIdSchema.parse(req.params.id);
  res.json(await productsService.getReviews(id, reviewQuerySchema.parse(req.query)));
}
