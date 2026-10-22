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
import { IconChip, Section, SectionHeading, Tag } from "@/components/layout/Section";
import { SplitHero } from "@/components/sections/SplitHero";
import { TextMarquee } from "@/components/sections/TextMarquee";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { experience, expect, family, faq, hero, join, marquee, page, stayClose, why } from "@/content/mamas-escape";
import { joinForm, siteConfig } from "@/lib/site";
import heroPhoto from "@/assets/photos/mother-daughter-park.jpg";
import experiencePhoto from "@/assets/photos/mother-daughter-embrace.jpg";
import communityPhoto from "@/assets/photos/women-community-circle.jpg";
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
  community: { icon: UsersThreeIcon, photo: communityPhoto, position: "object-[50%_40%]" },
  podcast: { icon: MicrophoneIcon, photo: podcastPhoto, position: "object-[65%_40%]" },
  newsletter: { icon: EnvelopeSimpleIcon, photo: newsletterPhoto, position: "object-[50%_25%]" },
};
const expectPhotos = [
  { src: friendsPhoto, alt: "Two friends smiling side by side", position: "object-[55%_30%]" },
  { src: kissingPhoto, alt: "A mother kissing her smiling baby on the cheek", position: "object-[50%_35%]" },
  { src: laughingPhoto, alt: "Three women laughing together outdoors", position: "object-[60%_20%]" },
];
const imageRing = "ring-1 ring-black-950/10 ring-inset";

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

      {/* Why we exist: the reference's dark statement, with the four experiences as tiles under it. */}
      <div className="frame-x section-y">
        <section id="inside" aria-labelledby="why-heading" className="surface-dark rounded-panel scroll-mt-24">
          <div className="container-page section-y">
            <SectionHeading id="why-heading" tag={why.tag} heading={why.heading} intro={why.body} align="center" className="[&_p]:max-w-[60ch]" />
            <p className="mx-auto mt-6 flex max-w-[60ch] flex-wrap items-baseline justify-center gap-x-3 text-center">
              <span className="font-heading text-h2">{why.stat.value}</span>
              <span>
                {why.stat.label} · Source: <a href={why.stat.source.href}>{why.stat.source.label}</a>
              </span>
            </p>
            <ul className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {experience.items.map((item) => {
                const Icon = experienceIcons[item.icon];
                return (
                  <li key={item.title} className="flex min-h-24 items-center gap-4 rounded-card bg-surface-card px-6 py-5">
                    <Icon aria-hidden size={24} className="shrink-0 text-accent" />
                    <span className="font-body text-h4 font-bold">{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>

      {/* What you will experience: portrait beside the four experiences in full. */}
      <Section aria-labelledby="experience-heading">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Image
              src={experiencePhoto}
              alt="A mother and daughter embracing, foreheads touching"
              placeholder="blur"
              sizes="(min-width: 64rem) 42vw, 100vw"
              className={`aspect-[3/4] w-full rounded-card object-cover object-[50%_30%] ${imageRing}`}
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading id="experience-heading" tag={experience.tag} heading={experience.heading} intro={experience.body} />
            <blockquote className="mt-6 max-w-[46ch]">
              <QuotesIcon aria-hidden size={24} weight="fill" className="text-accent" />
              <p className="mt-2 font-heading text-h4 italic text-ink">{experience.pledge}</p>
            </blockquote>
            <dl className="mt-12 flex flex-col gap-6">
              {experience.items.map((item) => (
                <div key={item.title} className="max-w-[52ch]">
                  <dt className="inline font-bold text-ink">{item.title}. </dt>
                  <dd className="inline">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <TextMarquee text={marquee} />

      {/* Where Mama's Escape sits: three photo cards, as the reference's feature slides. */}
      <Section aria-labelledby="family-heading">
        <SectionHeading id="family-heading" tag={family.tag} heading={family.heading} intro={family.intro} />
        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8">
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
                  <div className="surface-dark absolute right-2 bottom-2 left-2 rounded-card p-5">
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
        </ul>
      </Section>

      {/* What to expect: three portraits with one line each, as the reference's testimonial row. */}
      <Section
        id="what-to-expect"
        aria-labelledby="expect-heading"
        className="scroll-mt-24 bg-[linear-gradient(to_bottom,var(--color-surface),var(--color-surface-tinted))]"
      >
        <SectionHeading id="expect-heading" tag={expect.tag} heading={expect.heading} intro={expect.body} align="center" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-3 md:gap-6">
          {expectPhotos.map((photo, index) => (
            <li key={photo.alt} className={`relative aspect-[2/3] overflow-hidden rounded-panel ${imageRing}`}>
              <Image src={photo.src} alt={photo.alt} placeholder="blur" sizes="(min-width: 40rem) 33vw, 100vw" className={`absolute inset-0 size-full object-cover ${photo.position}`} />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(to_top,var(--color-black-950)_0%,color-mix(in_srgb,var(--color-black-950)_85%,transparent)_45%,transparent_100%)]" />
              <p className="absolute right-6 bottom-6 left-6 font-heading text-h4 italic text-black-50">{expect.moments[index]}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-caption text-text-secondary">{expect.note}</p>
        <div className="mx-auto mt-12 flex max-w-[46rem] gap-4 rounded-card bg-surface p-6">
          <IconChip>
            <HandHeartIcon aria-hidden size={24} />
          </IconChip>
          <div>
            <h3 className="font-body text-h4 font-bold text-ink">{expect.covenant.title}</h3>
            <p className="mt-2">{expect.covenant.body}</p>
          </div>
        </div>
      </Section>

      {/* How to join: the reference's "start with a conversation" split, photo beside a dark card. */}
      <Section id="join" aria-labelledby="join-heading" className="scroll-mt-24 bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface))]">
        <SectionHeading id="join-heading" tag={join.tag} heading={join.heading} intro={join.body} align="center" />
        <div className="mt-12 grid gap-2 lg:grid-cols-3 lg:gap-4">
          <div className={`relative min-h-72 overflow-hidden rounded-panel lg:col-span-2 ${imageRing}`}>
            <Image src={laughingPhoto} alt="" fill placeholder="blur" sizes="(min-width: 64rem) 66vw, 100vw" className="object-cover object-[60%_20%]" />
          </div>
          <div className="surface-dark rounded-panel p-6 lg:p-8">
            <h3 className="font-body text-h4 font-bold">{join.asksTitle}</h3>
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
              {join.pending}{" "}
              <Link href={siteConfig.newsletterUrl} className="font-semibold">
                Get the newsletter
              </Link>
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

      <Section id="newsletter" aria-labelledby="stay-heading" className="scroll-mt-24 bg-[linear-gradient(to_bottom,var(--color-surface),var(--color-surface-tinted))]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Tag>{stayClose.tag}</Tag>
          <h2 id="stay-heading" className="mt-2 text-h2">
            <Accent {...stayClose.heading} />
          </h2>
          <p className="mt-4 max-w-[46ch] text-lead">{stayClose.body}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <ButtonLink href={joinForm.href} size="large" arrow>
              {join.primary}
            </ButtonLink>
            {stayClose.actions.map((action) => {
              const isNewsletter = "newsletter" in action && action.newsletter;
              const href = isNewsletter ? siteConfig.newsletterUrl : action.href;
              return (
                <ButtonLink key={action.label} href={href} variant="secondary" size="large">
                  {action.label}
                  {"external" in action && action.external && <ArrowUpRightIcon aria-hidden size={16} />}
                </ButtonLink>
              );
            })}
          </div>
          <p className="mt-12 font-heading text-h3 italic text-ink">{stayClose.closing}</p>
        </div>
      </Section>
    </main>
  );
}
