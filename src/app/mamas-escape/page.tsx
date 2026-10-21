import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  BookOpenTextIcon,
  CalendarHeartIcon,
  EnvelopeSimpleIcon,
  HandHeartIcon,
  LightbulbIcon,
  MicrophoneIcon,
  ShieldCheckIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import { IconChip, Section, SectionHeading, Tag } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { about, experience, expect, family, hero, join, page, stayClose, why } from "@/content/mamas-escape";
import { joinForm, siteConfig } from "@/lib/site";
import heroPhoto from "@/assets/photos/two-friends-smiling.jpg";
import aboutPhoto from "@/assets/photos/mother-daughter-embrace.jpg";
import joinPhoto from "@/assets/photos/hero-mother-baby-golden-hour.jpg";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/mamas-escape/" },
};

const experienceIcons = { mentor: HandHeartIcon, expert: LightbulbIcon, resources: BookOpenTextIcon, events: CalendarHeartIcon };
const familyIcons = { community: UsersThreeIcon, podcast: MicrophoneIcon, newsletter: EnvelopeSimpleIcon };

export default function MamasEscapePage() {
  return (
    <main id="main">
      <PageHero
        photo={heroPhoto}
        alt=""
        position="object-[50%_32%]"
        tag={hero.tag}
        heading={hero.heading}
        intro={hero.intro}
        actions={
          <>
            <ButtonLink href={joinForm.href} variant="inverse" size="large" arrow>
              {hero.primary}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="inverse-outline" size="large">
              {hero.secondary.label}
            </ButtonLink>
          </>
        }
      />

      <Section aria-labelledby="about-heading">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHeading id="about-heading" tag={about.tag} heading={about.heading} intro={about.body} />
            <p className="mt-6 border-l-2 border-action pl-6 font-heading text-h4 italic text-ink">{about.pledge}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Image
              src={aboutPhoto}
              alt="A mother and daughter embracing, foreheads touching"
              placeholder="blur"
              sizes="(min-width: 64rem) 42vw, 100vw"
              className="aspect-[4/5] w-full rounded-card object-cover object-[50%_30%]"
            />
          </div>
        </div>
      </Section>

      <div className="frame-x">
        <section aria-labelledby="why-heading" className="surface-dark rounded-panel">
          <div className="container-page section-y grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <SectionHeading id="why-heading" tag={why.tag} heading={why.heading} intro={why.body} />
              <p className="mt-6 border-l-2 border-accent pl-6 font-heading text-h4 italic">{why.pledge}</p>
            </div>
            <div className="rounded-card border border-border-decoration p-6 lg:col-span-4 lg:col-start-9 lg:p-8">
              <p className="font-heading text-display">{why.stat.value}</p>
              <p className="mt-4">Black women in the UK are around {why.stat.label} than white women.</p>
              <p className="mt-2 text-caption text-text-secondary">
                Source: <a href={why.stat.source.href}>{why.stat.source.label}</a>
              </p>
            </div>
          </div>
        </section>
      </div>

      <Section aria-labelledby="experience-heading">
        <SectionHeading id="experience-heading" tag={experience.tag} heading={experience.heading} />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
          {experience.items.map((item) => {
            const Icon = experienceIcons[item.icon];
            return (
              <li key={item.title} className="flex gap-4 rounded-card border border-border-decoration bg-surface-card p-6">
                <IconChip>
                  <Icon aria-hidden size={24} />
                </IconChip>
                <div>
                  <h3 className="font-body text-h4 font-bold text-ink">{item.title}</h3>
                  <p className="mt-2">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="tinted" aria-labelledby="family-heading">
        <SectionHeading id="family-heading" tag={family.tag} heading={family.heading} intro={family.intro} />
        <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
          {family.tiles.map((tile) => {
            const Icon = familyIcons[tile.icon];
            const href = tile.title === "The Newsletter" ? siteConfig.newsletterUrl : tile.action.href;
            return (
              <li key={tile.title} className="flex flex-col gap-4 rounded-card bg-surface p-6">
                <IconChip>
                  <Icon aria-hidden size={24} />
                </IconChip>
                <h3 className="mt-2 font-body text-h4 font-bold text-ink">{tile.title}</h3>
                <p>{tile.text}</p>
                <Link href={href} className="mt-auto inline-flex min-h-12 items-center gap-1 pt-2 font-semibold">
                  {tile.action.label}
                  {"external" in tile.action && tile.action.external && (
                    <>
                      <ArrowUpRightIcon aria-hidden size={16} />
                      <span className="sr-only">(opens Spotify)</span>
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="what-to-expect" aria-labelledby="expect-heading" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeading id="expect-heading" tag={expect.tag} heading={expect.heading} intro={expect.body} />
          </div>
          <div className="flex gap-4 rounded-card bg-surface-tinted p-6 lg:col-span-4 lg:col-start-9 lg:self-center lg:p-8">
            <IconChip>
              <ShieldCheckIcon aria-hidden size={24} />
            </IconChip>
            <div>
              <h3 className="font-body text-h4 font-bold text-ink">{expect.covenant.title}</h3>
              <p className="mt-2">{expect.covenant.body}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="join" tone="tinted" aria-labelledby="join-heading" className="scroll-mt-24">
        <div className="grid overflow-hidden rounded-panel bg-surface lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 md:p-10 lg:p-16">
            <SectionHeading id="join-heading" tag={join.tag} heading={join.heading} intro={join.body} />
            <ul className="mt-6 flex flex-col gap-2">
              {join.asks.map((ask) => (
                <li key={ask} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 size-2 shrink-0 rounded-pill bg-action" />
                  {ask}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              {joinForm.open ? (
                <ButtonLink href={joinForm.href} size="large" arrow>
                  {join.primary}
                </ButtonLink>
              ) : (
                <p role="status" className="rounded-card border border-border-control bg-surface-card p-4">
                  {join.pending}{" "}
                  <Link href={siteConfig.newsletterUrl} className="font-semibold">
                    Get the newsletter
                  </Link>
                </p>
              )}
            </div>
          </div>
          <div className="relative min-h-72">
            <Image
              src={joinPhoto}
              alt="Two smiling women in golden evening light, one fixing the other's headwrap"
              fill
              placeholder="blur"
              sizes="(min-width: 64rem) 50vw, 100vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
        </div>
      </Section>

      <Section id="newsletter" aria-labelledby="stay-heading" className="scroll-mt-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Tag>{stayClose.tag}</Tag>
          <h2 id="stay-heading" className="mt-2 text-h2">
            <Accent {...stayClose.heading} />
          </h2>
          <p className="mt-4 max-w-[46ch] text-lead">{stayClose.body}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {stayClose.actions.map((action) => {
              const isNewsletter = "newsletter" in action && action.newsletter;
              const href = isNewsletter ? siteConfig.newsletterUrl : action.href;
              return (
                <ButtonLink key={action.label} href={href} variant={isNewsletter ? "primary" : "secondary"}>
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
