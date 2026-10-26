/**
 * Work With Bokun page copy (`/work-with-us/`, the live URL). Source: the owner's "Website
 * updates, maternal wellbeing direction" document (10 Aug 2026; `output/client-docs/`), which
 * replaced the earlier Chaos to Calm / Postpartum Transition Program / TELA outline; the owner then
 * kept Chaos to Calm as a fifth service (24 Oct 2026), with its copy from the live programme page.
 * The assessment forms are the live site's own links. Items marked `confirm` are drafted.
 */
import type { AccentText } from "@/components/ui/Heading";

const calendly = "https://calendly.com/bokunimoukhuede/30min";

export const page = {
  title: "Work With Bokun",
  description:
    "Personalised one-to-one services from Mums Aloud's founder, Bokun: a free consultation call, Chaos to Calm coaching, assessments, postpartum support training and trusted resources.",
};

export const hero = {
  tag: "Work With Bokun",
  heading: { lead: "Support that is", accent: "just yours." } satisfies AccentText,
  intro:
    "Mums Aloud's community support remains free to all mums. These are additional, personalised services offered directly by our founder, Bokun, for those who'd like more one-to-one support.",
  primary: { label: "Book a free consultation call", href: calendly, external: true },
  secondary: { label: "See the services", href: "#consultation" },
};

export type BokunService = {
  id: "consultation" | "chaos-to-calm" | "assessments" | "postpartum" | "resources";
  icon: "call" | "calm" | "assessment" | "postpartum" | "resources";
  title: string;
  /** A short line under the title, such as the programme length. */
  strap?: string;
  summary: string;
  points: readonly string[];
  action: { label: string; href: string; external?: boolean };
  /** The three assessment forms: one per situation. */
  options?: readonly { label: string; href: string }[];
  optionsLabel?: string;
};

const items: readonly BokunService[] = [
  {
    id: "consultation",
    icon: "call",
    title: "Book a Free Consultation Call",
    summary: "Not sure where to start? Let's talk it through: no pressure, no obligation.",
    points: [
      "A relaxed, no-cost conversation about where you are right now",
      "Space to talk through what kind of support might actually help",
      "A chance to ask questions before deciding on anything further",
    ],
    action: { label: "Book your free call", href: calendly, external: true },
  },
  {
    id: "chaos-to-calm",
    icon: "calm",
    title: "Chaos to Calm",
    strap: "A 90-day coaching programme",
    summary: "For the mum ready to move beyond survival mode: streamline your routines, free up time for what matters, and embrace your role with confidence and joy.",
    points: [
      "A renewed sense of self and purpose",
      "Practical tools to simplify and streamline your routines",
      "Confidence to prioritise what matters most without guilt",
      "A clear plan for thriving as a mum, and as an individual",
    ],
    action: { label: "Book my coaching session", href: calendly, external: true },
  },
  {
    id: "assessments",
    icon: "assessment",
    title: "Assessments",
    summary: "Get clarity on where you are, and what support genuinely fits your stage of motherhood.",
    points: ["Personalised postpartum and family assessments", "Practical insight, not just a checklist", "A clear next step, whatever you decide to do with it"],
    // confirm: the three assessment destinations (The Empowered Life Assessment forms on the live site).
    optionsLabel: "Start an assessment",
    options: [
      { label: "For married individuals", href: "https://forms.gle/fVDtjGSJ3vRMmVeFA" },
      { label: "For recently single individuals", href: "https://forms.gle/fnX1AvUgFSKSMCHg8" },
      { label: "For single individuals", href: "https://forms.gle/zKQ18pUsgUev5Lof6" },
    ],
    action: { label: "Talk it through first", href: calendly, external: true },
  },
  {
    id: "postpartum",
    icon: "postpartum",
    title: "Postpartum Support Training",
    summary: "For mums who want deeper, personalised support through their postpartum journey.",
    points: ["1:1 postpartum transition coaching", "Guidance tailored to where you are right now", "Practical, experience-led guidance, not generic theory"],
    action: { label: "Book a session", href: calendly, external: true },
  },
  {
    id: "resources",
    icon: "resources",
    title: "Trusted Resources",
    summary: "Recommended programmes and resources we endorse that can support you on this journey.",
    points: ["Curated parenting programmes and resources", "Chosen based on what's actually helped mums in this community"],
    action: { label: "See trusted resources", href: "/trusted-resources/" },
  },
];

export const services = {
  tag: "One to one with Bokun",
  heading: { lead: "Choose the support that fits", accent: "where you are." } satisfies AccentText,
  items,
};

export const closing = {
  heading: { lead: "Ready to", accent: "talk?" } satisfies AccentText,
  // confirm: drafted line under the owner's "Ready to Talk?" heading.
  body: "One free conversation is the first step. Bring whatever is on your mind.",
  primary: { label: "Book Your Free Consultation Call", href: calendly, external: true },
  secondary: { label: "Join Mama's Escape instead", href: "/mamas-escape/" },
};
