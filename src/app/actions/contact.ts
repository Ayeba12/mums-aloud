"use server";

import { readContactFields, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";

export type ContactState = {
  status: "idle" | "success" | "error" | "unavailable";
  message?: string;
  errors?: ContactErrors;
  /** What was typed, handed back so the form keeps it after a failed submit. */
  values?: ContactFields;
};

/**
 * Contact form. Forwards the message as JSON to CONTACT_WEBHOOK_URL (the owner's chosen inbox
 * route) when it is set. Until then it reports that the form is not open, so no message is ever
 * silently dropped.
 */
export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const fields = readContactFields(formData);
  if (formData.get("website")) return { status: "success", message: "Thank you. We have your message." }; // honeypot

  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values: fields };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return {
      status: "unavailable",
      message: "The contact form is not open yet, so your message was not sent. The other ways to reach us on this page do work.",
      values: fields,
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...fields, source: "mumsaloud.com contact", sentAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);
    return { status: "success", message: "Thank you. Your message is with us and we will reply by email." };
  } catch (error) {
    console.error("[contact] sending failed", error);
    return { status: "error", message: "Something went wrong on our side and your message was not sent. Please try again in a moment.", values: fields };
  }
}
