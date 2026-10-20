import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { hero, tagline } from "@/content/home";
import { siteConfig } from "@/lib/site";
import heroPhoto from "@/assets/photos/two-women-laughing.jpg";

/**
 * Photo-led hero in a rounded inset frame. Copy sits on an opaque canvas card
 * (never directly on the photo) so text keeps AAA contrast.
 */
export function Hero() {
  return (
    <>
      <section aria-labelledby="hero-heading" className="px-2 pt-4 lg:px-4">
        <div className="relative">
          <div className="relative h-[62svh] min-h-80 overflow-hidden rounded-panel lg:h-[calc(100svh-8rem)] lg:max-h-[52rem] lg:min-h-[38rem]">
            <Image
              src={heroPhoto}
              alt="Three Black women laughing together outdoors in colourful dresses"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              className="object-cover object-[60%_8%]"
            />
          </div>
          <div className="relative mx-2 -mt-20 rounded-card bg-surface p-6 shadow-raised sm:mx-6 sm:p-8 lg:absolute lg:bottom-8 lg:left-8 lg:mx-0 lg:mt-0 lg:max-w-[40rem] lg:p-10">
            <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{hero.eyebrow}</p>
            <h1 id="hero-heading" className="mt-2 text-display leading-tight tracking-tight">
              <Accent {...hero.headline} />
            </h1>
            <p className="mt-4 text-lead">{hero.subheadline}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={siteConfig.joinUrl} className={buttonClasses("primary", "large")}>
                {hero.primary}
              </Link>
              <Link href={hero.secondary.href} className={buttonClasses("secondary", "large")}>
                {hero.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Our tagline" className="mt-12 bg-action text-on-action lg:mt-16">
        <p className="container-page py-8 text-center font-heading text-h2 italic lg:py-12">“{tagline}”</p>
      </section>
    </>
  );
}
