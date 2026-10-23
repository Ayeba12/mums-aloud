import { siteConfig } from "@/lib/site";

/**
 * Where the site's forms deliver: a JSON POST to CONTACT_WEBHOOK_URL (the owner's chosen route
 * into admin@mumsaloud.com). Until that is set, callers get `unavailable` and show the visitor a
 * prefilled email instead, so nothing typed is ever lost silently.
 */
export type InboxResult = { ok: true } | { ok: false; reason: "unavailable" | "failed" };

export async function deliverToInbox(payload: Record<string, unknown>, source: string): Promise<InboxResult> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return { ok: false, reason: "unavailable" };
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, source, sentAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Inbox endpoint returned ${response.status}`);
    return { ok: true };
  } catch (error) {
    console.error(`[inbox] delivery failed (${source})`, error);
    return { ok: false, reason: "failed" };
  }
}

/** A `mailto:` link to the team with the subject and body filled in from what the visitor typed. */
export function mailtoHref(subject: string, body: string, to: string = siteConfig.email): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** "Label: value" lines for an email body, skipping empty fields. */
export function fieldLines(fields: Record<string, string | undefined>, labels: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, value]) => value && value.trim())
    .map(([key, value]) => `${labels[key] ?? key}: ${value}`)
    .join("\n");
}
