import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRightIcon, ChartBarIcon, GlobeHemisphereWestIcon, HeartIcon, MegaphoneIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { PostTile } from "@/components/content/PostTile";
import { Section, SectionHeading, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { ButtonLink } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Accent } from "@/components/ui/Heading";
import { impact, partners as partnerNames } from "@/content/home";
import { closing, hero, network, offer, page, process, routes, voices, ways, why } from "@/content/partnership";
import { getLatest } from "@/lib/wordpress/client";
import type { PostSummary } from "@/lib/wordpress/mapping";
import circlePhoto from "@/assets/photos/women-community-circle.jpg";
import laughingPhoto from "@/assets/photos/two-women-laughing.jpg";
import friendsPhoto from "@/assets/photos/two-friends-smiling.jpg";
import goldenPhoto from "@/assets/photos/hero-mother-baby-golden-hour.jpg";
import smilingPhoto from "@/assets/photos/mother-baby-smiling.jpg";
import parkPhoto from "@/assets/photos/mother-daughter-park.jpg";
import embracePhoto from "@/assets/photos/mother-daughter-embrace.jpg";
import kissingPhoto from "@/assets/photos/mother-kissing-baby.jpg";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/partnership/" },
};

const imageRing = "ring-1 ring-black-950/10 ring-inset";
const scrim =
  "bg-[linear-gradient(to_top,var(--color-berry-lipstick-900)_0%,color-mix(in_srgb,var(--color-berry-lipstick-900)_85%,transparent)_45%,transparent_100%)]";
const captionScrim =
  "lg:bg-[linear-gradient(to_top,var(--color-berry-lipstick-900)_0%,color-mix(in_srgb,var(--color-berry-lipstick-900)_85%,transparent)_55%,transparent_100%)]";
const offerIcons = { insight: UsersThreeIcon, culture: GlobeHemisphereWestIcon, data: ChartBarIcon, advocates: MegaphoneIcon };

/** Stock placeholders until the client's own photography lands: decorative, never captioned as partners or members. */
const heroCards = [
  { photo: circlePhoto, position: "object-[50%_35%]" },
  { photo: laughingPhoto, position: "object-[60%_20%]" },
  { photo: friendsPhoto, position: "object-[55%_30%]" },
  { photo: goldenPhoto, position: "object-[50%_30%]" },
];
const routePhotos = [
  { photo: smilingPhoto, position: "object-[65%_40%]" },
  { photo: parkPhoto, position: "object-[50%_30%]" },
];
const strandPhotos = [
  { photo: kissingPhoto, position: "object-[50%_35%]" },
  { photo: circlePhoto, position: "object-[50%_40%]" },
  { photo: laughingPhoto, position: "object-[60%_25%]" },
];

/**
 * Partnership Opportunities, after the reference's homepage: a centred hero over a row of photo
 * cards, a berry panel with two big photo cards and the partner strip, the impact figures as a fan
 * of note cards, the portrait-and-list berry panel with the four offers, three strands of ways to
 * work together, a numbered process, two community stories, and the light closing.
 */
export default function PartnershipPage() {
  return (
    <main id="main">
      {/* Hero: centred copy on the tint, then the photo cards (a slider with arrows on phones). */}
      <Section aria-labelledby="page-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface)_40rem)]">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag>{hero.tag}</Tag>
          <h1 id="page-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent {...hero.heading} />
          </h1>
          <p className="mt-4 max-w-[46ch] text-lead">{hero.intro}</p>
          <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={hero.primary.href} size="large" arrow>
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary" size="large">
              {hero.secondary.label}
            </ButtonLink>
          </div>
        </div>
        <Carousel
          count={heroCards.length}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 px-4 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:scroll-pl-0 md:px-0"
          controlsClassName="md:hidden"
        >
          {heroCards.map((card, index) => (
            <li key={hero.cards[index]} className="w-[70vw] shrink-0 snap-start sm:w-[44vw] md:w-auto">
              <figure className={`relative aspect-[3/4] overflow-hidden rounded-card ${imageRing}`}>
                <Image src={card.photo} alt="" fill placeholder="blur" sizes="(min-width: 48rem) 25vw, 70vw" className={`object-cover ${card.position}`} />
                <div aria-hidden className={`absolute inset-x-0 bottom-0 h-2/5 ${scrim}`} />
                <figcaption className="absolute right-4 bottom-4 left-4 font-semibold text-black-50">{hero.cards[index]}</figcaption>
              </figure>
            </li>
          ))}
        </Carousel>
      </Section>

      {/* Berry panel: two big photo cards for the two routes in, then the partner strip. */}
      <div className="frame-x section-y">
        <section aria-labelledby="routes-heading" className="surface-dark rounded-panel">
          <div className="container-page section-y">
            <h2 id="routes-heading" className="mx-auto max-w-[22ch] text-center text-h2">
              <Accent {...routes.heading} />
            </h2>
            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-6">
              {routes.items.map((route, index) => (
                <li key={route.title} className={`group relative aspect-[4/3] overflow-hidden rounded-card ${imageRing}`}>
                  <Image
                    src={routePhotos[index].photo}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 48rem) 50vw, 100vw"
                    className={`object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none ${routePhotos[index].position}`}
                  />
                  <div aria-hidden className={`absolute inset-x-0 bottom-0 h-3/5 ${scrim}`} />
                  <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-body text-h4 font-bold text-black-50">
                        <Link href={route.href} className="text-black-50 no-underline after:absolute after:inset-0">
                          {route.title}
                        </Link>
                      </h3>
                      <p className="mt-1 max-w-[36ch] text-black-50">{route.text}</p>
                    </div>
                    <span aria-hidden className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-accent text-on-accent transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none">
                      <ArrowRightIcon size={20} weight="bold" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-12 text-center text-caption font-semibold tracking-wide uppercase opacity-80">{routes.partnersTag}</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-3 text-center font-semibold">
              {partnerNames.names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Why it matters: the impact figures as a fan of note cards, as the reference's stack. */}
      <Section aria-labelledby="why-heading">
        <SectionHeading id="why-heading" tag={why.tag} heading={why.heading} align="center" />
        <ul className="mx-auto mt-12 flex max-w-[60rem] flex-col gap-4 md:mt-16 md:flex-row md:items-end md:justify-center md:gap-0">
          {/* The sourced 3x figure takes the front card; the two counts flank it. */}
          {[impact.stats[0], impact.stats[2], impact.stats[1]].map((stat, index) => (
            <li
              key={stat.value}
              className={`rounded-card bg-surface p-6 shadow-raised md:w-80 ${
                index === 0 ? "md:z-0 md:-rotate-3 md:translate-y-6" : index === 1 ? "md:z-10 md:-mx-4" : "md:z-0 md:rotate-3 md:translate-y-6"
              }`}
            >
              <span className="inline-flex size-10 items-center justify-center rounded-pill bg-accent-soft text-ink">
                <HeartIcon aria-hidden size={20} weight="fill" />
              </span>
              <p className="mt-4 font-heading text-h2 text-ink">{stat.value}</p>
              <p className="mt-2">{stat.label}</p>
              {"source" in stat && stat.source && (
                <p className="mt-3 text-caption text-text-secondary">
                  Source: <a href={stat.source.href}>{stat.source.label}</a>
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Berry panel: the portrait with its caption beside who we work with, then the four offers. */}
      <div className="frame-x section-y">
        <section id="offer" aria-labelledby="network-heading" className="surface-dark rounded-panel scroll-mt-24">
          <div className="grid gap-8 px-2 pt-2 md:px-4 md:pt-4 lg:grid-cols-12 lg:gap-x-8 lg:p-2">
            <div className="relative order-first lg:col-span-6 lg:col-start-1 lg:row-start-1">
              <div className={`overflow-hidden rounded-card ${imageRing}`}>
                <Image src={embracePhoto} alt="" placeholder="blur" sizes="(min-width: 64rem) 50vw, 100vw" className="aspect-square w-full object-cover object-[50%_30%]" />
              </div>
              <p className={`mt-4 max-w-[46ch] px-2 lg:absolute lg:inset-x-0 lg:bottom-0 lg:m-0 lg:max-w-none lg:rounded-b-card lg:px-6 lg:pt-24 lg:pb-6 ${captionScrim}`}>
                <span className="block max-w-[46ch]">{network.caption}</span>
              </p>
            </div>
            <div className="px-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-center lg:pr-6 lg:pl-0">
              <Tag>{network.tag}</Tag>
              <ul id="network-heading" className="mt-4 flex flex-col gap-1 font-heading text-h1 leading-tight text-ink">
                {network.sectors.map((sector) => (
                  <li key={sector}>{sector}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="container-page pb-12 md:pb-16 lg:pb-24">
            <h2 className="mx-auto mt-16 max-w-[24ch] text-center text-h2 lg:mt-24">
              <Accent {...offer.heading} />
            </h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {offer.items.map((item) => {
                const Icon = offerIcons[item.icon];
                return (
                  <li key={item.title} className="flex flex-col rounded-card border border-border-decoration p-6 lg:min-h-[20rem]">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-surface-card text-accent">
                      <Icon aria-hidden size={24} />
                    </span>
                    <h3 className="mt-6 font-heading text-h4 text-ink">{item.title}</h3>
                    <p className="mt-4 lg:mt-auto lg:pt-8">{item.text}</p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-12 flex justify-center">
              <ButtonLink href={offer.action.href} variant="inverse" size="large" arrow>
                {offer.action.label}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>

      {/* Ways to work together: three strands, each a photo column with its opportunities. */}
      <Section id="ways" aria-labelledby="ways-heading" className="scroll-mt-24">
        <SectionHeading id="ways-heading" tag={ways.tag} heading={ways.heading} intro={ways.intro} />
        <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {ways.strands.map((strand, index) => (
            <li key={strand.title} className="flex flex-col">
              <h3 className="font-body text-h4 font-bold text-ink">{strand.title}</h3>
              <div className={`mt-4 overflow-hidden rounded-card ${imageRing}`}>
                <Image
                  src={strandPhotos[index].photo}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 48rem) 33vw, 100vw"
                  className={`aspect-[4/5] w-full object-cover ${strandPhotos[index].position}`}
                />
              </div>
              <ul className="mt-4 flex flex-col gap-2">
                {strand.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden className="mt-2 size-2 shrink-0 rounded-pill bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={ways.action.href} className="mt-4 inline-flex min-h-12 items-center gap-2 self-start font-semibold">
                {ways.action.label}
                <ArrowRightIcon aria-hidden size={16} weight="bold" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Process: a numbered index beside three step cards, on the reference's soft gradient. */}
      <Section aria-labelledby="process-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface))]">
        <SectionHeading id="process-heading" heading={process.heading} intro={process.intro} align="center" />
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-8">
          <ol className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-3 lg:flex-col lg:gap-4">
            {process.steps.map((step, index) => (
              <li key={step.short}>
                <a href={`#step-${index + 1}`} className="inline-flex min-h-12 items-center gap-3 font-semibold text-ink no-underline hover:underline">
                  <span className="text-caption text-text-secondary tabular-nums">0{index + 1}</span>
                  {step.short}
                </a>
              </li>
            ))}
          </ol>
          <ol className="flex flex-col gap-4 lg:col-span-9">
            {process.steps.map((step, index) => (
              <li key={step.title} id={`step-${index + 1}`} className="scroll-mt-24 grid gap-2 rounded-panel bg-surface-card p-2 md:grid-cols-12 md:gap-4">
                <div className="flex items-center justify-center rounded-card bg-surface p-6 md:col-span-4 md:min-h-[16rem]">
                  <span aria-hidden className="font-heading text-display text-ink">0{index + 1}</span>
                </div>
                <div className="flex flex-col p-4 md:col-span-8 md:p-6">
                  <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">Step 0{index + 1}</p>
                  <h3 className="mt-2 font-body text-h4 font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-[56ch]">{step.text}</p>
                  <div className="mt-6 rounded-control bg-black-100 p-4 md:mt-auto">
                    <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{process.outcomeLabel}</p>
                    <p className="mt-1 font-semibold text-ink">{step.outcome}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Voices: two Story Lounge tiles, the community in its own words. */}
      <Section aria-labelledby="voices-heading">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="voices-heading" heading={voices.heading} intro={voices.intro} />
          <ButtonLink href={voices.link.href} variant="secondary">
            {voices.link.label}
          </ButtonLink>
        </div>
        <div className="mt-12">
          <Suspense fallback={<p className="text-text-secondary">Loading stories…</p>}>
            <Voices />
          </Suspense>
        </div>
      </Section>

      <ClosingInvite id="closing-heading" heading={closing.heading} body={closing.body} primary={closing.primary} secondary={closing.secondary} />
    </main>
  );
}

async function Voices() {
  let posts: PostSummary[];
  try {
    posts = await getLatest("storyLounge", 2);
  } catch (error) {
    console.error("[Partnership] stories failed to load", error);
    return (
      <p role="status" className="text-text-secondary">
        Stories are unavailable right now. Please try again later.
      </p>
    );
  }
  if (posts.length === 0) return <p className="text-text-secondary">No stories yet.</p>;
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 lg:gap-x-8">
      {posts.map((post) => (
        <li key={post.id} className="min-w-0">
          <PostTile post={post} label="Story" />
        </li>
      ))}
    </ul>
  );
}
