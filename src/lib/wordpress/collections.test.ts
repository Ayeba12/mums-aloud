import { describe, expect, it } from "vitest";
import { collections } from "./collections";
import { articles, blog, storyLounge } from "@/content/stories";

const listed = ["storyLounge", "blog", "articles"] as const;

describe("collections", () => {
  it("gives each editorial collection its own WordPress-style listing path, page 1 at the listing itself", () => {
    const paths = listed.map((key) => collections[key].listingPath);
    for (const path of paths) expect(path).toMatch(/^\/[a-z-]+\/$/);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("keeps the live site's article archive URL and labels the listing as its own, not the Blog", () => {
    expect(collections.articles.listingPath).toBe("/article/");
    expect(articles.tag).toBe("Articles");
    expect(articles.allLabel).toBe("All articles");
    expect(articles.allLabel).not.toMatch(/blog/i);
    expect(blog.tag).toBe("Blog");
    expect(storyLounge.tag).toBe("Story Lounge");
  });
});
