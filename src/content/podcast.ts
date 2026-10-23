/**
 * Copy for the Podcast page, from the live site's Podcast page (mumsaloud.com/podcast, 23 Oct 2026),
 * tidied. Audience figures on the live page are placeholders and are not repeated here. Episodes
 * come from the show's RSS feed (`lib/podcast/feed.ts`), never from this file.
 */
import type { AccentText } from "@/components/ui/Heading";

export const podcastPage = {
  title: "Podcast",
  description:
    "The Mama's Escape Podcast: real conversations with real mothers about loss, mum guilt and the pressures Black mums carry, with connection and practical ways to thrive.",
  tag: "Mama's Escape Podcast",
  heading: { lead: "Your sanctuary for", accent: "empowered motherhood." } satisfies AccentText,
  intro: "Motherhood is beautiful, messy and overwhelming. For Black mums, the journey is layered with unspoken struggles, cultural expectations and societal pressures. Mama's Escape exists to break this cycle.",
  spotify: { label: "Listen on Spotify", href: "https://creators.spotify.com/pod/show/mamasescape" },
  latest: { label: "Latest episode", href: "#latest", tag: "Latest episode" },
  about: {
    tag: "About the show",
    heading: { lead: "This isn't just a podcast,", accent: "it's a movement." } satisfies AccentText,
    paragraphs: [
      "A space where the masks come off, guilt is confronted without judgement, and authenticity is celebrated. Here we have the conversations many shy away from: real, raw and transformative. From navigating loss to overcoming mum guilt, every episode offers connection, community and practical strategies to help you thrive.",
      "Why does this matter? Because when mothers thrive, so do families, communities and future generations. Mama's Escape is where we strip away the noise and focus on what truly matters: your wellbeing, your growth, and your right to live unapologetically as your true self.",
      "Expect stories that resonate, insights that inspire, and tools to help you navigate motherhood while prioritising your own needs. Take a moment for yourself. Tune in, soak up the wisdom, and join this growing community of mums committed to thriving, not just surviving.",
    ],
  },
  episodes: {
    heading: "All episodes",
    intro: "Every episode, newest first, with the player right here and a link to the same episode on Spotify.",
    transcripts: "Transcripts are not available yet. We will add them as the show provides them.",
    unavailable: "The episode list is unavailable right now. You can still listen on Spotify.",
    empty: "No episodes have been published yet.",
    artworkAlt: "Mama's Escape podcast artwork",
  },
  closing: {
    heading: { lead: "Heard something that", accent: "sounded like you?" } satisfies AccentText,
    body: "Mama's Escape is the community behind the microphone: mentor mums, expert sessions, resources and events for Black mothers in the UK.",
    primary: { label: "Join Mama's Escape" },
    secondary: { label: "Get the newsletter", newsletter: true },
  },
};
