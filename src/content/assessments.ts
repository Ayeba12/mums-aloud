/**
 * The Empowered Life Assessment (TELA): one £100 payment through one Stripe payment link covers
 * all three assessments (owner, 9 Nov 2026). Shared by the Work With Bokun card, the checkout page
 * and the terms. The Stripe page (checked 9 Nov 2026) reads "TELA Assessment, £100.00", paid to
 * Mumsaloud Initiative CIC.
 *
 * The assessment forms are never linked from this site (owner, 9 Nov 2026): paid mums receive their
 * links after payment, or by emailing us with proof of payment. Items marked `confirm` are drafted.
 */
import type { AccentText } from "@/components/ui/Heading";
import { mailtoHref } from "@/lib/inbox";
import { siteConfig } from "@/lib/site";

export const CHECKOUT_PATH = "/assessment-checkout/";
/** The assessment section of the terms page (PolicyArticle builds its ids from the section titles). */
export const ASSESSMENT_TERMS_PATH = "/terms-and-conditions/#terms-assessments-with-bokun";

export const assessmentOffer = {
  name: "The Empowered Life Assessment",
  shortName: "TELA",
  price: { amount: 100, label: "£100", currency: "GBP" },
  stripeUrl: "https://buy.stripe.com/fZe6qv3UgacPcFy5km",
  /** The name the Stripe payment page shows, so nobody is surprised by it. */
  payee: "Mumsaloud Initiative CIC",
  calendly: "https://calendly.com/bokunimoukhuede/30min",
};

/** The three assessments, all covered by the one payment. */
export const assessments: readonly { id: string; label: string }[] = [
  { id: "married", label: "For married individuals" },
  // Owner, 9 Nov 2026: was "For recently single individuals".
  { id: "marital-rediscovery", label: "Marital Rediscovery Assessment" },
  { id: "single", label: "For single individuals" },
];

/** A ready-made email for a mum who has paid but has no links yet. */
export const proofOfPaymentEmail = mailtoHref(
  "Assessment payment: please send my links",
  [
    "Hello Mums Aloud,",
    "",
    "I have paid £100 for The Empowered Life Assessment. Please send me the links to my assessments.",
    "",
    "Name:",
    "Email address I paid with:",
    "Date of payment:",
    "",
    "I have attached my Stripe receipt (or a screenshot of the payment).",
  ].join("\n"),
);

export const checkout = {
  title: "Book your assessment",
  description: "Book The Empowered Life Assessment with Bokun: one payment of £100 covers all three assessments. Pay securely with Stripe and receive your assessment links.",
  tag: "The Empowered Life Assessment",
  heading: { lead: "Book your", accent: "assessment." } satisfies AccentText,
  intro: "One payment of £100 covers all three assessments. Pay securely, then use the links we send you to complete them in your own time.",
  order: {
    tag: "Your booking",
    title: "TELA Assessment",
    note: "One payment. Covers all three assessments.",
    includesLabel: "Included",
    pay: "Pay £100 securely",
    terms: { before: "I have read and agree to the ", link: "terms for assessments", after: "." },
    termsHint: "Please tick the box to agree to the terms before you pay.",
    secure: "Payment is handled by Stripe, so we never see your card details. The payment page shows our registered name, Mumsaloud Initiative CIC.",
    unsure: "Not sure yet? Book a free call first",
  },
  steps: {
    heading: "How it works",
    items: [
      { title: "Agree and pay", text: "Tick to agree to the terms, then pay £100 once on Stripe's secure payment page." },
      { title: "Get your assessment links", text: "After you pay, you receive the links to your three assessments. They are for you only." },
      // confirm: what happens after the forms are sent, and how soon.
      { title: "Hear from Bokun", text: "Bokun reads your answers and comes back to you with your next step." },
    ],
  },
  proof: {
    tag: "Already paid?",
    heading: { lead: "No link yet?", accent: "Email us." } satisfies AccentText,
    intro: `Email ${siteConfig.email} with your Stripe receipt or a screenshot of your payment, and we will send you the links to your assessments.`,
    action: "Email us your proof of payment",
  },
  closing: {
    heading: { lead: "Not sure it is", accent: "right for you?" } satisfies AccentText,
    body: "A free conversation with Bokun is a good place to start. There is no obligation to book anything.",
    primary: { label: "Book a free call", href: "https://calendly.com/bokunimoukhuede/30min" },
    secondary: { label: "See all of Bokun's services", href: "/work-with-us/" },
  },
};
