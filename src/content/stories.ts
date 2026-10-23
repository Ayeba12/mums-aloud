/**
 * Copy for the two editorial listings and their post pages. The collections themselves are
 * mapped in `lib/wordpress/collections.ts` (owner decision, 20 Oct 2026). Intros are drafted from
 * the brief and the live site's labels and need owner sign-off (`confirm`).
 */
import type { AccentText } from "@/components/ui/Heading";

export type ListingCopy = {
  title: string;
  description: string;
  tag: string;
  heading: AccentText;
  intro: string;
  /** Label on each card and on the post page. */
  cardLabel: string;
  /** Tag on the newest item's wide card at the top of the listing. */
  featuredLabel: string;
  /** Pill on the featured card; the whole card is the link. */
  readLabel: string;
  /** Heading over the grid below the featured item. */
  latestHeading: string;
  /** Link text back to the listing, used on post pages. */
  allLabel: string;
  /** Heading for the related-posts row on a post page. */
  moreHeading: AccentText;
  empty: string;
};

export const storyLounge: ListingCopy = {
  title: "Story Lounge",
  description: "Stories of motherhood from women in the Mums Aloud community: the journey, the hard days and the small wins.",
  tag: "Story Lounge",
  heading: { lead: "Stories from mothers,", accent: "in their own words." },
  // confirm
  intro: "Accounts of motherhood from women in our community: the journey, the hard days and the small wins.",
  cardLabel: "Story",
  featuredLabel: "Featured story",
  readLabel: "Read the story",
  latestHeading: "Latest stories",
  allLabel: "All stories",
  moreHeading: { lead: "More from the", accent: "Story Lounge" },
  empty: "No stories have been published yet. Come back soon.",
};

export const blog: ListingCopy = {
  title: "Blog",
  description: "Practical pieces on pregnancy, babies, toddlers and family life from Mums Aloud, written for mothers like us.",
  tag: "Blog",
  heading: { lead: "Straight talk,", accent: "mum to mum." },
  // confirm
  intro: "Practical pieces on pregnancy, babies, toddlers and family life, written for mothers like us.",
  cardLabel: "Article",
  featuredLabel: "Featured article",
  readLabel: "Read the article",
  latestHeading: "Latest articles",
  allLabel: "All articles",
  moreHeading: { lead: "More from the", accent: "Blog" },
  empty: "No articles have been published yet. Come back soon.",
};

/** The separate `article` collection (four pieces today). Where they are listed is still to decide; until then they sit beside the Blog. */
export const articles: ListingCopy = {
  title: "Articles",
  description: "Longer pieces from Mums Aloud on motherhood, identity and finding the woman inside the mother.",
  /** The label links back to the Blog, where these sit for now. */
  tag: "Blog",
  heading: { lead: "Longer reads,", accent: "mum to mum." },
  intro: "Longer pieces on motherhood, identity and finding the woman inside the mother.",
  cardLabel: "Article",
  featuredLabel: "Featured article",
  readLabel: "Read the article",
  latestHeading: "Latest articles",
  allLabel: "Back to the Blog",
  moreHeading: { lead: "More", accent: "articles" },
  empty: "No articles have been published yet.",
};

/** The contextual invitation at the foot of every story and article. */
export const postInvite = {
  heading: { lead: "There's a place for you", accent: "here." },
  body: "Mama's Escape is the community behind these pages: mentor mums, expert sessions, resources and events for Black mothers in the UK.",
  primary: { label: "Join Mama's Escape" },
  secondary: { label: "See what's inside", href: "/mamas-escape/#inside" },
};
