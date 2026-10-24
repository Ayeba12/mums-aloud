/**
 * Site navigation, following the client's Website Restructure Brief v2 (section 5) and the
 * owner's notes of 10 August 2026: four core areas (Mama's Escape, Partnership, Our Services,
 * Work With Bokun), Podcast under Stories, Newsletter and Find Support under Resources, and
 * Volunteer With Us under About (24 Oct 2026). Routes keep existing WordPress URLs where they exist.
 */
import { siteConfig } from "@/lib/site";

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; links: NavLink[] };
export type NavItem = NavLink | NavGroup;

export const isGroup = (item: NavItem): item is NavGroup => "links" in item;

/** True for links that leave the site or open the mail client, so they render as plain anchors. */
export const isExternalHref = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export const coreAreaLinks: NavLink[] = [
  { label: "Mama's Escape", href: "/mamas-escape/", description: "Our community, podcast and newsletter" },
  { label: "Partnership Opportunities", href: "/partnership/", description: "For organisations and commissioners" },
  { label: "Our Services", href: "/services/", description: "Support for mums at every stage" },
  { label: "Work With Bokun", href: "/work-with-us/", description: "Personalised one-to-one support" },
];

const aboutLinks: NavLink[] = [
  { label: "About Mums Aloud", href: "/about-mums-aloud/" },
  { label: "Meet Bokun", href: "/meet-bokun/" },
  { label: "Meet the Team", href: "/meet-the-team/" },
  { label: "Mum's Council", href: "/mums-council/" },
  { label: "Volunteer With Us", href: "/volunteer/" },
];

export const mainNav: NavItem[] = [
  { label: "About", links: aboutLinks },
  { label: "How We Help", links: coreAreaLinks },
  {
    label: "Stories",
    links: [
      { label: "Story Lounge", href: "/story-lounge/" },
      { label: "Blog", href: "/blog/" },
      { label: "Podcast", href: "/podcast/" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Find Support", href: "/find-support/", description: "Helplines and trusted organisations" },
      { label: "Guides and calculators", href: "/resources/" },
      { label: "Trusted Resources", href: "/trusted-resources/" },
      { label: "Newsletter", href: siteConfig.newsletterUrl, description: "Ask by email and we will add you" },
    ],
  },
  { label: "Contact", href: "/contact/" },
];

export const footerGroups: NavGroup[] = [
  { label: "How we help", links: coreAreaLinks },
  { label: "About", links: [...aboutLinks, { label: "Contact", href: "/contact/" }] },
  {
    label: "Stories & resources",
    links: [
      { label: "Story Lounge", href: "/story-lounge/" },
      { label: "Blog", href: "/blog/" },
      { label: "Podcast", href: "/podcast/" },
      { label: "Find Support", href: "/find-support/" },
      { label: "Guides and calculators", href: "/resources/" },
      { label: "Trusted Resources", href: "/trusted-resources/" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Cookie policy", href: "/cookie-policy-uk/" },
];
