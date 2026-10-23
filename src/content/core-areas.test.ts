import { describe, expect, it } from "vitest";
import { coreAreaLinks } from "./navigation";
import * as partnership from "./partnership";
import * as workWithUs from "./work-with-us";

describe("core area pages", () => {
  it("cover the four areas in the navigation", () => {
    expect(coreAreaLinks.map((link) => link.href)).toEqual([
      "/mamas-escape/",
      "/partnership/",
      "/services/",
      "/work-with-us/",
    ]);
  });

  it("Work With Bokun carries the owner's four services, each a section the legacy URLs can land on", () => {
    expect(workWithUs.services.items.map((item) => item.id)).toEqual(["consultation", "assessments", "postpartum", "resources"]);
    for (const item of workWithUs.services.items) {
      expect(item.action.href).toMatch(/^(https:\/\/calendly\.com\/|\/)/);
    }
    const assessments = workWithUs.services.items.find((item) => item.id === "assessments");
    expect(assessments?.options?.every((option) => option.href.startsWith("https://forms.gle/"))).toBe(true);
    expect(JSON.stringify(workWithUs)).not.toMatch(/[–—]/);
  });

  it("Partnership no longer names another organisation in its enquiry copy", () => {
    const text = JSON.stringify(partnership);
    expect(text).not.toMatch(/Motherhood Group/);
    expect(partnership.enquiry.intro).toMatch(/collaborating with Mums Aloud/);
    expect(partnership.ways.items.length).toBeGreaterThanOrEqual(8);
  });

  it("Partnership's enquiry form asks for the five agreed fields", () => {
    expect(Object.keys(partnership.enquiry.form.labels)).toEqual(["name", "email", "organisation", "phone", "message"]);
    expect(partnership.enquiry.form.placeholders).toHaveProperty("organisation");
  });

  it("every in-page link points at a section on its page", () => {
    expect(workWithUs.hero.secondary.href).toBe("#consultation");
    expect(partnership.hero.secondary.href).toBe("#offer");
    for (const href of [partnership.hero.primary.href, partnership.offer.action.href, partnership.ways.action.href]) {
      expect(href).toBe("#enquire");
    }
  });
});
