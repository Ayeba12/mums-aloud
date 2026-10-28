import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowRightIcon, ChartBarIcon, GlobeHemisphereWestIcon, HeartIcon, MegaphoneIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { PartnerTile } from "@/components/content/PartnerTile";
import { PostTile } from "@/components/content/PostTile";
import { Section, SectionHeading, Tag } from "@/components/layout/Section";
import { PartnershipForm } from "@/components/forms/PartnershipForm";
import { CardMarquee } from "@/components/sections/CardMarquee";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ButtonLink } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Accent } from "@/components/ui/Heading";
import { PageHeader } from "@/components/sections/PageHeader";
import { SmartLink } from "@/components/ui/SmartLink";
import { impact, partners as partnerList } from "@/content/home";
import { enquiry, hero, network, offer, page, process, routes, voices, ways, why } from "@/content/partnership";
import { siteConfig } from "@/lib/site";
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
  "bg-[linear-gradient(to_top,var(--color-scrim-berry)_0%,color-mix(in_srgb,var(--color-scrim-berry)_85%,transparent)_45%,transparent_100%)]";
const captionScrim =
  "lg:bg-[linear-gradient(to_top,var(--color-scrim-berry)_0%,color-mix(in_srgb,var(--color-scrim-berry)_85%,transparent)_55%,transparent_100%)]";
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
const stepPhotos = [
  { photo: friendsPhoto, position: "object-[55%_30%]" },
  { photo: goldenPhoto, position: "object-[50%_30%]" },
  { photo: smilingPhoto, position: "object-[65%_40%]" },
];

/**
 * Partnership Opportunities, after the reference's homepage: a centred hero over a row of photo
 * cards, a berry panel with two big photo cards and the partner strip, the impact figures as a fan
 * of note cards, the portrait-and-list berry panel with the four offers, three strands of ways to
 * work together, a numbered process, two community stories, and the enquiry form to close.
 */
export default function PartnershipPage() {
  return (
    <main id="main">
      {/* Hero: centred copy on the tint, then the photo cards (a slider with arrows on phones). */}
      <PageHeader
        tag={hero.tag}
        heading={hero.heading}
        intro={hero.intro}
        actions={
          <>
            <ButtonLink href={hero.primary.href} size="large" arrow>
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary" size="large">
              {hero.secondary.label}
            </ButtonLink>
          </>
        }
      >
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
                <figcaption className="absolute right-4 bottom-4 left-4 font-semibold text-on-photo">{hero.cards[index]}</figcaption>
              </figure>
            </li>
          ))}
        </Carousel>
      </PageHeader>

      {/* Berry panel: two big photo cards for the two routes in, then the partners' logos as a marquee. */}
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
                      <h3 className="font-body text-title font-semibold text-on-photo">
                        <SmartLink href={route.href} className="text-on-photo no-underline after:absolute after:inset-0">
                          {route.title}
                        </SmartLink>
                      </h3>
                      <p className="mt-1 max-w-[36ch] text-on-photo">{route.text}</p>
                    </div>
                    <span aria-hidden className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-accent text-on-accent transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none">
                      <ArrowRightIcon size={20} weight="bold" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-12 text-center text-caption font-semibold tracking-wide uppercase opacity-80">{routes.partnersTag}</p>
            {/* The partners' logos drift across the panel in its light ink, easing in and out at the panel's own edges. */}
            <CardMarquee label={routes.partnersTag} fade className="mt-6">
              {partnerList.items.map((partner) => (
                <PartnerTile key={partner.slug} partner={partner} variant="marquee" />
              ))}
            </CardMarquee>
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
              <h3 className="font-heading text-h4 text-ink">{strand.title}</h3>
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
              <SmartLink href={ways.action.href} className="mt-4 inline-flex min-h-12 items-center gap-2 self-start font-semibold">
                {ways.action.label}
                <ArrowRightIcon aria-hidden size={16} weight="bold" />
              </SmartLink>
            </li>
          ))}
        </ul>
      </Section>

      {/* Process: the reference's sticky index beside photo-and-card steps that fade up and drift as you scroll. */}
      <Section aria-labelledby="process-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface))]">
        <SectionHeading id="process-heading" heading={process.heading} intro={process.intro} align="center" />
        <div className="mt-12">
          <ProcessSteps
            outcomeLabel={process.outcomeLabel}
            steps={process.steps.map((step, index) => ({ ...step, photo: stepPhotos[index].photo, alt: "", position: stepPhotos[index].position }))}
          />
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

      {/* Enquiry: the live page's invitation beside the form, closing the page on the tint. */}
      <Section id="enquire" aria-labelledby="enquire-heading" className="scroll-mt-24 bg-[linear-gradient(to_bottom,var(--color-surface),var(--color-surface-tinted))]">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <SectionHeading
            id="enquire-heading"
            tag={enquiry.tag}
            heading={enquiry.heading}
            intro={enquiry.intro}
            className="lg:col-span-5"
            action={
              <div className="flex flex-col gap-2 text-text-secondary">
                <p className="max-w-[46ch]">{enquiry.note}</p>
                <p>
                  {enquiry.emailLead} <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
                </p>
              </div>
            }
          />
          <div className="rounded-panel bg-surface-card p-6 lg:col-span-6 lg:col-start-7 lg:p-8">
            <PartnershipForm />
          </div>
        </div>
      </Section>
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
