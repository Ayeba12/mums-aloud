/**
 * Volunteer applications go to a Google Sheet, and two emails go out, through one Google Apps
 * Script web app in the owner's Google account (integrations/google-apps-script/volunteer-sheet.gs,
 * set up by docs/volunteer-sheet-setup.md). The site renders the row and both emails and posts
 * them with a shared secret; the script appends the row and sends the emails as given.
 */
import { dateTimeFormat } from "@/lib/dates";
import { emailOrigin } from "@/lib/email/template";
import { volunteerEmails, type EmailMessage } from "@/lib/email/volunteer";
import { siteConfig } from "@/lib/site";
import type { VolunteerFields } from "@/lib/volunteer";

/** The sheet's columns, in order; the script writes them as the header row the first time. */
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

export type SheetPayload = { secret: string; source: string; sentAt: string; row: SheetRow; emails: EmailMessage[] };

/** Everything the script needs for one application. */
export function sheetPayload(fields: VolunteerFields, source: string, submittedAt = new Date()): SheetPayload {
  const adminTo = process.env.VOLUNTEER_NOTIFY_EMAIL || siteConfig.email;
  return {
    secret: process.env.VOLUNTEER_WEBHOOK_SECRET || "",
    source,
    sentAt: submittedAt.toISOString(),
    row: sheetRow(fields, submittedAt, source),
    emails: volunteerEmails(fields, { origin: emailOrigin(), submittedAt, adminTo }),
  };
}

export type SheetResult = { ok: true } | { ok: false; reason: "unavailable" | "failed" };

/**
 * Posts one application to the script. `unavailable` until VOLUNTEER_WEBHOOK_URL is set; `failed`
 * when the script cannot be reached or reports a problem, so the caller can try another route.
 * Apps Script answers a POST with a redirect to the result, which fetch follows.
 */
export async function deliverToSheet(fields: VolunteerFields, source: string, fetchImpl: typeof fetch = fetch): Promise<SheetResult> {
  const url = process.env.VOLUNTEER_WEBHOOK_URL;
  if (!url) return { ok: false, reason: "unavailable" };
  try {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(sheetPayload(fields, source)),
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) throw new Error(`Volunteer sheet endpoint returned ${response.status}`);
    const text = await response.text();
    let result: { ok?: boolean; error?: string; failures?: string[] } = {};
    try {
      result = JSON.parse(text);
    } catch {
      // Not JSON: a plain 200 still counts as delivered.
    }
    if (result.ok === false) throw new Error(result.error || "Volunteer sheet script reported a failure");
    if (result.failures?.length) console.error("[volunteer-sheet] row saved, email(s) not sent:", result.failures);
    return { ok: true };
  } catch (error) {
    console.error(`[volunteer-sheet] delivery failed (${source})`, error);
    return { ok: false, reason: "failed" };
  }
}
