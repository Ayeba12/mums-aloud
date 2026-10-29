import type { ContactFields } from "@/lib/contact";
import { senderEmail, teamEmail } from "@/lib/email/contact";
import type { EmailMessage } from "@/lib/email/message";
import { emailOrigin } from "@/lib/email/template";
import { adminEmail, applicantEmail } from "@/lib/email/volunteer";
import { siteConfig } from "@/lib/site";
import type { VolunteerFields } from "@/lib/volunteer";

/** Made-up submissions, so the previews never show a real person. */
const volunteer: VolunteerFields = {
  firstName: "Amara",
  lastName: "Okafor",
  email: "amara@example.com",
  phone: "+44 7700 900123",
  skills:
    "Health visitor for eight years and a mum of two. I have lived through postnatal depression and would love to help other mums feel less alone, especially in the first year.\n\nHappy to run a session, mentor one mum, or help behind the scenes at events.",
  availability: "Weekday evenings, one Saturday a month",
};

const message: ContactFields = {
  name: "Amara Okafor",
  email: "amara@example.com",
  organisation: "",
  phone: "+44 7700 900123",
  topic: "mamas-escape",
  message: "Hello. A friend told me about Mama's Escape. I am six months in with my first baby and would love to know how the community works and when the next welcome session is.",
};

const partnership: ContactFields = {
  name: "Daniel Mensah",
  email: "daniel@example.org",
  organisation: "Northfield Family Hub",
  phone: "",
  topic: "partnership",
  message:
    "We run a weekly drop-in for new parents in Trafford and would like to offer peer support sessions led by Black mothers.\n\nCould we talk about a pilot in the new year, and what training your mentor mums would need from us?",
};

const submittedAt = new Date("2026-10-29T12:45:00Z");

const previews: Record<string, () => EmailMessage> = {
  "volunteer-applicant": () => applicantEmail(volunteer, { origin: emailOrigin(), submittedAt, adminTo: siteConfig.email }),
  "volunteer-admin": () => adminEmail(volunteer, { origin: emailOrigin(), submittedAt, adminTo: siteConfig.email }),
  "contact-sender": () => senderEmail(message, "contact", { origin: emailOrigin(), submittedAt, teamTo: siteConfig.email }),
  "contact-team": () => teamEmail(message, "contact", { origin: emailOrigin(), submittedAt, teamTo: siteConfig.email }),
  "partnership-sender": () => senderEmail(partnership, "partnership", { origin: emailOrigin(), submittedAt, teamTo: siteConfig.email }),
  "partnership-team": () => teamEmail(partnership, "partnership", { origin: emailOrigin(), submittedAt, teamTo: siteConfig.email }),
};

export const previewNames = Object.keys(previews);

/**
 * The transactional emails as they render, for the style guide: /style-guide/emails/<name>/.
 * Not for search engines. Inboxes that block web fonts show Georgia and Arial instead.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const render = previews[name];
  if (!render) return new Response("Not found", { status: 404 });
  return new Response(render().html, { headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" } });
}
