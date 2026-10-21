import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { SectionHeading } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import type { AccentText } from "@/components/ui/Heading";

export type PanelAction = { label: string; href: string; external?: boolean };

/** Inner-page closing invitation: a dark berry panel inside the page frame with two actions. */
export function ClosingPanel({
  id,
  heading,
  body,
  primary,
  secondary,
}: {
  id: string;
  heading: AccentText;
  body?: string;
  primary: PanelAction;
  secondary?: PanelAction;
}) {
  return (
    <div className="frame-x section-y">
      <section aria-labelledby={id} className="surface-dark rounded-panel">
        <div className="container-page section-y">
          <SectionHeading
            id={id}
            heading={heading}
            intro={body}
            align="center"
            action={
              <div className="flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={primary.href} variant="inverse" size="large" arrow>
                  {primary.label}
                  {primary.external && <span className="sr-only">(opens in a new site)</span>}
                </ButtonLink>
                {secondary && (
                  <ButtonLink href={secondary.href} variant="inverse-outline" size="large">
                    {secondary.label}
                    {secondary.external && <ArrowUpRightIcon aria-hidden size={16} />}
                  </ButtonLink>
                )}
              </div>
            }
          />
        </div>
      </section>
    </div>
  );
}
