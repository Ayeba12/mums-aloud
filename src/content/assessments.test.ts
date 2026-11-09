import { describe, expect, it } from "vitest";
import { assessmentOffer, assessments, CHECKOUT_PATH, checkout } from "./assessments";
import { STATIC_ROUTES } from "@/lib/sitemap";

describe("assessment checkout", () => {
  it("charges one £100 price through the owner's Stripe payment link", () => {
    expect(assessmentOffer.price).toEqual({ amount: 100, label: "£100", currency: "GBP" });
    expect(assessmentOffer.stripeUrl).toBe("https://buy.stripe.com/fZe6qv3UgacPcFy5km");
    expect(checkout.order.pay).toContain(assessmentOffer.price.label);
  });

  it("offers the three assessments, with the renamed Marital Rediscovery Assessment", () => {
    expect(assessments.map((item) => item.label)).toEqual(["For married individuals", "Marital Rediscovery Assessment", "For single individuals"]);
    expect(assessments.every((item) => item.href.startsWith("https://forms.gle/"))).toBe(true);
    expect(JSON.stringify({ assessments, checkout })).not.toMatch(/recently single/i);
  });

  it("is a listed page with no dashes in its copy", () => {
    expect(STATIC_ROUTES).toContain(CHECKOUT_PATH);
    expect(JSON.stringify({ assessmentOffer, assessments, checkout })).not.toMatch(/[–—]/);
  });
});
