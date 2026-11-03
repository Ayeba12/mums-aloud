import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { STATIC_ROUTES } from "@/lib/sitemap";
import { cards } from "./share-cards.json";

const root = process.cwd();
const imageOf = (route: string) => join(root, "src/app", route, "opengraph-image.jpg");

/** Width and height from a JPEG's start-of-frame marker. */
function jpegSize(bytes: Buffer): { width: number; height: number } {
  let offset = 2;
  while (offset < bytes.length) {
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    offset += 2 + length;
  }
  throw new Error("No start-of-frame marker");
}

describe("share cards", () => {
  it("covers every fixed page once", () => {
    const routes = cards.map((card) => card.route);
    expect(new Set(routes).size).toBe(routes.length);
    expect([...routes].sort()).toEqual([...STATIC_ROUTES].sort());
  });

  it("has a rendered 1200x630 JPEG under WhatsApp's 300 KB preview limit, with its alt text, for every card", () => {
    for (const card of cards) {
      const image = imageOf(card.route);
      expect(existsSync(image), card.route).toBe(true);
      expect(statSync(image).size, card.route).toBeLessThan(300 * 1024);
      expect(jpegSize(readFileSync(image)), card.route).toEqual({ width: 1200, height: 630 });
      expect(readFileSync(join(root, "src/app", card.route, "opengraph-image.alt.txt"), "utf8"), card.route).toBe(card.alt);
    }
  });

  it("uses photos that exist, and the panel only where there is no photo", () => {
    for (const card of cards) {
      if (card.variant === "panel") expect(card.photos, card.route).toBeUndefined();
      else for (const photo of card.photos ?? []) expect(existsSync(join(root, photo)), photo).toBe(true);
    }
  });

  it("keeps the copy free of em and en dashes", () => {
    for (const card of cards) {
      const words = [card.tag, card.lead, card.accent, card.line, card.action, card.alt].filter(Boolean).join(" ");
      expect(words, card.route).not.toMatch(/[–—]/);
    }
  });

  it("leaves X to reuse each page's card", () => {
    expect(existsSync(join(root, "src/app/twitter-image.jpg"))).toBe(false);
  });
});
