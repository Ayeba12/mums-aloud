/**
 * The emails a Contact message or a Partnership enquiry triggers: the sender's confirmation, with
 * a photo and a copy of what they sent, and the team's notification with every detail and a reply
 * button. Rendered here in the site's words and sent by the forms sheet's Apps Script.
 */
import { contact } from "@/content/contact";
import { enquiry } from "@/content/partnership";
import { topicLabel, type ContactFields } from "@/lib/contact";
import { dateTimeFormat } from "@/lib/dates";
import { siteConfig } from "@/lib/site";
import type { EmailMessage } from "./message";
import { buttonRow, detailCard, heading, paragraph, photoCard, SHEET_URL_TOKEN, shell, tag, type DetailRow, type EmailImage } from "./template";

export type ContactRoute = "contact" | "partnership";

export type ContactEmailOptions = {
  /** Absolute origin for the logo and photo, e.g. https://mums-aloud.vercel.app */
  origin: string;
  submittedAt: Date;
  /** Where the team's notification goes. */
  teamTo: string;
};

/** The photo in the sender's confirmation (credited in docs/photo-credits.md). */
export const contactPhoto: EmailImage = {
  src: "/email/contact.jpg",
  alt: "Two women laughing together.",
  width: 584,
  height: 329,
};

/** The first word of a typed name, for a warmer greeting; the whole name when there is only one word. */
export const firstName = (name: string) => name.trim().split(/\s+/)[0] || name.trim();

const labels = {
  contact: { ...contact.form.labels, phone: "Phone number", organisation: "Organisation" },
  partnership: { ...enquiry.form.labels, phone: "Phone number" },
};

const routeCopy = {
  contact: {
    tag: "Contact",
    thing: "message",
    form: "Contact",
    sheetLabel: "Open the messages sheet",
    replySubject: `Your message to ${siteConfig.name}`,
    intro: "We will get it to the right person and reply to you by email.",
    second: `${siteConfig.name} is not a crisis service. If you need help right now, call 999 in an emergency, NHS 111 for urgent health help, or Samaritans on 116 123, any time.`,
    buttons: (origin: string) => [
      { label: contact.closing.primary.label, href: `${origin}${siteConfig.joinUrl}` },
      { label: contact.urgent.link.label, href: `${origin}${contact.urgent.link.href}`, variant: "secondary" as const },
    ],
  },
  partnership: {
    tag: enquiry.tag,
    thing: "enquiry",
    form: "Partnership",
    sheetLabel: "Open the enquiries sheet",
    replySubject: `Your partnership enquiry to ${siteConfig.name}`,
    intro: "We read every enquiry ourselves and will reply by email to talk about what you have in mind.",
    second: "Mums Aloud is keen to adopt and foster innovative partnerships and collaborations.",
    buttons: (origin: string) => [
      { label: "What we offer", href: `${origin}/partnership/` },
      { label: "See how we help", href: `${origin}/services/`, variant: "secondary" as const },
    ],
  },
} as const;

/** "Label: value" lines for the plain-text part. */
const textLines = (rows: DetailRow[]) => rows.map(({ label, value }) => `${label}: ${value}`).join("\n");

function sentUs(fields: ContactFields, route: ContactRoute): DetailRow[] {
  const l = labels[route];
  const rows: DetailRow[] = [];
  if (route === "contact") rows.push({ label: contact.form.labels.topic, value: topicLabel(fields.topic) });
  if (route === "partnership" || fields.organisation) rows.push({ label: l.organisation, value: fields.organisation });
  rows.push({ label: l.message, value: fields.message });
  if (fields.phone) rows.push({ label: l.phone, value: fields.phone });
  rows.push({ label: l.email, value: fields.email });
  return rows;
}

/** The confirmation the sender receives. */
export function senderEmail(fields: ContactFields, route: ContactRoute, { origin }: ContactEmailOptions): EmailMessage {
  const copy = routeCopy[route];
  const first = firstName(fields.name);
  const subject = `We have your ${route === "partnership" ? "partnership enquiry" : "message"}, ${first}`;
  const rows = sentUs(fields, route);
  const buttons = copy.buttons(origin);
  const footerNote = `You are getting this email because you sent a ${copy.thing} through mumsaloud.com. If that was not you, reply to this email and we will delete it.`;

  const body = [
    photoCard(contactPhoto, origin),
    tag(copy.tag),
    heading(`Thank you, ${first}. Your ${copy.thing} is`, "with us."),
    paragraph(copy.intro),
    paragraph(copy.second),
    detailCard("What you sent us", rows),
    buttonRow(buttons),
  ].join("");

  const text = [
    `Thank you, ${first}. Your ${copy.thing} is with us.`,
    "",
    copy.intro,
    "",
    copy.second,
    "",
    "What you sent us",
    textLines(rows),
    "",
    ...buttons.map((button) => `${button.label}: ${button.href}`),
    "",
    `${siteConfig.name} - ${siteConfig.tagline}`,
    `${siteConfig.email} - ${siteConfig.phone.display}`,
    footerNote,
  ].join("\n");

  return {
    to: fields.email,
    subject,
    html: shell({ title: subject, preheader: `We have your ${copy.thing}, ${first}. Here is what happens next.`, origin, body, footerNote }),
    text,
    fromName: siteConfig.name,
    replyTo: siteConfig.email,
  };
}

/** The notification the team receives. The sheet link is filled in by the script that sends it. */
export function teamEmail(fields: ContactFields, route: ContactRoute, { origin, submittedAt, teamTo }: ContactEmailOptions): EmailMessage {
  const copy = routeCopy[route];
  const l = labels[route];
  const first = firstName(fields.name);
  const when = dateTimeFormat.format(submittedAt);
  const about = topicLabel(fields.topic);
  const partnership = route === "partnership";
  const subject = partnership ? `New partnership enquiry: ${fields.organisation}` : `New message from ${fields.name}: ${about}`;
  const title = partnership ? heading(`${fields.organisation} wants to`, "partner.") : heading(`${fields.name} sent a`, "message.");
  const intro = partnership
    ? `${fields.name} submitted this ${when} through the Partnership form on mumsaloud.com.`
    : `Submitted ${when} through the Contact form on mumsaloud.com, about: ${about}.`;

  const rows: DetailRow[] = [];
  if (partnership) rows.push({ label: l.organisation, value: fields.organisation });
  rows.push({ label: "Name", value: fields.name });
  rows.push({ label: l.email, value: fields.email, href: `mailto:${fields.email}` });
  if (!partnership && fields.organisation) rows.push({ label: l.organisation, value: fields.organisation });
  rows.push({ label: l.phone, value: fields.phone || "Not given" });
  if (!partnership) rows.push({ label: contact.form.labels.topic, value: about });
  rows.push({ label: l.message, value: fields.message });

  const replyHref = `mailto:${fields.email}?subject=${encodeURIComponent(copy.replySubject)}`;
  const buttons = [
    { label: `Reply to ${first}`, href: replyHref },
    { label: copy.sheetLabel, href: SHEET_URL_TOKEN, variant: "secondary" as const },
  ];
  const footerNote = `Sent automatically by mumsaloud.com. ${first} received a confirmation email at the same time.`;

  const body = [tag(copy.tag), title, paragraph(intro), detailCard(partnership ? "The enquiry" : "The message", rows), buttonRow(buttons)].join("");
  const text = [
    partnership ? `${fields.organisation} wants to partner.` : `${fields.name} sent a message.`,
    "",
    intro,
    "",
    textLines(rows),
    "",
    `Reply: ${replyHref}`,
    `Sheet: ${SHEET_URL_TOKEN}`,
    "",
    footerNote,
  ].join("\n");

  return {
    to: teamTo,
    subject,
    html: shell({ title: subject, preheader: fields.message.slice(0, 140), origin, body, footerNote }),
    text,
    fromName: siteConfig.name,
    replyTo: fields.email,
  };
}

/** Both emails for one submission, the sender's confirmation first. */
export function contactEmails(fields: ContactFields, route: ContactRoute, options: ContactEmailOptions): EmailMessage[] {
  return [senderEmail(fields, route, options), teamEmail(fields, route, options)];
}
