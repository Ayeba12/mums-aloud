import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ASSESSMENT_TERMS_PATH, assessmentOffer, assessments, CHECKOUT_PATH, checkout, proofOfPaymentEmail } from "./assessments";
import { termsPage } from "./policies";
import * as workWithUs from "./work-with-us";
import { siteConfig } from "@/lib/site";
import { STATIC_ROUTES } from "@/lib/sitemap";

/** Every source file under src/, so a form link cannot slip back onto any page. */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : /\.(ts|tsx|json)$/.test(name) ? [path] : [];
  });
}

describe("assessment checkout", () => {
  it("charges one £100 payment for all three assessments through the owner's Stripe link", () => {
    expect(assessmentOffer.price).toEqual({ amount: 100, label: "£100", currency: "GBP" });
    expect(assessmentOffer.stripeUrl).toBe("https://buy.stripe.com/fZe6qv3UgacPcFy5km");
    expect(checkout.order.pay).toContain(assessmentOffer.price.label);
    expect(checkout.order.note).toMatch(/all three/);
    expect(JSON.stringify({ checkout, workWithUs })).not.toMatch(/per assessment|any one of/i);
  });

  it("names the three assessments, with the renamed Marital Rediscovery Assessment", () => {
    expect(assessments.map((item) => item.label)).toEqual(["For married individuals", "Marital Rediscovery Assessment", "For single individuals"]);
    expect(JSON.stringify({ assessments, checkout })).not.toMatch(/recently single/i);
  });

  it("never links the assessment forms from the site (owner, 9 Nov 2026)", () => {
    const offenders = sourceFiles(join(process.cwd(), "src")).filter((file) => /forms\.gle\/(fVDtjGSJ3vRMmVeFA|fnX1AvUgFSKSMCHg8|zKQ18pUsgUev5Lof6)/.test(readFileSync(file, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("points the tick box at the assessment terms, and offers an email with proof of payment", () => {
    const [path, hash] = ASSESSMENT_TERMS_PATH.split("#");
    expect(path).toBe("/terms-and-conditions/");
    const section = termsPage.sections.find((item) => `terms-${item.title.replace(/\W+/g, "-").replace(/^-|-$/g, "").toLowerCase()}` === hash);
    expect(section?.paragraphs.join(" ")).toMatch(/£100/);
    expect(section?.paragraphs.join(" ")).toMatch(/all three/);
    expect(proofOfPaymentEmail.startsWith(`mailto:${siteConfig.email}?subject=`)).toBe(true);
  });

  it("is a listed page with no dashes in its copy", () => {
    expect(STATIC_ROUTES).toContain(CHECKOUT_PATH);
    expect(JSON.stringify({ assessmentOffer, assessments, checkout })).not.toMatch(/[–—]/);
  });
});
