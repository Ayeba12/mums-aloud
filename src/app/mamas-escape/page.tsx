import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookOpenTextIcon,
  CalendarHeartIcon,
  EnvelopeSimpleIcon,
  HandHeartIcon,
  LightbulbIcon,
  MicrophoneIcon,
  QuotesIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import { Faq } from "@/components/content/Faq";
import { Section, SectionHeading, Tag } from "@/components/layout/Section";
import { SplitHero } from "@/components/sections/SplitHero";
import { TextMarquee } from "@/components/sections/TextMarquee";
import { ButtonLink } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Accent } from "@/components/ui/Heading";
import { experience, expect, family, faq, hero, join, marquee, page, stayClose, why } from "@/content/mamas-escape";
import { joinForm, siteConfig } from "@/lib/site";
import heroPhoto from "@/assets/photos/mother-daughter-park.jpg";
import embracePhoto from "@/assets/photos/mother-daughter-embrace.jpg";
import circlePhoto from "@/assets/photos/women-community-circle.jpg";
import podcastPhoto from "@/assets/photos/mother-baby-smiling.jpg";
import newsletterPhoto from "@/assets/photos/hero-mother-baby-golden-hour.jpg";
import friendsPhoto from "@/assets/photos/two-friends-smiling.jpg";
import kissingPhoto from "@/assets/photos/mother-kissing-baby.jpg";
import laughingPhoto from "@/assets/photos/two-women-laughing.jpg";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/mamas-escape/" },
};

const experienceIcons = { mentor: HandHeartIcon, expert: LightbulbIcon, resources: BookOpenTextIcon, events: CalendarHeartIcon };
const familyMedia = {
  community: { icon: UsersThreeIcon, photo: laughingPhoto, position: "object-[60%_25%]" },
  podcast: { icon: MicrophoneIcon, photo: podcastPhoto, position: "object-[65%_40%]" },
  newsletter: { icon: EnvelopeSimpleIcon, photo: newsletterPhoto, position: "object-[50%_25%]" },
};
const expectPhotos = [
  { src: friendsPhoto, alt: "Two friends smiling side by side", position: "object-[55%_30%]" },
  { src: podcastPhoto, alt: "A mother and her baby smiling, cheek to cheek", position: "object-[60%_40%]" },
  { src: circlePhoto, alt: "Three women talking together on a sofa", position: "object-[50%_40%]" },
];
const imageRing = "ring-1 ring-black-950/10 ring-inset";
/** Scrims under text on photos: the world's own dark (berry 900), not a neutral black. */
const portraitScrim =
  "bg-[linear-gradient(to_top,var(--color-berry-lipstick-900)_0%,color-mix(in_srgb,var(--color-berry-lipstick-900)_85%,transparent)_45%,transparent_100%)]";
const captionScrim =
  "lg:bg-[linear-gradient(to_top,var(--color-berry-lipstick-900)_0%,color-mix(in_srgb,var(--color-berry-lipstick-900)_85%,transparent)_55%,transparent_100%)]";

export default function MamasEscapePage() {
  return (
    <main id="main">
      <SplitHero
        photo={heroPhoto}
        alt=""
        position="object-[50%_30%]"
        card={hero.card}
        tag={hero.tag}
        heading={hero.heading}
        intro={hero.intro}
        actions={
          <>
            <ButtonLink href={joinForm.href} size="large" arrow>
              {hero.primary}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary" size="large">
              {hero.secondary.label}
            </ButtonLink>
          </>
        }
      />

      {/* Why we exist: the page's one dark panel, after the reference's dark section. A portrait carrying
          the reason as its caption, the heading set tall beside it; then a statement, four outlined cards
          with their text at the foot, and one pill. */}
      <div className="frame-x section-y">
        <section id="inside" aria-labelledby="why-heading" className="surface-dark rounded-panel scroll-mt-24">
          <div className="container-page section-y">
            {/* The photo sits on the right, under the hero copy, so the page zigzags: hero photo left,
                this one right, the experience portrait left, the join photo right. From lg the photo
                spans two rows and the heading and figure sit either side of the row boundary, so the
                pair stays centred beside it. On phones the figure follows the paragraph that explains it. */}
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6">
              <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-end">
                <Tag>{why.tag}</Tag>
                <h2 id="why-heading" className="mt-4 max-w-[12ch] text-h2">
                  <Accent {...why.heading} />
                </h2>
              </div>
              <div className="relative lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
                <div className={`overflow-hidden rounded-card ${imageRing}`}>
                  <Image src={embracePhoto} alt="" placeholder="blur" sizes="(min-width: 64rem) 50vw, 100vw" className="aspect-square w-full object-cover object-[50%_30%]" />
                </div>
                <p className={`mt-4 max-w-[46ch] lg:absolute lg:inset-x-0 lg:bottom-0 lg:m-0 lg:max-w-none lg:rounded-b-card lg:p-6 lg:pt-24 ${captionScrim}`}>
                  <span className="block max-w-[46ch]">{why.body}</span>
                </p>
              </div>
              <p className="max-w-[36ch] lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-start">
                <span className="font-heading text-h3 leading-none">{why.stat.value}</span> {why.stat.label} ·{" "}
                <a href={why.stat.source.href}>Source: {why.stat.source.label}</a>
              </p>
            </div>

            <h3 className="mx-auto mt-16 max-w-[24ch] text-center text-h2 lg:mt-24">
              <Accent {...why.inside} />
            </h3>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {experience.items.map((item) => {
                const Icon = experienceIcons[item.icon];
                return (
                  <li key={item.title} className="flex flex-col rounded-card border border-border-decoration p-6 lg:min-h-[22rem]">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-surface-card text-accent">
                      <Icon aria-hidden size={24} />
                    </span>
                    <h4 className="mt-6 font-heading text-h4 text-ink">{item.title}</h4>
                    <p className="mt-4 lg:mt-auto lg:pt-8">{item.text}</p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-12 flex justify-center">
              <ButtonLink href={joinForm.href} variant="inverse" size="large" arrow>
                {hero.primary}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>

      {/* What you will experience: the story beside a portrait, closing on the pledge. Photo on the left this time, so the splits keep alternating. */}
      <Section aria-labelledby="experience-heading">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <SectionHeading id="experience-heading" tag={experience.tag} heading={experience.heading} intro={experience.body} />
            <blockquote className="mt-8 max-w-[40ch]">
              <QuotesIcon aria-hidden size={24} weight="fill" className="text-accent" />
              <p className="mt-2 font-heading text-h3 italic text-ink">{experience.pledge}</p>
            </blockquote>
          </div>
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <Image
              src={kissingPhoto}
              alt="A mother kissing her smiling baby on the cheek"
              placeholder="blur"
              sizes="(min-width: 64rem) 42vw, 100vw"
              className={`aspect-[4/5] w-full rounded-card object-cover object-[50%_35%] ${imageRing}`}
            />
          </div>
        </div>
      </Section>

      <TextMarquee text={marquee} />

      {/* Where Mama's Escape sits: three photo cards. A slider with arrows on phones, a row of three from md. */}
      <Section aria-labelledby="family-heading">
        <SectionHeading id="family-heading" tag={family.tag} heading={family.heading} intro={family.intro} />
        <Carousel
          count={family.tiles.length}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 px-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:scroll-pl-0 md:px-0 lg:gap-8"
          controlsClassName="md:hidden"
        >
          {family.tiles.map((tile) => {
            const media = familyMedia[tile.icon];
            const Icon = media.icon;
            const external = "external" in tile.action && tile.action.external;
            const href = tile.title === "The Newsletter" ? siteConfig.newsletterUrl : tile.action.href;
            return (
              <li key={tile.title} className="w-[82vw] shrink-0 snap-start sm:w-[60vw] md:w-auto">
                <article className={`group relative aspect-square overflow-hidden rounded-card ${imageRing}`}>
                  <Image
                    src={media.photo}
                    alt=""
                    placeholder="blur"
                    sizes="(min-width: 48rem) 33vw, 82vw"
                    className={`absolute inset-0 size-full object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none ${media.position}`}
                  />
                  {/* 8px inside a 16px card, so the caption keeps the control radius and the corners stay concentric. */}
                  <div className="surface-dark absolute right-2 bottom-2 left-2 rounded-control p-5">
                    <div className="flex items-center gap-3">
                      <Icon aria-hidden size={20} className="shrink-0 text-accent" />
                      <h3 className="font-body text-h4 font-bold">{tile.title}</h3>
                    </div>
                    <p className="mt-2">{tile.text}</p>
                    {external ? (
                      <a href={href} className="mt-3 inline-flex min-h-12 items-center gap-2 font-semibold after:absolute after:inset-0">
                        {tile.action.label}
                        <ArrowUpRightIcon aria-hidden size={16} weight="bold" />
                        <span className="sr-only">(opens Spotify)</span>
                      </a>
                    ) : (
                      <Link href={href} className="mt-3 inline-flex min-h-12 items-center gap-2 font-semibold after:absolute after:inset-0">
                        {tile.action.label}
                        <ArrowRightIcon aria-hidden size={16} weight="bold" />
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </Carousel>
      </Section>

      {/* What to expect: three portraits with one line each, as the reference's testimonial row. */}
      <Section id="what-to-expect" aria-labelledby="expect-heading" tone="tinted" className="scroll-mt-24">
        <SectionHeading id="expect-heading" tag={expect.tag} heading={expect.heading} intro={expect.body} align="center" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-3 md:gap-6">
          {expectPhotos.map((photo, index) => (
            <li key={photo.alt} className={`relative aspect-[2/3] overflow-hidden rounded-panel ${imageRing}`}>
              <Image src={photo.src} alt={photo.alt} placeholder="blur" sizes="(min-width: 40rem) 33vw, 100vw" className={`absolute inset-0 size-full object-cover ${photo.position}`} />
              <div aria-hidden className={`absolute inset-x-0 bottom-0 h-3/5 ${portraitScrim}`} />
              <p className="absolute right-6 bottom-6 left-6 font-heading text-h4 text-black-50">{expect.moments[index]}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-caption text-text-secondary">{expect.note}</p>
      </Section>

      {/* How to join: the reference's "start with a conversation" split, a warm card beside the photo. Photo on the right, completing the zigzag. */}
      <Section id="join" aria-labelledby="join-heading" className="scroll-mt-24">
        <SectionHeading
          id="join-heading"
          tag={join.tag}
          heading={join.heading}
          intro={joinForm.open ? join.body : join.bodyClosed}
          align="center"
        />
        <div className="mt-12 grid gap-2 lg:grid-cols-3 lg:gap-4">
          <div className={`relative min-h-72 overflow-hidden rounded-panel lg:col-span-2 lg:col-start-2 lg:row-start-1 ${imageRing}`}>
            <Image src={laughingPhoto} alt="" fill placeholder="blur" sizes="(min-width: 64rem) 66vw, 100vw" className="object-cover object-[60%_20%]" />
          </div>
          <div className="rounded-panel bg-surface-warm p-6 lg:col-start-1 lg:row-start-1 lg:p-8">
            <h3 className="font-body text-h4 font-bold text-ink">{join.asksTitle}</h3>
            <ol className="mt-4 flex flex-col gap-3">
              {join.asks.map((ask, index) => (
                <li key={ask} className="flex gap-3">
                  <span aria-hidden className="inline-flex size-6 shrink-0 items-center justify-center rounded-pill bg-accent text-caption font-bold text-on-accent">
                    {index + 1}
                  </span>
                  {ask}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          {joinForm.open ? (
            <ButtonLink href={joinForm.href} size="large" arrow>
              {join.primary}
            </ButtonLink>
          ) : (
            <p role="status" className="max-w-[46rem] rounded-card bg-surface-card p-4 text-center">
              <Link href={siteConfig.newsletterUrl} className="font-semibold">
                {join.pending.link}
              </Link>
              {join.pending.after}
            </p>
          )}
        </div>
      </Section>

      <Section aria-labelledby="faq-heading">
        <SectionHeading id="faq-heading" heading={faq.heading} align="center" />
        <div className="mt-12">
          <Faq items={faq.items} />
        </div>
      </Section>

      {/* Closing, as Home C: two pills, with the quieter routes carried as links in the sentence that names them. */}
      <Section aria-labelledby="stay-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface),var(--color-surface-tinted))]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Tag>{stayClose.tag}</Tag>
          <h2 id="stay-heading" className="mt-2 text-h2">
            <Accent {...stayClose.heading} />
          </h2>
          <p className="mt-4 max-w-[46ch] text-lead">
            {stayClose.body.map((part) =>
              typeof part === "string" ? (
                part
              ) : "external" in part && part.external ? (
                <a key={part.label} href={part.href} className="font-semibold">
                  {part.label}
                  <span className="sr-only"> (opens Spotify)</span>
                </a>
              ) : (
                <Link key={part.label} href={part.href} className="font-semibold">
                  {part.label}
                </Link>
              ),
            )}
          </p>
          <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={joinForm.href} size="large" arrow>
              {join.primary}
            </ButtonLink>
            <ButtonLink href={siteConfig.newsletterUrl} variant="secondary" size="large">
              {stayClose.newsletter}
            </ButtonLink>
          </div>
          <p className="mt-12 font-heading text-h3 italic text-ink">{stayClose.closing}</p>
        </div>
      </Section>
    </main>
  );
}
