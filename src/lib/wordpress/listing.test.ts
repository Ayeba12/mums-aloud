import { describe, expect, it } from "vitest";
import { collections } from "./collections";
import { mergeNewestFirst, sourcesOf } from "./listing";
import type { PostSummary } from "./mapping";

const item = (slug: string, path: string, date: string): PostSummary => ({ id: 0, slug, path, title: slug, excerpt: "", date });

describe("listing sources", () => {
  it("feeds the Blog from Mums Stories and Mum Topics, the Story Lounge from every Post, Articles from Articles only (owner, 28 Oct 2026)", () => {
    expect(sourcesOf("blog")).toEqual(["blog", "mumTopics"]);
    expect(sourcesOf("storyLounge")).toEqual(["storyLounge"]);
    expect(collections.storyLounge.categorySlug).toBeUndefined();
    expect(sourcesOf("articles")).toEqual(["articles"]);
    expect(collections.mumTopics.listingPath).toBe("/blog/");
    expect(collections.mumTopics.uriPrefix).toBe("/mum-topic/");
  });

  it("merges lists newest first without repeating an item", () => {
    const merged = mergeNewestFirst([
      [item("b", "/mum-story/b/", "2024-10-30T17:45:00"), item("a", "/mum-story/a/", "2024-10-30T17:44:00")],
      [item("t", "/mum-topic/t/", "2025-01-05T09:00:00"), item("a", "/mum-story/a/", "2024-10-30T17:44:00")],
    ]);
    expect(merged.map((entry) => entry.path)).toEqual(["/mum-topic/t/", "/mum-story/b/", "/mum-story/a/"]);
  });
});
