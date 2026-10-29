/**
 * The Contact and Partnership forms' rows (one tab each on the forms sheet) and their emails,
 * handed to `deliverToSheet`.
 */
import { topicLabel, type ContactFields } from "@/lib/contact";
import { dateTimeFormat } from "@/lib/dates";
import { contactEmails, type ContactRoute } from "@/lib/email/contact";
import { emailOrigin } from "@/lib/email/template";
import { notifyAddress, SHEETS, type SheetSubmission } from "@/lib/sheet-delivery";

/** The tabs' columns, in order; the script writes them as the header row the first time. */
export const CONTACT_COLUMNS = ["Submitted (ISO)", "Submitted (London)", "Name", "Email", "Organisation", "Phone", "About", "Message", "Source"] as const;

export type ContactRow = Record<(typeof CONTACT_COLUMNS)[number], string>;

export function contactRow(fields: ContactFields, submittedAt: Date, source: string): ContactRow {
  return {
    "Submitted (ISO)": submittedAt.toISOString(),
    "Submitted (London)": dateTimeFormat.format(submittedAt),
    Name: fields.name,
    Email: fields.email,
    Organisation: fields.organisation,
    Phone: fields.phone,
    About: topicLabel(fields.topic),
    Message: fields.message,
    Source: source,
  };
}

/** One message or enquiry: its row for the Contact or Partnership tab and both emails. */
export function contactSubmission(fields: ContactFields, route: ContactRoute, source: string, submittedAt = new Date()): SheetSubmission {
  return {
    sheet: route === "partnership" ? SHEETS.partnership : SHEETS.contact,
    source,
    submittedAt,
    row: contactRow(fields, submittedAt, source),
    emails: contactEmails(fields, route, { origin: emailOrigin(), submittedAt, teamTo: notifyAddress() }),
  };
}
