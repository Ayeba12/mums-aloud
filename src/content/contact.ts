/**
 * Copy for the Contact page. The live site's Contact page is a bare form (first name, last name,
 * phone, email, message) and publishes no address, email or phone, so none is invented here.
 */
import type { AccentText } from "@/components/ui/Heading";

export const contact = {
  title: "Contact",
  description: "Get in touch with Mums Aloud about Mama's Escape, partnerships, training and events, or working with Bokun.",
  tag: "Contact",
  heading: { lead: "We'd love to", accent: "hear from you." } satisfies AccentText,
  intro: "Tell us what you need and we will get your message to the right person. For the most common things, there is a quicker route beside the form.",
  form: {
    heading: "Send us a message",
    labels: { name: "Your name", email: "Email address", phone: "Phone (optional)", topic: "What is it about?", message: "Your message" },
    placeholders: { name: "Jane Doe", email: "name@example.com", phone: "+44 7700 900123", message: "Tell us a little about what you need." },
    topicPrompt: "Choose one",
    submit: "Send message",
    sending: "Sending…",
    privacy: "We only use what you share here to reply to you.",
  },
  routes: {
    heading: "Quicker routes",
    items: [
      { title: "Join Mama's Escape", text: "The community for Black mothers: mentor mums, expert sessions, resources and events.", label: "How to join", join: true },
      { title: "Partner with us", text: "Organisations, commissioners and community partners start here.", label: "Partnership opportunities", href: "/partnership/" },
      { title: "Book a call with Bokun", text: "A free call about coaching and programmes, booked straight into her diary.", label: "Book on Calendly", href: "https://calendly.com/bokunimoukhuede/30min", external: true },
      { title: "Listen first", text: "The Mama's Escape Podcast: real conversations, real mothers.", label: "Go to the podcast", href: "/podcast/" },
    ],
  },
  closing: {
    heading: { lead: "Not sure where", accent: "to start?" } satisfies AccentText,
    body: "For mothers, Mama's Escape is the door in. Everything else can start with a message.",
    primary: { label: "Join Mama's Escape" },
    secondary: { label: "Partner with us", href: "/partnership/" },
  },
};
