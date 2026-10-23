"use server";

import { apply } from "@/content/volunteer";
import { deliverToInbox, fieldLines, mailtoHref } from "@/lib/inbox";
import { readVolunteerFields, validateVolunteer, type VolunteerErrors, type VolunteerFields } from "@/lib/volunteer";

export type VolunteerState = {
  status: "idle" | "success" | "error" | "unavailable";
  message?: string;
  errors?: VolunteerErrors;
  /** What was typed, handed back so the form keeps it after a failed submit. */
  values?: VolunteerFields;
  /** A prefilled email to the team, offered while the online form is not open yet. */
  fallback?: { href: string; label: string };
};

/** Labels for the email body: the form's own, without the "(optional)" hint. */
const emailLabels = { ...apply.form.labels, phone: "Phone number" };

/**
 * Volunteer application. Delivers to the team inbox route (CONTACT_WEBHOOK_URL) when it is set.
 * Until then it hands the visitor a prefilled email instead, so no application is lost.
 */
export async function sendVolunteerApplication(_previous: VolunteerState, formData: FormData): Promise<VolunteerState> {
  const fields = readVolunteerFields(formData);
  if (formData.get("website")) return { status: "success", message: "Thank you. We have your application." }; // honeypot

  const errors = validateVolunteer(fields);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values: fields };
  }

  const result = await deliverToInbox(fields, "mumsaloud.com volunteer");
  if (result.ok) {
    return { status: "success", message: "Thank you. Your application is with our team and we will be in touch by email soon." };
  }
  if (result.reason === "unavailable") {
    return {
      status: "unavailable",
      message: "The online form is not open yet, so your application was not sent. You can email it to us instead: everything you typed is already filled in.",
      values: fields,
      fallback: { href: mailtoHref("Volunteer application", fieldLines(fields, emailLabels)), label: apply.form.fallback },
    };
  }
  return {
    status: "error",
    message: "Something went wrong on our side and your application was not sent. Please try again in a moment.",
    values: fields,
  };
}
