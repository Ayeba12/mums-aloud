import { describe, expect, it } from "vitest";
import type { ContactFields } from "@/lib/contact";
import { contactEmails, firstName, senderEmail, teamEmail } from "./contact";
import { SHEET_URL_TOKEN } from "./template";

const message: ContactFields = {
  name: "Ama Mensah",
  email: "ama@example.com",
  organisation: "",
  phone: "+44 7700 900123",
  topic: "mamas-escape",
  message: "How does the community work?\n\nAlso: is it free? <3",
};
const enquiry: ContactFields = {
  name: "Daniel Mensah",
  email: "daniel@example.org",
  organisation: "Northfield Family Hub",
  phone: "",
  topic: "partnership",
  message: "We would like to offer peer support sessions.",
};
const options = { origin: "https://mums-aloud.vercel.app", submittedAt: new Date("2026-10-29T12:45:00Z"), teamTo: "info@mumsaloud.com" };

describe("firstName", () => {
  it("takes the first word of a typed name", () => {
    expect(firstName("  Ama Mensah ")).toBe("Ama");
    expect(firstName("Ama")).toBe("Ama");
  });
});

describe("contact: the sender's confirmation", () => {
  const email = senderEmail(message, "contact", options);

  it("goes to the sender from Mums Aloud, with replies to the team", () => {
    expect(email.to).toBe("ama@example.com");
    expect(email.replyTo).toBe("info@mumsaloud.com");
    expect(email.subject).toBe("We have your message, Ama");
  });

  it("carries the photo, the topic, the message escaped, and the help lines", () => {
    expect(email.html).toContain('src="https://mums-aloud.vercel.app/email/contact.jpg"');
    expect(email.html).toContain("Thank you, Ama. Your message is <em");
    expect(email.html).toContain("Mama&#39;s Escape (the community)");
    expect(email.html).toContain("is it free? &lt;3");
    expect(email.html).toContain("116 123");
    expect(email.html).toContain('href="https://mums-aloud.vercel.app/find-support/"');
    expect(email.text).toContain("What is it about?: Mama's Escape (the community)");
  });
});

describe("contact: the team's notification", () => {
  const email = teamEmail(message, "contact", options);

  it("goes to the team with replies to the sender, the topic in the subject and the sheet link for the script", () => {
    expect(email.to).toBe("info@mumsaloud.com");
    expect(email.replyTo).toBe("ama@example.com");
    expect(email.subject).toBe("New message from Ama Mensah: Mama's Escape (the community)");
    expect(email.html).toContain("Ama Mensah sent a");
    expect(email.html).toContain(`href="${SHEET_URL_TOKEN}"`);
    expect(email.html).toContain("mailto:ama@example.com?subject=Your%20message%20to%20Mums%20Aloud");
    expect(email.html).toContain("29 October 2026");
  });
});

describe("partnership emails", () => {
  it("name the organisation, require no topic row, and say when the phone was left blank", () => {
    const [sender, team] = contactEmails(enquiry, "partnership", options);
    expect(sender.subject).toBe("We have your partnership enquiry, Daniel");
    expect(sender.html).toContain("Northfield Family Hub");
    expect(sender.html).toContain('href="https://mums-aloud.vercel.app/partnership/"');
    expect(sender.html).not.toContain("What is it about?");
    expect(team.subject).toBe("New partnership enquiry: Northfield Family Hub");
    expect(team.html).toContain("Northfield Family Hub wants to");
    expect(team.html).toContain("Not given");
    expect(team.html).toContain("Your%20partnership%20enquiry%20to%20Mums%20Aloud");
    expect(team.text).toContain("Daniel Mensah submitted this");
  });
});
