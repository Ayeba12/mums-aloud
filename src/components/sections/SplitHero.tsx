import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Tag } from "@/components/layout/Section";
import { Accent, type AccentText } from "@/components/ui/Heading";
import { SmartLink } from "@/components/ui/SmartLink";

/**
 * The reference's Home B hero: a tall portrait in one column with a floating card,
 * centred copy in the other, both pulled up under the floating header. The card sits
 * 8px inside the 24px frame with a 16px radius, so the corners stay concentric.
 */
export function SplitHero({
  photo,
  alt,
  position = "object-center",
  card,
  tag,
  heading,
  intro,
  actions,
}: {
  photo: StaticImageData;
  alt: string;
  position?: string;
  card: { tag: string; text: string; link: { label: string; href: string } };
  tag: string;
  heading: AccentText;
  intro: string;
  actions: ReactNode;
}) {
  return (
    <section aria-labelledby="page-heading" className="frame-x -mt-(--header-offset) pt-2 md:pt-4">
      <div className="grid gap-2 lg:grid-cols-2 lg:gap-4">
        <div className="relative min-h-[34rem] overflow-hidden rounded-panel ring-1 ring-black-950/10 ring-inset md:min-h-[36rem] lg:h-[calc(100svh-2rem)] lg:min-h-[44rem] lg:max-h-[56rem]">
          <Image src={photo} alt={alt} fill priority placeholder="blur" sizes="(min-width: 64rem) 50vw, 100vw" className={`object-cover ${position}`} />
          <div data-enter className="absolute right-2 bottom-2 left-2 max-w-[22rem] rounded-card bg-surface p-5 shadow-raised sm:right-auto md:p-6 [--enter-step:4]">
            <Tag>{card.tag}</Tag>
            <p className="mt-3 font-heading text-body text-ink md:mt-4 md:text-h4">{card.text}</p>
            <SmartLink href={card.link.href} className="mt-4 inline-flex min-h-12 items-center gap-2 font-semibold">
              {card.link.label}
              <ArrowRightIcon aria-hidden size={16} weight="bold" />
            </SmartLink>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 pt-8 pb-12 text-center lg:px-16 lg:pt-32 lg:pb-16">
          <Tag data-enter>{tag}</Tag>
          <h1 id="page-heading" data-enter className="mt-4 max-w-[14ch] text-h1 tracking-tight [--enter-step:1]">
            <Accent {...heading} />
          </h1>
          <p data-enter className="mt-4 max-w-[36ch] text-lead [--enter-step:2]">
            {intro}
          </p>
          <div data-enter className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row [--enter-step:3]">
            {actions}
          </div>
        </div>
      </div>
    </section>
  );
}
