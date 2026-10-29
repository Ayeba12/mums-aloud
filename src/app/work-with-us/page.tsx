import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRightIcon, BookOpenTextIcon, CheckIcon, ClipboardTextIcon, FlowerLotusIcon, PhoneCallIcon, SunHorizonIcon } from "@phosphor-icons/react/ssr";
import { IconChip, Section, SectionHeading, Tag } from "@/components/layout/Section";
import { ClosingPanel } from "@/components/sections/ClosingPanel";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { founder } from "@/content/about";
import { closing, hero, page, services } from "@/content/work-with-us";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/work-with-us/" },
};

const icons = { call: PhoneCallIcon, calm: SunHorizonIcon, assessment: ClipboardTextIcon, postpartum: FlowerLotusIcon, resources: BookOpenTextIcon };

/**
 * Work With Bokun (at the live `/work-with-us/` URL), to the owner's outline (10 Aug 2026):
 * Bokun's own portrait beside the note that community support stays free, her five personalised
 * services as cards (each a section the legacy programme URLs land on), and the berry closing.
 */
export default function WorkWithBokunPage() {
  const { portrait } = founder.hero;
  return (
    <main id="main">
      {/* Hero: Bokun's portrait left, copy right, pulled up under the floating header like the other heroes. */}
      <section aria-labelledby="page-heading" className="frame-x -mt-(--header-offset) pt-2 md:pt-4">
        <div className="grid gap-2 lg:grid-cols-2 lg:gap-4">
          <div className="relative min-h-[30rem] overflow-hidden rounded-panel ring-1 ring-black-950/10 ring-inset md:min-h-[36rem] lg:h-[calc(100svh-2rem)] lg:min-h-[44rem] lg:max-h-[56rem]">
            <Image src={portrait.src} alt={portrait.alt} fill priority sizes="(min-width: 64rem) 50vw, 100vw" className="object-cover object-[50%_10%]" />
          </div>
          <div className="flex flex-col items-start justify-center px-6 pt-8 pb-12 lg:px-16 lg:pt-32 lg:pb-16">
            <Tag data-enter>{hero.tag}</Tag>
            <h1 id="page-heading" data-enter className="mt-4 max-w-[16ch] text-h1 tracking-tight [--enter-step:1]">
              <Accent {...hero.heading} />
            </h1>
            <p data-enter className="mt-4 max-w-[44ch] text-lead [--enter-step:2]">
              {hero.intro}
            </p>
            <div data-enter className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row [--enter-step:3]">
              <ButtonLink href={hero.primary.href} size="large" arrow>
                {hero.primary.label}
                <span className="sr-only">(opens Calendly)</span>
              </ButtonLink>
              <ButtonLink href={hero.secondary.href} variant="secondary" size="large">
                {hero.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* The five services as cards on the tint; each card is the section its legacy URL redirects to. */}
      <Section tone="tinted" aria-labelledby="services-heading">
        <SectionHeading id="services-heading" tag={services.tag} heading={services.heading} />
        <ul data-reveal="stagger" className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-6">
          {services.items.map((item, index) => {
            const Icon = icons[item.icon];
            const external = Boolean(item.action.external);
            const last = index === services.items.length - 1 && services.items.length % 2 === 1;
            return (
              <li key={item.id} id={item.id} className={`flex flex-col rounded-panel bg-surface p-6 scroll-mt-24 lg:p-8 ${last ? "md:col-span-2" : ""}`}>
                <IconChip>
                  <Icon aria-hidden size={24} />
                </IconChip>
                <h3 className="mt-6 text-h3">{item.title}</h3>
                {item.strap && <p className="mt-2 font-semibold text-text-secondary">{item.strap}</p>}
                <p className="mt-3 max-w-[46ch]">{item.summary}</p>
                <ul className="mt-6 flex flex-col gap-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckIcon aria-hidden size={20} weight="bold" className="mt-1 shrink-0 text-action" />
                      {point}
                    </li>
                  ))}
                </ul>
                {item.options && (
                  <div className="mt-6 border-t border-border-decoration pt-6">
                    <p className="font-bold text-ink">{item.optionsLabel}</p>
                    <ul className="mt-2 flex flex-col">
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
                  </div>
                )}
                <div className="mt-auto pt-8">
                  <ButtonLink href={item.action.href} variant={external ? "primary" : "secondary"} arrow={external}>
                    {item.action.label}
                    {external && <span className="sr-only">(opens Calendly)</span>}
                  </ButtonLink>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <ClosingPanel id="closing-heading" heading={closing.heading} body={closing.body} primary={closing.primary} secondary={closing.secondary} />
    </main>
  );
}
