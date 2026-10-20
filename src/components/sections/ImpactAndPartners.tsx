import Link from "next/link";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { Section, SectionHeading } from "@/components/layout/Section";
import { impact, partners } from "@/content/home";

/** Impact numbers as a ruled row: large serif figures over short labels, like the reference. */
export function Impact() {
  return (
    <Section aria-labelledby="impact-heading">
      <SectionHeading id="impact-heading" tag={impact.eyebrow} heading={impact.heading} />
      <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
        {impact.stats.map((stat) => (
          <li key={stat.value} className="flex flex-col gap-4 border-t-2 border-black-200 pt-6">
            <p className="font-heading text-display leading-tight text-action">{stat.value}</p>
            <p className="max-w-[32ch]">{stat.label}</p>
            {"source" in stat && stat.source && (
              <p className="text-caption text-text-secondary">
                Source: <a href={stat.source.href}>{stat.source.label}</a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Partner names as tiles until approved logos and permissions arrive. */
export function Partners() {
  return (
    <Section tone="tinted" aria-labelledby="partners-heading">
      <SectionHeading id="partners-heading" tag="Partners" heading={partners.heading} intro={partners.intro} />
      <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {partners.names.map((name) => (
          <li
            key={name}
            className="flex min-h-24 items-center justify-center rounded-card bg-surface px-4 py-6 text-center font-semibold text-ink"
          >
            {name}
          </li>
        ))}
        <li>
          <Link
            href={partners.invite.href}
            className="flex h-full min-h-24 items-center justify-center gap-2 rounded-card border-2 border-dashed border-action px-4 py-6 text-center font-semibold no-underline hover:bg-surface"
          >
            <PlusIcon aria-hidden size={20} />
            {partners.invite.label}
          </Link>
        </li>
      </ul>
    </Section>
  );
}
