/**
 * Newsletter sign-up, provider-aware. The owner will use an emailing service (MailerLite or
 * Mailchimp); the first one configured in the environment wins, a generic JSON webhook is the
 * fallback, and with nothing set the forms say plainly that sign-up is not open yet.
 *
 *   MAILERLITE_API_KEY (+ MAILERLITE_GROUP_ID)        → connect.mailerlite.com/api/subscribers
 *   MAILCHIMP_API_KEY (ends "-<dc>") + MAILCHIMP_AUDIENCE_ID → <dc>.api.mailchimp.com/3.0/lists/<id>/members
 *   NEWSLETTER_WEBHOOK_URL                             → POST {email, firstName, source}
 */

export type NewsletterProvider = "mailerlite" | "mailchimp" | "webhook";
export type Subscriber = { email: string; firstName?: string; source: string };
export type Env = Record<string, string | undefined>;

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NEWSLETTER_LIMITS = { firstName: 80, email: 254 } as const;

export function detectProvider(env: Env = process.env): NewsletterProvider | null {
  if (env.MAILERLITE_API_KEY) return "mailerlite";
  if (env.MAILCHIMP_API_KEY && env.MAILCHIMP_AUDIENCE_ID) return "mailchimp";
  if (env.NEWSLETTER_WEBHOOK_URL) return "webhook";
  return null;
}

/** The request for a provider, kept pure so it can be tested without sending anything. */
export function buildSubscribeRequest(provider: NewsletterProvider, subscriber: Subscriber, env: Env = process.env): { url: string; init: RequestInit } {
  const { email, firstName, source } = subscriber;
  if (provider === "mailerlite") {
    const groups = env.MAILERLITE_GROUP_ID ? [env.MAILERLITE_GROUP_ID] : [];
    return {
      url: "https://connect.mailerlite.com/api/subscribers",
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${env.MAILERLITE_API_KEY}` },
        // No `status`: the account's own double opt-in setting decides whether a confirmation email goes out.
        body: JSON.stringify({ email, fields: { ...(firstName ? { name: firstName } : {}), signup_source: source }, groups }),
      },
    };
  }
  if (provider === "mailchimp") {
    const key = env.MAILCHIMP_API_KEY ?? "";
    const dc = key.slice(key.lastIndexOf("-") + 1);
    return {
      url: `https://${dc}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_AUDIENCE_ID}/members`,
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Basic ${btoa(`mumsaloud:${key}`)}` },
        // "pending" asks Mailchimp to send its confirmation email (double opt-in).
        body: JSON.stringify({ email_address: email, status: "pending", merge_fields: firstName ? { FNAME: firstName } : {}, tags: [source] }),
      },
    };
  }
  return {
    url: env.NEWSLETTER_WEBHOOK_URL ?? "",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, firstName, source, sentAt: new Date().toISOString() }),
    },
  };
}

export type SubscribeResult = { ok: true; already?: boolean } | { ok: false; reason: "unavailable" | "failed" };

/** Sends the sign-up to whichever provider is configured. Never throws. */
export async function subscribe(subscriber: Subscriber, env: Env = process.env, fetcher: typeof fetch = fetch): Promise<SubscribeResult> {
  const provider = detectProvider(env);
  if (!provider) return { ok: false, reason: "unavailable" };
  const { url, init } = buildSubscribeRequest(provider, subscriber, env);
  try {
    const response = await fetcher(url, { ...init, signal: AbortSignal.timeout(10_000) });
    if (response.ok) return { ok: true };
    // Mailchimp answers 400 "Member Exists" for a known address; MailerLite simply updates it.
    if (provider === "mailchimp" && response.status === 400) {
      const detail = (await response.json().catch(() => ({}))) as { title?: string };
      if (detail.title === "Member Exists") return { ok: true, already: true };
    }
    throw new Error(`${provider} answered ${response.status}`);
  } catch (error) {
    console.error(`[newsletter] sign-up failed (${provider})`, error);
    return { ok: false, reason: "failed" };
  }
}
