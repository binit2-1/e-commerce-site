import { describe, expect, it } from "vitest";
import { catalogTitle, parseCatalogParams, toSearchParams } from "./params";

describe("catalog params", () => {
  it("round-trips filters through the URL", () => {
    const q = parseCatalogParams(new URLSearchParams("style=casual&colors=Red,Blue&sort=price_asc&page=2&minPrice=50"));
    expect(q).toMatchObject({ style: "casual", colors: ["Red", "Blue"], sort: "price_asc", page: 2, minPrice: 50 });
    const again = parseCatalogParams(toSearchParams({ ...q, pageSize: undefined }));
    expect(again).toEqual(q);
  });

  it("omits defaults", () => {
    expect(toSearchParams({ sort: "popular", page: 1, colors: [], sizes: [], onSale: false }).toString()).toBe("");
  });

  it("falls back to defaults on invalid input", () => {
    expect(parseCatalogParams(new URLSearchParams("sort=bogus&page=-3")).sort).toBe("popular");
  });

  it("titles the page from the active filter", () => {
    expect(catalogTitle(parseCatalogParams(new URLSearchParams("style=gym")))).toBe("Gym");
    expect(catalogTitle(parseCatalogParams(new URLSearchParams("onSale=true")))).toBe("On Sale");
    expect(catalogTitle(parseCatalogParams(new URLSearchParams("")))).toBe("All Products");
  });
});
