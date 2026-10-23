import { Section, SectionHeading } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import type { AccentText } from "@/components/ui/Heading";
import { joinForm } from "@/lib/site";

export type InviteAction = { label: string; href?: string };

/**
 * The light closing, as the reference ends its pages: a centred heading with the italic accent, a
 * line of copy and two pills on the canvas-to-tint gradient. An action without an href is the
 * site-wide Join action.
 */
export function ClosingInvite({
  id,
  heading,
  body,
  primary,
  secondary,
}: {
  id: string;
  heading: AccentText;
  body?: string;
  primary: InviteAction;
  secondary?: InviteAction;
}) {
  return (
    <Section aria-labelledby={id} className="bg-[linear-gradient(to_bottom,var(--color-surface),var(--color-surface-tinted))]">
      <SectionHeading
        id={id}
        heading={heading}
        intro={body}
        align="center"
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primary.href ?? joinForm.href} size="large" arrow>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href ?? joinForm.href} variant="secondary" size="large">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        }
      />
    </Section>
  );
}
