"use server";

import { EMAIL, NEWSLETTER_LIMITS, subscribe } from "@/lib/newsletter";

export type NewsletterState = {
  status: "idle" | "success" | "error" | "unavailable";
  message?: string;
  /** Field-level problems, in the form's own words. */
  errors?: { email?: string; firstName?: string };
  values?: { email: string; firstName: string };
};

/**
 * Newsletter sign-up for the footer pill and the dialog. Sends to the configured provider
 * (MailerLite, Mailchimp or a webhook) and never pretends: with no provider it says so.
 */
export async function subscribeToNewsletter(_previous: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const source = String(formData.get("source") ?? "mumsaloud.com").slice(0, 40);
  const values = { email, firstName };
  if (formData.get("website")) return { status: "success", message: "Thank you. Please check your inbox." }; // honeypot

  const errors: NewsletterState["errors"] = {};
  if (!EMAIL.test(email) || email.length > NEWSLETTER_LIMITS.email) errors.email = "Please enter a valid email address, like name@example.com.";
  if (firstName.length > NEWSLETTER_LIMITS.firstName) errors.firstName = "That name is longer than we can take.";
  if (Object.keys(errors).length > 0) return { status: "error", message: errors.email ?? errors.firstName, errors, values };

  const result = await subscribe({ email, firstName: firstName || undefined, source });
  if (result.ok) {
    return {
      status: "success",
      message: result.already ? "You are already on the list. Thank you for staying close." : "Thank you. Please check your inbox to confirm, and welcome in.",
    };
  }
  if (result.reason === "unavailable") {
    return { status: "unavailable", message: "Newsletter sign-up is not open yet. Listen to the podcast in the meantime.", values };
  }
  return { status: "error", message: "Something went wrong on our side. Please try again in a moment.", values };
}
