"use server";

export type NewsletterState = { status: "idle" | "success" | "error" | "unavailable"; message?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter sign-up. Forwards to the provider webhook when NEWSLETTER_WEBHOOK_URL is set.
 * Until a platform is chosen it reports that sign-up is not open, so the form never
 * pretends to have subscribed anyone.
 */
export async function subscribeToNewsletter(_previous: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();
  if (formData.get("website")) return { status: "success", message: "Thank you. Please check your inbox." }; // honeypot
  if (!EMAIL.test(email)) return { status: "error", message: "Please enter a valid email address, like name@example.com." };

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    return { status: "unavailable", message: "Newsletter sign-up is not open yet. Listen to the podcast in the meantime." };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "mumsaloud.com footer" }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Provider returned ${response.status}`);
    return { status: "success", message: "Thank you. Please check your inbox to confirm." };
  } catch (error) {
    console.error("[newsletter] subscription failed", error);
    return { status: "error", message: "Something went wrong on our side. Please try again in a moment." };
  }
}
