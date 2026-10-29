/**
 * Where the site's forms go. Each submission is one row for the forms sheet (a Google Sheet in the
 * owner's account, written by the Apps Script web app in integrations/google-apps-script/forms-sheet.gs
 * and set up by docs/forms-sheet-setup.md) plus two emails, the sender's confirmation and the team's
 * notification, sent by the site from the team mailbox (lib/email/send.ts). The row goes first, so
 * the team's email can link to the sheet.
 */
import type { EmailMessage } from "@/lib/email/message";
import { mailConfigured, sendEmails, type CreateMailer } from "@/lib/email/send";
import { siteConfig } from "@/lib/site";

/** One tab per form. The script refuses any other name. */
export const SHEETS = { volunteer: "Applications", contact: "Contact", partnership: "Partnership" } as const;
export type SheetName = (typeof SHEETS)[keyof typeof SHEETS];

export type SheetSubmission = {
  sheet: SheetName;
  source: string;
  submittedAt: Date;
  row: Record<string, string>;
  /** The sender's confirmation first, then the team's notification. */
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

export type SheetPayload = { secret: string; sheet: SheetName; source: string; sentAt: string; row: Record<string, string> };

/** What the script needs for one row. */
export function sheetPayload(submission: SheetSubmission): SheetPayload {
  return { secret: formsSecret(), sheet: submission.sheet, source: submission.source, sentAt: submission.submittedAt.toISOString(), row: submission.row };
}

export type SheetResult = { ok: true; sheetUrl: string } | { ok: false; reason: "unavailable" | "failed" };

/**
 * Posts one row to the script. `unavailable` until the script URL is set; `failed` when the script
 * cannot be reached or reports a problem. Apps Script answers a POST with a redirect to the result,
 * which fetch follows; the result carries the tab's address for the team's email.
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
    let result: { ok?: boolean; error?: string; sheetUrl?: string } = {};
    try {
      result = JSON.parse(text);
    } catch {
      // Not JSON: a plain 200 still counts as recorded.
    }
    if (result.ok === false) throw new Error(result.error || "Forms sheet script reported a failure");
    return { ok: true, sheetUrl: result.sheetUrl || "" };
  } catch (error) {
    console.error(`[sheet] delivery failed (${submission.source})`, error);
    return { ok: false, reason: "failed" };
  }
}

export type DeliveryResult =
  | { ok: true; recorded: boolean; confirmed: boolean; notified: boolean }
  | { ok: false; reason: "unavailable" | "failed" };

/**
 * The whole delivery: the row to the sheet, then the emails from the team mailbox. The submission
 * counts as delivered when the row was recorded or the team was emailed; `confirmed` says whether
 * the sender's confirmation went out, so the form can promise it honestly. `unavailable` means
 * neither the sheet nor the mailbox is set up yet.
 */
export async function deliverSubmission(
  submission: SheetSubmission,
  deps: { fetchImpl?: typeof fetch; createMailer?: CreateMailer } = {},
): Promise<DeliveryResult> {
  const sheet = await deliverToSheet(submission, deps.fetchImpl);
  const mail = mailConfigured()
    ? await sendEmails(submission.emails, { sheetUrl: sheet.ok ? sheet.sheetUrl : "" }, deps.createMailer)
    : { configured: false, results: submission.emails.map(() => false), failed: [] };
  const confirmed = mail.results[0] === true;
  const notified = mail.results[submission.emails.length - 1] === true;
  if (sheet.ok || notified) return { ok: true, recorded: sheet.ok, confirmed, notified };
  const nothingSetUp = !sheet.ok && sheet.reason === "unavailable" && !mail.configured;
  return { ok: false, reason: nothingSetUp ? "unavailable" : "failed" };
}
