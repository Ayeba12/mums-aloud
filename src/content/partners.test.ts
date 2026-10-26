import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { partners } from "./home";

describe("partners", () => {
  it("lists the owner's eleven partners once each, with a slug for every one", () => {
    expect(partners.items).toHaveLength(11);
    expect(new Set(partners.items.map((partner) => partner.slug)).size).toBe(11);
    expect(partners.names).toEqual(partners.items.map((partner) => partner.name));
  });

  it("points every logo at a file that exists under public/partners with real dimensions", () => {
    for (const partner of partners.items) {
      if (!partner.logo) continue;
      expect(partner.logo.src, partner.name).toMatch(/^\/partners\/[a-z0-9-]+\.(svg|png)$/);
      expect(existsSync(join(process.cwd(), "public", partner.logo.src)), partner.logo.src).toBe(true);
      expect(partner.logo.width, partner.name).toBeGreaterThan(0);
      expect(partner.logo.height, partner.name).toBeGreaterThan(0);
    }
    expect(partners.items.filter((partner) => partner.logo)).toHaveLength(10);
    expect(partners.items.find((partner) => partner.slug === "chuck-gallery")?.logo).toBeUndefined();
  });
});
