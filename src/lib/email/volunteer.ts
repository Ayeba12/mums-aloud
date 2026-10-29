/**
 * The two emails a volunteer application triggers: the applicant's confirmation, with a photo and
 * a copy of what they told us, and the team's notification with every detail and a reply button.
 * Both are rendered here, in the site's own words, and sent by the Google Apps Script that also
 * records the application (docs/forms-sheet-setup.md).
 */
import { apply, closing } from "@/content/volunteer";
import { dateTimeFormat } from "@/lib/dates";
import { siteConfig } from "@/lib/site";
import type { VolunteerFields } from "@/lib/volunteer";
import { buttonRow, detailCard, heading, paragraph, photoCard, SHEET_URL_TOKEN, shell, tag, type DetailRow, type EmailImage } from "./template";

import type { EmailMessage } from "./message";

export type { EmailMessage };

export type VolunteerEmailOptions = {
  /** Absolute origin for the logo and photo, e.g. https://mums-aloud.vercel.app */
  origin: string;
  submittedAt: Date;
  /** Where the team's notification goes. */
  adminTo: string;
};

/** The photo in the applicant's email (credited in docs/photo-credits.md). */
export const volunteerPhoto: EmailImage = {
  src: "/email/volunteer.jpg",
  alt: "Three women sitting together on a sofa, talking with mugs in hand.",
  width: 584,
  height: 329,
};

const TAG = "Volunteer With Us";
const labels = { ...apply.form.labels, phone: "Phone number" };

/** "Label: value" lines for the plain-text part, skipping empty fields. */
function textLines(rows: DetailRow[]): string {
  return rows.map(({ label, value }) => `${label}: ${value}`).join("\n");
}

function toldUs(fields: VolunteerFields): DetailRow[] {
  const rows: DetailRow[] = [
    { label: labels.skills, value: fields.skills },
    { label: labels.availability, value: fields.availability },
  ];
  if (fields.phone) rows.push({ label: labels.phone, value: fields.phone });
  rows.push({ label: labels.email, value: fields.email });
  return rows;
}

/** The confirmation the applicant receives. */
export function applicantEmail(fields: VolunteerFields, { origin }: VolunteerEmailOptions): EmailMessage {
  const first = fields.firstName;
  const subject = `We have your volunteer application, ${first}`;
  const intro = "We read every application ourselves, and we will be in touch by email soon to talk about where you could help.";
  const rows = toldUs(fields);
  const buttons = [
    { label: "Meet the community", href: `${origin}${siteConfig.joinUrl}` },
    { label: closing.secondary.label, href: `${origin}${closing.secondary.href}`, variant: "secondary" as const },
  ];
  const footerNote = "You are getting this email because you applied to volunteer at mumsaloud.com. If that was not you, reply to this email and we will delete the application.";

  const body = [
    photoCard(volunteerPhoto, origin),
    tag(TAG),
    heading(`Thank you, ${first}. Your application is`, "with us."),
    paragraph(intro),
    paragraph(apply.intro),
    detailCard("What you told us", rows),
    buttonRow(buttons),
  ].join("");

  const text = [
    `Thank you, ${first}. Your application is with us.`,
    "",
    intro,
    "",
    apply.intro,
    "",
    "What you told us",
    textLines(rows),
    "",
    `${buttons[0].label}: ${buttons[0].href}`,
    `${buttons[1].label}: ${buttons[1].href}`,
    "",
    `${siteConfig.name} - ${siteConfig.tagline}`,
    `${siteConfig.email} - ${siteConfig.phone.display}`,
    footerNote,
  ].join("\n");

  return {
    to: fields.email,
    subject,
    html: shell({ title: subject, preheader: `We have your application, ${first}. Here is what happens next.`, origin, body, footerNote }),
    text,
    fromName: siteConfig.name,
    replyTo: siteConfig.email,
  };
}

/** The notification the team receives. The sheet link is filled in by the script that sends it. */
export function adminEmail(fields: VolunteerFields, { origin, submittedAt, adminTo }: VolunteerEmailOptions): EmailMessage {
  const name = `${fields.firstName} ${fields.lastName}`;
  const subject = `New volunteer application: ${name}`;
  const when = dateTimeFormat.format(submittedAt);
  const intro = `Submitted ${when} through the Volunteer With Us form on mumsaloud.com.`;
  const rows: DetailRow[] = [
    { label: "Name", value: name },
    { label: labels.email, value: fields.email, href: `mailto:${fields.email}` },
    { label: labels.phone, value: fields.phone || "Not given" },
    { label: labels.availability, value: fields.availability },
    { label: labels.skills, value: fields.skills },
  ];
  const replyHref = `mailto:${fields.email}?subject=${encodeURIComponent(`Your volunteer application to ${siteConfig.name}`)}`;
  const buttons = [
    { label: `Reply to ${fields.firstName}`, href: replyHref },
    { label: "Open the applications sheet", href: SHEET_URL_TOKEN, variant: "secondary" as const },
  ];
  const footerNote = `Sent automatically by mumsaloud.com. ${fields.firstName} received a confirmation email at the same time.`;

  const body = [
    tag(TAG),
    heading(`${name} wants to`, "volunteer."),
    paragraph(intro),
    detailCard("The application", rows),
    buttonRow(buttons),
  ].join("");

  const text = [`${name} wants to volunteer.`, "", intro, "", textLines(rows), "", `Reply: ${replyHref}`, `Applications sheet: ${SHEET_URL_TOKEN}`, "", footerNote].join("\n");

  return {
    to: adminTo,
    subject,
    html: shell({ title: subject, preheader: `${fields.firstName} is available: ${fields.availability}`, origin, body, footerNote }),
    text,
    fromName: siteConfig.name,
    replyTo: fields.email,
  };
}

/** Both emails for one application, applicant first. */
export function volunteerEmails(fields: VolunteerFields, options: VolunteerEmailOptions): EmailMessage[] {
  return [applicantEmail(fields, options), adminEmail(fields, options)];
}
