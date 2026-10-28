import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { dateFormat } from "@/components/content/PostCard";
import { Section, SectionHeading, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { podcastPage as copy } from "@/content/podcast";
import { durationLabel, getPodcast, type Episode, type Podcast } from "@/lib/podcast/feed";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  alternates: { canonical: "/podcast/" },
};

const spotifyLinkClasses = "inline-flex min-h-12 items-center gap-2 font-semibold";

/**
 * The podcast: a centred introduction, the latest episode as artwork beside a light panel with a
 * native player, the show's own words, every episode with its player and Spotify link, and the
 * invitation. Episodes come from the show's RSS feed; the page says what the feed lacks.
 */
export default function PodcastPage() {
  return (
    <main id="main">
      <PageHeader
        tag={copy.tag}
        heading={copy.heading}
        intro={copy.intro}
        actions={
          <>
            <ButtonLink href={copy.spotify.href} size="large" icon={<ArrowUpRightIcon aria-hidden size={16} weight="bold" />}>
              {copy.spotify.label}
              <span className="sr-only">(opens Spotify)</span>
            </ButtonLink>
            <ButtonLink href={copy.latest.href} variant="secondary" size="large">
              {copy.latest.label}
            </ButtonLink>
          </>
        }
      >
        <div className="mt-12">
          <Suspense fallback={<p className="text-center text-text-secondary">Loading the latest episode…</p>}>
            <LatestEpisode />
          </Suspense>
        </div>
      </PageHeader>

      <Section aria-labelledby="about-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading id="about-heading" tag={copy.about.tag} heading={copy.about.heading} />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7 lg:pt-10">
            {copy.about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="max-w-[56ch]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="episodes" aria-labelledby="episodes-heading" tone="tinted" className="scroll-mt-24">
        <div className="flex flex-col items-start">
          <h2 id="episodes-heading" className="text-h2">
            {copy.episodes.heading}
          </h2>
          <p className="mt-4 max-w-[46ch] text-lead">{copy.episodes.intro}</p>
        </div>
        <div className="mt-12">
          <Suspense fallback={<p className="text-text-secondary">Loading episodes…</p>}>
            <EpisodeList />
          </Suspense>
        </div>
      </Section>

      <ClosingInvite
        id="podcast-closing"
        heading={copy.closing.heading}
        body={copy.closing.body}
        primary={copy.closing.primary}
        secondary={{ label: copy.closing.secondary.label, href: siteConfig.newsletterUrl }}
      />
    </main>
  );
}

async function loadPodcast(): Promise<Podcast | null> {
  try {
    return await getPodcast();
  } catch (error) {
    console.error("[Podcast] feed failed to load", error);
    return null;
  }
}

function EpisodeMeta({ episode }: { episode: Episode }) {
  const duration = durationLabel(episode.durationSeconds);
  return (
    <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">
      {episode.number !== undefined && (
        <>
          Episode {episode.number}
          <span aria-hidden> · </span>
        </>
      )}
      <time dateTime={episode.date}>{dateFormat.format(new Date(episode.date))}</time>
      {duration && (
        <>
          <span aria-hidden> · </span>
          {duration}
        </>
      )}
    </p>
  );
}

function Player({ episode }: { episode: Episode }) {
  if (!episode.audio) return null;
  return (
    <audio controls preload="none" className="mt-4 w-full" aria-label={`Play ${episode.title}`}>
      <source src={episode.audio.url} type={episode.audio.type} />
      Your browser cannot play this episode here.{" "}
      {episode.link && <a href={episode.link}>Listen on Spotify instead.</a>}
    </audio>
  );
}

async function LatestEpisode() {
  const podcast = await loadPodcast();
  const episode = podcast?.episodes[0];
  if (!episode) return null;
  const image = episode.image ?? podcast?.image;
  return (
    <article id="latest" aria-labelledby="latest-heading" className="grid scroll-mt-24 gap-2 md:grid-cols-12 md:gap-4">
      {image && (
        <div className="relative aspect-square overflow-hidden rounded-card ring-1 ring-black-950/10 ring-inset md:col-span-5">
          <Image src={image} alt={copy.episodes.artworkAlt} fill priority sizes="(min-width: 48rem) 42vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className={`flex flex-col rounded-card bg-surface-card p-6 lg:p-8 ${image ? "md:col-span-7" : "md:col-span-12"}`}>
        <Tag className="self-start">{copy.latest.tag}</Tag>
        <h2 id="latest-heading" className="mt-4 text-h3">
          {episode.title}
        </h2>
        <div className="mt-3">
          <EpisodeMeta episode={episode} />
        </div>
        {episode.summary && <p className="mt-4 max-w-[60ch]">{episode.summary}</p>}
        <Player episode={episode} />
        {episode.link && (
          <a href={episode.link} className={`${spotifyLinkClasses} mt-2 self-start`}>
            Listen on Spotify
            <ArrowUpRightIcon aria-hidden size={16} weight="bold" />
          </a>
        )}
      </div>
    </article>
  );
}

async function EpisodeList() {
  const podcast = await loadPodcast();
  if (!podcast) {
    return (
      <p role="status" className="text-text-secondary">
        {copy.episodes.unavailable}{" "}
        <a href={copy.spotify.href} className="font-semibold">
          Listen on Spotify
        </a>
      </p>
    );
  }
  if (podcast.episodes.length === 0) return <p className="text-text-secondary">{copy.episodes.empty}</p>;

  return (
    <>
      <ol className="flex flex-col gap-4">
        {podcast.episodes.map((episode) => {
          const image = episode.image ?? podcast.image;
          return (
            <li key={episode.id} className="grid gap-4 rounded-card bg-surface p-6 sm:grid-cols-[4rem_1fr] sm:gap-6">
              {image ? (
                <Image src={image} alt="" width={64} height={64} sizes="4rem" className="size-16 rounded-control object-cover" />
              ) : (
                <span aria-hidden className="size-16 rounded-control bg-surface-tinted" />
              )}
              <div className="min-w-0">
                <EpisodeMeta episode={episode} />
                <h3 className="mt-2 font-heading text-h4 text-ink">{episode.title}</h3>
                {episode.summary && <p className="mt-2 max-w-[70ch]">{episode.summary}</p>}
                <Player episode={episode} />
                {episode.link && (
                  <a href={episode.link} className={`${spotifyLinkClasses} mt-2`}>
                    Listen on Spotify
                    <ArrowUpRightIcon aria-hidden size={16} weight="bold" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-caption text-text-secondary">{copy.episodes.transcripts}</p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PodcastSeries",
            name: podcast.title,
            description: copy.description,
            url: `${siteConfig.url}/podcast/`,
            image: podcast.image,
            author: podcast.author ? { "@type": "Person", name: podcast.author } : undefined,
            webFeed: process.env.PODCAST_FEED_URL || "https://anchor.fm/s/e0f9c9c4/podcast/rss",
          }),
        }}
      />
    </>
  );
}
