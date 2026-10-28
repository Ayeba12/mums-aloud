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
      if (partner.logo.onDark) expect(existsSync(join(process.cwd(), "public", partner.logo.onDark)), partner.logo.onDark).toBe(true);
      expect(partner.logo.width, partner.name).toBeGreaterThan(0);
      expect(partner.logo.height, partner.name).toBeGreaterThan(0);
    }
    expect(partners.items.filter((partner) => partner.logo)).toHaveLength(10);
    for (const partner of partners.items) {
      if (!partner.logo) continue;
      // Shown at a shared height in 12/15rem tiles: a mark wider than 6:1 or taller than 4:5 would read as a sliver or spill.
      const ratio = partner.logo.width / partner.logo.height;
      expect(ratio, `${partner.name} aspect ratio`).toBeGreaterThan(0.8);
      expect(ratio, `${partner.name} aspect ratio`).toBeLessThan(6);
    }
    expect(partners.items.find((partner) => partner.slug === "chuck-gallery")?.logo).toBeUndefined();
    expect(partners.items.find((partner) => partner.slug === "nhs")?.logo?.onDark).toBe("/partners/nhs-white.svg");
  });
});
