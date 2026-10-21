import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ClipboardTextIcon,
  FlowerLotusIcon,
  SunHorizonIcon,
} from "@phosphor-icons/react/ssr";
import { IconChip, Section, SectionHeading, Tag } from "@/components/layout/Section";
import { ClosingPanel } from "@/components/sections/ClosingPanel";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { closing, hero, howItWorks, intro, page, programmes } from "@/content/work-with-us";
import heroPhoto from "@/assets/photos/mother-baby-smiling.jpg";
import introPhoto from "@/assets/photos/mother-daughter-embrace.jpg";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/work-with-us/" },
};

const icons = { calm: SunHorizonIcon, postpartum: FlowerLotusIcon, assessment: ClipboardTextIcon };

export default function WorkWithUsPage() {
  return (
    <main id="main">
      <PageHero
        photo={heroPhoto}
        alt=""
        position="object-[65%_40%]"
        tag={hero.tag}
        heading={hero.heading}
        intro={hero.intro}
        actions={
          <>
            <ButtonLink href={hero.primary.href} variant="inverse" size="large" arrow>
              {hero.primary.label}
              <span className="sr-only">(opens Calendly)</span>
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="inverse-outline" size="large">
              {hero.secondary.label}
            </ButtonLink>
          </>
        }
      />

      <Section aria-labelledby="intro-heading">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHeading id="intro-heading" tag={intro.tag} heading={intro.heading} intro={intro.body} />
            <p className="mt-8 flex items-baseline gap-3 border-t-2 border-black-200 pt-6">
              <span className="font-heading text-h1 text-ink">{intro.proof.value}</span>
              <span>{intro.proof.label}</span>
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Image
              src={introPhoto}
              alt="A mother and daughter embracing, foreheads touching"
              placeholder="blur"
              sizes="(min-width: 64rem) 42vw, 100vw"
              className="aspect-[4/5] w-full rounded-card object-cover object-[50%_30%]"
            />
          </div>
        </div>
      </Section>

      <Section id="programmes" tone="tinted" aria-labelledby="programmes-heading" className="scroll-mt-24">
        <SectionHeading id="programmes-heading" tag={programmes.tag} heading={programmes.heading} />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {programmes.items.map((item) => {
            const Icon = icons[item.icon];
            const list = "phases" in item ? item.phases : "areas" in item ? item.areas : null;
            return (
              <li key={item.id} id={item.id} className="flex flex-col rounded-panel bg-surface p-6 scroll-mt-24 lg:p-8">
                <IconChip>
                  <Icon aria-hidden size={24} />
                </IconChip>
                <p className="mt-6 text-caption font-semibold tracking-wide text-text-secondary uppercase">{item.strap}</p>
                <h3 className="mt-2 text-h3">{item.title}</h3>
                <p className="mt-4">{item.summary}</p>
                {list && (
                  <ul className="mt-6 flex flex-col gap-2">
                    {list.map((entry) => (
                      <li key={entry} className="flex items-start gap-3">
                        <CheckIcon aria-hidden size={20} weight="bold" className="mt-1 shrink-0 text-action" />
                        {entry}
                      </li>
                    ))}
                  </ul>
                )}
                {"outcomes" in item && (
                  <div className="mt-6">
                    <p className="font-bold text-ink">You&apos;ll walk away with:</p>
                    <ul className="mt-2 flex flex-col gap-2">
                      {item.outcomes.map((entry) => (
                        <li key={entry} className="flex items-start gap-3">
                          <span aria-hidden className="mt-2 size-2 shrink-0 rounded-pill bg-action" />
                          {entry}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {"options" in item && (
                  <ul id="tela-options" className="mt-6 flex flex-col gap-2 scroll-mt-24">
                    {item.options.map((option) => (
                      <li key={option.href}>
                        <a href={option.href} className="inline-flex min-h-12 items-center gap-1 font-semibold">
                          {option.label}
                          <ArrowUpRightIcon aria-hidden size={16} />
                          <span className="sr-only">(opens a Google Form)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-8">
                  <ButtonLink href={item.action.href} arrow>
                    {item.action.label}
                    {"external" in item.action && item.action.external && <span className="sr-only">(opens Calendly)</span>}
                  </ButtonLink>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section aria-labelledby="how-heading">
        <SectionHeading id="how-heading" tag={howItWorks.tag} heading={howItWorks.heading} />
        <ol className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-4 border-t-2 border-black-200 pt-6">
              <Tag>Step {index + 1}</Tag>
              <h3 className="font-body text-h4 font-bold text-ink">{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ClosingPanel id="closing-heading" heading={closing.heading} primary={closing.primary} secondary={closing.secondary} />
    </main>
  );
}
