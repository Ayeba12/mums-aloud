import { describe, expect, it } from "vitest";
import { coreAreaLinks } from "./navigation";
import * as partnership from "./partnership";
import * as training from "./training-events";
import * as workWithUs from "./work-with-us";

describe("core area pages", () => {
  it("cover the four areas in the navigation", () => {
    expect(coreAreaLinks.map((link) => link.href)).toEqual([
      "/mamas-escape/",
      "/partnership/",
      "/training-and-events/",
      "/work-with-us/",
    ]);
  });

  it("Work With Us carries the three live offers with their legacy URLs", () => {
    expect(workWithUs.programmes.items.map((item) => item.legacyPath)).toEqual([
      "/chaos-to-calm/",
      "/postpartum-transition-program/",
      "/the-empowered-life-assessment-tela/",
    ]);
    for (const item of workWithUs.programmes.items) {
      expect(item.action.href).toMatch(/^(https:\/\/calendly\.com\/|#)/);
    }
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

  it("Training & Events says plainly when no events are published", () => {
    expect(training.events.empty).toMatch(/No dates are published yet/);
    expect(training.strands.items.map((item) => item.title)).toContain("The Maternal Health Summit");
  });

  it("every in-page link points at a section on its page", () => {
    expect(workWithUs.hero.secondary.href).toBe("#programmes");
    expect(training.hero.primary.href).toBe("#events");
    expect(partnership.hero.secondary.href).toBe("#offer");
    for (const href of [partnership.hero.primary.href, partnership.offer.action.href, partnership.ways.action.href]) {
      expect(href).toBe("#enquire");
    }
  });
});
