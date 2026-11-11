/**
 * The newsletter dialog and footer form. The owner sends the newsletter with SendFox (11 Nov 2026);
 * every "Get the newsletter" button opens this dialog. Everyone who signs up gets a welcome email
 * with two free editions of the Mama's Escape magazine (owner, 11 Nov 2026), so the forms say so.
 */
import type { AccentText } from "@/components/ui/Heading";
import { uploadUrl } from "@/lib/wordpress/urls";

export type NewsletterGift = {
  id: "edition-1" | "edition-2";
  /** As printed on the cover. */
  edition: string;
  pages: number;
  title: string;
  /** What is inside, in a sentence, read from the magazine itself. */
  summary: string;
  /** The PDF in the WordPress media library. */
  pdf: string;
  size: string;
};

/**
 * The two free magazines, oldest first. Summaries written from the editions themselves (read 11 Nov
 * 2026). The PDFs live in the CMS media library, like the guides, so a new edition needs no code.
 */
export const newsletterGifts: readonly NewsletterGift[] = [
  {
    id: "edition-1",
    edition: "Volume 1, No. 1",
    pages: 8,
    title: "From chaos to calm",
    summary: "Simple shifts for overwhelmed mums, the 10-minute rule, Escape Bingo, a letter from Bokun and the four mum types.",
    pdf: uploadUrl("2026/11/Mamas-Escape-Vol-1-No-1.pdf"),
    size: "12 MB",
  },
  {
    id: "edition-2",
    edition: "Volume 1, Edition 2",
    pages: 16,
    title: "For the woman, not just the role",
    summary: "Real stories from mums who have been there, Who Am I Now?, the Dear Mum affirmations, and the question so many of us carry: can I love my baby and still miss my old life?",
    pdf: uploadUrl("2026/11/Mamas-Escape-Vol-1-Edition-2.pdf"),
    size: "45 MB",
  },
];

/** The welcome email's words (`lib/email/newsletter.ts` lays them out). */
export const welcomeEmail = {
  tag: "The newsletter",
  subject: "Welcome to the newsletter: your two free Mama's Escape magazines",
  heading: { named: (first: string) => `Welcome, ${first}. Your free magazines are`, unnamed: "Welcome. Your free magazines are", accent: "here." },
  intro: "Thank you for joining the Mums Aloud newsletter. As a welcome, here are two editions of Mama's Escape, our magazine for the woman, not just the role. They are yours to keep: download them now, or come back to this email when you have a quiet moment.",
  download: "Download the magazine",
  bringsTitle: "What the newsletter brings",
  brings: [
    "Real stories from mums who have been there",
    "Small things to try, even on the busiest day",
    "News from the Mama's Escape community, the podcast and our events",
    "A few emails a month, never noise",
  ],
  footerNote: "You are getting this email because you signed up for the newsletter at mumsaloud.com. If that was not you, reply to this email and we will remove you. Every newsletter has an unsubscribe link.",
};

export const newsletterDialog = {
  tag: "The newsletter",
  heading: { lead: "Real stories,", accent: "straight to your inbox." } satisfies AccentText,
  intro: "Join and we will email you two free editions of Mama's Escape, our magazine for mums. Then voices from the community, what is coming up, and one small thing to try. A few times a month, never noise.",
  /** Beside the covers in the dialog's photo column (from md). */
  giftCaption: "Free when you join: two editions of Mama's Escape",
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
  hint: "Join for two free Mama's Escape magazines, then real stories and real support in your inbox. Unsubscribe any time.",
};
