import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon, FilePdfIcon } from "@phosphor-icons/react/ssr";
import { Section } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { resources, type Guide } from "@/content/resources";

/** A free guide: its title and intro, the PDF to download, and the way back to all resources. */
export function GuidePage({ guide }: { guide: Guide }) {
  return (
    <main id="main">
      <PageHeader
        tag="Free guide"
        heading={guide.heading}
        intro={guide.intro}
        actions={
          <>
            <ButtonLink href={guide.pdf} size="large" icon={<ArrowUpRightIcon aria-hidden size={16} weight="bold" />}>
              {resources.download}
              <span className="sr-only">(PDF)</span>
            </ButtonLink>
            <ButtonLink href="/resources/" variant="secondary" size="large">
              All resources
            </ButtonLink>
          </>
        }
        note={
          <p className="mt-6 flex items-center gap-2 text-caption text-text-secondary">
            <FilePdfIcon aria-hidden size={16} />
            PDF · published {guide.published}
          </p>
        }
      />

      <Section aria-labelledby="more-heading" tone="tinted">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="more-heading" className="text-h3">
              More from the resources
            </h2>
            <p className="mt-2 max-w-[46ch]">{resources.intro}</p>
          </div>
          <Link href="/resources/" className="inline-flex min-h-12 items-center gap-2 font-semibold">
            <ArrowLeftIcon aria-hidden size={16} weight="bold" />
            Back to resources
          </Link>
        </div>
      </Section>

      <ClosingInvite
        id="guide-closing"
        heading={resources.closing.heading}
        body={resources.closing.body}
        primary={resources.closing.primary}
        secondary={resources.closing.secondary}
      />
    </main>
  );
}
