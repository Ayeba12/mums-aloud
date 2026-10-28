/**
 * Policy pages. The privacy policy is rendered from WordPress (`/privacy-policy/`), so the owner
 * edits it there. The live cookie policy is a plugin shortcode the API cannot read, so this site
 * carries its own short cookie statement, written for what this site actually does (confirm).
 */
export const privacyPage = {
  title: "Privacy policy",
  description: "How Mums Aloud handles personal information.",
  unavailable: "The privacy policy is unavailable right now. Please try again later.",
  updated: "Last updated",
};

/** The cookie notice bar (every page, until closed): honest about what this site does, with the policy one tap away. */
export const cookieNotice = {
  label: "Cookie notice",
  text: "We do not use tracking or advertising cookies. Once you close this notice, your browser keeps one small setting so it stays closed.",
  link: { label: "Cookie policy", href: "/cookie-policy-uk/" },
  dismiss: "Got it",
};

export const cookiePolicy = {
  title: "Cookie policy",
  description: "What this website stores in your browser, and what it does not.",
  tag: "Cookie policy (UK)",
  heading: { lead: "What this site keeps", accent: "in your browser." },
  reviewed: "Last reviewed 28 October 2026",
  // confirm: keep this true as hosting, analytics or embeds change.
  sections: [
    {
      title: "Cookies we set",
      paragraphs: [
        "At the time of writing, this website sets no cookies for advertising, analytics or tracking, and no cookies are needed for it to work.",
        "The newsletter and contact forms send what you type to us when you press send. They store nothing in your browser.",
        "When you close the cookie notice at the foot of the page, your browser keeps one small setting (not a cookie) so the notice stays closed. It holds nothing about you, and clearing your browser's site data removes it.",
      ],
    },
    {
      title: "Other services you may use from here",
      paragraphs: [
        "When you press play on a podcast episode, the audio streams from Spotify's servers. Links to Spotify, Calendly, Google Forms and WhatsApp take you to those services, which set their own cookies under their own policies.",
      ],
    },
    {
      title: "Your choices",
      paragraphs: [
        "You can block or delete cookies at any time in your browser's settings. Because this site relies on none, nothing here will stop working if you do.",
      ],
    },
    {
      title: "Questions",
      paragraphs: ["If you have a question about cookies or privacy, use the contact page and choose a general question."],
    },
  ],
};
