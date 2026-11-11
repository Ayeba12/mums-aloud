import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { newsletterDialog, newsletterGifts, welcomeEmail } from "@/content/newsletter";
import { uploadUrl } from "@/lib/wordpress/urls";
import { giftCovers, newsletterWelcomeEmail } from "./newsletter";

const origin = "https://www.mumsaloud.com";

describe("newsletter welcome email", () => {
  it("offers both free magazines with their download links and covers", () => {
    const message = newsletterWelcomeEmail({ email: "ama@example.com", firstName: "Ama" }, { origin });
    expect(message.to).toBe("ama@example.com");
    expect(message.subject).toMatch(/two free Mama's Escape magazines/);
    expect(newsletterGifts).toHaveLength(2);
    for (const gift of newsletterGifts) {
      expect(gift.pdf.startsWith(uploadUrl(""))).toBe(true);
      expect(gift.pdf.endsWith(".pdf")).toBe(true);
      expect(message.html).toContain(`href="${gift.pdf}"`);
      expect(message.text).toContain(gift.pdf);
      expect(message.html).toContain(`${origin}${giftCovers[gift.id].src}`);
      expect(existsSync(join(process.cwd(), "public", giftCovers[gift.id].src))).toBe(true);
    }
    expect(message.html).toContain("Welcome, Ama. Your free magazines are");
    expect(message.html).toContain(welcomeEmail.brings[0]);
  });

  it("greets without a name when none is given, and escapes whatever is typed", () => {
    expect(newsletterWelcomeEmail({ email: "a@example.com" }, { origin }).html).toContain("Welcome. Your free magazines are");
    const html = newsletterWelcomeEmail({ email: "a@example.com", firstName: "<script>x</script>" }, { origin }).html;
    expect(html).not.toContain("<script>x");
    expect(html).toContain("&lt;script&gt;x");
  });

  it("tells people about the magazines before they sign up, with no dashes in the copy", () => {
    expect(newsletterDialog.intro).toMatch(/two free editions of Mama's Escape/);
    expect(newsletterDialog.giftCaption).toMatch(/Free when you join/);
    expect(JSON.stringify({ newsletterGifts, welcomeEmail, newsletterDialog })).not.toMatch(/[–—]/);
  });
});
