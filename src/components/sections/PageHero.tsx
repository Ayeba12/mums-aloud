import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Tag } from "@/components/layout/Section";
import { Accent, type AccentText } from "@/components/ui/Heading";

/**
 * Inner-page hero: a shorter photo frame under the floating header, copy on a dark scrim along
 * the lower edge: tag and title left, intro and actions right on desktop. Same frame, scrim and
 * spacing as the homepage hero so pages match.
 */
export function PageHero({
  photo,
  alt,
  position = "object-center",
  tag,
  heading,
  intro,
  actions,
}: {
  photo: StaticImageData;
  alt: string;
  position?: string;
  tag: string;
  heading: AccentText;
  intro: string;
  actions?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-heading" className="frame-x -mt-(--header-offset) pt-2 md:pt-4">
      {/* Taller than before (owner, 22 Oct 2026): the first screen on phones, like the homepage hero,
          then at least 44rem or 80% of the viewport on tablets and 48rem or 75% on desktop, never
          more than 52 / 56rem so very tall screens keep a sane frame. */}
      <div className="relative flex min-h-[min(100svh_-_1rem,52rem)] flex-col justify-end overflow-hidden rounded-panel md:min-h-[min(max(44rem,80svh),56rem)] lg:min-h-[min(max(48rem,75svh),56rem)]">
        <Image src={photo} alt={alt} fill priority placeholder="blur" sizes="100vw" className={`object-cover ${position}`} />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-black-950)_0%,color-mix(in_srgb,var(--color-black-950)_92%,transparent)_42%,color-mix(in_srgb,var(--color-black-950)_45%,transparent)_66%,transparent_100%)]"
        />
        {/* Stacked on phones and tablets; from lg the tag and title sit bottom-left and the intro with its
            actions bottom-right (owner, 26 Oct 2026), both on the hero's lower edge. */}
        <div className="container-page relative grid gap-4 pt-40 pb-10 md:pb-12 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-16">
          <div className="flex flex-col items-start lg:col-span-7">
            <Tag className="border-transparent bg-black-950 text-black-50">{tag}</Tag>
            <h1 id="page-heading" className="mt-4 max-w-[16ch] text-h1 tracking-tight text-black-50">
              <Accent {...heading} />
            </h1>
          </div>
          <div className="flex flex-col items-start lg:col-span-5 lg:col-start-8">
            <p className="max-w-[44ch] text-lead text-black-50">{intro}</p>
            {actions && <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">{actions}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
