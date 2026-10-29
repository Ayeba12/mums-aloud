import Image from "next/image";
import { MicrophoneIcon } from "@phosphor-icons/react/ssr";
import { Section, SectionHeading } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { closing, newsletter } from "@/content/home";
import { siteConfig } from "@/lib/site";
import photo from "@/assets/photos/mother-baby-smiling.jpg";

/** Softer path for visitors not ready to join: newsletter and podcast, in a card panel. */
export function NewsletterInvite() {
  return (
    <Section aria-labelledby="newsletter-heading">
      <div data-reveal="fade" className="grid overflow-hidden rounded-panel bg-surface-card lg:grid-cols-2">
        <div className="flex flex-col justify-center p-6 md:p-10 lg:p-16">
          <SectionHeading
            id="newsletter-heading"
            tag={newsletter.eyebrow}
            heading={newsletter.heading}
            intro={newsletter.body}
            action={
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <ButtonLink href={siteConfig.newsletterUrl} variant="secondary">
                  {newsletter.newsletterLabel}
                </ButtonLink>
                <a href={newsletter.podcast.href} className="inline-flex min-h-12 items-center gap-2 font-semibold">
                  <MicrophoneIcon aria-hidden size={20} />
                  {newsletter.podcast.label}
                  <span className="sr-only">(opens Spotify)</span>
                </a>
              </div>
            }
          />
        </div>
        <div className="relative min-h-72 overflow-hidden">
          <Image
            src={photo}
            alt="A smiling mother holding her baby at home"
            fill
            placeholder="blur"
            sizes="(min-width: 64rem) 50vw, 100vw"
            data-reveal="parallax"
            className="object-cover object-[65%_40%]"
          />
        </div>
      </div>
    </Section>
  );
}

export function ClosingInvite() {
  return (
    <Section
      aria-labelledby="closing-heading"
      className="bg-[linear-gradient(to_bottom,var(--color-surface),var(--color-surface-tinted))]"
    >
      <SectionHeading
        id="closing-heading"
        heading={closing.heading}
        align="center"
        action={
          <div className="flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={siteConfig.joinUrl} size="large" arrow>
              Join Mama&apos;s Escape
            </ButtonLink>
            <ButtonLink href={closing.secondary.href} variant="secondary" size="large">
              {closing.secondary.label}
            </ButtonLink>
          </div>
        }
      />
    </Section>
  );
}
