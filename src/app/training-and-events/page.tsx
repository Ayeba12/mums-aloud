import type { Metadata } from "next";
import Image from "next/image";
import { BabyIcon, CheckIcon, HeartbeatIcon, MicrophoneStageIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { IconChip, Section, SectionHeading } from "@/components/layout/Section";
import { ClosingPanel } from "@/components/sections/ClosingPanel";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { closing, events, hero, page, professionals, strands } from "@/content/training-events";
import { siteConfig } from "@/lib/site";
import heroPhoto from "@/assets/photos/women-community-circle.jpg";
import professionalsPhoto from "@/assets/photos/two-friends-smiling.jpg";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/training-and-events/" },
};

const icons = { wellbeing: HeartbeatIcon, parenting: BabyIcon, events: UsersThreeIcon, summit: MicrophoneStageIcon };

export default function TrainingAndEventsPage() {
  return (
    <main id="main">
      <PageHero
        photo={heroPhoto}
        alt=""
        position="object-[50%_35%]"
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

      <Section aria-labelledby="strands-heading">
        <SectionHeading id="strands-heading" tag={strands.tag} heading={strands.heading} />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {strands.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="flex flex-col rounded-card border border-border-decoration bg-surface-card p-6">
                <IconChip>
                  <Icon aria-hidden size={24} />
                </IconChip>
                <h3 className="mt-6 text-h3">{item.title}</h3>
                <p className="mt-2">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="events" tone="tinted" aria-labelledby="events-heading" className="scroll-mt-24">
        <SectionHeading id="events-heading" tag={events.tag} heading={events.heading} />
        <div className="mt-12 rounded-panel bg-surface p-6 lg:p-8">
          <p role="status">{events.empty}</p>
          <div className="mt-6">
            <ButtonLink href={siteConfig.newsletterUrl} variant="secondary">
              Get the newsletter
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="professionals-heading">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Image
              src={professionalsPhoto}
              alt="Two friends smiling side by side"
              placeholder="blur"
              sizes="(min-width: 64rem) 42vw, 100vw"
              className="aspect-[4/5] w-full rounded-card object-cover object-[55%_30%]"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading
              id="professionals-heading"
              tag={professionals.tag}
              heading={professionals.heading}
              intro={professionals.body}
              action={<ButtonLink href={professionals.action.href} arrow>{professionals.action.label}</ButtonLink>}
            />
            <ul className="mt-8 flex flex-col gap-2">
              {professionals.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckIcon aria-hidden size={20} weight="bold" className="mt-1 shrink-0 text-action" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ClosingPanel
        id="closing-heading"
        heading={closing.heading}
        primary={{ label: closing.primary.label, href: siteConfig.newsletterUrl }}
        secondary={closing.secondary}
      />
    </main>
  );
}
