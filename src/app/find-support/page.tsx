import type { Metadata } from "next";
import { ArrowUpRightIcon, ClockIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { Section } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { PageHeader } from "@/components/sections/PageHeader";
import { findSupport, type SupportEntry } from "@/content/find-support";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: findSupport.title,
  description: findSupport.description,
  alternates: { canonical: "/find-support/" },
};

/** One organisation: name, what they help with, the line to call, the hours, the website. */
function Entry({ entry, tone = "card" }: { entry: SupportEntry; tone?: "card" | "urgent" }) {
  const external = entry.phoneHref?.startsWith("https://");
  return (
    <li className={`flex flex-col rounded-card p-6 ${tone === "urgent" ? "bg-surface" : "border border-border-decoration bg-surface-card"}`}>
      <h3 className="font-body text-title font-semibold text-ink">{entry.name}</h3>
      <p className="mt-2 text-text">{entry.helps}</p>
      <dl className="mt-4 flex flex-col gap-2">
        {entry.phone && entry.phoneHref && (
          <div className="flex items-center gap-2">
            <dt className="sr-only">{findSupport.labels.call}</dt>
            <PhoneIcon aria-hidden size={20} className="shrink-0 text-accent" />
            <dd>
              <a href={entry.phoneHref} className="inline-flex min-h-12 items-center font-heading text-h4 text-ink no-underline hover:underline">
                {entry.phone}
                {external && <span className="sr-only"> (opens WhatsApp)</span>}
              </a>
            </dd>
          </div>
        )}
        {entry.hours && (
          <div className="flex items-center gap-2 text-caption text-text-secondary">
            <dt className="sr-only">{findSupport.labels.hours}</dt>
            <ClockIcon aria-hidden size={16} className="shrink-0" />
            <dd>{entry.hours}</dd>
          </div>
        )}
      </dl>
      <a href={entry.url} className="mt-auto inline-flex min-h-12 items-center gap-2 pt-4 font-semibold">
        {findSupport.labels.website}
        <ArrowUpRightIcon aria-hidden size={16} weight="bold" />
        <span className="sr-only">({entry.name}, opens in a new site)</span>
      </a>
    </li>
  );
}

/**
 * Find Support: the help-right-now lines in a warm panel, then trusted organisations by need, each
 * with the number to call, the hours and the website. Details are checked against each
 * organisation's own site; the page still asks readers to confirm before relying on them.
 */
export default function FindSupportPage() {
  return (
    <main id="main">
      <PageHeader tag={findSupport.tag} heading={findSupport.heading} intro={findSupport.intro}>

        <section aria-labelledby="urgent-heading" className="mt-12 rounded-panel bg-surface-warm p-6 md:p-8">
          <h2 id="urgent-heading" className="text-h2">
            {findSupport.urgent.heading}
          </h2>
          <p className="mt-2 text-lead">{findSupport.urgent.intro}</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {findSupport.urgent.entries.map((entry) => (
              <Entry key={entry.name} entry={entry} tone="urgent" />
            ))}
          </ul>
        </section>

        <nav aria-label="Support by need" className="mt-12">
          <ul className="flex flex-wrap gap-2">
            {findSupport.groups.map((group) => (
              <li key={group.id}>
                <a href={`#${group.id}`} className="inline-flex min-h-12 items-center rounded-pill border border-border-decoration bg-surface-card px-4 font-semibold text-ink no-underline hover:border-action">
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {findSupport.groups.map((group) => (
        <Section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-24 pt-0">
          <h2 id={`${group.id}-heading`} className="text-h2">
            {group.title}
          </h2>
          <p className="mt-2 max-w-[46ch] text-lead">{group.intro}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {group.entries.map((entry) => (
              <Entry key={entry.name} entry={entry} />
            ))}
          </ul>
        </Section>
      ))}

      <Section className="pt-0">
        <p className="max-w-[65ch] text-text-secondary">{findSupport.disclaimer}</p>
        <p className="mt-4 max-w-[65ch] text-text-secondary">
          {findSupport.suggest.lead} <a href={`mailto:${siteConfig.email}`}>{findSupport.suggest.label}</a>.
        </p>
      </Section>

      <ClosingInvite
        id="support-closing"
        heading={findSupport.closing.heading}
        body={findSupport.closing.body}
        primary={findSupport.closing.primary}
        secondary={findSupport.closing.secondary}
      />
    </main>
  );
}
