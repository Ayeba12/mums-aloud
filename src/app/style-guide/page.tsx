import type { Metadata } from "next";
import { ArrowRightIcon, HeartIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const ramps = ["berry-lipstick", "black", "pastel-petal", "lavender-blush"] as const;
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const semantic = [
  ["surface", "Website background (Soft Pink Canvas)"],
  ["surface-tinted", "Tinted section"],
  ["surface-warm", "Warm section"],
  ["surface-card", "Card surface"],
  ["ink", "Headings"],
  ["text", "Body text"],
  ["text-secondary", "Supporting text"],
  ["action", "Links and primary action"],
  ["action-hover", "Primary hover"],
  ["border-control", "Control border"],
] as const;

const typeScale = [
  ["Display", "text-display font-heading leading-tight", "Libre Caslon Text · 40 → 72px"],
  ["Heading 1", "text-h1 font-heading", "Libre Caslon Text · 36 → 60px"],
  ["Heading 2", "text-h2 font-heading", "Libre Caslon Text · 28 → 44px"],
  ["Heading 3", "text-h3 font-heading", "Libre Caslon Text · 24 → 32px"],
  ["Heading 4", "text-h4 font-body font-bold", "Urbanist bold · 20 → 24px"],
  ["Lead text for introductions", "text-lead", "Urbanist · 18 → 22px"],
  ["Body text for reading", "text-body", "Urbanist · 16 → 18px"],
  ["Caption and metadata", "text-caption text-text-secondary", "Urbanist · 14 → 15px"],
] as const;

const spacing = [1, 2, 3, 4, 6, 8, 12, 16, 24] as const;

export default function StyleGuide() {
  return (
    <main id="main">
      <Section>
        <Eyebrow>Mums Aloud · v0.6</Eyebrow>
        <h1 className="mt-2 text-h1">Design system</h1>
        <p className="mt-4 max-w-reading text-lead">
          Tokens from the brand guidelines, rendered with Tailwind CSS v4. Resize the window to see the fluid type
          and the 4 / 8 / 12-column grid respond.
        </p>
      </Section>

      <Section tone="card" aria-labelledby="colour">
        <h2 id="colour" className="text-h2">Colour</h2>
        <h3 className="mt-8 text-h4 font-body font-bold">Semantic roles</h3>
        <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
          {semantic.map(([token, use]) => (
            <li key={token} className="flex flex-col gap-2">
              <span
                className="h-16 rounded-control border border-border-decoration"
                style={{ background: `var(--color-${token})` }}
              />
              <code className="text-caption font-semibold text-ink">{token}</code>
              <span className="text-caption text-text-secondary">{use}</span>
            </li>
          ))}
        </ul>
        {ramps.map((ramp) => (
          <div key={ramp} className="mt-8">
            <h3 className="text-h4 font-body font-bold capitalize">{ramp.replace("-", " ")}</h3>
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
        <h2 id="type" className="text-h2">Typography</h2>
        <ul className="mt-8 flex flex-col gap-8">
          {typeScale.map(([sample, classes, spec]) => (
            <li key={sample} className="grid gap-2 border-b border-border-decoration pb-6 md:grid-cols-[1fr_16rem]">
              <p className={`text-ink ${classes}`}>{sample}</p>
              <p className="text-caption text-text-secondary">{spec}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tinted" aria-labelledby="spacing">
        <h2 id="spacing" className="text-h2">Spacing: 8pt for layout, 4pt for detail</h2>
        <ul className="mt-8 flex flex-col gap-3">
          {spacing.map((step) => (
            <li key={step} className="flex items-center gap-4">
              <code className="w-24 text-caption text-ink">space-{step}</code>
              <span className="h-4 rounded-sm bg-action" style={{ width: `calc(var(--spacing) * ${step})` }} />
              <span className="text-caption text-text-secondary">{step * 4}px</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-12 text-h4 font-body font-bold">Layout grid</h3>
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

      <Section aria-labelledby="buttons">
        <h2 id="buttons" className="text-h2">Buttons and icons</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="#buttons" icon={<ArrowRightIcon aria-hidden size={20} />}>
            Join Mama&apos;s Escape
          </ButtonLink>
          <Button variant="secondary">Read her story</Button>
          <Button size="large">Large action</Button>
          <Button disabled>Unavailable</Button>
        </div>
        <div className="mt-8 flex gap-6 text-action" aria-hidden>
          <HeartIcon size={24} />
          <UsersThreeIcon size={24} />
          <ArrowRightIcon size={24} />
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="dark">
        <Eyebrow>Dark section</Eyebrow>
        <h2 id="dark" className="mt-2 text-h2">Berry 900 with inverse actions</h2>
        <p className="mt-4 max-w-reading">
          Text, links and focus rings flip automatically inside dark sections.{" "}
          <a href="#dark">This is an inline link.</a>
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="inverse">Join Mama&apos;s Escape</Button>
          <Button variant="inverse-outline">Listen to the podcast</Button>
        </div>
      </Section>
    </main>
  );
}
