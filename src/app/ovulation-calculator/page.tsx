import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { OvulationCalculator } from "@/components/forms/OvulationCalculator";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { PageHeader } from "@/components/sections/PageHeader";
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
      <PageHeader tag={resources.tag} heading={copy.heading} intro={copy.intro}>
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
      </PageHeader>
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
