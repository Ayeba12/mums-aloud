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
  /**
   * Public profiles, shown in the footer and on the Contact page only once their URL is filled in.
   * Found on 26 Oct 2026, since the live site's social icons carry no links: Instagram @mumsaloud
   * (the MumsAloud account whose bio links to the New Mums Circle sign-up) and the Facebook page at
   * /mumsaloud. Both confirmed by the owner on 26 Oct 2026. Mums Aloud has no YouTube channel
   * (owner, 26 Oct 2026); the entry stays empty and hidden, ready should one start.
   */
  social: {
    instagram: { label: "Instagram", handle: "@mumsaloud", href: "https://www.instagram.com/mumsaloud/" },
    facebook: { label: "Facebook", handle: "Mums Aloud", href: "https://www.facebook.com/mumsaloud/" },
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
