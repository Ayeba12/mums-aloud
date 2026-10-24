import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
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
      <PageHeader
        tag={copy.tag}
        heading={copy.heading}
        intro={copy.intro}
        extra={<p className="mt-4 max-w-[52ch]">{copy.body}</p>}
        actions={
          <>
            <ButtonLink href={copy.join.href} size="large" icon={<ArrowUpRightIcon aria-hidden size={16} weight="bold" />}>
              {copy.join.label}
              <span className="sr-only">(opens WhatsApp)</span>
            </ButtonLink>
            <ButtonLink href={joinForm.href} variant="secondary" size="large">
              Join Mama&apos;s Escape
            </ButtonLink>
          </>
        }
        note={<p className="mt-4 text-caption text-text-secondary">{copy.join.note}</p>}
      />

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
