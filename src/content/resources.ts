/**
 * Resources: the two free PDF guides and the two calculators kept from the live site (owner
 * decision, 20 Oct 2026). The guides' live pages carry only a download link, so their one-line
 * descriptions are drafted and need sign-off (`confirm`). The PDFs stay on the live site's media
 * library until the client's files move.
 */
import type { AccentText } from "@/components/ui/Heading";

export type Guide = {
  slug: string;
  title: string;
  heading: AccentText;
  // confirm
  intro: string;
  pdf: string;
  published: string;
};

export const guides: Guide[] = [
  {
    slug: "holiday-guide-for-school-kids",
    title: "Holiday Survival Guide for School-Age Kids",
    heading: { lead: "Holiday survival guide for", accent: "school-age kids." },
    intro: "Ideas and gentle structure for the school holidays, so the days feel lighter for you and fuller for them. A free PDF from Mums Aloud to download and keep.",
    pdf: "https://mumsaloud.com/wp-content/uploads/2025/08/Holiday-Survival-GUIDE-for-school-age-kids.docx.pdf",
    published: "August 2025",
  },
  {
    slug: "ativites-guide-for-babies",
    title: "Activities Guide for Babies",
    heading: { lead: "Activities guide", accent: "for babies." },
    intro: "Simple, low-cost ways to play, soothe and connect with your baby in the first year. A free PDF from Mums Aloud to download and keep.",
    pdf: "https://mumsaloud.com/wp-content/uploads/2025/08/Activities-GUIDE-for-babies.pdf",
    published: "August 2025",
  },
];

export const calculators = {
  ovulation: {
    slug: "ovulation-calculator",
    title: "Ovulation Calculator",
    heading: { lead: "Find your", accent: "fertile window." } satisfies AccentText,
    intro: "Enter the first day of your last period and your usual cycle length to estimate when you are most likely to conceive.",
    labels: { lastPeriod: "First day of your last period", cycleLength: "Length of your cycle (days)", submit: "Calculate" },
    results: { fertile: "Most fertile days", ovulation: "Estimated ovulation", nextPeriod: "Next period expected" },
    note: "An estimate from the usual pattern of a cycle, not a diagnosis or a contraceptive. Cycles vary. If you are trying to conceive or worried about your cycle, talk to your GP or midwife.",
  },
  pregnancy: {
    slug: "pregnancy-calculator",
    title: "Pregnancy Calculator",
    heading: { lead: "How far along", accent: "are you?" } satisfies AccentText,
    intro: "Enter the first day of your last period to estimate your due date, how many weeks pregnant you are today, and your trimester.",
    labels: { lastPeriod: "First day of your last period", submit: "Calculate" },
    results: { dueDate: "Estimated due date", progress: "Today you are", trimester: "Trimester", conception: "Likely conception" },
    note: "An estimate using the standard 40-week count from your last period. Your midwife will confirm your dates at your scan.",
  },
};

export const resources = {
  title: "Resources",
  description: "Support contacts, trusted resources, free guides and calculators from Mums Aloud.",
  tag: "Resources",
  heading: { lead: "Guides and tools you can", accent: "actually use." } satisfies AccentText,
  // confirm
  intro: "Where to find support, the resources we trust, two free guides to download and two calculators, made with mothers in our community in mind.",
  supportHeading: "Support and trusted resources",
  support: [
    { title: "Find Support", text: "Helplines and trusted UK organisations for urgent help, pregnancy and loss, mental health, feeding, your rights and safety at home.", href: "/find-support/", icon: "support" },
    { title: "Trusted Resources", text: "Programmes and resources we endorse, chosen because they have helped mums in this community.", href: "/trusted-resources/", icon: "trusted" },
  ] as const,
  guidesHeading: "Free guides",
  calculatorsHeading: "Calculators",
  download: "Download the PDF",
  open: "Open the calculator",
  closing: {
    heading: { lead: "Looking for", accent: "more than a guide?" } satisfies AccentText,
    body: "Mama's Escape is where the real support is: mentor mums, expert sessions and a room of women who understand.",
    primary: { label: "Join Mama's Escape" },
    secondary: { label: "Listen to the podcast", href: "/podcast/" },
  },
};
