/**
 * Site navigation, following the client's Website Restructure Brief v2 (section 5):
 * About, How We Help, Stories, Resources, Contact, plus one join action.
 * Routes keep existing WordPress URLs where they exist.
 */
export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; links: NavLink[] };
export type NavItem = NavLink | NavGroup;

export const isGroup = (item: NavItem): item is NavGroup => "links" in item;

export const coreAreaLinks: NavLink[] = [
  { label: "Mama's Escape", href: "/mamas-escape/", description: "Our early years community" },
  { label: "Partnership Opportunities", href: "/partnership/", description: "For organisations and commissioners" },
  { label: "Training, Workshops & Events", href: "/training-and-events/", description: "Learning and connection" },
  { label: "Work With Us", href: "/work-with-us/", description: "1:1 support and coaching" },
];

export const mainNav: NavItem[] = [
  {
    label: "About",
    links: [
      { label: "About Mums Aloud", href: "/about-mums-aloud/" },
      { label: "Meet Bokun", href: "/meet-bokun/" },
      { label: "Meet the Team", href: "/meet-the-team/" },
      { label: "Mum's Council", href: "/mums-council/" },
    ],
  },
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
      { label: "Holiday Survival Guide", href: "/holiday-guide-for-school-kids/" },
      { label: "Activities Guide for Babies", href: "/ativites-guide-for-babies/" },
      { label: "Ovulation Calculator", href: "/ovulation-calculator/" },
      { label: "Pregnancy Calculator", href: "/pregnancy-calculator/" },
    ],
  },
  { label: "Contact", href: "/contact/" },
];

export const footerGroups: NavGroup[] = [
  { label: "How we help", links: coreAreaLinks },
  {
    label: "About",
    links: [
      { label: "About Mums Aloud", href: "/about-mums-aloud/" },
      { label: "Meet Bokun", href: "/meet-bokun/" },
      { label: "Meet the Team", href: "/meet-the-team/" },
      { label: "Mum's Council", href: "/mums-council/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    label: "Stories & resources",
    links: [
      { label: "Story Lounge", href: "/story-lounge/" },
      { label: "Blog", href: "/blog/" },
      { label: "Podcast", href: "/podcast/" },
      { label: "Resources", href: "/resources/" },
      { label: "Affiliate Programs", href: "/affiliate-programs/" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Cookie policy", href: "/cookie-policy-uk/" },
];
