/**
 * Partnership Opportunities page copy. Source: the live Partnership page (reviewed 21 and
 * 23 October 2026) and the Restructure Brief v2, section 4 (02). The live page's enquiry copy
 * named another organisation; it is replaced here. The strand names and the three process steps
 * are drafted to the reference layout and need sign-off (`confirm`).
 */
import type { AccentText } from "@/components/ui/Heading";

export const page = {
  title: "Partnership Opportunities",
  description:
    "Work with Mums Aloud: focus groups, patient and public involvement, campaigns, research participation and community engagement with Black mothers in the UK.",
};

export const hero = {
  tag: "Partnership Opportunities",
  heading: { lead: "Creating partnerships that transform", accent: "Black maternal care." } satisfies AccentText,
  intro: "We partner with organisations that share our vision of supporting, understanding and empowering Black mothers to thrive.",
  primary: { label: "Explore partnership", href: "/contact/" },
  secondary: { label: "What we offer", href: "#offer" },
  /** Captions on the photo cards under the hero: four of the ways we work, as placeholders until real photography lands. */
  cards: ["Focus groups", "Community events", "Training and workshops", "Peer support"],
};

export const routes = {
  heading: { lead: "Building stronger communities", accent: "together." } satisfies AccentText,
  items: [
    { title: "Insight and involvement", text: "Focus groups, patient and public involvement, research participation.", href: "#ways" },
    { title: "Training and outreach", text: "Training, workshop facilitation, engagement and community events.", href: "/training-and-events/" },
  ],
  partnersTag: "Who we have worked with",
};

export const why = {
  tag: "Why it matters",
  heading: { lead: "Real mothers. Real partners.", accent: "Real change." } satisfies AccentText,
};

export const network = {
  tag: "Who we work with",
  caption: "Our network extends across healthcare, the public sector and the private sector. What we bring to every partnership is the community itself.",
  // confirm: the first three are the live page's own words; the last two reflect the partner list and research work.
  sectors: ["Healthcare", "The public sector", "The private sector", "Community organisations", "Researchers"],
};

export const offer = {
  tag: "What we offer",
  heading: { lead: "Insight you cannot get", accent: "any other way." } satisfies AccentText,
  body: "Our network extends across healthcare, the public sector and the private sector. What we bring to every partnership is the community itself.",
  items: [
    { icon: "insight", title: "Unique insights", text: "Access to a vibrant community of Black mothers, with first-hand understanding of their experiences, needs and perspectives." },
    { icon: "culture", title: "Culturally sensitive solutions", text: "Expertise in developing culturally appropriate programmes, campaigns and initiatives that land with Black mothers." },
    { icon: "data", title: "Data-driven insights", text: "Access to data and research on the experiences and needs of Black mothers in the UK." },
    { icon: "advocates", title: "An engaged community", text: "A strong network of engaged, influential Black mothers who can act as advocates and ambassadors." },
  ],
  action: { label: "Explore partnership", href: "/contact/" },
} as const;

export const ways = {
  tag: "Ways to work together",
  heading: { lead: "Flexible partnerships, shaped to", accent: "your goals" } satisfies AccentText,
  intro: "We offer a range of flexible partnership opportunities, tailored to your specific needs and goals.",
  /** The live page's ten opportunities, kept whole in `items` and grouped into three strands (confirm the strand names). */
  items: [
    "Peer support programmes",
    "Focus groups",
    "Patient and public involvement (PPI)",
    "Training and workshop facilitation",
    "Engagement and community outreach",
    "Market research",
    "Campaigns and community advocacy",
    "Collaborative projects",
    "Community events and gatherings",
  ],
  strands: [
    { title: "Insight and research", items: ["Focus groups", "Patient and public involvement (PPI)", "Market research", "Collaborative projects"] },
    { title: "Training and facilitation", items: ["Training and workshop facilitation", "Peer support programmes"] },
    { title: "Engagement and advocacy", items: ["Engagement and community outreach", "Campaigns and community advocacy", "Community events and gatherings"] },
  ],
  action: { label: "Talk to us", href: "/contact/" },
};

/** confirm: drafted for the reference's process section; the owner to confirm each step and what partners receive. */
export const process = {
  heading: { lead: "A clear process from first conversation to", accent: "first session." } satisfies AccentText,
  intro: "A straightforward way of working together, focused on the mothers you want to reach and on what you need to achieve.",
  steps: [
    {
      short: "Conversation",
      title: "Start with a conversation",
      text: "Tell us about your organisation and what you hope to achieve. We listen first: your context, your aims, and who you need to reach.",
      outcome: "A clear sense of whether, and how, we can help.",
    },
    {
      short: "Shape",
      title: "Shape it together",
      text: "We design the format with you, whether that is a focus group, training, involvement work or a campaign, with the mothers' voice built in from the start.",
      outcome: "A plan with aims, format, dates and what each side brings.",
    },
    {
      short: "Deliver",
      title: "Deliver and learn",
      text: "We deliver with our community, then share what we heard so it can shape what you do next.",
      outcome: "Delivery, honest feedback and a plain summary you can act on.",
    },
  ],
  outcomeLabel: "What you get",
};

export const voices = {
  heading: { lead: "Voices from the", accent: "community" } satisfies AccentText,
  intro: "The mothers behind every partnership, in their own words.",
  link: { label: "View all stories", href: "/story-lounge/" },
};

export const partners = {
  tag: "Who we have worked with",
  heading: { lead: "In good", accent: "company" } satisfies AccentText,
  intro: "Mums Aloud was built alongside partners who believe mothers deserve to be seen and supported.",
};

export const closing = {
  heading: { lead: "Let's build something", accent: "together." } satisfies AccentText,
  body: "Tell us about your organisation and what you are hoping to achieve. We reply within a few working days.",
  primary: { label: "Get in touch", href: "/contact/" },
  secondary: { label: "See our training", href: "/training-and-events/" },
};
