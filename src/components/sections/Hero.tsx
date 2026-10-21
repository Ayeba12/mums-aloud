import Image from "next/image";
import { Tag } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { hero } from "@/content/home";
import { siteConfig } from "@/lib/site";
import heroPhoto from "@/assets/photos/two-women-laughing.jpg";

/**
 * Home C hero: a full-frame photo in the page frame, pulled up under the floating header,
 * with the copy centred. The copy sits in the lower half so the faces stay clear, on a scrim
 * whose rendered contrast is measured in review (a gradient alone is not evidence of AAA).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="frame-x -mt-(--header-offset) pt-2 md:pt-4">
      <div className="relative flex min-h-[38rem] flex-col justify-end overflow-hidden rounded-panel md:min-h-[42rem] lg:h-[calc(100svh-2rem)] lg:max-h-[56rem]">
        <Image
          src={heroPhoto}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[60%_0%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-black-950)_0%,color-mix(in_srgb,var(--color-black-950)_92%,transparent)_44%,color-mix(in_srgb,var(--color-black-950)_45%,transparent)_68%,transparent_100%)]"
        />
        <div className="container-page relative flex flex-col items-center pt-48 pb-12 text-center md:pb-16 lg:pb-20">
          <Tag className="bg-black-950 text-black-50">{hero.eyebrow}</Tag>
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
    </section>
  );
}
