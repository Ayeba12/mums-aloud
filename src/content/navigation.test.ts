import { describe, expect, it } from "vitest";
import { coreAreaLinks, footerGroups, isExternalHref, isGroup, legalLinks, mainNav } from "./navigation";
import { coreAreas } from "./home";

const allLinks = [
  ...mainNav.flatMap((item) => (isGroup(item) ? item.links : [item])),
  ...footerGroups.flatMap((group) => group.links),
  ...legalLinks,
];

describe("navigation", () => {
  it("keeps five top-level items, with the podcast under Stories and the newsletter under Resources", () => {
    expect(mainNav.map((item) => item.label)).toEqual(["About", "How We Help", "Stories", "Resources", "Contact"]);
    const links = (label: string) => {
      const item = mainNav.find((entry) => entry.label === label);
      return item && isGroup(item) ? item.links : [];
    };
    expect(links("Stories").map((link) => link.href)).toContain("/podcast/");
    const newsletter = links("Resources").find((link) => link.label === "Newsletter");
    expect(newsletter && isExternalHref(newsletter.href)).toBe(true);
  });

  it("uses WordPress-style internal paths with a trailing slash, except the newsletter email link", () => {
    for (const link of allLinks) {
      if (isExternalHref(link.href)) continue;
      expect(link.href, link.label).toMatch(/^\/([a-z0-9-]+\/)*$/);
    }
  });

  it("shows exactly four core areas, matching the homepage tiles", () => {
    expect(coreAreaLinks).toHaveLength(4);
    expect(coreAreaLinks.map((link) => link.label)).toEqual(["Mama's Escape", "Partnership Opportunities", "Our Services", "Work With Bokun"]);
    expect(coreAreas.items.map((item) => item.href)).toEqual(coreAreaLinks.map((link) => link.href));
  });

  it("gives every group a mega menu side: a photo card or icon rows, never both", () => {
    for (const item of mainNav) {
      if (!isGroup(item)) continue;
      expect(Boolean(item.feature) !== Boolean(item.highlights), item.label).toBe(true);
      if (item.feature) expect(item.feature.action.href, item.label).toMatch(/^\//);
      if (item.highlights) {
        expect(item.highlights.every((link) => link.icon && link.description), item.label).toBe(true);
        expect(item.columns?.length, item.label).toBe(2);
      }
    }
  });

  it("puts Find Support under Resources and Volunteer With Us under About", () => {
    const group = (label: string) => {
      const item = mainNav.find((entry) => entry.label === label);
      return item && isGroup(item) ? item.links.map((link) => link.href) : [];
    };
    expect(group("Resources")).toContain("/find-support/");
    expect(group("About")).toContain("/volunteer/");
    expect(group("How We Help").some((href) => /calculator|affiliate|training/.test(href))).toBe(false);
  });
});
