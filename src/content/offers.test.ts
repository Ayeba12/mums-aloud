import { describe, expect, it } from "vitest";
import { affiliate, newMumsCircle, services } from "./offers";
import { calculators, guides } from "./resources";

describe("Offers and resources content", () => {
  it("marks the one referral link and sends the rest to Bokun's diary or a payment page", () => {
    const referral = affiliate.offers.filter((offer) => offer.referral);
    expect(referral).toHaveLength(1);
    expect(referral[0].action.href).toMatch(/affiliate=/);
    expect(affiliate.intro).toMatch(/referral link/);
    expect(affiliate.offers.every((offer) => offer.action.href.startsWith("https://"))).toBe(true);
  });

  it("points every service at a page or section that exists on the site", () => {
    expect(services.items.map((item) => item.href)).toEqual([
      "/work-with-us/#postpartum",
      "/work-with-us/#chaos-to-calm",
      "/work-with-us/#tela",
      "/partnership/",
      "/affiliate-programs/",
    ]);
  });

  it("keeps the New Mums Circle's WhatsApp group and says it opens there", () => {
    expect(newMumsCircle.join.href).toMatch(/^https:\/\/chat\.whatsapp\.com\//);
    expect(newMumsCircle.join.note).toMatch(/WhatsApp/);
  });

  it("keeps the guides at their live URLs with PDFs on the live site", () => {
    expect(guides.map((guide) => guide.slug)).toEqual(["holiday-guide-for-school-kids", "ativites-guide-for-babies"]);
    expect(guides.every((guide) => guide.pdf.startsWith("https://mumsaloud.com/wp-content/uploads/") && guide.pdf.endsWith(".pdf"))).toBe(true);
  });

  it("keeps the calculators at their live URLs with an estimate-only note", () => {
    expect([calculators.ovulation.slug, calculators.pregnancy.slug]).toEqual(["ovulation-calculator", "pregnancy-calculator"]);
    expect(calculators.ovulation.note).toMatch(/estimate/i);
    expect(calculators.pregnancy.note).toMatch(/estimate/i);
  });
});
