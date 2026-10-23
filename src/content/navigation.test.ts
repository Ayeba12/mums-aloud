import { describe, expect, it } from "vitest";
import { coreAreaLinks, footerGroups, isExternalHref, isGroup, legalLinks, mainNav } from "./navigation";
import { coreAreas } from "./home";

const allLinks = [
  ...mainNav.flatMap((item) => (isGroup(item) ? item.links : [item])),
  ...footerGroups.flatMap((group) => group.links),
  ...legalLinks,
];

describe("navigation", () => {
  it("pins the podcast and newsletter in the main menu, as the owner asked", () => {
    expect(mainNav.map((item) => item.label)).toEqual(["About", "How We Help", "Stories", "Podcast", "Newsletter", "Resources", "Contact"]);
    const newsletter = mainNav.find((item) => item.label === "Newsletter");
    expect(newsletter && !isGroup(newsletter) && isExternalHref(newsletter.href)).toBe(true);
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
