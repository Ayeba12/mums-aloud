/**
 * Training, Workshops & Events page copy. Source: Restructure Brief v2, section 4 (03).
 * No live page exists for this area yet, so the strands below are drafted from the brief and
 * marked `confirm`. Events come from WordPress once the events model exists (Phase 6).
 */
export const page = {
  title: "Training, Workshops & Events",
  description:
    "Practical, culturally relevant learning and connection for mothers and professionals: wellbeing workshops, parenting and early years sessions, community events and the Maternal Health Summit.",
};

export const hero = {
  tag: "Training, Workshops & Events",
  heading: { lead: "Learning that understands", accent: "where you come from." },
  intro: "Practical, culturally relevant sessions for mothers, and for the professionals who work with them.",
  primary: { label: "See what's coming up", href: "#events" },
  secondary: { label: "Commission training", href: "/contact/" },
};

export const strands = {
  tag: "What we run",
  heading: { lead: "Four kinds of", accent: "gathering" },
  // confirm: strand descriptions, frequency and who delivers them.
  items: [
    { icon: "wellbeing", title: "Wellbeing workshops", text: "Space to breathe, talk and learn practical ways to look after your body and mind through motherhood." },
    { icon: "parenting", title: "Parenting and early years sessions", text: "Honest, culturally grounded sessions on the early years, from feeding and sleep to the questions nobody else answers." },
    { icon: "events", title: "Community events", text: "Reasons to leave isolation and come into a room of women who already understand." },
    { icon: "summit", title: "The Maternal Health Summit", text: "Mothers, professionals and partners in one room, talking honestly about Black maternal health in the UK." },
  ],
} as const;

export const events = {
  tag: "Coming up",
  heading: { lead: "Upcoming", accent: "events" },
  // The listing is empty until events are published in WordPress; say so plainly.
  empty: "No dates are published yet. Join the newsletter and we will tell you first.",
};

export const professionals = {
  tag: "For organisations",
  heading: { lead: "Training for the people who", accent: "care for mothers" },
  body: "NHS teams, councils, charities and employers commission Mums Aloud to deliver culturally competent training and workshops. Sessions are shaped around your service and the mothers you see.",
  points: [
    "Culturally competent maternal care",
    "Listening to Black mothers: lived experience in practice",
    "Workshop delivery for community and staff groups",
  ],
  action: { label: "Talk to us about training", href: "/contact/" },
};

export const closing = {
  heading: { lead: "Come and sit", accent: "with us." },
  primary: { label: "Get the newsletter", newsletter: true },
  secondary: { label: "Join Mama's Escape", href: "/mamas-escape/#join" },
};
