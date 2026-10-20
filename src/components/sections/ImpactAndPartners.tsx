import Link from "next/link";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, Section } from "@/components/layout/Section";
import { Accent } from "@/components/ui/Heading";
import { impact, partners } from "@/content/home";

export function Impact() {
  return (
    <Section aria-labelledby="impact-heading">
      <Eyebrow>{impact.eyebrow}</Eyebrow>
      <h2 id="impact-heading" className="mt-2 max-w-[20ch] text-h2 tracking-tight">
        <Accent {...impact.heading} />
      </h2>
      <ul className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-8">
        {impact.stats.map((stat) => (
          <li key={stat.value} className="flex min-h-64 flex-col justify-between gap-8 rounded-card bg-surface-card p-6 lg:p-8">
            <p className="font-heading text-display leading-tight text-action">{stat.value}</p>
            <div>
              <p>{stat.label}</p>
              {"source" in stat && stat.source && (
                <p className="mt-2 text-caption text-text-secondary">
                  Source: <a href={stat.source.href}>{stat.source.label}</a>
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Partner names as tiles until approved logos and permissions arrive. */
export function Partners() {
  return (
    <Section tone="warm" aria-labelledby="partners-heading">
      <div className="max-w-reading">
        <h2 id="partners-heading" className="text-h2 tracking-tight">
          <Accent {...partners.heading} />
        </h2>
        <p className="mt-4 text-lead">{partners.intro}</p>
      </div>
      <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
            className="flex h-full min-h-24 items-center justify-center gap-2 rounded-card border-2 border-dashed border-action px-4 py-6 text-center font-semibold no-underline"
          >
            <PlusIcon aria-hidden size={20} />
            {partners.invite.label}
          </Link>
        </li>
      </ul>
    </Section>
  );
}
