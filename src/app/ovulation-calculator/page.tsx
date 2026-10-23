import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { OvulationCalculator } from "@/components/forms/OvulationCalculator";
import { Section, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { Accent } from "@/components/ui/Heading";
import { calculators, resources } from "@/content/resources";

const copy = calculators.ovulation;

export const metadata: Metadata = {
  title: copy.title,
  description: copy.intro,
  alternates: { canonical: `/${copy.slug}/` },
};

export default function OvulationCalculatorPage() {
  return (
    <main id="main">
      <Section aria-labelledby="page-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface)_32rem)]">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag>{resources.tag}</Tag>
          <h1 id="page-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent {...copy.heading} />
          </h1>
          <p className="mt-4 max-w-[46ch] text-lead">{copy.intro}</p>
        </div>
        <div className="mx-auto mt-12 max-w-[52rem] rounded-panel bg-surface-card p-6 lg:p-8">
          <OvulationCalculator />
        </div>
        <p className="mx-auto mt-6 max-w-[52rem] text-caption text-text-secondary">{copy.note}</p>
        <p className="mx-auto mt-4 max-w-[52rem]">
          <Link href={`/${calculators.pregnancy.slug}/`} className="inline-flex min-h-12 items-center gap-2 font-semibold">
            Try the pregnancy calculator
            <ArrowRightIcon aria-hidden size={16} weight="bold" />
          </Link>
        </p>
      </Section>
      <ClosingInvite
        id="calculator-closing"
        heading={resources.closing.heading}
        body={resources.closing.body}
        primary={resources.closing.primary}
        secondary={resources.closing.secondary}
      />
    </main>
  );
}
