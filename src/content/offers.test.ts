import { describe, expect, it } from "vitest";
import { newMumsCircle, services, trustedResources } from "./offers";
import { calculators, guides } from "./resources";

describe("Offers and resources content", () => {
  it("marks the one referral link and sends the rest to Bokun's diary or a payment page", () => {
    const referral = trustedResources.offers.filter((offer) => offer.referral);
    expect(referral).toHaveLength(1);
    expect(referral[0].action.href).toMatch(/affiliate=/);
    expect(trustedResources.disclosure).toMatch(/referral link/);
    expect(trustedResources.offers.every((offer) => offer.action.href.startsWith("https://"))).toBe(true);
  });

  it("carries the owner's seven service pathways in order, each with its id and bullets", () => {
    const pathways = services.groups.flatMap((group) => group.pathways);
    expect(pathways.map((pathway) => pathway.id)).toEqual(["support", "group", "mentor", "community", "training", "events", "experts"]);
    expect(pathways.map((pathway) => pathway.title)).toEqual([
      "1:1 Support",
      "Group Support & Counselling",
      "Get a Mentor Mum",
      "Join Our Community",
      "Training and Workshops",
      "Community Events",
      "Subject Matter Expert Sessions",
    ]);
    expect(pathways.every((pathway) => pathway.items.length >= 3)).toBe(true);
  });

  it("leads mums to support and volunteers to the volunteer page", () => {
    expect(services.closing.primary.href).toBe("/contact/");
    expect(services.closing.secondary.href).toBe("/volunteer/");
    expect(services.volunteer.action.href).toBe("/volunteer/");
    expect(services.approach.audiences.map((audience) => audience.title)).toEqual(["For Mums", "For Volunteers"]);
  });

  it("uses no em or en dashes in the services copy", () => {
    expect(JSON.stringify(services)).not.toMatch(/[–—]/);
    expect(JSON.stringify(trustedResources)).not.toMatch(/[–—]/);
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
