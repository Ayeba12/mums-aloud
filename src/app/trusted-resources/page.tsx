import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Section, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { trustedResources } from "@/content/offers";

export const metadata: Metadata = {
  title: trustedResources.title,
  description: trustedResources.description,
  alternates: { canonical: "/trusted-resources/" },
};

/**
 * Trusted Resources (the live Affiliate Programs page, renamed at the owner's request): the
 * programmes Mums Aloud endorses, each with its destination and a plain note on the relationship.
 */
export default function TrustedResourcesPage() {
  return (
    <main id="main">
      <Section aria-labelledby="page-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface)_32rem)]">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag>{trustedResources.tag}</Tag>
          <h1 id="page-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent {...trustedResources.heading} />
          </h1>
          <p className="mt-4 max-w-[52ch] text-lead">{trustedResources.intro}</p>
          <p className="mt-4 max-w-[60ch] text-caption text-text-secondary">{trustedResources.disclosure}</p>
        </div>
        <ul className="mt-12 flex flex-col gap-4 lg:gap-6">
          {trustedResources.offers.map((offer) => (
            <li key={offer.title} className="grid gap-6 rounded-card border border-border-decoration bg-surface-card p-6 lg:grid-cols-12 lg:gap-8 lg:p-8">
              <div className="lg:col-span-8">
                <h2 className="text-h3">{offer.title}</h2>
                <div className="mt-4 flex max-w-[60ch] flex-col gap-3">
                  {offer.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                  {offer.bullets && (
                    <ul className="flex flex-col gap-2">
                      {offer.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span aria-hidden className="mt-2 size-2 shrink-0 rounded-pill bg-accent" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end lg:justify-center">
                <ButtonLink href={offer.action.href} variant="secondary" size="large" icon={<ArrowUpRightIcon aria-hidden size={16} weight="bold" />}>
                  {offer.action.label}
                  <span className="sr-only">(opens in a new site)</span>
                </ButtonLink>
                <p className="text-caption text-text-secondary">{offer.referral ? trustedResources.referralLabel : trustedResources.bookedLabel}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingInvite
        id="resources-closing"
        heading={trustedResources.closing.heading}
        body={trustedResources.closing.body}
        primary={trustedResources.closing.primary}
        secondary={trustedResources.closing.secondary}
      />
    </main>
  );
}
