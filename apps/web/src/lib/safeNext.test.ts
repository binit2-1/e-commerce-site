import { describe, expect, it } from "vitest";
import { safeNext } from "./safeNext";

describe("safeNext", () => {
  it("keeps in-app paths", () => expect(safeNext("/checkout?x=1")).toBe("/checkout?x=1"));
  it("rejects other origins", () => {
    expect(safeNext("//evil.com")).toBe("/");
    expect(safeNext("https://evil.com")).toBe("/");
    expect(safeNext(null)).toBe("/");
  });
});
