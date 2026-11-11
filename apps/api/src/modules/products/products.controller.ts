import type { Request, Response } from "express";
import { productsService } from "./products.service.js";

export async function getProducts(_req: Request, res: Response) {
  res.json(await productsService.getAll());
}

export async function getNewArrivals(_req: Request, res: Response) {
  res.json(await productsService.getNewArrivals());
}

export async function getBestSellers(_req: Request, res: Response) {
  res.json(await productsService.getBestSellers());
}
