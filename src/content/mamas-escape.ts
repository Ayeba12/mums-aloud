/**
 * Mama's Escape page copy. Source: "Mama's Escape Website Copy" (Home · About · Join),
 * draft for Bokun's sign-off, received 20 October 2026. The Home section lives on the
 * homepage; this page carries About and Join. Moves to WordPress fields in Phase 6.
 */
export const page = {
  title: "Mama's Escape",
  description:
    "Mama's Escape is the Mums Aloud community for Black mothers in the UK who are ready to stop doing it all alone. Mentor mums, expert sessions, resources and events.",
};

export const hero = {
  tag: "Mama's Escape",
  heading: { lead: "There's a place for you", accent: "here." },
  intro: "Our community for Black mothers ready to stop doing it all alone, with a podcast and a newsletter that keep you close.",
  primary: "Join Mama's Escape",
  secondary: { label: "What to expect", href: "#what-to-expect" },
  /** Floating card over the hero portrait, as the reference's case-study card. */
  card: {
    tag: "Our covenant",
    text: "What is shared here stays here. No mother becomes anyone's story.",
    link: { label: "See what's inside", href: "#inside" },
  },
};

/**
 * The quiet path under the hero, where the client's Home copy puts "Not ready yet? Listen to the
 * podcast": one centred statement with a highlighted phrase, as the reference sets it. Wording
 * condensed from the live Podcast page (mumsaloud.com/podcast, 22 Oct 2026).
 */
export const podcast = {
  /** The reason leads as the statement (moved here from the berry panel at the owner's request, 22 Oct 2026). */
  statement: {
    lead: "For Black mothers in the UK, the gap is",
    highlight: "not only loneliness",
    trail:
      ". We are around three times more likely to die in and around pregnancy than white women, and too often our concerns go unheard. We were also raised, in our own cultures, not to talk about the struggle. Mama's Escape exists to change both.",
  },
  body: "On the Mama's Escape Podcast the masks come off: real mothers talking about loss, mum guilt and the pressures we carry.",
  action: { label: "Not ready to join yet? Listen on Spotify", href: "https://creators.spotify.com/pod/show/mamasescape" },
};

export const why = {
  tag: "Why we exist",
  heading: { lead: "To be understood without", accent: "having to explain." },
  stat: { value: "3×", label: "more likely to die in and around pregnancy", source: { label: "MBRRACE-UK", href: "https://www.npeu.ox.ac.uk/mbrrace-uk" } },
  /** Statement above the four cards; the hero card's "See what's inside" lands on this panel. */
  inside: { lead: "Here is what's", accent: "inside." },
};

export const experience = {
  tag: "Inside the community",
  heading: { lead: "A mother deserves to be", accent: "looked after too." },
  body: "Before we were mothers, we were women full of ideas, dreams, and plans. Then motherhood arrived, often far from home, far from the village that would have held us. Everyone gathered round the baby. Few asked how we were.",
  pledge: "We know, because it is our story too. A baby is born, but a mother is born too. She needs care too.",
  /** The community's four core areas, in the owner's words (notes of 10 Aug 2026). */
  itemsLead: "The community focuses on four core areas.",
  items: [
    { icon: "mentor", title: "Mentor Mums", text: "Paired with a mum who has walked the path before you: honest guidance, regular check-ins and real friendship, from lived experience, not just training." },
    { icon: "expert", title: "Expert Series and Training", text: "Guest experts on health, wellbeing, finance and parenting, live Q&As, and training that builds confidence, practical life skills and a way back into work." },
    { icon: "resources", title: "Resource Sharing", text: "Accurate, reliable information and the right contacts, gathered and made sense of, so the systems around you are easier to face." },
    { icon: "events", title: "Community Events", text: "Regular gatherings, family-friendly activities and celebrations that bring mums together to connect and belong." },
  ],
} as const;

export const marquee = "We speak with you. We speak for you. We are you.";

export const family = {
  tag: "What Mama's Escape is",
  heading: { lead: "Three parts,", accent: "one village." },
  intro: "Mama's Escape is more than the community. It is the community, the podcast and the newsletter, so there is a way in wherever you are on the journey.",
  tiles: [
    { icon: "community", title: "The Community", text: "Mentor mums, expert sessions and training, shared resources and events, for mothers who support one another.", action: { label: "How to join", href: "#join" } },
    { icon: "podcast", title: "The Podcast", text: "Mama's Escape Podcast. Real conversations, real mothers.", action: { label: "Listen on Spotify", href: "https://creators.spotify.com/pod/show/mamasescape", external: true } },
    { icon: "newsletter", title: "The Newsletter", text: "Real stories and real support, straight to your inbox. Ask for it by email and we will add you.", action: { label: "Get the newsletter", href: "newsletter" } },
  ],
} as const;

export const expect = {
  tag: "What to expect",
  heading: { lead: "Not Mum. Not wife.", accent: "You." },
  body: "Here is what stepping in feels like.",
  moments: [
    "Women who have lived what you are living.",
    "Honest conversation, and mentor mums a few steps ahead.",
    "Sessions and resources you can actually use, and a circle that will know you by your name.",
  ],
  note: "Photographs are illustrative. Member voices are shared only with their consent.",
};

export const join = {
  tag: "How to join",
  heading: { lead: "You do not need to have it all together first.", accent: "You just need to come." },
  /** Shown while the joining form is linked (NEXT_PUBLIC_JOIN_URL set). */
  body: "Fill in the short form and we will welcome you in. It takes a couple of minutes.",
  /** Shown until then, so the page never promises a form it cannot offer. */
  bodyClosed: "The short joining form is being set up. When it opens, joining takes a couple of minutes.",
  asksTitle: "What we ask",
  asks: [
    "Your name, and what we can call you",
    "Where you are right now: expecting, newborn, under five, or other",
    "Your birthday, so we can remember it",
    "One line on what brought you here today",
  ],
  primary: "Join Mama's Escape",
  pending: { link: "Get the newsletter", after: " and we will tell you the moment the form opens." },
};

/** Grounded in the client's copy only. Cost and eligibility details are still to confirm with the owner. */
export const faq = {
  heading: { lead: "Questions?", accent: "Glad you asked." },
  items: [
    {
      q: "Who is Mama's Escape for?",
      a: "Black mothers in the UK, particularly of African and Afro-Caribbean heritage, who are ready to stop doing it all alone. Expecting, newly a mum, raising under-fives, or somewhere else on the road: there is a place for you here.",
    },
    {
      q: "What happens after I join?",
      a: "You fill in the short form and we welcome you in. You do not need to have it all together first. The Welcome Book and the real depth of the community wait for you inside.",
    },
    {
      q: "Is what I share private?",
      a: "Yes. What is shared here stays here, and no mother becomes anyone's story. We keep the space protected, which is why you come in through a simple form.",
    },
    {
      q: "I'm not ready to join. Can I still stay close?",
      a: "Of course. Listen to the podcast, get the newsletter, or reach out to Work With Bokun for a closer conversation.",
    },
    {
      q: "How is this different from Work With Bokun?",
      a: "Mama's Escape is the community: a room of women, free to every mum. Work With Bokun is a closer path for a mother who wants personalised, one-to-one support.",
    },
  ],
};

export const stayClose = {
  tag: "Not ready to join yet?",
  heading: { lead: "This is the place we wished we had.", accent: "Come in, Mama." },
  /** The sentence carries the two quieter routes as links; the pills below are Join and the newsletter. */
  body: [
    "Or stay close: ",
    { label: "listen to the podcast", href: "https://creators.spotify.com/pod/show/mamasescape", external: true },
    ", get the newsletter, or reach out to ",
    { label: "Work With Bokun", href: "/work-with-us/" },
    " for a closer conversation.",
  ],
  newsletter: "Get the newsletter",
  closing: "You don't have to do it all alone.",
} as const;
