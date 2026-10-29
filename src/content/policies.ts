/**
 * Policy pages. The privacy policy is rendered from WordPress (`/privacy-policy/`), so the owner
 * edits it there. The cookie policy and the terms are this site's own, written for what it actually
 * does (checked against the live site on 30 October 2026). Facts only the owner can give are marked
 * `confirm` in comments; the published wording reads naturally without them.
 */
import { COOKIE_NOTICE_KEY } from "@/lib/cookie-notice";
import { siteConfig } from "@/lib/site";

export type PolicySection = {
  title: string;
  paragraphs: string[];
  /** An optional list, shown after the paragraphs. */
  items?: string[];
};

export type PolicyPage = {
  title: string;
  description: string;
  tag: string;
  heading: { lead: string; accent: string };
  reviewed: string;
  intro?: string;
  sections: PolicySection[];
};

export const privacyPage = {
  title: "Privacy policy",
  description: "How Mums Aloud handles personal information.",
  unavailable: "The privacy policy is unavailable right now. Please try again later.",
  updated: "Last updated",
};

/** The three policy pages, in the order the footer, the banner and each page's foot list them. */
export const policyLinks = [
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Cookie policy", href: "/cookie-policy-uk/" },
  { label: "Terms and conditions", href: "/terms-and-conditions/" },
] as const;

/**
 * The cookie notice bar (every page, until closed). This site sets no cookies and loads nothing
 * from other companies, so the bar tells the truth rather than asking for consent: under the UK's
 * PECR rules, remembering that the notice was closed is strictly necessary and needs no consent.
 * If analytics or embeds are ever added, this must become a consent banner that blocks them until
 * the visitor agrees.
 */
export const cookieNotice = {
  label: "Cookie notice",
  text: "We use no tracking, analytics or advertising cookies. Closing this notice keeps one small setting in your browser so it stays closed.",
  linksLead: "Read our",
  links: policyLinks,
  dismiss: "Got it",
};

export const cookiePolicy: PolicyPage = {
  title: "Cookie policy",
  description: "What this website stores in your browser, what it does not, and the other services you can reach from it.",
  tag: "Cookie policy (UK)",
  heading: { lead: "What this site keeps", accent: "in your browser." },
  reviewed: "Last reviewed 30 October 2026",
  intro:
    "Cookies are small files a website can leave in your browser. Some help a site work; others follow you around the internet. This page explains, in plain words, what this site does and does not do.",
  sections: [
    {
      title: "Cookies we set",
      paragraphs: [
        "None. This website sets no cookies for advertising, analytics or tracking, and it needs none to work. We checked every kind of page on 30 October 2026: none sets a cookie, and none loads anything from another company's servers. Our fonts and images are served by this site itself.",
      ],
    },
    {
      title: "The one thing we keep in your browser",
      paragraphs: [
        `When you close the cookie notice, your browser keeps one small setting so the notice stays closed. It is stored in your browser's local storage (not a cookie) under the name "${COOKIE_NOTICE_KEY}", with the value "closed". It holds nothing about you, it is never sent to us, and clearing your browser's data for this site removes it. Because it only remembers a choice you made, the law treats it as strictly necessary, so it needs no consent.`,
      ],
    },
    {
      title: "Forms",
      paragraphs: [
        "The contact, partnership, volunteer and newsletter forms store nothing in your browser. What you type is sent to us only when you press send. Our privacy policy explains where it goes and how we look after it.",
      ],
    },
    {
      title: "Analytics",
      paragraphs: [
        "We do not use analytics tools such as Google Analytics, and we do not count or follow your visits. If that ever changes, we will update this page first and ask for your consent before any such cookie is set, with an equally easy way to say no.",
      ],
    },
    {
      title: "Other services you can reach from here",
      paragraphs: [
        "Some links and buttons take you to other services. When you use them, those services may set their own cookies under their own policies, which we do not control:",
      ],
      items: [
        "Spotify: podcast episodes stream from Spotify's servers when you press play, and the Spotify links open the show there.",
        "Calendly: booking a free call with Bokun.",
        "Google Forms: the form for joining Mama's Escape, once it is open.",
        "WhatsApp: the New Mums Circle group.",
        "Instagram and Facebook: our social profiles.",
        "Selar and the other programmes listed on our Trusted Resources page.",
      ],
    },
    {
      title: "Your choices",
      paragraphs: [
        "You can block or delete cookies and site data at any time in your browser's settings. Because this site relies on none, nothing here will stop working if you do. The only difference is that the cookie notice will show again.",
      ],
    },
    {
      title: "Questions",
      paragraphs: [`If you have a question about cookies or privacy, email us at ${siteConfig.email} or use the contact page.`],
    },
  ],
};

/**
 * Website terms, written for what this site does (30 October 2026). Not legal advice: the owner
 * should have them checked before relying on them.
 * confirm: the registered name and number (the live footer says "limited"; one client document
 * says CIC), the registered address, and the governing law (England and Wales assumed).
 */
export const termsPage: PolicyPage = {
  title: "Terms and conditions",
  description: "The terms for using the Mums Aloud website: what you can expect from us, what we ask of you, and where the limits are.",
  tag: "Terms and conditions",
  heading: { lead: "The terms for using", accent: "this website." },
  reviewed: "Last updated 30 October 2026",
  intro: "These terms apply to your use of the Mums Aloud website and the forms on it. By using the site you agree to them. If you do not agree, please do not use the site. They are written to be read, so please do.",
  sections: [
    {
      title: "Who we are",
      paragraphs: [
        `This website is run by Mums Aloud ("we", "us", "our"), a community for Black mothers in the UK. You can reach us at ${siteConfig.email} or on ${siteConfig.phone.display}.`,
      ],
    },
    {
      title: "Using this website",
      paragraphs: ["The site is free to use. Please use it lawfully and kindly. In particular, please do not:"],
      items: [
        "send anything through our forms that is untrue, offensive, abusive, or about someone else without their permission;",
        "pretend to be someone else, or use someone else's email address;",
        "try to break, overload or gain unauthorised access to the site or the systems behind it;",
        "copy the site's content in bulk, or use it to train or feed automated systems, without our written permission.",
      ],
    },
    {
      title: "Not medical or professional advice",
      paragraphs: [
        "What we share on this site, including the stories, articles, guides and the ovulation and pregnancy calculators, is for general information and support. It is not medical, mental health, legal or financial advice, and it does not replace advice from your GP, midwife, health visitor or another qualified professional. The calculators give estimates only.",
        "Mums Aloud is not a crisis service. If you or your baby are in immediate danger, call 999. For urgent health help, call NHS 111. To talk to someone at any time, call Samaritans free on 116 123. Our Find Support page lists more organisations that can help.",
      ],
    },
    {
      title: "Stories and other content",
      paragraphs: [
        "The words, photos, logos and design on this site belong to Mums Aloud or to the people who shared them with us, and are protected by copyright. Stories in the Story Lounge and the Blog belong to the mothers who wrote them and are shared with their permission. You are welcome to read them, link to them and share links to them. Please do not copy, republish or adapt them without asking us first.",
        "Partner names and logos belong to those organisations and appear because we have worked with them. Some photos on the site are stock photography and do not show Mums Aloud members.",
      ],
    },
    {
      title: "What you send us",
      paragraphs: [
        "When you use our contact, partnership, volunteer or newsletter forms, please make sure what you tell us is accurate and yours to share. We use it to reply to you and for the purpose you sent it for, as our privacy policy explains. If you send us a story or an idea, we will not publish it or share your name without your clear permission.",
        "Sending a volunteer application or a partnership enquiry does not create a role, a contract or any commitment on either side. We will reply to talk about next steps.",
      ],
    },
    {
      title: "Mama's Escape, services and events",
      paragraphs: [
        "Joining Mama's Escape, booking a call or session with Bokun, joining a programme or coming to an event may have its own terms, which we will share with you before you commit. Those terms apply alongside these. Where a booking or payment is handled by another service, such as Calendly or Selar, that service's own terms apply too.",
      ],
    },
    {
      title: "Links to other services",
      paragraphs: [
        "The site links to other websites and services, including Spotify, Calendly, Google Forms, WhatsApp, Instagram, Facebook and the organisations on our Find Support page. We link to them because we think they may help, but we do not control them and are not responsible for their content, availability or how they use your information.",
        "Some links on our Trusted Resources page are referral links: if you buy through them, Mums Aloud may receive a small commission, at no extra cost to you. We say so next to those links, and we only recommend what we believe in.",
      ],
    },
    {
      title: "Availability and accuracy",
      paragraphs: [
        "We work to keep the site accurate and running, but we cannot promise it will always be available, free of errors, or up to date. Phone numbers, opening hours and details of other organisations can change, so please check with them directly. We may change, pause or remove any part of the site at any time.",
      ],
    },
    {
      title: "Our responsibility to you",
      paragraphs: [
        "We provide this free website as it is. As far as the law allows, we are not responsible for any loss or damage that comes from using it or relying on its content, or from using any linked website.",
        "Nothing in these terms limits or excludes our responsibility where the law does not allow us to, including for death or personal injury caused by our negligence, or for fraud. If you are a consumer, these terms do not affect your legal rights.",
      ],
    },
    {
      title: "Your privacy and cookies",
      paragraphs: [
        "Our privacy policy explains what personal information we collect and how we use it. Our cookie policy explains what this site keeps in your browser, which is one small setting and no tracking cookies.",
      ],
    },
    {
      title: "Changes to these terms",
      paragraphs: [
        "We may update these terms from time to time, for example when the site or the law changes. The date at the top of this page shows when they last changed. Please check back now and then; using the site after a change means you accept the updated terms.",
      ],
    },
    {
      title: "The law that applies",
      paragraphs: [
        "These terms are governed by the law of England and Wales, and any dispute will be dealt with by the courts of England and Wales. If you live in Scotland or Northern Ireland, you may also bring proceedings in your home courts.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [`If you have a question about these terms, email us at ${siteConfig.email} or use the contact page. We will reply as soon as we can.`],
    },
  ],
};
