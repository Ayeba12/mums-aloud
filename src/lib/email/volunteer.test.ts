import { describe, expect, it } from "vitest";
import type { VolunteerFields } from "@/lib/volunteer";
import { escape, paragraphs, SHEET_URL_TOKEN } from "./template";
import { adminEmail, applicantEmail, volunteerEmails } from "./volunteer";

const fields: VolunteerFields = {
  firstName: "Ama",
  lastName: "Mensah",
  email: "ama@example.com",
  phone: "+44 7700 900123",
  skills: "Ten years as a midwife.\n\nMum of two <3 & proud.",
  availability: "Weekday evenings",
};
const options = { origin: "https://mums-aloud.vercel.app", submittedAt: new Date("2026-10-29T12:45:00Z"), adminTo: "admin@mumsaloud.com" };

describe("email template helpers", () => {
  it("escapes everything that could become markup", () => {
    expect(escape(`<b>"Ama" & 'co'</b>`)).toBe("&lt;b&gt;&quot;Ama&quot; &amp; &#39;co&#39;&lt;/b&gt;");
  });

  it("keeps typed line breaks and paragraphs, escaped", () => {
    const html = paragraphs("One <two>\nthree\n\nfour");
    expect(html).toContain("One &lt;two&gt;<br>three");
    expect(html.match(/<p /g)).toHaveLength(2);
  });
});

describe("applicant email", () => {
  const email = applicantEmail(fields, options);

  it("goes to the applicant from Mums Aloud, with replies to the team", () => {
    expect(email.to).toBe("ama@example.com");
    expect(email.fromName).toBe("Mums Aloud");
    expect(email.replyTo).toBe("admin@mumsaloud.com");
    expect(email.subject).toBe("We have your volunteer application, Ama");
  });

  it("carries the photo and logo from the site, the name, and what was typed, escaped", () => {
    expect(email.html).toContain('src="https://mums-aloud.vercel.app/email/volunteer.jpg"');
    expect(email.html).toContain('src="https://mums-aloud.vercel.app/email/logo.png"');
    expect(email.html).toContain("Thank you, Ama. Your application is <em");
    expect(email.html).toContain("Mum of two &lt;3 &amp; proud.");
    expect(email.html).not.toContain("<3");
    expect(email.html).toContain("Weekday evenings");
    expect(email.html).toContain("+44 7700 900123");
  });

  it("links the buttons to the site and has a plain-text version", () => {
    expect(email.html).toContain('href="https://mums-aloud.vercel.app/mamas-escape/"');
    expect(email.text).toContain("Thank you, Ama. Your application is with us.");
    expect(email.text).toContain("Skills & experience: Ten years as a midwife.");
    expect(email.text).toContain("Mum of two <3 & proud.");
    expect(email.text).not.toMatch(/<[a-z!/]/);
  });
});

describe("admin email", () => {
  const email = adminEmail(fields, options);

  it("goes to the team with replies to the applicant and the sheet link left for the script", () => {
    expect(email.to).toBe("admin@mumsaloud.com");
    expect(email.replyTo).toBe("ama@example.com");
    expect(email.subject).toBe("New volunteer application: Ama Mensah");
    expect(email.html).toContain(`href="${SHEET_URL_TOKEN}"`);
    expect(email.html).toContain("mailto:ama@example.com?subject=Your%20volunteer%20application%20to%20Mums%20Aloud");
  });

  it("lists every field and the London submission time", () => {
    expect(email.html).toContain("Ama Mensah wants to");
    expect(email.html).toContain("29 October 2026");
    expect(email.html).toContain("12:45");
    expect(email.html).toContain("Ten years as a midwife.");
    expect(email.text).toContain("Phone number: +44 7700 900123");
  });

  it("says when the phone was left blank", () => {
    expect(adminEmail({ ...fields, phone: "" }, options).html).toContain("Not given");
  });
});

describe("volunteerEmails", () => {
  it("returns the applicant's confirmation first, then the team's notification", () => {
    expect(volunteerEmails(fields, options).map((email) => email.to)).toEqual(["ama@example.com", "admin@mumsaloud.com"]);
  });
});
