import type { Metadata } from "next";
import Image from "next/image";
import { QuotesIcon } from "@phosphor-icons/react/ssr";
import { Section, SectionHeading, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { founder } from "@/content/about";
import { joinForm } from "@/lib/site";

export const metadata: Metadata = {
  title: founder.title,
  description: founder.description,
  alternates: { canonical: "/meet-bokun/" },
  openGraph: { images: [{ url: founder.hero.portrait.src, width: founder.hero.portrait.width, height: founder.hero.portrait.height, alt: founder.hero.portrait.alt }] },
};

/**
 * Meet Bokun: her own portrait from the live site beside the question at the heart of her story,
 * then the founder letter in her words, her vision and voice, and her biography.
 */
export default function MeetBokunPage() {
  const { hero, letter, pillars, bio, closing } = founder;
  return (
    <main id="main">
      {/* Founder hero: portrait left, copy right, pulled up under the floating header like the other heroes. */}
      <section aria-labelledby="page-heading" className="frame-x -mt-(--header-offset) pt-2 md:pt-4">
        <div className="grid gap-2 lg:grid-cols-2 lg:gap-4">
          <div className="relative min-h-[30rem] overflow-hidden rounded-panel ring-1 ring-black-950/10 ring-inset md:min-h-[36rem] lg:h-[calc(100svh-2rem)] lg:min-h-[44rem] lg:max-h-[56rem]">
            <Image src={hero.portrait.src} alt={hero.portrait.alt} fill priority sizes="(min-width: 64rem) 50vw, 100vw" className="object-cover object-[50%_10%]" />
          </div>
          <div className="flex flex-col items-start justify-center px-6 pt-8 pb-12 lg:px-16 lg:pt-32 lg:pb-16">
            <Tag data-enter>{hero.tag}</Tag>
            <h1 id="page-heading" data-enter className="mt-4 max-w-[16ch] text-h1 tracking-tight [--enter-step:1]">
              <Accent {...hero.heading} />
            </h1>
            <p data-enter className="mt-4 max-w-[40ch] text-lead [--enter-step:2]">
              {hero.intro}
            </p>
            <div data-enter className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row [--enter-step:3]">
              <ButtonLink href={hero.primary.href} size="large" arrow>
                {hero.primary.label}
              </ButtonLink>
              <ButtonLink href={joinForm.href} variant="secondary" size="large">
                {hero.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* The letter, in a reading column; the short lines she set apart are set apart here too. */}
      <Section id="story" aria-labelledby="letter-heading" className="scroll-mt-24">
        <div className="mx-auto max-w-reading">
          <SectionHeading id="letter-heading" tag={letter.tag} heading={letter.heading} />
          <div data-reveal="fade" className="mt-8 flex flex-col gap-5">
            {letter.paragraphs.map((paragraph) =>
              paragraph.emphasis ? (
                <p key={paragraph.text} className="font-heading text-h4 italic text-ink">
                  {paragraph.text}
                </p>
              ) : (
                <p key={paragraph.text} className="text-reading">
                  {paragraph.text}
                </p>
              ),
            )}
          </div>
          <p data-reveal="fade" className="mt-8 flex flex-col gap-1">
            <span className="font-heading text-h4 italic text-ink">{letter.signoff.name}</span>
            <span className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{letter.signoff.role}</span>
          </p>
        </div>
      </Section>

      {/* Vision and voice as two cards on the tint. */}
      <Section aria-labelledby="pillars-heading" tone="tinted">
        <SectionHeading id="pillars-heading" tag={pillars.tag} heading={pillars.heading} align="center" />
        <ul data-reveal="stagger" className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
          {pillars.items.map((item) => (
            <li key={item.title} className="flex flex-col rounded-card bg-surface p-6 lg:p-8">
              <QuotesIcon aria-hidden size={24} weight="fill" className="text-accent" />
              <h3 className="mt-4 font-heading text-h4 text-ink">{item.title}</h3>
              <p className="mt-2">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Biography beside the heading; credentials as the live site states them. */}
      <Section aria-labelledby="bio-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading id="bio-heading" tag={bio.tag} heading={bio.heading} intro={bio.intro} />
          </div>
          <div data-reveal="fade" className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7 lg:pt-10">
            {bio.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="max-w-[56ch]">
                {paragraph}
              </p>
            ))}
            <p className="mt-2 text-caption font-semibold tracking-wide text-text-secondary uppercase">{bio.role}</p>
          </div>
        </div>
      </Section>

      <ClosingInvite id="founder-closing" heading={closing.heading} body={closing.body} primary={closing.primary} secondary={closing.secondary} />
    </main>
  );
}
