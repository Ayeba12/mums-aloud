/**
 * Partnership Opportunities page copy. Source: the live Partnership page (reviewed
 * 21 October 2026) and the Restructure Brief v2, section 4 (02). The live page's enquiry copy
 * named another organisation; it is replaced here. Items marked `confirm` need sign-off.
 */
export const page = {
  title: "Partnership Opportunities",
  description:
    "Work with Mums Aloud: focus groups, patient and public involvement, campaigns, research participation and community engagement with Black mothers in the UK.",
};

export const hero = {
  tag: "Partnership Opportunities",
  heading: { lead: "Creating partnerships that transform", accent: "Black maternal care." },
  intro: "We partner with organisations that share our vision of supporting, understanding and empowering Black mothers to thrive.",
  primary: { label: "Explore partnership", href: "/contact/" },
  secondary: { label: "What we offer", href: "#offer" },
};

export const offer = {
  tag: "What we offer",
  heading: { lead: "Insight you cannot get", accent: "any other way" },
  body: "Our network extends across healthcare, the public sector and the private sector. What we bring to every partnership is the community itself.",
  items: [
    { icon: "insight", title: "Unique insights", text: "Access to a vibrant community of Black mothers, with first-hand understanding of their experiences, needs and perspectives." },
    { icon: "culture", title: "Culturally sensitive solutions", text: "Expertise in developing culturally appropriate programmes, campaigns and initiatives that land with Black mothers." },
    { icon: "data", title: "Data-driven insights", text: "Access to data and research on the experiences and needs of Black mothers in the UK." },
    { icon: "advocates", title: "An engaged community", text: "A strong network of engaged, influential Black mothers who can act as advocates and ambassadors." },
  ],
} as const;

export const ways = {
  tag: "Ways to work together",
  heading: { lead: "Flexible partnerships, shaped to", accent: "your goals" },
  items: [
    "Peer support programmes",
    "Focus groups",
    "Patient and public involvement (PPI)",
    "Training and workshop facilitation",
    "Engagement and community outreach",
    "Market research",
    "Campaigns and community advocacy",
    "Collaborative projects",
    "Community events and gatherings",
  ],
};

export const partners = {
  tag: "Who we have worked with",
  heading: { lead: "In good", accent: "company" },
  intro: "Mums Aloud was built alongside partners who believe mothers deserve to be seen and supported.",
};

export const closing = {
  heading: { lead: "Let's build something", accent: "together." },
  body: "Tell us about your organisation and what you are hoping to achieve. We reply within a few working days.",
  primary: { label: "Get in touch", href: "/contact/" },
  secondary: { label: "See our training", href: "/training-and-events/" },
};
