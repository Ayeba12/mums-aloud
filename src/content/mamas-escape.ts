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
  intro: "This is the door to Mama's Escape, the community for Black mothers ready to stop doing it all alone.",
  primary: "Join Mama's Escape",
  secondary: { label: "What to expect", href: "#what-to-expect" },
};

export const about = {
  tag: "About",
  heading: { lead: "A mother deserves to be", accent: "looked after too." },
  body: "Before we were mothers, we were women full of ideas, dreams, and plans. Then motherhood arrived, often far from home, far from the village that would have held us. Everyone gathered round the baby. Few asked how we were. So we learned to appear okay while running on empty. It cost us in our bodies and in our minds.",
  pledge: "We know, because it is our story too. A baby is born, but a mother is born too. She needs care too.",
};

export const why = {
  tag: "Why we exist",
  heading: { lead: "To be understood without", accent: "having to explain." },
  body: "For Black mothers in the UK, the gap is not only loneliness. We are around three times more likely to die in and around pregnancy than white women, and too often our concerns go unheard. We were also raised, in our own cultures, not to talk about the struggle. Mama's Escape exists to change both. To break the silence, together.",
  pledge: "We speak with you. We speak for you. We are you.",
  stat: { value: "3×", label: "more likely to die in and around pregnancy", source: { label: "MBRRACE-UK", href: "https://www.npeu.ox.ac.uk/mbrrace-uk" } },
};

export const experience = {
  tag: "What you will experience",
  heading: { lead: "Not a rulebook. A few of the ways", accent: "we hold each other." },
  items: [
    { icon: "mentor", title: "Mentor Mums", text: "A woman who has walked ahead of you and is reaching back. Someone to answer the questions you would only ask another mum, and to hold what you share in confidence." },
    { icon: "expert", title: "Expert Series and Training", text: "Sessions with people who understand, giving you practical tools for your recovery, in body and in mind." },
    { icon: "resources", title: "Resource Sharing", text: "The right help, gathered and made sense of, so the systems around you are easier to face." },
    { icon: "events", title: "Community Events", text: "Reasons to leave isolation and come into a room of women who already understand." },
  ],
} as const;

export const family = {
  tag: "Where Mama's Escape sits",
  heading: { lead: "The community, and the ways to", accent: "stay close" },
  intro: "Mama's Escape is the community, and it is part of Mums Aloud. Around it sit our podcast and our newsletter, ways to stay close wherever you are on the journey.",
  tiles: [
    { icon: "community", title: "The Community", text: "A space for mothers to connect, share, and support one another.", action: { label: "How to join", href: "#join" } },
    { icon: "podcast", title: "The Podcast", text: "Mama's Escape Podcast. Real conversations, real mothers.", action: { label: "Listen on Spotify", href: "https://creators.spotify.com/pod/show/mamasescape", external: true } },
    { icon: "newsletter", title: "The Newsletter", text: "Monthly voices from our community, straight to your inbox.", action: { label: "Get the newsletter", href: "#newsletter" } },
  ],
} as const;

export const expect = {
  tag: "What to expect",
  heading: { lead: "Not Mum. Not wife.", accent: "You." },
  body: "Here is what stepping in feels like: women who have lived what you are living. Honest conversation. Mentor mums a few steps ahead. Sessions and resources you can actually use. And a circle that will know you by your name.",
  covenant: {
    title: "Our covenant",
    body: "What is shared here stays here. No mother becomes anyone's story. We keep this space protected, so you come in through a simple form.",
  },
};

export const join = {
  tag: "How to join",
  heading: { lead: "You do not need to have it all together first.", accent: "You just need to come." },
  body: "Fill in the short form and we will welcome you in. It takes a couple of minutes.",
  asks: [
    "Your name, and what we can call you",
    "Where you are right now: expecting, newborn, under five, or other",
    "Your birthday, so we can remember it",
    "One line on what brought you here today",
  ],
  primary: "Join Mama's Escape",
  pending: "The joining form is being set up. Get the newsletter and we will tell you the moment it opens.",
};

export const stayClose = {
  tag: "Not ready to join yet?",
  heading: { lead: "Stay close,", accent: "Mama." },
  body: "Listen to the podcast, get the newsletter, or reach out to Work With Me for a closer conversation with Bokun.",
  actions: [
    { label: "Listen to the podcast", href: "https://creators.spotify.com/pod/show/mamasescape", external: true },
    { label: "Get the newsletter", href: "", newsletter: true },
    { label: "Work With Me · book a call", href: "/work-with-us/" },
  ],
  closing: "You don't have to do it all alone.",
} as const;
