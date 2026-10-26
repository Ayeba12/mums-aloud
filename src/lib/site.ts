/** Site-wide settings. Values that editors should change will move to WordPress site settings. */
export const siteConfig = {
  name: "Mums Aloud",
  tagline: "A community for Black mothers in the UK",
  description:
    "Mums Aloud is a community built by mothers, for Black mothers in the UK. Join Mama's Escape to be understood without having to explain.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Where every "Join" button on the site goes: the Mama's Escape page, opened at its top (owner, 26 Oct 2026). */
  joinUrl: "/mamas-escape/",
  /** The team inbox (owner, 10 Aug 2026 notes): enquiries, applications and newsletter requests land here. */
  email: "admin@mumsaloud.com",
  /** The official phone number (owner, 10 Aug 2026 notes). */
  phone: { display: "07587 542609", href: "tel:+447587542609" },
  /** confirm: the Instagram handle. Social links are shown only once their URLs are filled in. */
  social: {
    instagram: { label: "Instagram", handle: "", href: "" },
    facebook: { label: "Facebook", handle: "", href: "" },
    youtube: { label: "YouTube", handle: "", href: "" },
  },
  /**
   * Newsletter sign-up. Every "Get the newsletter" button links here: the newsletter dialog opens on
   * the click, and the footer's form (the anchor) is the no-script fallback. The owner's emailing
   * service (MailerLite or Mailchimp) is set by environment variables; see `lib/newsletter.ts`.
   */
  newsletterUrl: process.env.NEXT_PUBLIC_NEWSLETTER_URL || "#newsletter",
} as const;

/**
 * The joining form itself (owner decision: a Google Form). It is only linked when the
 * URL is set, so the site never shows a join button that leads to a closed form.
 */
export const joinForm = {
  open: Boolean(process.env.NEXT_PUBLIC_JOIN_URL),
  href: process.env.NEXT_PUBLIC_JOIN_URL || "/mamas-escape/",
} as const;
