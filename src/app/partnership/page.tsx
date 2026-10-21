import type { Metadata } from "next";
import Image from "next/image";
import { ChartBarIcon, CheckIcon, GlobeHemisphereWestIcon, MegaphoneIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { IconChip, Section, SectionHeading } from "@/components/layout/Section";
import { ClosingPanel } from "@/components/sections/ClosingPanel";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { partners as partnerNames } from "@/content/home";
import { closing, hero, offer, page, partners, ways } from "@/content/partnership";
import heroPhoto from "@/assets/photos/two-friends-smiling.jpg";
import offerPhoto from "@/assets/photos/women-community-circle.jpg";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/partnership/" },
};

const icons = { insight: UsersThreeIcon, culture: GlobeHemisphereWestIcon, data: ChartBarIcon, advocates: MegaphoneIcon };

export default function PartnershipPage() {
  return (
    <main id="main">
      <PageHero
        photo={heroPhoto}
        alt=""
        position="object-[50%_30%]"
        tag={hero.tag}
        heading={hero.heading}
        intro={hero.intro}
        actions={
          <>
            <ButtonLink href={hero.primary.href} variant="inverse" size="large" arrow>
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="inverse-outline" size="large">
              {hero.secondary.label}
            </ButtonLink>
          </>
        }
      />

      <Section id="offer" aria-labelledby="offer-heading" className="scroll-mt-24">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading id="offer-heading" tag={offer.tag} heading={offer.heading} intro={offer.body} />
            <Image
              src={offerPhoto}
              alt="Three women in bright African-print clothing chatting over tea"
              placeholder="blur"
              sizes="(min-width: 64rem) 42vw, 100vw"
              className="mt-12 aspect-[3/2] w-full rounded-card object-cover"
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:gap-6">
            {offer.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.title} className="flex flex-col rounded-card border border-border-decoration bg-surface-card p-6">
                  <IconChip>
                    <Icon aria-hidden size={24} />
                  </IconChip>
                  <h3 className="mt-6 font-body text-h4 font-bold text-ink">{item.title}</h3>
                  <p className="mt-2">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section tone="tinted" aria-labelledby="ways-heading">
        <SectionHeading id="ways-heading" tag={ways.tag} heading={ways.heading} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ways.items.map((way) => (
            <li key={way} className="flex items-center gap-3 rounded-card bg-surface p-4">
              <CheckIcon aria-hidden size={20} weight="bold" className="shrink-0 text-action" />
              <span className="font-semibold text-ink">{way}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="partners-heading">
        <SectionHeading id="partners-heading" tag={partners.tag} heading={partners.heading} intro={partners.intro} />
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {partnerNames.names.map((name) => (
            <li key={name} className="flex min-h-24 items-center justify-center rounded-card bg-surface-card px-4 py-6 text-center font-semibold text-ink">
              {name}
            </li>
          ))}
        </ul>
      </Section>

      <ClosingPanel id="closing-heading" heading={closing.heading} body={closing.body} primary={closing.primary} secondary={closing.secondary} />
    </main>
  );
}
