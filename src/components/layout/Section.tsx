import type { ComponentProps } from "react";

type Tone = "default" | "tinted" | "warm" | "card" | "dark";

const tones: Record<Tone, string> = {
  default: "",
  tinted: "bg-surface-tinted",
  warm: "bg-surface-warm",
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

export function Eyebrow({ className = "", ...props }: ComponentProps<"p">) {
  return (
    <p
      className={`text-caption font-semibold tracking-wide text-text-secondary uppercase ${className}`}
      {...props}
    />
  );
}
