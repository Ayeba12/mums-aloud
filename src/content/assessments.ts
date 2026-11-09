/**
 * The Empowered Life Assessment (TELA): one price, one Stripe payment link, three assessment forms
 * (owner, 9 Nov 2026). Shared by the Work With Bokun card and the checkout page, so the price and
 * the links live in one place. The Stripe page (checked 9 Nov 2026) reads "TELA Assessment,
 * £100.00", paid to Mumsaloud Initiative CIC. Items marked `confirm` are drafted.
 */
import type { AccentText } from "@/components/ui/Heading";

export const CHECKOUT_PATH = "/assessment-checkout/";

export const assessmentOffer = {
  name: "The Empowered Life Assessment",
  shortName: "TELA",
  price: { amount: 100, label: "£100", currency: "GBP" },
  stripeUrl: "https://buy.stripe.com/fZe6qv3UgacPcFy5km",
  /** The name the Stripe payment page shows, so nobody is surprised by it. */
  payee: "Mumsaloud Initiative CIC",
  calendly: "https://calendly.com/bokunimoukhuede/30min",
};

/** The three assessments, one Google Form each (the live site's forms). The price covers any one. */
export const assessments: readonly { id: string; label: string; href: string }[] = [
  { id: "married", label: "For married individuals", href: "https://forms.gle/fVDtjGSJ3vRMmVeFA" },
  // Owner, 9 Nov 2026: was "For recently single individuals".
  { id: "marital-rediscovery", label: "Marital Rediscovery Assessment", href: "https://forms.gle/fnX1AvUgFSKSMCHg8" },
  { id: "single", label: "For single individuals", href: "https://forms.gle/zKQ18pUsgUev5Lof6" },
];

export const checkout = {
  title: "Book your assessment",
  description: "Book The Empowered Life Assessment with Bokun: one payment of £100 covers any one of our three assessments. Pay securely with Stripe, then complete your form.",
  tag: "The Empowered Life Assessment",
  heading: { lead: "Book your", accent: "assessment." } satisfies AccentText,
  intro: "One price for every assessment. Pay securely, then complete the form for the assessment that fits where you are.",
  order: {
    tag: "Your booking",
    title: "TELA Assessment",
    note: "One payment. Covers any one of the three assessments.",
    includes: ["A personalised postpartum and family assessment", "Practical insight, not just a checklist", "A clear next step, whatever you decide to do with it"],
    pay: "Pay £100 securely",
    secure: "Payment is handled by Stripe, so we never see your card details. The payment page shows our registered name, Mumsaloud Initiative CIC.",
    unsure: "Not sure yet? Book a free call first",
  },
  steps: {
    heading: "How it works",
    items: [
      { title: "Pay once", text: "Pay £100 on Stripe's secure payment page." },
      { title: "Complete your assessment", text: "Come back here and open the form for your assessment. Answer in your own time." },
      // confirm: what happens after the form is sent, and how soon.
      { title: "Hear from Bokun", text: "Bokun reads your answers and comes back to you with your next step." },
    ],
  },
  start: {
    tag: "Already paid?",
    heading: { lead: "Start your", accent: "assessment." } satisfies AccentText,
    intro: "Open the form that fits where you are. Use the same email address you paid with, so we can match your answers to your payment.",
  },
  closing: {
    heading: { lead: "Not sure which one", accent: "fits?" } satisfies AccentText,
    body: "A free conversation with Bokun is a good place to start. There is no obligation to book anything.",
    primary: { label: "Book a free call", href: "https://calendly.com/bokunimoukhuede/30min", external: true },
    secondary: { label: "See all of Bokun's services", href: "/work-with-us/" },
  },
};
