/**
 * Site navigation, following the client's Website Restructure Brief v2 (section 5) and the
 * owner's notes: four core areas (Mama's Escape, Partnership, Our Services, Work With Bokun),
 * Podcast under Stories, Newsletter and Find Support under Resources, Volunteer With Us under
 * About (24 Oct 2026). Each group opens as a mega menu after the reference's navbar: a photo card
 * or icon rows on the left, labelled link columns on the right, a faint footer line.
 * Routes keep existing WordPress URLs where they exist.
 */
import { founder } from "@/content/about";
import { siteConfig } from "@/lib/site";

export type NavLink = { label: string; href: string; description?: string };

/** The photo card on the left of a mega menu: a caption over the photo and one action. */
export type NavFeature = {
  photo: "circle" | "laughing" | "friends" | "golden" | "smiling" | "park" | "embrace" | "kissing" | "bokun";
  caption: string;
  action: NavLink;
  /** A narrower, taller card for a portrait photo (owner, 24 Oct 2026: Bokun's portrait). */
  portrait?: boolean;
};

/** An icon row on the left of a mega menu, as the reference's "Home A / B / C" items. */
export type NavHighlight = NavLink & { icon: "community" | "partnership" | "services" | "growth" };

export type NavGroup = {
  label: string;
  /** The primary links: the mobile menu lists these; on desktop they fill the first column. */
  links: NavLink[];
  /** Column heading for `links` on desktop; defaults to the group label. */
  columnLabel?: string;
  /** Left side of the mega menu: a photo card, or icon rows (one of the two). */
  feature?: NavFeature;
  highlights?: NavHighlight[];
  /** Further link columns on desktop (with icon rows, these are the only columns). */
  columns?: { label: string; links: NavLink[] }[];
};
export type NavItem = NavLink | NavGroup;

export const isGroup = (item: NavItem): item is NavGroup => "links" in item;

/** True for links that leave the site or open the mail client, so they render as plain anchors. */
export const isExternalHref = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

const calendly = "https://calendly.com/bokunimoukhuede/30min";

export const coreAreaLinks: NavHighlight[] = [
  { label: "Mama's Escape", href: "/mamas-escape/", description: "Our community, podcast and newsletter", icon: "community" },
  { label: "Partnership Opportunities", href: "/partnership/", description: "For organisations and commissioners", icon: "partnership" },
  { label: "Our Services", href: "/services/", description: "Support for mums at every stage", icon: "services" },
  { label: "Work With Bokun", href: "/work-with-us/", description: "Personalised one-to-one support", icon: "growth" },
];

const aboutLinks: NavLink[] = [
  { label: "About Mums Aloud", href: "/about-mums-aloud/" },
  { label: "Meet Bokun", href: "/meet-bokun/" },
  { label: "Meet the Team", href: "/meet-the-team/" },
  { label: "Mum's Council", href: "/mums-council/" },
  { label: "Volunteer With Us", href: "/volunteer/" },
];

export const mainNav: NavItem[] = [
  {
    label: "About",
    links: aboutLinks,
    feature: { photo: "bokun", portrait: true, caption: "Meet Bokun, our founder", action: { label: "Read her story", href: "/meet-bokun/" } },
    columns: [
      {
        label: "Get in touch",
        links: [
          { label: "Contact us", href: "/contact/" },
          { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
          { label: siteConfig.phone.display, href: siteConfig.phone.href },
        ],
      },
    ],
  },
  {
    label: "How We Help",
    links: coreAreaLinks,
    highlights: coreAreaLinks,
    columns: [
      {
        label: "Start here",
        links: [
          { label: "Join Mama's Escape", href: siteConfig.joinUrl },
          { label: "Book a free call with Bokun", href: calendly },
          { label: "Partner with us", href: "/partnership/" },
        ],
      },
      {
        label: "Also",
        links: [
          { label: "Volunteer With Us", href: "/volunteer/" },
          { label: "New Mums Circle", href: "/new-mums-circle/" },
          { label: "Find Support", href: "/find-support/" },
        ],
      },
    ],
  },
  {
    label: "Stories",
    links: [
      { label: "Story Lounge", href: "/story-lounge/" },
      { label: "Blog", href: "/blog/" },
      { label: "Articles", href: "/article/" },
      { label: "Podcast", href: "/podcast/" },
    ],
    feature: { photo: "laughing", caption: "Real mothers, real stories", action: { label: "Read the Story Lounge", href: "/story-lounge/" } },
    columns: [
      {
        label: "Listen",
        links: [
          { label: "Listen on Spotify", href: "https://creators.spotify.com/pod/show/mamasescape" },
          { label: "Get the newsletter", href: siteConfig.newsletterUrl },
        ],
      },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Find Support", href: "/find-support/", description: "Helplines and trusted organisations" },
      { label: "Guides and calculators", href: "/resources/" },
      { label: "Trusted Resources", href: "/trusted-resources/" },
      { label: "Newsletter", href: siteConfig.newsletterUrl, description: "Real stories, straight to your inbox" },
    ],
    feature: { photo: "smiling", caption: "The right help, when you need it", action: { label: "Find support", href: "/find-support/" } },
    columns: [
      {
        label: "Free guides",
        links: [
          { label: "Holiday Survival Guide", href: "/holiday-guide-for-school-kids/" },
          { label: "Activities Guide for Babies", href: "/ativites-guide-for-babies/" },
        ],
      },
    ],
  },
  { label: "Contact", href: "/contact/" },
];

/** The line at the foot of every mega menu, as the reference's copyright and credit. */
export const menuFooter = {
  left: `${siteConfig.name}. ${siteConfig.tagline}.`,
  right: { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
};

/** The card at the foot of the phone and tablet menu, as the reference's promo tile: the footer tile's line and the join pill. */
export const menuPromo: NavFeature = {
  photo: "circle",
  caption: "Empowering Mums to Thrive",
  action: { label: "Join Mama's Escape", href: siteConfig.joinUrl },
};

/** Bokun's own portrait for the About menu (the live site's image, as on her page). */
export const founderPortrait = founder.hero.portrait;

export const footerGroups: NavGroup[] = [
  { label: "How we help", links: coreAreaLinks },
  { label: "About", links: [...aboutLinks, { label: "Contact", href: "/contact/" }] },
  {
    label: "Stories & resources",
    links: [
      { label: "Story Lounge", href: "/story-lounge/" },
      { label: "Blog", href: "/blog/" },
      { label: "Articles", href: "/article/" },
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
