/**
 * Volunteer With Us page copy, from the owner's notes of 10 August 2026 ("Suggested volunteer
 * with us intro and form"). The dashed lines are written as sentences, as the owner asked for no
 * dashes anywhere. The reassurance line under the form heading is the same document's
 * "Want to Volunteer?" paragraph. Applications go to the team inbox in `siteConfig.email`.
 */
import type { AccentText } from "@/components/ui/Heading";

export const page = {
  title: "Volunteer With Us",
  description:
    "Volunteer with Mums Aloud: mentor a mum, facilitate workshops, support events or help behind the scenes. Join a community of volunteers making a real difference in mums' lives.",
};

export const hero = {
  tag: "Volunteer with us",
  heading: { lead: "Empower. Support.", accent: "Inspire." } satisfies AccentText,
  intro:
    "Are you passionate about making a difference in the lives of mums and families? Join the Mums Aloud volunteer community and be part of a movement that supports mothers through every stage of the journey.",
  primary: { label: "Apply to volunteer", href: "#apply" },
  secondary: { label: "Why volunteer", href: "#why" },
};

export const why = {
  tag: "Why volunteer",
  heading: { lead: "Why volunteer", accent: "with us?" } satisfies AccentText,
  items: [
    { icon: "empower", title: "Empower mums", text: "Help mums build confidence, develop life skills, and grow personally and professionally." },
    { icon: "community", title: "Foster community", text: "Contribute to a safe, welcoming space where every mum feels heard and valued." },
    {
      icon: "skills",
      title: "Share your skills",
      text: "Whether you're a maternal health advocate, a career coach, or simply a caring soul, your talents can change lives.",
    },
    { icon: "workshops", title: "Facilitate workshops", text: "Lead sessions on maternal wellbeing, personal development, or career building." },
    { icon: "mentor", title: "Become a mentor", text: "Provide one-on-one support and guidance to a mum on her journey." },
    { icon: "events", title: "Event support", text: "Help with event planning, outreach, or behind-the-scenes coordination." },
  ],
} as const;

export const impact = {
  /** "Ready to make an impact?" in the owner's notes: the sentence is the statement, the question leads the form. */
  statement: {
    lead: "Together, we can help mums not just get by, but",
    highlight: "thrive",
    trail: ", creating ripples of positivity for their families and communities.",
  },
  body: "Sign up to volunteer and become part of something that empowers, uplifts, and transforms lives.",
  action: { label: "Apply to volunteer", href: "#apply" },
};

export const apply = {
  tag: "Ready to make an impact?",
  heading: { lead: "Your volunteer", accent: "application." } satisfies AccentText,
  intro: "You don't need to have it all figured out. If there's an area you're passionate about but not yet confident in, we'll train you.",
  /** The team address sits between these two halves as a mailto link. */
  note: { before: "Applications are sent directly to our team at ", after: ". We'll be in touch soon after you apply." },
  form: {
    labels: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email address",
      phone: "Phone number (optional)",
      skills: "Skills & experience",
      availability: "Availability",
    },
    placeholders: {
      firstName: "Jane",
      lastName: "Doe",
      email: "name@example.com",
      phone: "+44 7700 900123",
      skills: "What you do, what you have lived through, and where you would like to help.",
      availability: "Weekday evenings, one Saturday a month",
    },
    submit: "Submit application",
    sending: "Sending…",
    privacy: "We only use what you share here to get back to you about volunteering.",
    /** Offered when the online form is not open yet: a prefilled email with everything typed. */
    fallback: "Email your application instead",
  },
};

export const closing = {
  heading: { lead: "Let's lift each other", accent: "higher." } satisfies AccentText,
  body: "Join our community of volunteers making a real difference in mums' lives.",
  primary: { label: "Apply to volunteer", href: "#apply" },
  secondary: { label: "See how we help", href: "/services/" },
};
