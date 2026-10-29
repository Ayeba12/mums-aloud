import { emailOrigin } from "@/lib/email/template";
import { adminEmail, applicantEmail } from "@/lib/email/volunteer";
import { siteConfig } from "@/lib/site";
import type { VolunteerFields } from "@/lib/volunteer";

/** A made-up application, so the previews never show a real person. */
const sample: VolunteerFields = {
  firstName: "Amara",
  lastName: "Okafor",
  email: "amara@example.com",
  phone: "+44 7700 900123",
  skills:
    "Health visitor for eight years and a mum of two. I have lived through postnatal depression and would love to help other mums feel less alone, especially in the first year.\n\nHappy to run a session, mentor one mum, or help behind the scenes at events.",
  availability: "Weekday evenings, one Saturday a month",
};

const emails = { "volunteer-applicant": applicantEmail, "volunteer-admin": adminEmail } as const;

/**
 * The transactional emails as they render, for the style guide: /style-guide/emails/<name>/.
 * Not for search engines. Inboxes that block web fonts show Georgia and Arial instead.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const render = emails[name as keyof typeof emails];
  if (!render) return new Response("Not found", { status: 404 });
  const message = render(sample, { origin: emailOrigin(), submittedAt: new Date("2026-10-29T12:45:00Z"), adminTo: siteConfig.email });
  return new Response(message.html, { headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" } });
}
