import type { ProductQuery, ReviewQuery } from "@shop/shared";
import { HttpError } from "../../middleware/http-error.js";
import { productsRepository } from "./products.repository.js";

async function requireProduct(id: number) {
  const product = await productsRepository.findById(id);
  if (!product) throw new HttpError(404, "Product not found");
  return product;
}

export const productsService = {
  search: (query: ProductQuery) => productsRepository.search(query),
  getNewArrivals: () => productsRepository.findNewest(),
  getBestSellers: () => productsRepository.findTopRated(),
  getById: requireProduct,
  async getRelated(id: number, limit = 4) {
    await requireProduct(id);
    return productsRepository.findRelated(id, limit);
  },
  async getReviews(id: number, query: ReviewQuery) {
    await requireProduct(id);
    return productsRepository.findReviews(id, query);
  },
};
