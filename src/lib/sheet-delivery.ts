/**
 * The site's forms deliver through one Google Apps Script web app attached to the forms sheet in
 * the owner's Google account (integrations/google-apps-script/forms-sheet.gs, set up by
 * docs/forms-sheet-setup.md). For each submission the site renders one row and the emails (the
 * sender's confirmation, the team's notification) and posts them with a shared secret; the script
 * appends the row to the named tab and sends the emails as given.
 */
import type { EmailMessage } from "@/lib/email/message";
import { siteConfig } from "@/lib/site";

/** One tab per form. The script refuses any other name. */
export const SHEETS = { volunteer: "Applications", contact: "Contact", partnership: "Partnership" } as const;
export type SheetName = (typeof SHEETS)[keyof typeof SHEETS];

export type SheetSubmission = {
  sheet: SheetName;
  source: string;
  submittedAt: Date;
  row: Record<string, string>;
  emails: EmailMessage[];
};

/**
 * The script's address and secret. FORMS_* are the documented names; VOLUNTEER_* were the first
 * ones (the volunteer form came first) and still work, so Vercel need not be touched.
 */
export const formsWebhook = () => process.env.FORMS_WEBHOOK_URL || process.env.VOLUNTEER_WEBHOOK_URL || "";
export const formsSecret = () => process.env.FORMS_WEBHOOK_SECRET || process.env.VOLUNTEER_WEBHOOK_SECRET || "";
/** Where the team's notifications go. */
export const notifyAddress = () => process.env.FORMS_NOTIFY_EMAIL || process.env.VOLUNTEER_NOTIFY_EMAIL || siteConfig.email;

export type SheetPayload = { secret: string; sheet: SheetName; source: string; sentAt: string; row: Record<string, string>; emails: EmailMessage[] };

/** Everything the script needs for one submission. */
export function sheetPayload(submission: SheetSubmission): SheetPayload {
  return {
    secret: formsSecret(),
    sheet: submission.sheet,
    source: submission.source,
    sentAt: submission.submittedAt.toISOString(),
    row: submission.row,
    emails: submission.emails,
  };
}

export type SheetResult = { ok: true } | { ok: false; reason: "unavailable" | "failed" };

/**
 * Posts one submission to the script. `unavailable` until the script URL is set; `failed` when the
 * script cannot be reached or reports a problem, so the caller can try another route. Apps Script
 * answers a POST with a redirect to the result, which fetch follows.
 */
export async function deliverToSheet(submission: SheetSubmission, fetchImpl: typeof fetch = fetch): Promise<SheetResult> {
  const url = formsWebhook();
  if (!url) return { ok: false, reason: "unavailable" };
  try {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(sheetPayload(submission)),
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) throw new Error(`Forms sheet endpoint returned ${response.status}`);
    const text = await response.text();
    let result: { ok?: boolean; error?: string; failures?: string[] } = {};
    try {
      result = JSON.parse(text);
    } catch {
      // Not JSON: a plain 200 still counts as delivered.
    }
    if (result.ok === false) throw new Error(result.error || "Forms sheet script reported a failure");
    if (result.failures?.length) console.error(`[sheet] ${submission.sheet} row saved, email(s) not sent:`, result.failures);
    return { ok: true };
  } catch (error) {
    console.error(`[sheet] delivery failed (${submission.source})`, error);
    return { ok: false, reason: "failed" };
  }
}
