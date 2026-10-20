import Image from "next/image";
import { Tag } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { hero, tagline } from "@/content/home";
import { siteConfig } from "@/lib/site";
import heroPhoto from "@/assets/photos/two-women-laughing.jpg";

/**
 * Photo-led hero in the page frame, pulled up under the floating header.
 * Copy is centred on a dark scrim; the contrast of the rendered text is measured in review,
 * because a gradient alone is not evidence of AAA.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="frame-x -mt-(--header-offset) pt-2 md:pt-4">
      <div className="relative flex min-h-[36rem] flex-col justify-end overflow-hidden rounded-panel md:min-h-[40rem] lg:h-[calc(100svh-2rem)] lg:max-h-[54rem]">
        <Image
          src={heroPhoto}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[65%_0%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-black-950)_0%,color-mix(in_srgb,var(--color-black-950)_92%,transparent)_42%,color-mix(in_srgb,var(--color-black-950)_45%,transparent)_66%,transparent_100%)]"
        />
        <div className="container-page relative flex flex-col items-start pt-48 pb-10 md:pb-12 lg:pb-16">
          <Tag className="border-transparent bg-black-950 text-black-50">{hero.eyebrow}</Tag>
          <h1 id="hero-heading" className="mt-4 max-w-[14ch] text-display tracking-tight text-black-50">
            <Accent {...hero.headline} />
          </h1>
          <p className="mt-4 max-w-[44ch] text-lead text-black-50">{hero.subheadline}</p>
          <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={siteConfig.joinUrl} variant="inverse" size="large" arrow>
              {hero.primary}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="inverse-outline" size="large">
              {hero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="surface-olive mt-2 rounded-panel md:mt-4" aria-label="Our tagline">
        <p className="container-page py-8 text-center font-heading text-h2 italic md:py-10">
          “{tagline.lead} <span className="text-action">{tagline.accent}</span>”
        </p>
      </div>
    </section>
  );
}
