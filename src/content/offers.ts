/**
 * Copy for the Affiliate Programs, Services and New Mums Circle pages, from the live pages
 * (23 Oct 2026), tidied. Destinations are the live site's own links. The affiliate disclosure is
 * drafted and needs sign-off (`confirm`).
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

export const affiliate = {
  title: "Affiliate Programs",
  description: "Programmes Mums Aloud recommends and runs with partners: parenting, premarital and marital support, and personal harmony coaching.",
  tag: "Affiliate programs",
  heading: { lead: "Programmes we recommend", accent: "and run with partners." } satisfies AccentText,
  // confirm: the disclosure wording and which links are referral links.
  intro: "Some of these programmes are run by partners, and one link is a referral link: if you join through it, Mums Aloud may receive a commission at no extra cost to you. We only list what we would recommend to a friend.",
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
    body: "A free call with Bokun is the quickest way to find out. For the community itself, Mama's Escape is the door in.",
    primary: { label: "Book a free call", href: calendly },
    secondary: { label: "Join Mama's Escape" },
  },
};

export const services = {
  title: "Products & Services",
  description: "Everything Mums Aloud offers in one place: the Postpartum Transition Program, Chaos to Calm, TELA, partnerships and affiliate programmes.",
  tag: "Products & services",
  heading: { lead: "Grounded in empathy, understanding", accent: "and cultural sensitivity." } satisfies AccentText,
  intro: "Our team of experts is dedicated to high-quality services grounded in empathy, understanding and cultural sensitivity. We work closely with each client to identify their needs and goals, and develop solutions that help them succeed.",
  items: [
    { title: "Postpartum Transition Program", text: "The postpartum period is one of the most profound transitions in a woman's life: physical recovery, emotional growth and a changing identity, with its own challenges, uncertainty and the pressure to adapt to a new normal.", href: "/work-with-us/#postpartum" },
    { title: "Chaos to Calm", text: "A 90-day coaching programme designed to help you break free from the overload, rediscover your true self, and create a life that feels calm, balanced and fulfilling.", href: "/work-with-us/#chaos-to-calm" },
    { title: "The Empowered Life Assessment (TELA)", text: "Unlock your full potential as a mother by taking our assessment: the first step towards discovering your strengths, identifying areas for growth, and receiving personalised support from our community.", href: "/work-with-us/#tela" },
    { title: "Partnership", text: "We partner with organisations that share our vision of supporting, understanding and empowering Black mothers to thrive, across healthcare, the public sector and the private sector.", href: "/partnership/" },
    { title: "Affiliate programmes", text: "Programmes we recommend and run with partners: parenting, premarital and marital support, and personal harmony coaching.", href: "/affiliate-programs/" },
  ],
  closing: {
    heading: { lead: "Start with", accent: "a conversation." } satisfies AccentText,
    body: "Tell us what you need and we will point you to the right place.",
    primary: { label: "Get in touch", href: "/contact/" },
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
