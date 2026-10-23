import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Section, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { newMumsCircle as copy } from "@/content/offers";
import { joinForm } from "@/lib/site";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  alternates: { canonical: "/new-mums-circle/" },
};

/** New Mums Circle: the live page's copy and its WhatsApp group, kept at its URL (owner decision). */
export default function NewMumsCirclePage() {
  return (
    <main id="main">
      <Section aria-labelledby="page-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface)_32rem)]">
        <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <Tag>{copy.tag}</Tag>
          <h1 id="page-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent {...copy.heading} />
          </h1>
          <p className="mt-4 max-w-[52ch] text-lead">{copy.intro}</p>
          <p className="mt-4 max-w-[52ch]">{copy.body}</p>
          <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={copy.join.href} size="large" icon={<ArrowUpRightIcon aria-hidden size={16} weight="bold" />}>
              {copy.join.label}
              <span className="sr-only">(opens WhatsApp)</span>
            </ButtonLink>
            <ButtonLink href={joinForm.href} variant="secondary" size="large">
              Join Mama&apos;s Escape
            </ButtonLink>
          </div>
          <p className="mt-4 text-caption text-text-secondary">{copy.join.note}</p>
        </div>
      </Section>

      <ClosingInvite
        id="circle-closing"
        heading={copy.closing.heading}
        body={copy.closing.body}
        primary={copy.closing.primary}
        secondary={copy.closing.secondary}
      />
    </main>
  );
}
