/** Site-wide settings. Values that editors should change will move to WordPress site settings. */
export const siteConfig = {
  name: "Mums Aloud",
  tagline: "A community for Black mothers in the UK",
  description:
    "Mums Aloud is a community built by mothers, for Black mothers in the UK. Join Mama's Escape to be understood without having to explain.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** The join destination. Must point to an open form; set it per environment. */
  joinUrl: process.env.NEXT_PUBLIC_JOIN_URL || "/mamas-escape/",
  /** Newsletter sign-up page. No platform is chosen yet, so it defaults to the Mama's Escape page. */
  newsletterUrl: process.env.NEXT_PUBLIC_NEWSLETTER_URL || "/mamas-escape/#newsletter",
} as const;
