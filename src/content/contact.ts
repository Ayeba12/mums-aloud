/**
 * Copy for the Contact page. The ways to reach the team (email, phone, Instagram) and the
 * "How can we help?" starter text are the owner's notes of 10 August 2026, laid out as the
 * Butterfly Bliss contact page the owner pointed to: reach us, the form, help right now.
 */
import type { AccentText } from "@/components/ui/Heading";

export const contact = {
  title: "Contact",
  description: "Get in touch with Mums Aloud by email, phone or Instagram, or send a message about Mama's Escape, partnerships, our services or working with Bokun.",
  tag: "Contact",
  heading: { lead: "We'd love to", accent: "hear from you." } satisfies AccentText,
  intro: "We are here to support you. Reach us the way that suits you, or send a message and we will get it to the right person.",
  reach: {
    heading: "Reach out to us",
    /** Each links to the matching entry in `siteConfig`; social cards show only once their URLs are set. */
    items: [
      { kind: "email", title: "Email", text: "Send us a message any time." },
      { kind: "phone", title: "Call us", text: "Speak with the team directly." },
      { kind: "instagram", title: "Instagram", text: "Follow us for updates." },
    ],
  } as const,
  form: {
    heading: "Send us a message",
    labels: { name: "Your name", email: "Email address", phone: "Phone number (optional)", topic: "What is it about?", message: "Your message" },
    placeholders: { name: "Jane Doe", email: "name@example.com", phone: "07700 900123", message: "How can we help?" },
    topicPrompt: "Choose one",
    submit: "Send message",
    sending: "Sending…",
    privacy: "We only use what you share here to reply to you.",
  },
  routes: {
    heading: "Quicker routes",
    items: [
      { title: "Join Mama's Escape", text: "Our community for Black mothers: mentor mums, expert sessions, resources and events.", label: "How to join", join: true },
      { title: "Partner with us", text: "Organisations, commissioners and community partners start here.", label: "Partnership opportunities", href: "/partnership/" },
      { title: "Book a call with Bokun", text: "A free consultation call, booked straight into her diary.", label: "Book on Calendly", href: "https://calendly.com/bokunimoukhuede/30min", external: true },
      { title: "Volunteer with us", text: "Mentor, facilitate, or help behind the scenes.", label: "Volunteer With Us", href: "/volunteer/" },
    ],
  },
  urgent: {
    heading: "If you need help right now",
    intro: "Mums Aloud is not a crisis service. These lines are free and open day and night.",
    items: [
      { name: "Emergency services", phone: "999", href: "tel:999", text: "If you or your baby are in immediate danger." },
      { name: "NHS 111", phone: "111", href: "tel:111", text: "Urgent health help, with a mental health option." },
      { name: "Samaritans", phone: "116 123", href: "tel:116123", text: "Someone to listen, any time." },
    ],
    link: { label: "More support contacts", href: "/find-support/" },
  },
  closing: {
    heading: { lead: "Not sure where", accent: "to start?" } satisfies AccentText,
    body: "For mothers, Mama's Escape is the door in. Everything else can start with a message.",
    primary: { label: "Join Mama's Escape" },
    secondary: { label: "Partner with us", href: "/partnership/" },
  },
};
