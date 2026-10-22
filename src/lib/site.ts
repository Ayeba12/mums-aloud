/** Site-wide settings. Values that editors should change will move to WordPress site settings. */
export const siteConfig = {
  name: "Mums Aloud",
  tagline: "A community for Black mothers in the UK",
  description:
    "Mums Aloud is a community built by mothers, for Black mothers in the UK. Join Mama's Escape to be understood without having to explain.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Where every "Join" button on the site goes: the joining section of the Mama's Escape page. */
  joinUrl: "/mamas-escape/#join",
  /** Newsletter sign-up. No platform is chosen yet, so it defaults to the email field in the footer of the current page. */
  newsletterUrl: process.env.NEXT_PUBLIC_NEWSLETTER_URL || "#newsletter",
} as const;

/**
 * The joining form itself (owner decision: a Google Form). It is only linked when the
 * URL is set, so the site never shows a join button that leads to a closed form.
 */
export const joinForm = {
  open: Boolean(process.env.NEXT_PUBLIC_JOIN_URL),
  href: process.env.NEXT_PUBLIC_JOIN_URL || "/mamas-escape/#join",
} as const;
