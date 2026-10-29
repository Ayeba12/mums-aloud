/**
 * The volunteer form's row on the Applications tab and its two emails, handed to `deliverToSheet`.
 */
import { dateTimeFormat } from "@/lib/dates";
import { emailOrigin } from "@/lib/email/template";
import { volunteerEmails } from "@/lib/email/volunteer";
import { notifyAddress, SHEETS, type SheetSubmission } from "@/lib/sheet-delivery";
import type { VolunteerFields } from "@/lib/volunteer";

/** The tab's columns, in order; the script writes them as the header row the first time. */
export const SHEET_COLUMNS = [
  "Submitted (ISO)",
  "Submitted (London)",
  "First name",
  "Last name",
  "Email",
  "Phone",
  "Skills & experience",
  "Availability",
  "Source",
] as const;

export type SheetRow = Record<(typeof SHEET_COLUMNS)[number], string>;

export function sheetRow(fields: VolunteerFields, submittedAt: Date, source: string): SheetRow {
  return {
    "Submitted (ISO)": submittedAt.toISOString(),
    "Submitted (London)": dateTimeFormat.format(submittedAt),
    "First name": fields.firstName,
    "Last name": fields.lastName,
    Email: fields.email,
    Phone: fields.phone,
    "Skills & experience": fields.skills,
    Availability: fields.availability,
    Source: source,
  };
}

/** One application: its row for the Applications tab and both emails. */
export function volunteerSubmission(fields: VolunteerFields, source: string, submittedAt = new Date()): SheetSubmission {
  return {
    sheet: SHEETS.volunteer,
    source,
    submittedAt,
    row: sheetRow(fields, submittedAt, source),
    emails: volunteerEmails(fields, { origin: emailOrigin(), submittedAt, adminTo: notifyAddress() }),
  };
}
