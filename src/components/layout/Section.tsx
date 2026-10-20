import type { ComponentProps, ReactNode } from "react";
import { Accent, type AccentText } from "@/components/ui/Heading";

type Tone = "default" | "tinted" | "warm" | "card" | "sage" | "dark" | "olive";

const tones: Record<Tone, string> = {
  default: "",
  tinted: "bg-surface-tinted",
  warm: "bg-surface-warm",
  card: "bg-surface-card",
  sage: "bg-surface-sage",
  dark: "surface-dark",
  olive: "surface-olive",
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

/** Section label: a small pill. One per section, 8px above the heading. */
export function Tag({ className = "", ...props }: ComponentProps<"p">) {
  return (
    <p
      className={`inline-flex min-h-8 items-center gap-2 rounded-pill border border-current/40 px-3 py-1 text-caption font-semibold tracking-wide text-text uppercase ${className}`}
      {...props}
    />
  );
}

/**
 * The shared opening block of every section: tag, 8px, heading, 16px, copy, 24px, action.
 * The caller adds `mt-12` (48px) before the section's content.
 */
export function SectionHeading({
  id,
  tag,
  heading,
  intro,
  action,
  align = "start",
  level: Level = "h2",
  className = "",
}: {
  id: string;
  tag?: string;
  heading: AccentText;
  intro?: string;
  action?: ReactNode;
  align?: "start" | "center";
  level?: "h1" | "h2";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col ${centered ? "mx-auto items-center text-center" : "items-start"} ${className}`}>
      {tag && <Tag>{tag}</Tag>}
      <Level id={id} className={`${tag ? "mt-2" : ""} ${Level === "h1" ? "text-display tracking-tight" : "text-h2"} max-w-[22ch]`}>
        <Accent {...heading} />
      </Level>
      {intro && <p className="mt-4 max-w-[46ch] text-lead">{intro}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/** Round icon holder, 48px, for benefit lists and feature cards. */
export function IconChip({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-surface-sage text-sage-text ${className}`}
    >
      {children}
    </span>
  );
}
