import type { ReactNode } from "react";
import { Tag } from "@/components/layout/Section";
import { Accent, type AccentText } from "@/components/ui/Heading";

/**
 * Inner-page header without a photo, as the reference's service and contact pages: the tint runs
 * from the very top of the page, behind the floating bar, and fades into the canvas by the end of
 * the header (never cut off, however short the copy), with the title centred on it. Anything the
 * page wants on the fading tint (cards, tiles, a form) comes as children.
 */
export function PageHeader({
  id = "page-heading",
  tag,
  heading,
  intro,
  extra,
  actions,
  note,
  children,
  className = "",
}: {
  id?: string;
  tag: string;
  heading: AccentText;
  intro?: string;
  /** A further line in the centred column, between the intro and the actions (a note, a disclosure). */
  extra?: ReactNode;
  actions?: ReactNode;
  /** A quiet line under the actions (a format note, a caption). */
  note?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`-mt-(--header-offset) bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface)_min(44rem,100%))] pt-[calc(var(--header-offset)+2.5rem)] pb-12 md:pt-[calc(var(--header-offset)+3.5rem)] md:pb-16 lg:pt-[calc(var(--header-offset)+5rem)] ${className}`}
    >
      <div className="container-page">
        <div className="mx-auto flex max-w-[60rem] flex-col items-center text-center">
          <Tag>{tag}</Tag>
          <h1 id={id} className="mt-2 max-w-[18ch] text-h1 tracking-tight text-balance">
            <Accent {...heading} />
          </h1>
          {intro && <p className="mt-4 max-w-[46ch] text-lead text-pretty">{intro}</p>}
          {extra}
          {actions && <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">{actions}</div>}
          {note}
        </div>
        {children}
      </div>
    </section>
  );
}
