import { describe, expect, it } from "vitest";
import { coreAreaLinks, footerGroups, isGroup, legalLinks, mainNav } from "./navigation";
import { coreAreas } from "./home";

const allLinks = [
  ...mainNav.flatMap((item) => (isGroup(item) ? item.links : [item])),
  ...footerGroups.flatMap((group) => group.links),
  ...legalLinks,
];

describe("navigation", () => {
  it("keeps the client brief's top level: About, How We Help, Stories, Resources, Contact", () => {
    expect(mainNav.map((item) => item.label)).toEqual(["About", "How We Help", "Stories", "Resources", "Contact"]);
  });

  it("uses WordPress-style internal paths with a trailing slash", () => {
    for (const link of allLinks) {
      expect(link.href, link.label).toMatch(/^\/([a-z0-9-]+\/)*$/);
    }
  });

  it("shows exactly four core areas, matching the homepage tiles", () => {
    expect(coreAreaLinks).toHaveLength(4);
    expect(coreAreas.items.map((item) => item.href)).toEqual(coreAreaLinks.map((link) => link.href));
  });

  it("keeps calculators and affiliate offers out of the How We Help group", () => {
    const howWeHelp = mainNav.find((item) => item.label === "How We Help");
    const hrefs = howWeHelp && isGroup(howWeHelp) ? howWeHelp.links.map((link) => link.href) : [];
    expect(hrefs.some((href) => /calculator|affiliate/.test(href))).toBe(false);
  });
});
