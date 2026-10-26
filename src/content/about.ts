/**
 * Copy for the About pages, taken from the live site on 23 October 2026 (`/about-mums-aloud/`,
 * `/meet-bokun/`, `/meet-the-team/`, `/mums-council/`) and lightly tidied. Credentials and roles are
 * as the live site states them and still need the owner's sign-off (`confirm`). Team biographies
 * live in Elementor pop-ups the API does not expose, so team profiles carry name and role only until
 * the owner supplies them; the council biographies were read from the pop-ups printed into the live
 * Mum's Council page on 26 Oct 2026.
 */
import type { AccentText } from "@/components/ui/Heading";

export type Profile = {
  id: "bokun" | "oyindamola" | "dk-jonah" | "yemi" | "bella-abidakun" | "temi-fagbo" | "bukunmi-ladeji" | "elizabeth-toluwani" | "abies-sonia";
  name: string;
  role: string;
  href?: string;
  linkLabel?: string;
  /** Biography paragraphs, shown in the "Read bio" dialog when present. */
  bio?: string[];
};

export const about = {
  title: "About Mums Aloud",
  description:
    "MumsAloud is a warm and welcoming community for mums and by mums, built by Black mothers in the UK who found strength in one another.",
  hero: {
    tag: "About Mums Aloud",
    heading: { lead: "A community for mums,", accent: "by mums." } satisfies AccentText,
    intro: "We believe motherhood is a beautiful journey, and we know it can be a challenging one. We are here with support, shared knowledge and resources to make every step easier.",
    primary: { label: "Join Mama's Escape" },
    secondary: { label: "Meet Bokun", href: "/meet-bokun/" },
  },
  story: {
    tag: "Our story",
    heading: { lead: "Born from a", accent: "simple need." } satisfies AccentText,
    paragraphs: [
      "A group of new Black mums, navigating motherhood in the UK, realised that our experiences were different. From food to baby care routines to how we celebrate our rich culture, it became clear that what worked for others did not always reflect who we were or what we valued. We were often misunderstood, or even misrepresented.",
      "Instead of feeling lost, we found strength in one another. Together we formed a space where our stories could be told freely, where our culture could be embraced, and where we could learn and grow as both women and mothers. MumsAloud is now that safe space: a community for mums, by mums.",
    ],
  },
  belief: {
    statement: { lead: "Thriving as a mother starts with", highlight: "thriving as a woman", trail: "." },
    body: "We encourage every mum on a journey of self-discovery, never forgetting who she truly is: not just a parent, but a woman with dreams, goals and ambitions. You do not need to lose yourself in the demands of motherhood. You deserve to be empowered, educated and inspired to pursue the things that make you whole, and we offer tools, resources and support to help you find that harmony.",
  },
  mission: {
    tag: "Our mission",
    heading: { lead: "A community that supports, uplifts and equips", accent: "mums to thrive." } satisfies AccentText,
    body: "A platform where you can share your stories without guilt, connect with others who understand your journey, and receive practical guidance on harmonising motherhood with personal growth. Whether you are looking for emotional support, cultural connection, or simply a space for your mental wellbeing as a woman, MumsAloud is here to walk with you every step of the way, with culturally sensitive services tailored to you as a Black mum.",
    visionTag: "Our vision",
    vision: "A world where every mother thrives, is empowered and connected, living a life of fulfilment and purpose.",
  },
  team: {
    tag: "Meet the team",
    heading: { lead: "A driven team with", accent: "diverse skills." } satisfies AccentText,
    intro: "Open communication and input from every member guide us through challenges and opportunities. We work with respect, integrity and a shared vision.",
    link: { label: "Meet the whole team", href: "/meet-the-team/" },
  },
  closing: {
    heading: { lead: "There's a place for you", accent: "here." } satisfies AccentText,
    body: "Mama's Escape is our community: mentor mums, expert sessions, resources and events for Black mothers in the UK.",
    primary: { label: "Join Mama's Escape" },
    secondary: { label: "Meet Bokun", href: "/meet-bokun/" },
  },
};

/** The four people on the live Meet the Team page, roles as stated there (confirm). */
export const team: Profile[] = [
  { id: "bokun", name: "Bokun Imoukhuede", role: "Founder and Chief Thriving Officer", href: "/meet-bokun/", linkLabel: "Read Bokun's story" },
  { id: "oyindamola", name: "Oyindamola", role: "Content Strategist" },
  { id: "dk-jonah", name: "Dk Jonah", role: "Brand Strategist" },
  { id: "yemi", name: "Yemi Komolafe", role: "Engagement Manager" },
];

export const teamPage = {
  title: "Meet the Team",
  description: "The people behind MumsAloud: a driven team with diverse skills and perspectives, working with respect, integrity and a shared vision.",
  tag: "Meet the team",
  heading: { lead: "A driven team with", accent: "diverse skills." } satisfies AccentText,
  intro: about.team.intro,
  /** Honest note while full profiles are written. */
  note: "Full profiles are on their way. Names and roles are as published today.",
  council: {
    heading: { lead: "Also at the table:", accent: "the Mum's Council." } satisfies AccentText,
    body: "A group of Black and mixed-race mothers committed to improving the lives of mothers and families in our community.",
    link: { label: "About the council", href: "/mums-council/" },
  },
  closing: {
    heading: { lead: "Work with", accent: "us." } satisfies AccentText,
    body: "For mothers, Mama's Escape is the door in. For organisations, our partnership work is where we start.",
    primary: { label: "Join Mama's Escape" },
    secondary: { label: "Partner with us", href: "/partnership/" },
  },
};

export const founder = {
  title: "Meet Bokun",
  description:
    "Bokun Imoukhuede, founder of MumsAloud, on how it all started: motherhood far from her village, the question no one asked, and the community she wished she had found.",
  hero: {
    tag: "Meet Bokun",
    heading: { lead: "Who looks after the woman who is", accent: "looking after everyone else?" } satisfies AccentText,
    intro: "Bokun Imoukhuede, founder of MumsAloud, on how it all started.",
    portrait: {
      src: "https://mumsaloud.com/wp-content/uploads/2024/10/Mrs-Bokun-1025x1536.jpeg",
      alt: "Bokun Imoukhuede, founder of MumsAloud",
      width: 1025,
      height: 1536,
    },
    primary: { label: "Work with Bokun", href: "/work-with-us/" },
    secondary: { label: "Join Mama's Escape" },
  },
  letter: {
    tag: "How it all started",
    heading: { lead: "Before I became a mum,", accent: "I knew who I was." } satisfies AccentText,
    paragraphs: [
      { text: "I had dreams I was excited about, ideas I couldn't wait to bring to life, and plans that stretched far beyond tomorrow. I enjoyed learning, creating, and imagining what my future could look like." },
      { text: "Then I became a mother.", emphasis: true },
      { text: "Like so many women, I poured everything I had into this new gift of life I loved more than words could ever explain. Somewhere between the sleepless nights, endless routines, nursery drop-offs, work, cooking, and trying to keep everyone else happy, something quietly changed. One day, I realised I couldn't remember the last time I had stopped to ask myself, \"How am I doing?\" Not as a mum, but as me." },
      { text: "Growing up, I was taught what many African women are taught: be strong, keep going, don't complain, make it work. I watched incredible women hold families together with resilience that still inspires me today. They loved deeply, sacrificed willingly, and always seemed to find a way. Those lessons shaped me, but there was one question no one ever asked: who looks after the woman who is looking after everyone else?" },
      { text: "When I moved to the UK with my young family, I brought those beliefs with me. I knew how to cope, how to survive, and how to carry on. What I wasn't prepared for was the loneliness of motherhood without my village." },
      { text: "Back home, when a woman has a baby, she is surrounded. Someone cooks, someone holds the baby while she rests, someone notices when she's tired, and someone simply sits beside her. There is an unspoken understanding that when a baby is born, a mother is born too, and she needs caring for just as much." },
      { text: "My village was thousands of miles away.", emphasis: true },
      { text: "Like many mums, I smiled when people asked if I was okay. I said, \"I'm fine,\" because that's what I believed I was supposed to say. But underneath, I was slowly disappearing behind the title of \"Mum\". Not because I loved my children too much, but because I had forgotten that motherhood is one role I play; it isn't all of who I am." },
      { text: "Finding my way back wasn't one big moment. It happened slowly, through conversations with other mothers who shared their own stories. Hearing someone say, \"I thought it was just me,\" reminded me that I wasn't failing. I wasn't broken. I was carrying what so many women carry, often in silence. That sense of shared experience changed everything. It gave me permission to breathe, to dream again, and to believe that I could be fully present for my family without losing myself in the process." },
      { text: "That journey became the beginning of MumsAloud.", emphasis: true },
      { text: "I created the community I wish I had found: a place where mothers could feel seen, heard, understood, and supported. A place where cultural experiences are recognised, honest conversations are welcomed, and women can reconnect with themselves as much as they connect with one another." },
      { text: "At the heart of MumsAloud is a simple belief: motherhood is one of the most important roles a woman will ever have, but it is not all that she is. She is still a woman with dreams, gifts, ambitions, and a life that deserves nurturing too." },
      { text: "If you've found yourself somewhere in these words, then I hope you know this: you are not alone. Whether you're looking for support, connection, encouragement, or simply a place where you don't have to explain yourself, you've found your village." },
      { text: "Welcome to MumsAloud. I'm so glad you're here.", emphasis: true },
    ],
    signoff: { name: "Bokun Imoukhuede", role: "Founder, MumsAloud" },
  },
  pillars: {
    tag: "What drives me",
    heading: { lead: "My vision and", accent: "my voice." } satisfies AccentText,
    items: [
      {
        title: "My vision",
        text: "To empower women to be their authentic selves, find their personal power, and challenge societal norms and expectations. As a woman and a mother, I understand the complex issues women face every day, and I believe in creating a safe space for women to share their experiences, find support, and inspire each other.",
      },
      {
        title: "My voice",
        text: "I am a voice in the advocacy of purpose development for women, especially of African heritage. I help ambitious working mums find work-life harmony. My message is simple: women can live a full and fulfilling life without compromising on what truly matters.",
      },
    ],
  },
  bio: {
    tag: "More about me",
    heading: { lead: "It's a common myth that mums must", accent: "sacrifice parts of their lives." } satisfies AccentText,
    intro: "From work to health to relationships, most of us juggle family, work, health and more. Bokun's work is about finding the harmony.",
    // confirm: credentials as stated on the live site
    paragraphs: [
      "Bokun Imoukhuede is a family life practitioner, postpartum transition coach and strength-based coach who empowers mothers, particularly those of African heritage, to reclaim their authentic identities and thrive beyond societal and cultural expectations.",
      "She is the founder of MumsAloud, a community dedicated to supporting Black mothers through culturally sensitive programmes, wellbeing workshops and personal development initiatives. She is a strength-based practitioner, an NLP practitioner, an associate family life practitioner, and the creator of the working mum's intimacy builder.",
    ],
    role: "Chief Thriving Officer, MumsAloud",
  },
  closing: {
    heading: { lead: "Ready for a", accent: "closer conversation?" } satisfies AccentText,
    body: "Work With Bokun is the closer path for a mother who wants personalised, one-to-one support. Mama's Escape is the community around it, free to every mum.",
    primary: { label: "Work with Bokun", href: "/work-with-us/" },
    secondary: { label: "Join Mama's Escape" },
  },
};

export const council = {
  title: "Mum's Council",
  description:
    "The Mums Aloud Mum's Council: Black and mixed-race mothers advocating, researching, mentoring and influencing policy to improve the lives of mothers and families.",
  tag: "Mum's Council",
  heading: { lead: "A force for", accent: "change." } satisfies AccentText,
  intro: "Our Mum's Council is a dedicated group of passionate Black and mixed-race mothers committed to improving the lives of mothers and families within our community.",
  roles: {
    tag: "What the council does",
    heading: { lead: "Five ways the council", accent: "makes a difference." } satisfies AccentText,
    items: [
      { icon: "advocacy", title: "Advocacy", text: "Championing the needs and concerns of Black mothers, particularly in mental and emotional wellbeing." },
      { icon: "research", title: "Research and development", text: "Contributing to research projects that aim to better understand the unique challenges faced by Black mothers." },
      { icon: "community", title: "Community engagement", text: "Building strong connections within the community and fostering a sense of belonging." },
      { icon: "policy", title: "Policy influence", text: "Advocating for policies that support the health and wellbeing of Black mothers and families." },
      { icon: "mentorship", title: "Mentorship", text: "Providing guidance and support to other mothers, sharing their experiences and expertise." },
    ] as const,
  },
  statement: {
    lead: "By",
    highlight: "amplifying the voices of Black mothers",
    trail: ", our Mum's Council is driving positive change and creating a more equitable future for all.",
  },
  /** The live page says "please register here" with no destination; honest until the owner supplies one. */
  register: { pending: "Council membership registration is being set up. Get the newsletter and we will tell you when it opens." },
  members: {
    tag: "The council",
    heading: { lead: "The mothers", accent: "at the table." } satisfies AccentText,
    // confirm: the biographies are each member's own words from the previous site's pop-ups (read 26 Oct 2026), lightly tidied into the third person.
    note: "Biographies are in each member's own words, as published on the previous Mums Aloud site.",
    people: [
      {
        id: "bella-abidakun",
        name: "Bella Abidakun",
        role: "Professional nurse",
        bio: [
          "Bella Abidakun is an education and retention team leader and a Professional Nurse Advocate lead with a background in adult nursing, currently working with an NHS trust in the United Kingdom. She is a chartered human resource practitioner in Nigeria and a family life coach with core expertise in life balance.",
          "She sits on the board of the Royal College of Nursing, Yorkshire and Humber region.",
          "She is the founder of The Life Balance Network and the convener of The Praying and Twerking Wife, and a previous facilitator of Undressing Sex with the Institute of Family Engineering and Development, Africa.",
          "She has inspired people of different ages and walks of life. She is a mentor and a role model to many, with a goal to see people win in every area of their lives and be the best of themselves.",
          "She is passionate about personal development, child protection, and excelling and finding balance in family life, work and business.",
          "She is a wife and a mother to four fantastic children.",
        ],
      },
      {
        id: "temi-fagbo",
        name: "Temi Fagbo",
        role: "Life and love coach",
        bio: [
          "Temi Fagbo is a mother of two amazing teenagers and a life and love coach. She is passionate about personal rebranding and helping her clients build a possibility mindset, set smarter goals, grow in self-awareness, heal from abuse and gain self-confidence.",
          "She holds that we are only limited by weakness of attention and poverty of imagination: anything is simple if you understand the process.",
        ],
      },
      {
        id: "bukunmi-ladeji",
        name: "Bukunmi Ladeji",
        role: "Nurse and entrepreneur",
        bio: [
          "Bukunmi is a dedicated nurse, entrepreneur and proud mother of two. Her own experiences of pregnancy and motherhood have given her a profound understanding of the challenges women face during and after childbirth, and that empathy fuels her passion to support and empower mothers on their journeys.",
          "With a blend of medical expertise, business acumen and personal experience, she brings the skills, qualifications and exposure to make a meaningful impact, and looks forward to every opportunity to make a difference.",
        ],
      },
      {
        id: "elizabeth-toluwani",
        name: "Elizabeth Toluwani",
        role: "Childminder and doula in training",
        bio: [
          "Elizabeth Toluwani, also known as Temidayo, is a dedicated mother and a passionate advocate for maternal and child wellbeing. With a background in psychology, health and education, she brings a wealth of knowledge and experience to her work as a childminder, child carer and doula in training.",
          "Driven by her own journey, including navigating the challenges of pregnancy loss, Temidayo deeply understands the importance of emotional and practical support for mothers during the prenatal and postnatal periods.",
          "She is passionate about fostering strong bonds between parents and children: building healthy routines, establishing clear boundaries and cultivating a supportive family environment. Her certifications in teaching, skills building, family relationships and character building further equip her to guide and support the families in her care.",
        ],
      },
      {
        id: "abies-sonia",
        name: "Abies Sonia",
        role: "Counsellor and certified life coach",
        bio: [
          "Abies Sonia is a mother of three, a passionate advocate for emotional wellbeing, and a skilled guide on the journey of self-discovery. As a BACP Accredited Counsellor and Certified Life Coach, she understands the unique challenges and joys of navigating life's ups and downs.",
          "With expertise in techniques such as NLP and EFT, Abies creates a safe and supportive space where you can explore your emotions, build resilience and connect with your authentic self.",
        ],
      },
    ] satisfies Profile[],
  },
  expect: {
    tag: "What you can expect",
    heading: { lead: "Empowered, educated,", accent: "inspired." } satisfies AccentText,
    items: [
      { icon: "empowerment", title: "Empowerment", text: "To thrive as a woman first, and then as a mother." },
      { icon: "education", title: "Education", text: "On personal growth, finding harmony with work and life, and more." },
      { icon: "inspiration", title: "Inspiration", text: "To grow, connect, and build meaningful relationships within our community." },
    ] as const,
  },
  closing: {
    heading: { lead: "Change starts", accent: "with us." } satisfies AccentText,
    body: "Join the community the council serves, or partner with us to amplify the work.",
    primary: { label: "Join Mama's Escape" },
    secondary: { label: "Partner with us", href: "/partnership/" },
  },
};
