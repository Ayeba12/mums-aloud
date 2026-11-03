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
});
