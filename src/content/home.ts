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
    { ...coreAreaLinks[0], number: "01", icon: "community", summary: "Our early years community, where mothers feel seen, heard and less alone." },
    { ...coreAreaLinks[1], number: "02", icon: "partnership", summary: "Working with organisations, commissioners and community partners to amplify impact." },
    { ...coreAreaLinks[2], number: "03", icon: "training", summary: "Practical, culturally relevant learning and connection for mothers and professionals." },
    { ...coreAreaLinks[3], number: "04", icon: "growth", summary: "1:1 support, coaching and personal programmes for mothers ready to invest in themselves." },
  ],
} as const;

export const mamasEscape = {
  eyebrow: "Mama's Escape",
  heading: { lead: "You don't have to do it", accent: "all alone" },
  body: "A space for Black mothers to be seen, held and poured into. For the woman, not just the role. If you are doing this far from the village that would have held you, we understand, because we are you.",
  items: [
    { icon: "mentor", title: "Mentor Mums", text: "A woman who has walked ahead of you and is reaching back." },
    { icon: "expert", title: "Expert Series and Training", text: "Practical tools for your recovery, in body and in mind." },
    { icon: "resources", title: "Resource Sharing", text: "The right help, gathered and made sense of." },
    { icon: "events", title: "Community Events", text: "A room of women who already understand." },
  ],
  primary: "Join Mama's Escape",
  quiet: { label: "Not ready yet? Listen to the podcast", href: "/podcast/" },
} as const;

export const story = {
  eyebrow: "Our story",
  heading: { lead: "We built what we", accent: "couldn't find" },
  body: "Before we were mothers, we were women full of ideas, dreams and plans. Then motherhood arrived, often far from home, far from the village that would have held us. Everyone gathered round the baby. Few asked how we were. So we learned to appear okay while running on empty.",
  pledge: "We speak with you. We speak for you. We are you.",
  link: { label: "Read our story", href: "/about-mums-aloud/" },
  community: { lead: "A room of women who will look at you and say,", accent: "me too" },
};

export const impact = {
  eyebrow: "Our impact",
  heading: { lead: "Real mothers. Real partners.", accent: "Real change." },
  // confirm: owner to verify figures and add community size and events delivered.
  stats: [
    { value: "70+", label: "mothers directly supported through the Uplifting Mothers Project" },
    { value: "11", label: "partner organisations, from the NHS to local councils and community groups" },
    {
      value: "3×",
      label: "Black women in the UK are around three times more likely to die in and around pregnancy. This is why we exist.",
      source: { label: "MBRRACE-UK", href: "https://www.npeu.ox.ac.uk/mbrrace-uk" },
    },
  ],
};

export const partners = {
  heading: { lead: "We don't do this", accent: "alone either" },
  intro: "Mums Aloud was built alongside partners who believe mothers deserve to be seen and supported.",
  // confirm: official names, logos and any funder acknowledgement rules (e.g. National Lottery).
  names: [
    "National Lottery",
    "NHS",
    "CAHN",
    "Rehoboth for Families",
    "Trafford Council",
    "Manchester City Council",
    "Trafford Community Collective",
    "Chuck Gallery",
    "Read with Doja",
    "She Reconnects",
    "Blossom Foundation",
  ],
  invite: { label: "Add your organisation", href: "/partnership/" },
};

export const newsletter = {
  eyebrow: "Stay close",
  heading: { lead: "Not ready to join yet?", accent: "Stay close." },
  body: "Join the Mama's Escape newsletter for real stories and real support, straight to your inbox. Or listen to the podcast, wherever you are on the journey.",
  newsletterLabel: "Get the newsletter",
  podcast: { label: "Listen to the podcast", href: "https://creators.spotify.com/pod/show/mamasescape" },
};

export const closing = {
  heading: { lead: "This is the place we wished we had.", accent: "Come in, Mama." },
  secondary: { label: "Explore the Story Lounge", href: "/story-lounge/" },
};
