import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Tag } from "@/components/layout/Section";
import { Accent, type AccentText } from "@/components/ui/Heading";

/**
 * Inner-page hero: a shorter photo frame under the floating header, copy bottom-left
 * on a dark scrim. Same frame, scrim and spacing as the homepage hero so pages match.
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
      <div className="relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-panel md:min-h-[34rem] lg:min-h-[38rem]">
        <Image src={photo} alt={alt} fill priority placeholder="blur" sizes="100vw" className={`object-cover ${position}`} />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-black-950)_0%,color-mix(in_srgb,var(--color-black-950)_92%,transparent)_42%,color-mix(in_srgb,var(--color-black-950)_45%,transparent)_66%,transparent_100%)]"
        />
        <div className="container-page relative flex flex-col items-start pt-40 pb-10 md:pb-12 lg:pb-16">
          <Tag className="border-transparent bg-black-950 text-black-50">{tag}</Tag>
          <h1 id="page-heading" className="mt-4 max-w-[16ch] text-h1 tracking-tight text-black-50">
            <Accent {...heading} />
          </h1>
          <p className="mt-4 max-w-[44ch] text-lead text-black-50">{intro}</p>
          {actions && <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
