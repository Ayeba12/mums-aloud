/**
 * Homepage copy. Sources: Website Restructure Brief v2 (structure, hero, four core areas)
 * and Mama's Escape Website Copy (community wording). Items marked `confirm` need
 * the owner's sign-off before launch. Moves to WordPress fields in Phase 6.
 */
import { coreAreaLinks } from "./navigation";

export const hero = {
  eyebrow: "For Black mothers in the UK",
  headline: { lead: "Empowering Mums to", accent: "Thrive" },
  subheadline:
    "A community built for mothers, particularly those of African and Afro-Caribbean heritage, who deserve to be supported, seen and celebrated in every stage of motherhood.",
  primary: "Join Our Community",
  secondary: { label: "Find Out How We Help", href: "#how-we-help" },
};

/** Centred statement under the hero, from the brief's short About section. */
export const statement = {
  lead: "Mums Aloud was founded because too many mothers, particularly those of African heritage, were navigating the early years of motherhood without the village they deserved.",
  highlight: "We built what we couldn't find.",
  trail: "And we have not stopped building since.",
};

export const coreAreas = {
  eyebrow: "How we help",
  heading: { lead: "Four ways we", accent: "walk with you" },
  intro: "Whether you are a mother, a partner organisation or a professional, there is a clear place to start.",
  items: [
    { ...coreAreaLinks[0], number: "01", icon: "community", summary: "Our community for Black mothers, with the podcast and the newsletter: a place to be seen, heard and less alone." },
    { ...coreAreaLinks[1], number: "02", icon: "partnership", summary: "Working with organisations, commissioners and community partners to amplify impact." },
    { ...coreAreaLinks[2], number: "03", icon: "services", summary: "Free support for mums at every stage: one-to-one and group support, mentor mums, training, events and expert sessions." },
    { ...coreAreaLinks[3], number: "04", icon: "growth", summary: "Personalised one-to-one support with our founder, from a free consultation call to postpartum coaching." },
  ],
} as const;

export const mamasEscape = {
  eyebrow: "Mama's Escape",
  heading: { lead: "You don't have to do it", accent: "all alone" },
  body: "A space for Black mothers to be seen, held and poured into. For the woman, not just the role. If you are doing this far from the village that would have held you, we understand, because we are you.",
  /** Mama's Escape is more than the community: three parts, one village (owner, 10 Aug 2026). */
  partsLead: "Three parts, one village:",
  parts: [
    { label: "The community", href: "/mamas-escape/" },
    { label: "The podcast", href: "/podcast/" },
    { label: "The newsletter", href: "newsletter" },
  ],
  itemsLead: "Inside the community, four things we do together:",
  items: [
    { icon: "mentor", title: "Mentor Mums", text: "Paired with a mum who has walked the path before you, for honest guidance and real friendship." },
    { icon: "expert", title: "Expert Series and Training", text: "Expert sessions and practical training that build confidence and real life skills." },
    { icon: "resources", title: "Resource Sharing", text: "Trusted information and the right contacts, gathered and made sense of." },
    { icon: "events", title: "Community Events", text: "Regular gatherings that bring mums together to connect, celebrate and belong." },
  ],
  primary: "Join Mama's Escape",
  quiet: { label: "Not ready yet? Listen to the podcast", href: "/podcast/" },
} as const;

export const story = {
  eyebrow: "Our story",
  heading: { lead: "We built what we", accent: "couldn't find" },
  body: "Before we were mothers, we were women full of ideas, dreams and plans. Then motherhood arrived, often far from home, far from the village that would have held us. Everyone gathered round the baby. Few asked how we were. So we learned to appear okay while running on empty.",
  pledge: "Say it out loud. You are allowed.",
  link: { label: "Read our story", href: "/about-mums-aloud/" },
  voices: {
    tag: "Community voices",
    heading: { lead: "A room of women who will look at you and say,", accent: "me too" },
    // confirm: replace the stock portraits with consented member photos and quotes.
    note: "Photographs are illustrative. Member voices are shared only with their consent.",
  },
};

export const impact = {
  eyebrow: "Our impact",
  heading: { lead: "Real mothers. Real partners.", accent: "Real change." },
  // The 2,300+ figure is the owner's (notes of 10 Aug 2026); confirm the wording of its label.
  stats: [
    { value: "2,300+", label: "mothers supported through our community, events and programmes" },
    { value: "11", label: "partner organisations, from the NHS to local councils and community groups" },
    {
      value: "3×",
      label: "Black women in the UK are around three times more likely to die in and around pregnancy. This is why we exist.",
      source: { label: "MBRRACE-UK", href: "https://www.npeu.ox.ac.uk/mbrrace-uk" },
    },
  ],
};

/**
 * A partner organisation; `logo` is a file in `public/partners/` (sources and brand rules in
 * docs/photo-credits.md), shown in place of the name when present; `tall` marks a square-ish
 * mark that needs more height than a wordmark to read.
 */
export type Partner = { name: string; slug: string; logo?: { src: string; width: number; height: number; tall?: boolean } };

/**
 * The owner's partner list (Mamas_Escape_Website_Copy.md), in the owner's order. Logos were
 * gathered from each organisation's own site on 26 Oct 2026; confirm each partner's permission
 * before launch (the National Lottery mark is for funded projects only; the NHS logo needs the
 * NHS partner's say-so; the owner chose the generic NHS mark on 27 Oct 2026). Chuck Gallery has no
 * logo file, so its tile is set in type.
 */
const partnerItems: Partner[] = [
  { name: "National Lottery Community Fund", slug: "national-lottery", logo: { src: "/partners/national-lottery.svg", width: 160, height: 52 } },
  { name: "NHS", slug: "nhs", logo: { src: "/partners/nhs.svg", width: 371, height: 150 } },
  { name: "Caribbean and African Health Network (CAHN)", slug: "cahn", logo: { src: "/partners/cahn.png", width: 1103, height: 320 } },
  { name: "Rehoboth for Families", slug: "rehoboth-for-families", logo: { src: "/partners/rehoboth-for-families.png", width: 359, height: 184, tall: true } },
  { name: "Trafford Council", slug: "trafford-council", logo: { src: "/partners/trafford-council.png", width: 477, height: 115 } },
  { name: "Manchester City Council", slug: "manchester-city-council", logo: { src: "/partners/manchester-city-council.svg", width: 709, height: 146 } },
  { name: "Trafford Community Collective", slug: "trafford-community-collective", logo: { src: "/partners/trafford-community-collective.svg", width: 1074, height: 392, tall: true } },
  { name: "Chuck Gallery", slug: "chuck-gallery" },
  { name: "Read with Doja", slug: "read-with-doja", logo: { src: "/partners/read-with-doja.png", width: 451, height: 268, tall: true } },
  { name: "She Reconnects", slug: "she-reconnects", logo: { src: "/partners/she-reconnects.png", width: 1092, height: 187 } },
  { name: "Blossom Foundation", slug: "blossom-foundation", logo: { src: "/partners/blossom-foundation.png", width: 283, height: 320, tall: true } },
];

export const partners = {
  heading: { lead: "We don't do this", accent: "alone either" },
  intro: "Mums Aloud was built alongside partners who believe mothers deserve to be seen and supported.",
  // confirm: official names, each partner's permission to show its logo, and any funder acknowledgement rules (e.g. National Lottery, NHS).
  items: partnerItems,
  names: partnerItems.map((partner) => partner.name),
  invite: { label: "Add your organisation", href: "/partnership/" },
};

export const newsletter = {
  eyebrow: "Stay close",
  heading: { lead: "Not ready to join yet?", accent: "Stay close." },
  body: "Ask for the Mama's Escape newsletter and we will send real stories and real support straight to your inbox. Or listen to the podcast, wherever you are on the journey.",
  newsletterLabel: "Get the newsletter",
  podcast: { label: "Listen to the podcast", href: "https://creators.spotify.com/pod/show/mamasescape" },
};

export const closing = {
  heading: { lead: "This is the place we wished we had.", accent: "Come in, Mama." },
  secondary: { label: "Explore the Story Lounge", href: "/story-lounge/" },
};
