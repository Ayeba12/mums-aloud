"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type ProcessStep = {
  short: string;
  title: string;
  text: string;
  outcome: string;
  photo: StaticImageData;
  alt: string;
  position?: string;
};

/**
 * The reference's process section: a sticky index on the left whose current item follows the
 * scroll, and the steps on the right, each a photo beside a card. Each step fades up as it enters,
 * and each photo is scaled and drifts as its step crosses the viewport. Under reduced motion the
 * steps are simply shown and only the index tracks the scroll.
 */
export function ProcessSteps({ steps, outcomeLabel }: { steps: ProcessStep[]; outcomeLabel: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>("[data-step]", root.current);

      // The current step is the one crossing the band just above the viewport's middle.
      slides.forEach((slide, index) => {
        ScrollTrigger.create({
          trigger: slide,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) setActive(index);
          },
        });
      });

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        slides.forEach((slide) => {
          gsap.fromTo(
            slide,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: slide, start: "top 85%", once: true } },
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax]", root.current).forEach((photo) => {
          gsap.fromTo(
            photo,
            { yPercent: -8, scale: 1.12 },
            {
              yPercent: 8,
              scale: 1.12,
              ease: "none",
              scrollTrigger: { trigger: photo.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid gap-8 lg:grid-cols-12 lg:gap-8">
      <nav aria-label="Steps" className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
        <ol className="flex flex-wrap gap-2 lg:flex-col">
          {steps.map((step, index) => {
            const current = index === active;
            return (
              <li key={step.short}>
                <a
                  href={`#step-${index + 1}`}
                  aria-current={current ? "step" : undefined}
                  className={`flex min-h-12 items-center gap-3 rounded-card px-5 py-3 font-semibold no-underline transition-colors duration-500 ease-standard ${
                    current ? "bg-surface-card text-ink" : "text-text-secondary hover:text-ink"
                  }`}
                >
                  <span className="text-caption tabular-nums">0{index + 1}</span>
                  {step.short}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <ol className="flex flex-col gap-6 lg:col-span-9">
        {steps.map((step, index) => (
          <li key={step.title} id={`step-${index + 1}`} data-step className="grid scroll-mt-24 gap-2 md:grid-cols-12 md:gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-black-950/10 ring-inset md:col-span-5 md:aspect-auto md:min-h-[20rem]">
              <Image
                src={step.photo}
                alt={step.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 42vw, 100vw"
                data-parallax
                className={`object-cover will-change-transform ${step.position ?? "object-center"}`}
              />
            </div>
            <div className="flex flex-col rounded-card bg-surface-card p-6 md:col-span-7 lg:p-8">
              <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">Step 0{index + 1}</p>
              <h3 className="mt-2 font-heading text-h4 text-ink">{step.title}</h3>
              <p className="mt-2 max-w-[56ch]">{step.text}</p>
              <div className="mt-6 rounded-control bg-black-100 p-4 md:mt-auto md:pt-4">
                <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{outcomeLabel}</p>
                <p className="mt-1 font-semibold text-ink">{step.outcome}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
