import { describe, expect, it } from "vitest";
import { pageItems } from "./pagination";

describe("pageItems", () => {
  it("lists every page when there are few", () => {
    expect(pageItems(1, 3)).toEqual([1, 2, 3]);
  });
  it("collapses the middle with gaps", () => {
    expect(pageItems(1, 10)).toEqual([1, 2, 3, "gap", 8, 9, 10]);
    expect(pageItems(5, 10)).toEqual([1, 2, 3, 4, 5, 6, "gap", 8, 9, 10]);
  });
});
