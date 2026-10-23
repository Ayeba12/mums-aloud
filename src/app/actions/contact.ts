"use server";

import { readContactFields, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";

export type ContactState = {
  status: "idle" | "success" | "error" | "unavailable";
  message?: string;
  errors?: ContactErrors;
  /** What was typed, handed back so the form keeps it after a failed submit. */
  values?: ContactFields;
};

type Route = { source: string; topic?: string; requireOrganisation?: boolean };

/**
 * Forwards a message as JSON to CONTACT_WEBHOOK_URL (the owner's chosen inbox route) when it is
 * set. Until then it reports that the form is not open, so no message is ever silently dropped.
 */
async function submit(formData: FormData, route: Route): Promise<ContactState> {
  const fields = { ...readContactFields(formData), ...(route.topic ? { topic: route.topic } : {}) };
  if (formData.get("website")) return { status: "success", message: "Thank you. We have your message." }; // honeypot

  const errors = validateContact(fields, { requireOrganisation: route.requireOrganisation });
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values: fields };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return {
      status: "unavailable",
      message: "The form is not open yet, so your message was not sent. The other ways to reach us on this site do work.",
      values: fields,
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...fields, source: route.source, sentAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);
    return { status: "success", message: "Thank you. Your message is with us and we will reply by email." };
  } catch (error) {
    console.error(`[contact] sending failed (${route.source})`, error);
    return { status: "error", message: "Something went wrong on our side and your message was not sent. Please try again in a moment.", values: fields };
  }
}

/** The Contact page form: the visitor picks the topic. */
export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  return submit(formData, { source: "mumsaloud.com contact" });
}

/** The Partnership page form: always a partnership enquiry, and the organisation is required. */
export async function sendPartnershipEnquiry(_previous: ContactState, formData: FormData): Promise<ContactState> {
  return submit(formData, { source: "mumsaloud.com partnership", topic: "partnership", requireOrganisation: true });
}
