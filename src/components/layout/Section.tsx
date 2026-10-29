import type { ComponentProps, ReactNode } from "react";
import { Accent, type AccentText } from "@/components/ui/Heading";

type Tone = "default" | "tinted" | "card" | "dark";

const tones: Record<Tone, string> = {
  default: "",
  tinted: "bg-surface-tinted",
  card: "bg-surface-card",
  dark: "surface-dark",
};

/** A page section with the 48 / 64 / 96px rhythm and a centred 1200px container. */
export function Section({
  tone = "default",
  className = "",
  children,
  ...props
}: { tone?: Tone } & ComponentProps<"section">) {
  return (
    <section className={`section-y ${tones[tone]} ${className}`} {...props}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Section label: a solid pill, no border. One per section, 8px above the heading. */
export function Tag({ className = "", ...props }: ComponentProps<"p">) {
  return (
    <p
      className={`inline-flex min-h-8 items-center gap-2 rounded-pill bg-surface-card px-3 py-1 text-caption font-semibold tracking-wide text-text uppercase ${className}`}
      {...props}
    />
  );
}

/**
 * The shared opening block of every section: tag, 8px, heading, 16px, copy, 24px, action.
 * The caller adds `mt-12` (48px) before the section's content. Below the first screen an h2's lines
 * rise into place as it scrolls in and the copy and action fade up after them (`ScrollReveals`);
 * `reveal={false}` keeps a heading still.
 */
export function SectionHeading({
  id,
  tag,
  heading,
  intro,
  action,
  align = "start",
  level: Level = "h2",
  reveal = true,
  className = "",
}: {
  id: string;
  tag?: string;
  heading: AccentText;
  intro?: string;
  action?: ReactNode;
  align?: "start" | "center";
  level?: "h1" | "h2";
  /** Marks an h2 for the line-by-line entrance and its copy and action for the fade after it. */
  reveal?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  const marked = reveal && Level === "h2";
  return (
    <div className={`flex flex-col ${centered ? "mx-auto items-center text-center" : "items-start"} ${className}`}>
      {tag && <Tag>{tag}</Tag>}
      <Level id={id} data-reveal={marked ? "lines" : undefined} className={`${tag ? "mt-2" : ""} ${Level === "h1" ? "text-display tracking-display" : "text-h2"} max-w-[22ch]`}>
        <Accent {...heading} />
      </Level>
      {intro && (
        <p data-reveal={marked ? "fade" : undefined} className="mt-4 max-w-[46ch] text-lead">
          {intro}
        </p>
      )}
      {action && (
        <div data-reveal={marked ? "fade" : undefined} className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}

/** Round icon holder, 48px, in the accent tint. */
export function IconChip({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-accent-soft text-ink ${className}`}>
      {children}
    </span>
  );
}

/**
 * Centred editorial statement, as on the People Work reference: a narrow serif H2 with one
 * highlighted phrase. No tag; at most a supporting paragraph and one quiet link beneath it.
 * A trail that starts with punctuation closes up against the highlight. `wide` loosens the
 * measure for a statement of several sentences; `size="h3"` is the reference's smaller statement
 * over a row of cards, which go in `children` (96px below from `lg`). The heading's lines rise into
 * place as it scrolls in and the body and action fade up after them (`ScrollReveals`, or a `Reveal`
 * wrapper around the whole statement); `reveal={false}` keeps it still.
 */
export function Statement({
  id,
  lead,
  highlight,
  trail,
  body,
  action,
  wide = false,
  size = "h2",
  reveal = true,
  children,
}: {
  id: string;
  lead: string;
  highlight: string;
  trail?: string;
  body?: string;
  action?: ReactNode;
  wide?: boolean;
  size?: "h2" | "h3";
  reveal?: boolean;
  children?: ReactNode;
}) {
  const closeUp = trail !== undefined && /^[,.:;!?]/.test(trail);
  const measure = size === "h3" ? "max-w-[34ch]" : wide ? "max-w-[38ch]" : "max-w-[30ch]";
  return (
    <Section aria-labelledby={id}>
      <h2 id={id} data-reveal={reveal ? "lines" : undefined} className={`mx-auto text-center text-balance ${size === "h3" ? "text-h3" : "text-h2"} ${measure}`}>
        {lead} <mark className="rounded-control bg-accent-soft px-2 text-ink">{highlight}</mark>
        {trail && (closeUp ? trail : ` ${trail}`)}
      </h2>
      {body && (
        <p data-reveal={reveal ? "fade" : undefined} className="mx-auto mt-6 max-w-[56ch] text-center text-lead">
          {body}
        </p>
      )}
      {action && (
        <div data-reveal={reveal ? "fade" : undefined} className="mt-6 flex justify-center">
          {action}
        </div>
      )}
      {children && <div className="mt-16 lg:mt-24">{children}</div>}
    </Section>
  );
}
