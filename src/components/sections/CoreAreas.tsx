import Link from "next/link";
import { ArrowRightIcon, ChalkboardTeacherIcon, HandshakeIcon, PlantIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, Section } from "@/components/layout/Section";
import { Accent } from "@/components/ui/Heading";
import { coreAreas } from "@/content/home";

const icons = {
  community: UsersThreeIcon,
  partnership: HandshakeIcon,
  training: ChalkboardTeacherIcon,
  growth: PlantIcon,
};

/** The four core areas from the client brief: the spine of the homepage and navigation. */
export function CoreAreas() {
  return (
    <Section id="how-we-help" aria-labelledby="how-we-help-heading" className="scroll-mt-24">
      <div className="max-w-reading">
        <Eyebrow>{coreAreas.eyebrow}</Eyebrow>
        <h2 id="how-we-help-heading" className="mt-2 text-h2 tracking-tight">
          <Accent {...coreAreas.heading} />
        </h2>
        <p className="mt-4 text-lead">{coreAreas.intro}</p>
      </div>
      <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
        {coreAreas.items.map((area) => {
          const Icon = icons[area.icon];
          return (
            <li key={area.href} className="min-w-0">
              <article className="group relative flex h-full flex-col gap-4 rounded-card border border-border-decoration bg-surface-card p-6 transition-colors duration-150 hover:border-action">
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-surface-tinted text-action">
                    <Icon aria-hidden size={24} />
                  </span>
                  <span aria-hidden className="font-heading text-h3 text-text-secondary">
                    {area.number}
                  </span>
                </div>
                <h3 className="mt-4 font-body text-h4 font-bold text-ink">
                  <Link href={area.href} className="text-ink no-underline after:absolute after:inset-0 after:rounded-card">
                    {area.label}
                  </Link>
                </h3>
                <p>{area.summary}</p>
                <p aria-hidden className="mt-auto flex items-center gap-2 pt-4 font-semibold text-action">
                  Find out more
                  <ArrowRightIcon size={20} className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
