import Link from "next/link";
import { ArrowRightIcon, HandHeartIcon, HandshakeIcon, PlantIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { IconChip, Section, SectionHeading } from "@/components/layout/Section";
import { coreAreas } from "@/content/home";

const icons = {
  community: UsersThreeIcon,
  partnership: HandshakeIcon,
  services: HandHeartIcon,
  growth: PlantIcon,
};

/**
 * The four core areas from the client brief, as the reference's four-card row:
 * icon chip, serif title, one-line summary, arrow circle.
 */
export function CoreAreas() {
  return (
    <Section id="how-we-help" aria-labelledby="how-we-help-heading" className="scroll-mt-24">
      <SectionHeading id="how-we-help-heading" tag={coreAreas.eyebrow} heading={coreAreas.heading} intro={coreAreas.intro} />
      <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
        {coreAreas.items.map((area) => {
          const Icon = icons[area.icon];
          return (
            <li key={area.href} className="min-w-0">
              <article className="group relative flex h-full flex-col rounded-card border border-border-decoration bg-surface-card p-6 transition-colors duration-150 hover:border-action">
                <div className="flex items-start justify-between">
                  <IconChip>
                    <Icon aria-hidden size={24} />
                  </IconChip>
                  <span aria-hidden className="font-heading text-h4 text-text-secondary">
                    {area.number}
                  </span>
                </div>
                <h3 className="mt-6 text-h3">
                  <Link href={area.href} className="text-ink no-underline after:absolute after:inset-0 after:rounded-card">
                    {area.label}
                  </Link>
                </h3>
                <p className="mt-2">{area.summary}</p>
                <p aria-hidden className="mt-auto flex items-center justify-between pt-6 font-semibold text-action">
                  Find out more
                  <span className="inline-flex size-8 items-center justify-center rounded-pill bg-accent text-on-accent transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none">
                    <ArrowRightIcon size={16} weight="bold" />
                  </span>
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
