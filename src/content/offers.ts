/**
 * Copy for the Our Services, Trusted Resources and New Mums Circle pages. Services and Trusted
 * Resources follow the owner's "Website updates, maternal wellbeing direction" document
 * (10 Aug 2026; `output/client-docs/`), word for word where it gives the words. The offers on
 * Trusted Resources are the live Affiliate Programs page's own, with their live destinations.
 * Items marked `confirm` are drafted and need sign-off.
 */
import type { AccentText } from "@/components/ui/Heading";

const calendly = "https://calendly.com/bokunimoukhuede/30min";

export type Offer = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  action: { label: string; href: string };
  /** True when the link is a referral link that may earn Mums Aloud a commission. */
  referral?: boolean;
};

export type Pathway = {
  id: string;
  icon: "support" | "group" | "mentor" | "community" | "training" | "events" | "experts";
  title: string;
  summary: string;
  items: readonly string[];
};
export type PathwayGroup = { id: string; tag: string; heading: AccentText; pathways: readonly Pathway[] };
export type Audience = { icon: "mums" | "volunteers"; title: string; items: readonly string[] };

/** The seven pathways, in the owner's order, in two groups (confirm: the group names are drafted). */
const groups: readonly PathwayGroup[] = [
  {
    id: "support-and-belonging",
    tag: "Support and belonging",
    heading: { lead: "Pick the pathway that fits", accent: "where you are." },
    pathways: [
      {
        id: "support",
        icon: "support",
        title: "1:1 Support",
        summary: "One-to-one support built around you, from your first steps into motherhood through to the toughest days.",
        items: ["Individual support sessions with a trained practitioner", "Postpartum transition coaching", "Crisis support and referrals", "Signposting to specialist services"],
      },
      {
        id: "group",
        icon: "group",
        title: "Group Support & Counselling",
        summary: "A safe space to share, be heard, and know you're not carrying it alone.",
        items: ["Weekly support group sessions", "Group counselling and mindfulness sessions", "Online community forums", "Peer-led discussion circles"],
      },
      {
        id: "mentor",
        icon: "mentor",
        title: "Get a Mentor Mum",
        summary: "Paired with a mum who's walked the path before you, for honest guidance and real friendship.",
        items: ["One-to-one mentor matching", "Regular check-ins and ongoing support", "Guidance from lived experience, not just training", "A steady, familiar face through the early years"],
      },
      {
        id: "community",
        icon: "community",
        title: "Join Our Community",
        summary: "Become part of a community that shows up for you and your family, not just in a crisis.",
        items: ["Community groups and forums", "Social events and meet-ups", "Buddy system pairing", "A sense of belonging that lasts beyond the early years"],
      },
    ],
  },
  {
    id: "learn-and-grow",
    tag: "Learn, meet and grow",
    heading: { lead: "Practical skills, real experts and", accent: "reasons to gather." },
    pathways: [
      {
        id: "training",
        icon: "training",
        title: "Training and Workshops",
        summary: "Targeted training designed to empower mothers, build practical life skills, and support smooth transitions back into the workforce or entrepreneurship.",
        items: ["Personal Growth & Confidence", "Back-to-Work & Career Transition", "Financial Literacy & Household Budgeting", "Basic Business & Entrepreneurship"],
      },
      {
        id: "events",
        icon: "events",
        title: "Community Events",
        summary: "Regular events that bring mums together to connect, celebrate, and belong.",
        items: ["Regular community gatherings", "Family-friendly activities", "Networking and celebration events"],
      },
      {
        id: "experts",
        icon: "experts",
        title: "Subject Matter Expert Sessions",
        summary: "Trusted, practical guidance straight from professionals who know their stuff.",
        items: [
          "Guest expert workshops (health, wellbeing, finance, parenting)",
          "Live Q&A sessions with specialists",
          "Topic-led talks shaped by what mums actually ask for",
          "Access to accurate, reliable information: no guesswork",
        ],
      },
    ],
  },
];

const audiences: readonly Audience[] = [
  {
    icon: "mums",
    title: "For Mums",
    items: [
      "1:1 and group support, including counselling and mentor matching",
      "A trusted community to connect, grow, and belong",
      "Practical support for personal development and getting back into work",
    ],
  },
  {
    icon: "volunteers",
    title: "For Volunteers",
    items: [
      "A trusted space to give back and make a real difference",
      "Opportunities to mentor, lead sessions, or support behind the scenes",
      "Training provided wherever you need it",
    ],
  },
];

export const services = {
  title: "Our Services",
  description:
    "Real support for mums at every stage of the journey: 1:1 support, group support and counselling, mentor mums, community, training, events and expert sessions from Mums Aloud.",
  tag: "Our services",
  heading: { lead: "Our", accent: "Services" } satisfies AccentText,
  intro: "Real support for mums, at every stage of the journey, from pregnancy through the early years.",
  groups,
  volunteer: {
    tag: "Want to volunteer?",
    heading: { lead: "There's a place for you", accent: "at Mums Aloud." } satisfies AccentText,
    intro: "Whether you're an expert in your field or simply want to give back, there's a place for you at Mums Aloud.",
    items: [
      "Become a Mentor Mum",
      "Support any of our service areas: bring your own experience, or be trained by us",
      "Help facilitate a group session, workshop, or event",
      "Support behind the scenes with community activities",
    ],
    note: "You don't need to have it all figured out. If there's an area you're passionate about but not yet confident in, we'll train you.",
    action: { label: "Volunteer with us", href: "/volunteer/" },
  },
  approach: {
    tag: "How we help",
    heading: { lead: "How Mums Aloud", accent: "aims to help." } satisfies AccentText,
    intro: "Our approach addresses the real, everyday challenges mums face, and the ones nobody talks about.",
    audiences,
  },
  closing: {
    heading: { lead: "Ready to", accent: "get started?" } satisfies AccentText,
    body: "Whether you're a mum looking for support, or someone who wants to help, we're here for you.",
    primary: { label: "Get Support", href: "/contact/" },
    secondary: { label: "Volunteer With Us", href: "/volunteer/" },
  },
};

export const trustedResources = {
  title: "Trusted Resources",
  description: "Recommended programmes and resources Mums Aloud endorses: parenting, premarital and marital support, and personal harmony coaching.",
  tag: "Trusted resources",
  heading: { lead: "Programmes and resources", accent: "we endorse." } satisfies AccentText,
  intro: "Recommended programmes and resources we endorse that can support you on this journey: curated parenting programmes and resources, chosen based on what's actually helped mums in this community.",
  // confirm: the disclosure wording and which links are referral links.
  disclosure:
    "Some of these programmes are run by partners, and one link is a referral link: if you join through it, Mums Aloud may receive a commission at no extra cost to you. We only list what we would recommend to a friend.",
  referralLabel: "Referral link",
  bookedLabel: "Booked with Bokun",
  offers: [
    {
      title: "Intentional Parenting on the GO",
      paragraphs: [
        "A self-paced coaching programme that supports parents to raise whole, resilient children with greater ease, while improving their own wellbeing and happiness.",
        "Twelve modules with four lessons each cover topical parenting questions and share research-based tips. It is easy to follow at your own pace, with simple exercises in each module to help you take small steps and put what you learn into practice.",
      ],
      action: { label: "Join now", href: "https://selar.co/ontheGOcoaching?affiliate=benb" },
      referral: true,
    },
    {
      title: "Premarital support: the Preparing for Bliss Project",
      paragraphs: [
        "For engaged couples and singles who want to build a fulfilling, team-centred marriage that lasts. We crave love, connection and a deep sense of belonging, and marriage is one of the most profound ways to meet those needs. A truly blissful partnership takes preparation, self-awareness and a commitment to growing.",
        "The Preparing for Bliss Project guides you every step of the way, with the tools, knowledge and systems to create a flourishing marriage with someone who complements you, shares your values and brings out the best in you.",
      ],
      action: { label: "Book a session", href: calendly },
    },
    {
      title: "Post-marital support: the Marital Bliss Project",
      paragraphs: ["The Marital Bliss Project gives you the tools, knowledge and support to:"],
      bullets: [
        "Build a strong foundation for a lasting and fulfilling partnership.",
        "Develop the communication and conflict-resolution skills a thriving relationship needs.",
        "Cultivate intimacy and deepen your connection with your partner.",
        "Create a shared vision for your future together.",
        "Nurture personal growth and self-awareness within your relationship.",
      ],
      action: { label: "Book a session", href: calendly },
    },
    {
      title: "Personal Harmony group programme",
      paragraphs: ["This course is not just about finding love. It is about becoming the person you were meant to be: discover your true self, heal from past hurts, boost your confidence and learn what makes relationships last."],
      action: { label: "Book a place", href: "https://bit.ly/PHPpay1" },
    },
    {
      title: "Personal Harmony one-to-one programme",
      paragraphs: ["The same journey, one to one with Bokun: a transformative programme that reshapes your whole approach to relationships and life, so you wake up feeling confident, empowered and truly ready for love."],
      action: { label: "Book a session", href: calendly },
    },
  ] satisfies Offer[],
  closing: {
    heading: { lead: "Not sure which one", accent: "is for you?" } satisfies AccentText,
    body: "A free consultation call with Bokun is the quickest way to find out. For the community itself, Mama's Escape is the door in.",
    primary: { label: "Book a free consultation call", href: calendly },
    secondary: { label: "Join Mama's Escape" },
  },
};

export const newMumsCircle = {
  title: "New Mums Circle",
  description: "The MumsAloud New Mums Circle: a supportive community for new mums and mums with children aged 0 to 5, with mentorship from experienced mums.",
  tag: "Community",
  heading: { lead: "The New", accent: "Mums Circle." } satisfies AccentText,
  intro: "A vibrant, supportive community exclusively for new mums and mums with children aged 0 to 5. As an extension of MumsAloud, it is a nurturing space to connect, receive mentorship and find support from experienced mums who have already walked this road.",
  body: "Becoming a new mum is a life-changing experience, full of joys and challenges, and a supportive community matters most in this transformative time. The Circle is a place to connect with mums who have shared similar experiences and to learn from their journeys.",
  join: { label: "Join on WhatsApp", href: "https://chat.whatsapp.com/DHkBQR24dPH0S9THGJcsQc", note: "Opens the group in WhatsApp." },
  closing: {
    heading: { lead: "Looking for the", accent: "whole village?" } satisfies AccentText,
    body: "Mama's Escape is the wider community: mentor mums, expert sessions, resources and events for Black mothers in the UK.",
    primary: { label: "Join Mama's Escape" },
    secondary: { label: "What to expect", href: "/mamas-escape/#what-to-expect" },
  },
};
