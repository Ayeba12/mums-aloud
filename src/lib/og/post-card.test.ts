import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";

// The card reads its fonts and photos when the module loads; the WordPress client is not needed here.
vi.mock("@/lib/wordpress/client", () => ({ getBySlug: vi.fn() }));
const { clip, titleSize } = await import("./post-card");

describe("post card", () => {
  it("steps the title down as it gets longer", () => {
    expect(titleSize("When next you meet a mother").fontSize).toBe(64);
    expect(titleSize("The night I thought I hurt my baby, and what came after").fontSize).toBe(52);
    expect(titleSize("A much longer title that goes on and on about the first year of motherhood").fontSize).toBe(44);
  });

  it("clips at a word boundary with an ellipsis, and leaves short text alone", () => {
    expect(clip("Short and sweet.", 40)).toBe("Short and sweet.");
    expect(clip("There is a fear only a new mother knows, at night.", 30)).toBe("There is a fear only a new…");
    expect(clip("  spaced\n out   text ", 40)).toBe("spaced out text");
  });

  it("has a card on every post route, saved as JPEG", () => {
    for (const route of ["[slug]", "mum-story/[slug]", "mum-topic/[slug]", "article/[slug]"]) {
      const file = join(process.cwd(), "src/app", route, "opengraph-image.tsx");
      expect(existsSync(file), route).toBe(true);
      const source = readFileSync(file, "utf8");
      expect(source, route).toContain('contentType = "image/jpeg"');
      expect(source, route).toContain("generateStaticParams");
    }
  });
});
