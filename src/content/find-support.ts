/**
 * Find Support: trusted UK organisations a mother might need, as the owner asked (10 Aug 2026,
 * modelled on the Butterfly Bliss resources page). Every phone number, website and opening time
 * was checked against the organisation's own site on 23 October 2026, except the two entries
 * marked `confirm` (their sites block automated reading; the details matched several of their own
 * pages in search). Services change: the page says so and asks readers to check with the
 * organisation. The owner will share a further list of contacts to add.
 */
import type { AccentText } from "@/components/ui/Heading";

export type SupportEntry = {
  name: string;
  helps: string;
  /** As the organisation shows it; `phoneHref` is the dialable or texting link. */
  phone?: string;
  phoneHref?: string;
  hours?: string;
  url: string;
  note?: string;
  /** True while the owner (or a manual check) still needs to confirm the line. */
  confirm?: boolean;
};

export type SupportGroup = { id: string; title: string; intro: string; entries: SupportEntry[] };

export const findSupport = {
  title: "Find Support",
  description: "Helplines and trusted UK organisations for mothers: urgent help, pregnancy and loss, mental health, feeding and the early years, your rights and money, and safety at home.",
  tag: "Find support",
  heading: { lead: "The right help,", accent: "when you need it." } satisfies AccentText,
  intro: "Trusted organisations across the UK, with the number to call and where to read more. Mums Aloud is not a crisis service, and these lines are free unless we say otherwise.",
  urgent: {
    heading: "If you need help right now",
    intro: "Free, and open day and night.",
    entries: [
      { name: "Emergency services", helps: "If you or your baby are in immediate danger, or someone is seriously hurt.", phone: "999", phoneHref: "tel:999", hours: "24 hours a day", url: "https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-call-999/" },
      { name: "NHS 111", helps: "Urgent health help when it is not a 999 emergency. Choose the mental health option for urgent mental health support.", phone: "111", phoneHref: "tel:111", hours: "24 hours a day", url: "https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-use-111/" },
      { name: "Samaritans", helps: "Someone to listen, any time, about anything that is troubling you, including thoughts of suicide.", phone: "116 123", phoneHref: "tel:116123", hours: "24 hours a day, every day", url: "https://www.samaritans.org/how-we-can-help/contact-samaritan/" },
      { name: "Shout", helps: "Free, confidential support by text, day or night, when things feel overwhelming.", phone: "Text SHOUT to 85258", phoneHref: "sms:85258?&body=SHOUT", hours: "24 hours a day", url: "https://giveusashout.org/get-help/" },
      { name: "National Domestic Abuse Helpline", helps: "Free, confidential support if you are experiencing domestic abuse, including help finding a refuge place.", phone: "0808 2000 247", phoneHref: "tel:08082000247", hours: "24 hours a day, every day", url: "https://www.nationaldahelpline.org.uk/" },
    ] satisfies SupportEntry[],
  },
  groups: [
    {
      id: "pregnancy",
      title: "Pregnancy, birth and loss",
      intro: "Midwives to talk to, your rights in maternity care, and support after the loss of a baby.",
      entries: [
        { name: "Tommy's midwives", helps: "Specialist midwives answer questions about pregnancy, pregnancy loss and trying again, by phone or email. Tommy's and Five X More also run a helpline for Black and Black Mixed-Heritage women, booked online.", phone: "0800 014 7800", phoneHref: "tel:08000147800", hours: "Monday to Friday, 9am to 5pm", url: "https://www.tommys.org/about-us/our-people/tommys-midwives", confirm: true },
        { name: "Sands", helps: "A safe, confidential place for anyone affected by pregnancy loss or the death of a baby, with tailored support for Black and South Asian families.", phone: "0808 164 3332", phoneHref: "tel:08081643332", hours: "Monday to Friday, 10am to 3pm; Tuesday to Thursday, 6pm to 9pm", url: "https://www.sands.org.uk/support-you/how-we-offer-support/helpline" },
        { name: "Birthrights", helps: "Free information and practical advice on your rights in pregnancy and childbirth. Advice is by email only, through their request form.", url: "https://birthrights.org.uk/advice-factsheets/request-advice/" },
        { name: "Five X More", helps: "Campaigns, resources and advice to improve Black maternal health outcomes in the UK. Not a helpline.", url: "https://fivexmore.org/" },
        { name: "NHS: mental health in pregnancy and after the birth", helps: "Plain NHS information on depression and anxiety in pregnancy, postnatal depression and postpartum psychosis.", url: "https://www.nhs.uk/pregnancy/mental-health-in-pregnancy-and-after-the-birth/" },
      ],
    },
    {
      id: "mental-health",
      title: "Mental health and wellbeing",
      intro: "For low mood, anxiety, postnatal depression and the days that feel too heavy.",
      entries: [
        { name: "PANDAS Foundation", helps: "Support for anyone affected by perinatal mental illness, by WhatsApp or a free call back booked online.", phone: "WhatsApp 07903 508334", phoneHref: "https://wa.me/447903508334", hours: "Monday to Friday, 9am to 5pm", url: "https://pandasfoundation.org.uk/how-we-can-support-you/" },
        { name: "Association for Post Natal Illness", helps: "Support for anyone suffering from postnatal illness, and for their partners, family and friends. Not a freephone number.", phone: "0207 386 0868", phoneHref: "tel:02073860868", hours: "Monday to Friday, 10am to 2pm", url: "https://apni.org/" },
        { name: "Mind", helps: "Information on mental health problems, treatment options and where to get help near you. Mind's Support line, 0300 102 1234, offers emotional support in the same hours.", phone: "0300 123 3393", phoneHref: "tel:03001233393", hours: "Monday to Friday, 9am to 6pm", url: "https://www.mind.org.uk/information-support/helplines/" },
        { name: "Black Minds Matter UK", helps: "Mental health resources, community and workshops for Black people in the UK. Not a crisis service.", url: "https://www.blackmindsmatteruk.com/" },
        { name: "Maternal Mental Health Alliance", helps: "Information and links to support for mums and families. They do not run a helpline.", url: "https://maternalmentalhealthalliance.org/about-maternal-mental-health/support-mums-and-families/" },
        { name: "NHS: postnatal depression", helps: "Symptoms, treatment and where to get help, from the NHS.", url: "https://www.nhs.uk/mental-health/conditions/postnatal-depression/" },
      ],
    },
    {
      id: "early-years",
      title: "Feeding, crying and the early years",
      intro: "Help with feeding, babies who will not settle, and family life with young children.",
      entries: [
        { name: "National Breastfeeding Helpline", helps: "Friendly, non-judgemental breastfeeding and infant feeding support, whatever your feeding goal.", phone: "0300 100 0212", phoneHref: "tel:03001000212", hours: "24 hours a day, every day", url: "https://www.nationalbreastfeedinghelpline.org.uk/" },
        { name: "Cry-sis", helps: "Help and support for parents of babies who cry excessively or have sleep problems.", phone: "0800 448 0737", phoneHref: "tel:08004480737", hours: "Every day, 9am to 10pm", url: "https://www.cry-sis.org.uk/" },
        { name: "Coram Family Lives", helps: "Emotional support, information and advice on any aspect of parenting and family life.", phone: "0808 800 2222", phoneHref: "tel:08088002222", hours: "Monday to Friday, 9am to 9pm; weekends, 10am to 3pm", url: "https://www.coramfamilylives.org.uk/how-we-can-help/confidential-helpline/" },
        { name: "Home-Start", helps: "Volunteers support families with young children at home. Find your local Home-Start and get in touch yourself, or through your health visitor.", url: "https://www.home-start.org.uk/find-your-nearest-home-start" },
      ],
    },
    {
      id: "rights-and-money",
      title: "Your rights, money and work",
      intro: "Maternity rights, benefits, debt and advice on almost anything else.",
      entries: [
        { name: "Maternity Action", helps: "Free advice on your rights at work, maternity pay and benefits when pregnant or a new parent.", phone: "0808 802 0029", phoneHref: "tel:08088020029", hours: "Weekdays except Wednesday, 10am to 12pm", url: "https://maternityaction.org.uk/advice-line/" },
        { name: "Citizens Advice", helps: "Free advice that connects you to your local Citizens Advice for help with benefits, debt, housing, work and more. England only.", phone: "0800 144 8848", phoneHref: "tel:08001448848", hours: "Monday to Friday, 9am to 5pm", url: "https://www.citizensadvice.org.uk/about-us/contact-us/contact-us/contact-us/" },
        { name: "Gingerbread", helps: "Information, local groups and an online forum for single parents. Their helpline has closed.", url: "https://www.gingerbread.org.uk/" },
      ],
    },
    {
      id: "safety",
      title: "Safety at home",
      intro: "If home does not feel safe, for you or for a child.",
      entries: [
        { name: "National Domestic Abuse Helpline", helps: "Free, confidential support if you are experiencing domestic abuse, run by Refuge.", phone: "0808 2000 247", phoneHref: "tel:08082000247", hours: "24 hours a day, every day", url: "https://www.nationaldahelpline.org.uk/" },
        { name: "NSPCC helpline", helps: "For adults worried about a child's safety or wellbeing: advice and a way to report concerns.", phone: "0808 800 5000", phoneHref: "tel:08088005000", hours: "Monday to Friday, 10am to 4pm", url: "https://www.nspcc.org.uk/about-us/our-services/nspcc-helpline/", confirm: true },
      ],
    },
  ] satisfies SupportGroup[],
  labels: { call: "Call", website: "Visit website", hours: "Open" },
  disclaimer: "We list these organisations in good faith and check their details, but services change. Please confirm opening times with the organisation before you rely on them.",
  suggest: { lead: "Know an organisation that should be here? Email us at", label: "admin@mumsaloud.com" },
  closing: {
    heading: { lead: "You don't have to", accent: "face it alone." } satisfies AccentText,
    body: "Mama's Escape is a room of women who understand, and our team is a message away.",
    primary: { label: "Join Mama's Escape" },
    secondary: { label: "Contact us", href: "/contact/" },
  },
};
