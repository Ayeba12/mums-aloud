"use server";

import { apply } from "@/content/volunteer";
import { deliverToInbox, fieldLines, mailtoHref } from "@/lib/inbox";
import { readVolunteerFields, validateVolunteer, type VolunteerErrors, type VolunteerFields } from "@/lib/volunteer";
import { deliverToSheet } from "@/lib/volunteer-sheet";

export type VolunteerState = {
  status: "idle" | "success" | "error" | "unavailable";
  message?: string;
  errors?: VolunteerErrors;
  /** What was typed, handed back so the form keeps it after a failed submit. */
  values?: VolunteerFields;
  /** A prefilled email to the team, offered when the online form cannot deliver. */
  fallback?: { href: string; label: string };
};

const SOURCE = "mumsaloud.com volunteer";

/** Labels for the email body: the form's own, without the "(optional)" hint. */
const emailLabels = { ...apply.form.labels, phone: "Phone number" };

/**
 * Volunteer application. Goes to the applications sheet (VOLUNTEER_WEBHOOK_URL), which also sends
 * the applicant's confirmation and the team's notification; failing that, to the team inbox route
 * (CONTACT_WEBHOOK_URL); failing both, the visitor gets a prefilled email instead, so nothing is lost.
 */
export async function sendVolunteerApplication(_previous: VolunteerState, formData: FormData): Promise<VolunteerState> {
  const fields = readVolunteerFields(formData);
  if (formData.get("website")) return { status: "success", message: "Thank you. We have your application." }; // honeypot

  const errors = validateVolunteer(fields);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values: fields };
  }

  const sheet = await deliverToSheet(fields, SOURCE);
  if (sheet.ok) {
    return { status: "success", message: "Thank you. Your application is with our team, and a confirmation email is on its way to you." };
  }
  const inbox = await deliverToInbox(fields, SOURCE);
  if (inbox.ok) {
    return { status: "success", message: "Thank you. Your application is with our team and we will be in touch by email soon." };
  }

  const fallback = { href: mailtoHref("Volunteer application", fieldLines(fields, emailLabels)), label: apply.form.fallback };
  if (sheet.reason === "failed" || inbox.reason === "failed") {
    return {
      status: "error",
      message: "Something went wrong on our side and your application was not sent. Please try again in a moment, or email it to us instead.",
      values: fields,
      fallback,
    };
  }
  return {
    status: "unavailable",
    message: "The online form is not open yet, so your application was not sent. You can email it to us instead: everything you typed is already filled in.",
    values: fields,
    fallback,
  };
}
