import { describe, expect, it, vi } from "vitest";
import type { PostSummary } from "./mapping";

// A plain stand-in rather than vi.fn(): the spy's own result tracking turns a rejected promise into an
// unhandled rejection, which Vitest then counts against the test even though the code under test caught it.
let getAllImpl: () => Promise<PostSummary[]> = async () => [];
vi.mock("./client", () => ({ getAll: () => getAllImpl() }));

const { pageParams, PLACEHOLDER_SLUG, slugParams } = await import("./static-params");

const posts = (count: number) =>
  Array.from({ length: count }, (_, index) => ({ id: index, slug: `post-${index + 1}`, path: `/post-${index + 1}/`, title: "", excerpt: "", date: "2024-01-01" }));
const down = async (): Promise<PostSummary[]> => {
  throw new Error("down");
};

describe("static params for the dynamic routes", () => {
  it("lists every published slug", async () => {
    getAllImpl = async () => posts(3);
    await expect(slugParams("blog")).resolves.toEqual([{ slug: "post-1" }, { slug: "post-2" }, { slug: "post-3" }]);
  });

  it("falls back to one placeholder when the CMS is empty or unreachable, so the build still has an entry", async () => {
    getAllImpl = async () => [];
    await expect(slugParams("blog")).resolves.toEqual([{ slug: PLACEHOLDER_SLUG }]);
    getAllImpl = down;
    await expect(slugParams("articles")).resolves.toEqual([{ slug: PLACEHOLDER_SLUG }]);
  });

  it("lists the later pages of a listing: one featured item, then eight per page", async () => {
    getAllImpl = async () => posts(31);
    await expect(pageParams("blog")).resolves.toEqual([{ page: "2" }, { page: "3" }, { page: "4" }]);
    getAllImpl = async () => posts(4);
    await expect(pageParams("articles")).resolves.toEqual([{ page: "2" }]);
    getAllImpl = down;
    await expect(pageParams("storyLounge")).resolves.toEqual([{ page: "2" }]);
  });
});
