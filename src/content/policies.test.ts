import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COOKIE_NOTICE_KEY } from "@/lib/cookie-notice";
import { STATIC_ROUTES } from "@/lib/sitemap";
import { legalLinks } from "./navigation";
import { cookieNotice, cookiePolicy, policyLinks, termsPage } from "./policies";

const pageExists = (href: string) => existsSync(join(process.cwd(), "src", "app", ...href.split("/").filter(Boolean), "page.tsx"));

describe("policy pages", () => {
  it("every policy link points at a page that exists, is in the sitemap and in the footer", () => {
    for (const link of policyLinks) {
      expect(pageExists(link.href), link.href).toBe(true);
      expect(STATIC_ROUTES, link.href).toContain(link.href);
      expect(legalLinks.map((l) => l.href), link.href).toContain(link.href);
    }
  });

  it("the cookie notice links all three policies and says no tracking cookies", () => {
    expect(cookieNotice.links.map((l) => l.href)).toEqual(["/privacy-policy/", "/cookie-policy-uk/", "/terms-and-conditions/"]);
    expect(cookieNotice.text).toMatch(/no tracking, analytics or advertising cookies/);
  });

  it("the cookie policy names the one setting the banner keeps, by its real key", () => {
    expect(JSON.stringify(cookiePolicy)).toContain(COOKIE_NOTICE_KEY);
    expect(cookiePolicy.sections.map((s) => s.title)).toEqual(expect.arrayContaining(["Cookies we set", "Analytics", "Your choices"]));
  });

  it("the terms carry the safety lines, the medical disclaimer and the governing law", () => {
    const text = JSON.stringify(termsPage);
    expect(text).toMatch(/not medical, mental health, legal or financial advice/);
    expect(text).toMatch(/call 999/);
    expect(text).toMatch(/NHS 111/);
    expect(text).toMatch(/Samaritans free on 116 123/);
    expect(text).toMatch(/law of England and Wales/);
    expect(text).toMatch(/death or personal injury/);
  });

  it("every section has words, and no copy uses en or em dashes", () => {
    for (const page of [cookiePolicy, termsPage]) {
      for (const section of page.sections) expect(section.paragraphs.length, section.title).toBeGreaterThan(0);
      expect(JSON.stringify(page)).not.toMatch(/[–—]/);
    }
    expect(JSON.stringify(cookieNotice)).not.toMatch(/[–—]/);
  });
});
