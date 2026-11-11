import { productsRepository } from "./products.repository.js";

export const productsService = {
  getAll: () => productsRepository.findAll(),
  getNewArrivals: () => productsRepository.findNewest(),
  getBestSellers: () => productsRepository.findTopRated(),
};
