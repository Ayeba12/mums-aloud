import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { VolunteerFields } from "./volunteer";
import { SHEET_COLUMNS, sheetRow, volunteerSubmission } from "./volunteer-sheet";

const fields: VolunteerFields = {
  firstName: "Ama",
  lastName: "Mensah",
  email: "ama@example.com",
  phone: "",
  skills: "Ten years as a midwife, and a mum of two.",
  availability: "Weekday evenings",
};
const when = new Date("2026-10-29T12:45:00Z");

const notify = { forms: process.env.FORMS_NOTIFY_EMAIL, volunteer: process.env.VOLUNTEER_NOTIFY_EMAIL };
beforeEach(() => {
  delete process.env.FORMS_NOTIFY_EMAIL;
  delete process.env.VOLUNTEER_NOTIFY_EMAIL;
});
afterEach(() => {
  if (notify.forms) process.env.FORMS_NOTIFY_EMAIL = notify.forms;
  if (notify.volunteer) process.env.VOLUNTEER_NOTIFY_EMAIL = notify.volunteer;
});

describe("sheetRow", () => {
  it("fills every column in order, with the London time beside the ISO one", () => {
    const row = sheetRow(fields, when, "mumsaloud.com volunteer");
    expect(Object.keys(row)).toEqual([...SHEET_COLUMNS]);
    expect(row["Submitted (ISO)"]).toBe("2026-10-29T12:45:00.000Z");
    expect(row["Submitted (London)"]).toMatch(/29 October 2026/);
    expect(row.Phone).toBe("");
    expect(row.Source).toBe("mumsaloud.com volunteer");
  });
});

describe("volunteerSubmission", () => {
  it("goes to the Applications tab with the row and both emails, the team's to the notify address when set", () => {
    process.env.FORMS_NOTIFY_EMAIL = "team@example.com";
    const submission = volunteerSubmission(fields, "mumsaloud.com volunteer", when);
    expect(submission.sheet).toBe("Applications");
    expect(submission.row["First name"]).toBe("Ama");
    expect(submission.emails.map((email) => email.to)).toEqual(["ama@example.com", "team@example.com"]);
  });

  it("notifies the site inbox by default", () => {
    expect(volunteerSubmission(fields, "x", when).emails[1].to).toBe("info@mumsaloud.com");
  });
});
