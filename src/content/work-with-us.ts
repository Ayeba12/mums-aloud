/**
 * Work With Us page copy. Sources: the live Chaos to Calm, Postpartum Transition Program and
 * TELA pages (reviewed 21 October 2026) and the Restructure Brief v2, section 4.
 * Prices, durations and "100+ mothers" are the current website's claims; items marked
 * `confirm` need the owner's sign-off before launch. Moves to WordPress in Phase 6.
 */
export const page = {
  title: "Work With Us",
  description:
    "1:1 coaching and personal programmes with Bokun for mothers ready to invest in themselves: Chaos to Calm, the Postpartum Transition Program and The Empowered Life Assessment.",
};

export const hero = {
  tag: "Work With Us",
  heading: { lead: "Support that is", accent: "just yours." },
  intro: "A closer path with Bokun for the mother who wants support that is hers alone. One conversation starts it.",
  primary: { label: "Book a free call", href: "https://calendly.com/bokunimoukhuede/30min", external: true },
  secondary: { label: "See the programmes", href: "#programmes" },
};

export const intro = {
  tag: "Why coaching",
  heading: { lead: "Motherhood doesn't come with a manual.", accent: "You don't have to figure it out alone." },
  body: "Mama's Escape is the community. Work With Us is for the mother who wants to go deeper, with a coach who has walked the same road. Every programme is built around your life, not a template.",
  // confirm: "100+ mothers" is the live site's claim.
  proof: { value: "100+", label: "mothers coached" },
};

export const programmes = {
  tag: "Programmes",
  heading: { lead: "Choose the path that", accent: "fits where you are" },
  items: [
    {
      id: "chaos-to-calm",
      icon: "calm",
      title: "Chaos to Calm",
      strap: "A 90-day coaching programme",
      summary: "For the mum ready to move beyond survival mode: streamline your routines, free up time for what matters, and embrace your role with confidence and joy.",
      phases: ["Discover", "Transform", "Flourish"],
      outcomes: [
        "A renewed sense of self and purpose",
        "Practical tools to simplify and streamline your routines",
        "Confidence to prioritise what matters most without guilt",
        "A clear plan for thriving as a mum, and as an individual",
      ],
      action: { label: "Book my coaching session", href: "https://calendly.com/bokunimoukhuede/30min", external: true },
      legacyPath: "/chaos-to-calm/",
    },
    {
      id: "postpartum",
      icon: "postpartum",
      title: "Postpartum Transition Program",
      strap: "Coaching for new mums",
      summary: "The postpartum period is one of the most profound transitions in a woman's life. This programme offers support, guidance and empowerment to thrive beyond the challenges.",
      areas: [
        "Holistic support for physical and emotional change",
        "Nutrition and lifestyle guidance for recovery and energy",
        "Emotional wellness and identity beyond “mum”",
        "Relationships, intimacy and communication",
        "Personal growth and long-term fulfilment",
      ],
      action: { label: "Book my coaching session", href: "https://calendly.com/bokunimoukhuede/30min", external: true },
      legacyPath: "/postpartum-transition-program/",
    },
    {
      id: "tela",
      icon: "assessment",
      title: "The Empowered Life Assessment (TELA)",
      strap: "Your first step",
      summary: "Discover your strengths, identify areas for growth and receive personalised support, whether you are navigating parenthood, marriage or personal development.",
      // confirm: the three assessment destinations and any price.
      options: [
        { label: "For married individuals", href: "https://forms.gle/fVDtjGSJ3vRMmVeFA" },
        { label: "For recently single individuals", href: "https://forms.gle/fnX1AvUgFSKSMCHg8" },
        { label: "For single individuals", href: "https://forms.gle/zKQ18pUsgUev5Lof6" },
      ],
      action: { label: "Start an assessment", href: "#tela-options" },
      legacyPath: "/the-empowered-life-assessment-tela/",
    },
  ],
} as const;

export const howItWorks = {
  tag: "How it works",
  heading: { lead: "Three steps, at", accent: "your pace" },
  steps: [
    { title: "Book a free call", text: "Thirty minutes with Bokun to talk about where you are and what you need. No pressure, no preparation." },
    { title: "Choose your path", text: "Together you pick the programme, or the assessment, that fits your season of motherhood." },
    { title: "Walk it with someone", text: "Regular sessions, practical tools and a coach who understands the cultural weight you carry." },
  ],
};

export const closing = {
  heading: { lead: "Because you deserve to thrive,", accent: "not just survive." },
  primary: { label: "Book a free call", href: "https://calendly.com/bokunimoukhuede/30min", external: true },
  secondary: { label: "Join Mama's Escape instead", href: "/mamas-escape/#join" },
};
