import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, BabyIcon, BookOpenTextIcon, CalendarDotsIcon } from "@phosphor-icons/react/ssr";
import { IconChip, Section, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { Accent } from "@/components/ui/Heading";
import { calculators, guides, resources } from "@/content/resources";

export const metadata: Metadata = {
  title: resources.title,
  description: resources.description,
  alternates: { canonical: "/resources/" },
};

const linkClasses = "mt-4 inline-flex min-h-12 items-center gap-2 font-semibold after:absolute after:inset-0";

/** The Resources hub: the two free guides and the two calculators, each as a card. */
export default function ResourcesPage() {
  return (
    <main id="main">
      <Section aria-labelledby="page-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface)_32rem)]">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag>{resources.tag}</Tag>
          <h1 id="page-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent {...resources.heading} />
          </h1>
          <p className="mt-4 max-w-[46ch] text-lead">{resources.intro}</p>
        </div>

        <h2 id="guides-heading" className="mt-16 text-h3">
          {resources.guidesHeading}
        </h2>
        <ul aria-labelledby="guides-heading" className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-6">
          {guides.map((guide) => (
            <li key={guide.slug} className="group relative flex flex-col rounded-card border border-border-decoration bg-surface-card p-6">
              <IconChip>
                <BookOpenTextIcon aria-hidden size={24} />
              </IconChip>
              <h3 className="mt-4 font-body text-h4 font-bold text-ink">{guide.title}</h3>
              <p className="mt-2 text-text">{guide.intro}</p>
              <Link href={`/${guide.slug}/`} className={linkClasses}>
                Open the guide
                <ArrowRightIcon aria-hidden size={16} weight="bold" className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </li>
          ))}
        </ul>

        <h2 id="calculators-heading" className="mt-16 text-h3">
          {resources.calculatorsHeading}
        </h2>
        <ul aria-labelledby="calculators-heading" className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-6">
          {[
            { calculator: calculators.ovulation, Icon: CalendarDotsIcon },
            { calculator: calculators.pregnancy, Icon: BabyIcon },
          ].map(({ calculator, Icon }) => (
            <li key={calculator.slug} className="group relative flex flex-col rounded-card border border-border-decoration bg-surface-card p-6">
              <IconChip>
                <Icon aria-hidden size={24} />
              </IconChip>
              <h3 className="mt-4 font-body text-h4 font-bold text-ink">{calculator.title}</h3>
              <p className="mt-2 text-text">{calculator.intro}</p>
              <Link href={`/${calculator.slug}/`} className={linkClasses}>
                {resources.open}
                <ArrowRightIcon aria-hidden size={16} weight="bold" className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-2 text-caption text-text-secondary">
          <ArrowUpRightIcon aria-hidden size={14} />
          The guides are PDF files; the calculators give estimates only.
        </p>
      </Section>

      <ClosingInvite
        id="resources-closing"
        heading={resources.closing.heading}
        body={resources.closing.body}
        primary={resources.closing.primary}
        secondary={resources.closing.secondary}
      />
    </main>
  );
}
