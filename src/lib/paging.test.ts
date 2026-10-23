import { describe, expect, it } from "vitest";
import { pageCount, pageHref, pageSlice, parsePage } from "./paging";

describe("parsePage", () => {
  it("accepts whole numbers from 1 up and nothing else", () => {
    expect(parsePage("1")).toBe(1);
    expect(parsePage("12")).toBe(12);
    expect(parsePage("0")).toBeNull();
    expect(parsePage("-2")).toBeNull();
    expect(parsePage("two")).toBeNull();
    expect(parsePage("2.5")).toBeNull();
    expect(parsePage(undefined)).toBeNull();
  });
});

describe("pageCount and pageSlice", () => {
  it("counts pages of eight and never fewer than one", () => {
    expect(pageCount(0)).toBe(1);
    expect(pageCount(8)).toBe(1);
    expect(pageCount(9)).toBe(2);
    expect(pageCount(30)).toBe(4);
  });

  it("slices the items for a page", () => {
    const items = Array.from({ length: 19 }, (_, i) => i + 1);
    expect(pageSlice(items, 1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(pageSlice(items, 3)).toEqual([17, 18, 19]);
    expect(pageSlice(items, 4)).toEqual([]);
  });
});

describe("pageHref", () => {
  it("keeps page one at the listing path and nests later pages", () => {
    expect(pageHref("/blog/", 1)).toBe("/blog/");
    expect(pageHref("/blog/", 2)).toBe("/blog/page/2/");
    expect(pageHref("/story-lounge/", 3)).toBe("/story-lounge/page/3/");
  });
});
