import { describe, expect, it } from "vitest";
import type { ContactFields } from "./contact";
import { CONTACT_COLUMNS, contactRow, contactSubmission } from "./contact-sheet";

const fields: ContactFields = {
  name: "Ama Mensah",
  email: "ama@example.com",
  organisation: "",
  phone: "",
  topic: "mamas-escape",
  message: "How does the community work?",
};
const when = new Date("2026-10-29T12:45:00Z");

describe("contactRow", () => {
  it("fills every column in order, with the topic as its label", () => {
    const row = contactRow(fields, when, "mumsaloud.com contact");
    expect(Object.keys(row)).toEqual([...CONTACT_COLUMNS]);
    expect(row.About).toBe("Mama's Escape (the community)");
    expect(row.Organisation).toBe("");
    expect(row["Submitted (London)"]).toMatch(/29 October 2026/);
  });
});

describe("contactSubmission", () => {
  it("sends a message to the Contact tab and an enquiry to the Partnership tab, each with both emails", () => {
    const message = contactSubmission(fields, "contact", "mumsaloud.com contact", when);
    expect(message.sheet).toBe("Contact");
    expect(message.emails.map((email) => email.to)).toEqual(["ama@example.com", "info@mumsaloud.com"]);

    const enquiry = contactSubmission({ ...fields, organisation: "Northfield Family Hub", topic: "partnership" }, "partnership", "mumsaloud.com partnership", when);
    expect(enquiry.sheet).toBe("Partnership");
    expect(enquiry.row.About).toBe("Partnership or commissioning");
    expect(enquiry.emails[1].subject).toBe("New partnership enquiry: Northfield Family Hub");
  });
});
