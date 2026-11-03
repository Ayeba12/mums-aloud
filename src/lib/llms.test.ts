import { describe, expect, it } from "vitest";
import { cards } from "@/content/share-cards.json";
import { GROUPS, llmsText } from "@/lib/llms";

describe("llms.txt", () => {
  it("lists every page that has a share card, once", () => {
    const listed = GROUPS.flatMap((group) => group.routes);
    expect(new Set(listed).size).toBe(listed.length);
    expect([...listed].sort()).toEqual(cards.map((card) => card.route).sort());
  });

  it("opens with the name and summary, and links pages on the given origin", () => {
    const text = llmsText("https://www.mumsaloud.com");
    expect(text.startsWith("# Mums Aloud\n\n> ")).toBe(true);
    expect(text).toContain("- [Mama's Escape](https://www.mumsaloud.com/mamas-escape/): ");
    expect(text).toContain("## Optional");
    expect(text).not.toMatch(/[–—]/);
  });

  it("lists every story, post and article after the main pages, with the policies last", () => {
    const post = (title: string, path: string) => ({ id: 1, slug: path, path, title, excerpt: "A mother's story about the first year.", date: "2026-01-01" });
    const text = llmsText("https://www.mumsaloud.com", {
      storyLounge: [post("Habibah", "/hello-world/")],
      blog: [post("Pregnancy sleep", "/mum-story/pregnancy-sleep/")],
      articles: [post("Permission to stop performing", "/article/permission-to-stop-performing/")],
    });
    expect(text).toContain("- [Habibah](https://www.mumsaloud.com/hello-world/): A mother's story about the first year.");
    expect(text).toContain("- [Permission to stop performing](https://www.mumsaloud.com/article/permission-to-stop-performing/)");
    const order = ["## Start here", "## Story Lounge", "## Blog", "## Articles", "## Optional"].map((heading) => text.indexOf(heading));
    expect(order.every((at, index) => at > -1 && (index === 0 || at > order[index - 1]))).toBe(true);
  });
});
