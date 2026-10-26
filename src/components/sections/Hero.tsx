import { HeroSlideshow, type HeroPhoto } from "@/components/sections/HeroSlideshow";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { hero } from "@/content/home";
import { siteConfig } from "@/lib/site";
import laughing from "@/assets/photos/two-women-laughing.jpg";
import circle from "@/assets/photos/women-community-circle.jpg";
import friends from "@/assets/photos/two-friends-smiling.jpg";
import smiling from "@/assets/photos/mother-baby-smiling.jpg";
import park from "@/assets/photos/mother-daughter-park.jpg";

/** Five photos crossfade behind the copy. Stock placeholders until consented photos arrive. */
const photos: HeroPhoto[] = [
  { src: laughing, position: "object-[60%_0%]" },
  { src: circle, position: "object-[50%_30%]" },
  { src: friends, position: "object-[50%_25%]" },
  { src: smiling, position: "object-[65%_35%]" },
  { src: park, position: "object-[50%_25%]" },
];

/**
 * Home C hero: a full-frame photo slideshow in the page frame, pulled up under the floating
 * header, with the copy centred in the lower half on a measured scrim. On desktop the sub-line
 * is quiet until the visitor hovers or focuses the copy; on touch screens it is always shown.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="frame-x -mt-(--header-offset) pt-2 md:pt-4">
      {/* Fills the first screen (less the frame gap) on phones and tablets, between a floor for short
          viewports and a ceiling for very tall ones; on desktop it is the viewport height within 56 to 64rem. */}
      <div className="relative flex min-h-[min(max(44rem,100svh_-_1rem),56rem)] flex-col justify-end overflow-hidden rounded-panel md:min-h-[min(max(52rem,100svh_-_2rem),60rem)] lg:h-[calc(100svh-2rem)] lg:min-h-[56rem] lg:max-h-[64rem]">
        <HeroSlideshow photos={photos} />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-black-950)_0%,color-mix(in_srgb,var(--color-black-950)_92%,transparent)_44%,color-mix(in_srgb,var(--color-black-950)_45%,transparent)_68%,transparent_100%)]"
        />
        <div className="group container-page relative flex flex-col items-center pt-48 pb-12 text-center md:pb-16 lg:pb-20">
          <h1 id="hero-heading" className="max-w-[14ch] text-display tracking-display text-black-50">
            <Accent {...hero.headline} />
          </h1>
          {/* Collapses to nothing on hover-capable desktops, so heading and buttons sit together until the copy is hovered or focused. */}
          <div className="grid w-full justify-items-center transition-[grid-template-rows] duration-300 ease-standard motion-reduce:transition-none [grid-template-rows:1fr] lg:[@media(hover:hover)]:[grid-template-rows:0fr] lg:group-focus-within:[grid-template-rows:1fr] lg:group-hover:[grid-template-rows:1fr]">
            <p className="min-h-0 max-w-[48ch] overflow-hidden text-body text-black-50 transition-opacity duration-300 ease-standard group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none md:text-lead lg:[@media(hover:hover)]:opacity-0">
              <span className="block pt-4">{hero.subheadline}</span>
            </p>
          </div>
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
