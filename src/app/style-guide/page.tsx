import type { Metadata } from "next";
import { ArrowRightIcon, HeartIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { Button, ButtonLink } from "@/components/ui/Button";
import { IconChip, Section, SectionHeading, Tag } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const ramps = ["berry-lipstick", "black", "pastel-petal", "lavender-blush", "marigold"] as const;
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const semantic = [
  ["surface", "Website background (Soft Pink Canvas)"],
  ["surface-tinted", "Tinted section"],
  ["surface-card", "Card surface"],
  ["surface-dark", "Dark panel (berry 700)"],
  ["ink", "Headings"],
  ["text", "Body text"],
  ["text-secondary", "Supporting text"],
  ["action", "Links and primary action"],
  ["accent", "Highlight accent (v0.7)"],
  ["accent-soft", "Accent tint (v0.7)"],
  ["border-control", "Control border"],
] as const;

const typeScale = [
  ["Display", "text-display font-heading tracking-tight", "Libre Caslon Text · 40 → 64px · line 48 → 72"],
  ["Heading 1", "text-h1 font-heading tracking-tight", "Libre Caslon Text · 36 → 52px · line 44 → 60"],
  ["Heading 2", "text-h2 font-heading", "Libre Caslon Text · 28 → 40px · line 36 → 48"],
  ["Heading 3", "text-h3 font-heading", "Libre Caslon Text · 24 → 32px · line 32 → 40"],
  ["Heading 4", "text-h4 font-body font-bold", "Urbanist bold · 20 → 24px · line 28 → 32"],
  ["Lead text for introductions", "text-lead", "Urbanist · 18 → 20px · line 28 → 32"],
  ["Body text for reading", "text-body", "Urbanist · 16px · line 24"],
  ["Caption and metadata", "text-caption text-text-secondary", "Urbanist · 14px · line 20"],
] as const;

const spacing = [1, 2, 3, 4, 6, 8, 12, 16, 24] as const;

export default function StyleGuide() {
  return (
    <main id="main">
      <Section>
        <SectionHeading
          id="style-guide-heading"
          level="h1"
          tag="Mums Aloud · v0.8"
          heading={{ lead: "Design", accent: "system" }}
          intro="Tokens from the brand guidelines, rendered with Tailwind CSS v4. Resize the window to see the fluid type and the 4 / 8 / 12-column grid respond."
        />
      </Section>

      <Section tone="card" aria-labelledby="colour">
        <SectionHeading id="colour" tag="Colour" heading={{ lead: "Palette and", accent: "roles" }} />
        <h3 className="mt-12 font-body text-h4 font-bold">Semantic roles</h3>
        <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {semantic.map(([token, use]) => (
            <li key={token} className="flex flex-col gap-2">
              <span className="h-16 rounded-control border border-border-decoration" style={{ background: `var(--color-${token})` }} />
              <code className="text-caption font-semibold text-ink">{token}</code>
              <span className="text-caption text-text-secondary">{use}</span>
            </li>
          ))}
        </ul>
        {ramps.map((ramp) => (
          <div key={ramp} className="mt-8">
            <h3 className="font-body text-h4 font-bold capitalize">{ramp.replace("-", " ")}</h3>
            <ul className="mt-2 grid grid-cols-6 gap-1 md:grid-cols-11">
              {steps.map((step) => (
                <li key={step} className="flex flex-col gap-1">
                  <span className="h-12 rounded-control" style={{ background: `var(--color-${ramp}-${step})` }} />
                  <span className="text-caption text-text-secondary">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section aria-labelledby="type">
        <SectionHeading id="type" tag="Typography" heading={{ lead: "Major Third scale on the", accent: "4px grid" }} />
        <ul className="mt-12 flex flex-col gap-8">
          {typeScale.map(([sample, classes, spec]) => (
            <li key={sample} className="grid gap-2 border-b border-border-decoration pb-6 md:grid-cols-[1fr_16rem]">
              <p className={`text-ink ${classes}`}>{sample}</p>
              <p className="text-caption text-text-secondary">{spec}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tinted" aria-labelledby="spacing">
        <SectionHeading id="spacing" tag="Spacing" heading={{ lead: "8pt for layout,", accent: "4pt for detail" }} />
        <ul className="mt-12 flex flex-col gap-3">
          {spacing.map((step) => (
            <li key={step} className="flex items-center gap-4">
              <code className="w-24 text-caption text-ink">space-{step}</code>
              <span className="h-4 rounded-sm bg-action" style={{ width: `calc(var(--spacing) * ${step})` }} />
              <span className="text-caption text-text-secondary">{step * 4}px</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-12 font-body text-h4 font-bold">Layout grid</h3>
        <div className="layout-grid mt-4" aria-hidden>
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className={`h-16 rounded-control bg-berry-lipstick-100 ${index >= 4 ? "hidden md:block" : ""} ${index >= 8 ? "md:hidden lg:block" : ""}`}
            />
          ))}
        </div>
        <p className="mt-2 text-caption text-text-secondary">4 columns on mobile, 8 on tablet, 12 on desktop.</p>
      </Section>

      <Section aria-labelledby="components">
        <SectionHeading id="components" tag="Components" heading={{ lead: "Buttons, tags", accent: "and chips" }} />
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <ButtonLink href="#components" arrow>
            Join Mama&apos;s Escape
          </ButtonLink>
          <Button variant="secondary">Read her story</Button>
          <Button variant="accent">Accent action</Button>
          <Button size="large" arrow>
            Large with arrow
          </Button>
          <Button disabled>Unavailable</Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Tag>Section tag</Tag>
          <IconChip>
            <HeartIcon aria-hidden size={24} />
          </IconChip>
          <IconChip>
            <UsersThreeIcon aria-hidden size={24} />
          </IconChip>
          <span className="inline-flex size-8 items-center justify-center rounded-pill bg-accent text-on-accent">
            <ArrowRightIcon aria-hidden size={16} weight="bold" />
          </span>
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="dark">
        <SectionHeading
          id="dark"
          tag="Dark panel"
          heading={{ lead: "Berry 700 with", accent: "inverse actions" }}
          intro="Text, tags, links and focus rings flip automatically inside dark panels; links take marigold 100."
          action={
            <div className="flex flex-wrap gap-4">
              <Button variant="inverse" arrow>
                Join Mama&apos;s Escape
              </Button>
              <Button variant="inverse-outline">Listen to the podcast</Button>
            </div>
          }
        />
      </Section>
    </main>
  );
}
