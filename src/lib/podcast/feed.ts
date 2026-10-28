import { cacheLife, cacheTag } from "next/cache";
import { decodeEntities, toPlainText, truncate } from "@/lib/wordpress/mapping";

/**
 * The Mama's Escape podcast, read from the show's public RSS feed (Spotify for Creators). The
 * feed is the source of truth for episodes; nothing here is typed by hand, and the page says
 * plainly what the feed does not provide (transcripts, for now).
 */
export const PODCAST_TAG = "podcast";
// `||`, not `??`: a blank value in the hosting settings counts as unset.
const FEED_URL = process.env.PODCAST_FEED_URL || "https://anchor.fm/s/e0f9c9c4/podcast/rss";
const TIMEOUT_MS = 15_000;

export type Episode = {
  id: string;
  title: string;
  /** ISO date of publication. */
  date: string;
  durationSeconds?: number;
  summary: string;
  /** The episode's page on Spotify. */
  link?: string;
  audio?: { url: string; type: string };
  image?: string;
  number?: number;
  season?: number;
};

export type Podcast = {
  title: string;
  link?: string;
  author?: string;
  image?: string;
  description: string;
  episodes: Episode[];
};

const unwrap = (value: string) => decodeEntities(value.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1")).trim();

/** Text of the first `<name>` element, with CDATA and entities resolved. Namespaced names are matched literally. */
function field(xml: string, name: string): string | undefined {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  return match ? unwrap(match[1]) : undefined;
}

function attribute(attributes: string, name: string): string | undefined {
  const match = attributes.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`));
  return match ? decodeEntities(match[1]) : undefined;
}

function imageHref(xml: string): string | undefined {
  const match = xml.match(/<itunes:image\b([^>]*)\/?>/);
  return match ? attribute(match[1], "href") : undefined;
}

function wholeNumber(value?: string): number | undefined {
  return value && /^\d+$/.test(value.trim()) ? Number(value) : undefined;
}

/** "00:36:26", "36:26" or "2186" (seconds) to seconds. */
export function parseDuration(value?: string): number | undefined {
  if (!value) return undefined;
  const parts = value.trim().split(":").map(Number);
  if (parts.length === 0 || parts.some((part) => Number.isNaN(part))) return undefined;
  return parts.reduce((total, part) => total * 60 + part, 0);
}

/** "36 min", "1 hr 2 min". Under a minute rounds up to 1 min. */
export function durationLabel(seconds?: number): string | undefined {
  if (seconds === undefined || seconds <= 0) return undefined;
  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
}

/** Parses a podcast RSS feed. Episodes come back newest first; items without a readable date are dropped. */
export function parseFeed(xml: string): Podcast {
  const [channel] = xml.split(/<item[\s>]/);
  const items = [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/g)].map((match) => match[1]);

  const episodes = items
    .map((item, index): Episode => {
      const pubDate = field(item, "pubDate");
      const date = pubDate && !Number.isNaN(Date.parse(pubDate)) ? new Date(pubDate).toISOString() : "";
      const enclosure = item.match(/<enclosure\b([^>]*)\/?>/);
      const url = enclosure ? attribute(enclosure[1], "url") : undefined;
      return {
        id: field(item, "guid") ?? `episode-${index}`,
        title: field(item, "title") ?? "Untitled episode",
        date,
        durationSeconds: parseDuration(field(item, "itunes:duration")),
        summary: truncate(toPlainText(field(item, "description") ?? field(item, "itunes:summary") ?? ""), 240),
        link: field(item, "link"),
        audio: url ? { url, type: (enclosure && attribute(enclosure[1], "type")) || "audio/mpeg" } : undefined,
        image: imageHref(item),
        number: wholeNumber(field(item, "itunes:episode")),
        season: wholeNumber(field(item, "itunes:season")),
      };
    })
    .filter((episode) => episode.date)
    .sort((a, b) => b.date.localeCompare(a.date));

  return {
    title: field(channel, "title") ?? "Podcast",
    link: field(channel, "link"),
    author: field(channel, "itunes:author"),
    image: imageHref(channel),
    description: toPlainText(field(channel, "description") ?? ""),
    episodes,
  };
}

/** The show and its episodes, cached for hours; `POST /api/revalidate/` with `{ "collection": "podcast" }` refreshes it. */
export async function getPodcast(): Promise<Podcast> {
  "use cache";
  cacheLife("hours");
  cacheTag(PODCAST_TAG);

  const response = await fetch(FEED_URL, {
    headers: { Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.1" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Podcast feed returned ${response.status}`);
  return parseFeed(await response.text());
}
