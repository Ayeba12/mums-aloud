"use server";

import { readContactFields, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";
import { contactSubmission } from "@/lib/contact-sheet";
import type { ContactRoute } from "@/lib/email/contact";
import { deliverToInbox, fieldLines, mailtoHref } from "@/lib/inbox";
import { deliverSubmission } from "@/lib/sheet-delivery";
import { siteConfig } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error" | "unavailable";
  message?: string;
  errors?: ContactErrors;
  /** What was typed, handed back so the form keeps it after a failed submit. */
  values?: ContactFields;
  /** A prefilled email to the team, offered when the online form cannot deliver. */
  fallback?: { href: string; label: string };
};

type Route = { kind: ContactRoute; source: string; subject: string; topic?: string; requireOrganisation?: boolean };

const labels = { name: "Name", email: "Email", organisation: "Organisation", phone: "Phone", topic: "About", message: "Message" };

/**
 * Records a message on the forms sheet and emails the sender's confirmation and the team's
 * notification from the team mailbox; failing that, the team inbox route (CONTACT_WEBHOOK_URL);
 * failing both, the visitor gets a prefilled email to the team instead, so no message is ever lost.
 */
async function submit(formData: FormData, route: Route): Promise<ContactState> {
  const fields = { ...readContactFields(formData), ...(route.topic ? { topic: route.topic } : {}) };
  if (formData.get("website")) return { status: "success", message: "Thank you. We have your message." }; // honeypot

  const errors = validateContact(fields, { requireOrganisation: route.requireOrganisation });
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values: fields };
  }

  const thing = route.kind === "partnership" ? "enquiry" : "message";
  const delivery = await deliverSubmission(contactSubmission(fields, route.kind, route.source));
  if (delivery.ok) {
    return {
      status: "success",
      message: delivery.confirmed
        ? `Thank you. Your ${thing} is with us, and a confirmation email is on its way to you.`
        : `Thank you. Your ${thing} is with us and we will reply by email.`,
    };
  }
  const inbox = await deliverToInbox(fields, route.source);
  if (inbox.ok) return { status: "success", message: `Thank you. Your ${thing} is with us and we will reply by email.` };

  const fallback = { href: mailtoHref(route.subject, fieldLines(fields, labels)), label: `Email ${siteConfig.email} instead` };
  if (delivery.reason === "failed" || inbox.reason === "failed") {
    return {
      status: "error",
      message: `Something went wrong on our side and your ${thing} was not sent. Please try again in a moment, or email us instead.`,
      values: fields,
      fallback,
    };
  }
  return {
    status: "unavailable",
    message: `The online form is not open yet, so your ${thing} was not sent. Email it to us instead: the link below opens an email with everything you typed.`,
    values: fields,
    fallback,
  };
}

/** The Contact page form: the visitor picks the topic. */
export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  return submit(formData, { kind: "contact", source: "mumsaloud.com contact", subject: "Message from the website" });
}

/** The Partnership page form: always a partnership enquiry, and the organisation is required. */
export async function sendPartnershipEnquiry(_previous: ContactState, formData: FormData): Promise<ContactState> {
  return submit(formData, {
    kind: "partnership",
    source: "mumsaloud.com partnership",
    subject: "Partnership enquiry",
    topic: "partnership",
    requireOrganisation: true,
  });
}
