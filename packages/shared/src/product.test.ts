import { describe, expect, it } from "vitest";
import { productQuerySchema, reviewQuerySchema } from "./product";

describe("productQuerySchema", () => {
  it("applies defaults for an empty query", () => {
    expect(productQuerySchema.parse({ q: " shirt " }).q).toBe("shirt");
    expect(productQuerySchema.parse({})).toEqual({
      colors: [],
      sizes: [],
      onSale: false,
      sort: "popular",
      page: 1,
      pageSize: 9,
    });
  });

  it("parses csv lists, numbers and booleans from strings", () => {
    const q = productQuerySchema.parse({
      colors: "Red, Blue",
      sizes: "Large",
      minPrice: "50",
      maxPrice: "200",
      onSale: "true",
      sort: "price_desc",
      page: "3",
    });
    expect(q).toMatchObject({
      colors: ["Red", "Blue"],
      sizes: ["Large"],
      minPrice: 50,
      maxPrice: 200,
      onSale: true,
      sort: "price_desc",
      page: 3,
    });
  });

  it("rejects invalid values", () => {
    expect(() => productQuerySchema.parse({ sort: "cheapest" })).toThrow();
    expect(() => productQuerySchema.parse({ page: "0" })).toThrow();
    expect(() => productQuerySchema.parse({ pageSize: "500" })).toThrow();
    expect(() => productQuerySchema.parse({ minPrice: "abc" })).toThrow();
  });
});

describe("reviewQuerySchema", () => {
  it("defaults to latest, first page", () => {
    expect(reviewQuerySchema.parse({})).toEqual({ sort: "latest", page: 1, pageSize: 6 });
  });
});
