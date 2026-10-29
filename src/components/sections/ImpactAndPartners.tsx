import Link from "next/link";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { Section, SectionHeading } from "@/components/layout/Section";
import { PartnerTile } from "@/components/content/PartnerTile";
import { impact, partners } from "@/content/home";

/**
 * As the reference's "At a glance" section: tag, a wide statement heading, then stat cards,
 * on a soft gradient from the canvas into the tinted surface.
 */
export function Impact() {
  return (
    <Section
      aria-labelledby="impact-heading"
      className="bg-[linear-gradient(to_bottom,var(--color-surface),var(--color-surface-tinted))]"
    >
      <SectionHeading id="impact-heading" tag={impact.eyebrow} heading={impact.heading} className="[&_h2]:max-w-[30ch]" />
      <ul data-reveal="stagger" className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
        {impact.stats.map((stat) => (
          <li key={stat.value} className="flex min-h-64 flex-col justify-between gap-8 rounded-panel bg-surface-card p-7">
            <p className="font-heading text-display text-ink">{stat.value}</p>
            <div>
              <p className="max-w-[32ch]">{stat.label}</p>
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

/** Partner tiles: logos where held, names otherwise; the gradient fades back to the canvas. */
export function Partners() {
  return (
    <Section
      aria-labelledby="partners-heading"
      className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface))]"
    >
      <SectionHeading id="partners-heading" tag="Partners" heading={partners.heading} intro={partners.intro} />
      <ul data-reveal="stagger" className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {partners.items.map((partner) => (
          <PartnerTile key={partner.slug} partner={partner} />
        ))}
        <li>
          <Link
            href={partners.invite.href}
            className="flex h-full min-h-24 items-center justify-center gap-2 rounded-card border-2 border-dashed border-action px-4 py-6 text-center font-semibold no-underline hover:bg-surface-card md:min-h-28"
          >
            <PlusIcon aria-hidden size={20} />
            {partners.invite.label}
          </Link>
        </li>
      </ul>
    </Section>
  );
}
