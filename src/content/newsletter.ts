/**
 * The newsletter dialog and footer form. The owner will send the newsletter through an emailing
 * service (MailerLite or Mailchimp); every "Get the newsletter" button opens this dialog.
 */
import type { AccentText } from "@/components/ui/Heading";

export const newsletterDialog = {
  tag: "The newsletter",
  heading: { lead: "Real stories,", accent: "straight to your inbox." } satisfies AccentText,
  intro: "Voices from the community, what is coming up, and one small thing to try. A few times a month, never noise.",
  labels: { firstName: "First name (optional)", email: "Email address" },
  placeholders: { firstName: "Ama", email: "name@example.com" },
  submit: "Get the newsletter",
  sending: "Sending…",
  consent: "We only send the newsletter, and you can unsubscribe any time.",
  close: "Close",
  done: "Done",
};

export const footerNewsletter = {
  heading: "Get the newsletter",
  placeholder: "Email address",
  hint: "Real stories and real support, straight to your inbox. Unsubscribe any time.",
};
