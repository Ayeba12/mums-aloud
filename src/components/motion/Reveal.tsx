"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The reference's scroll-in motion for a block. Headings marked `data-reveal="lines"` are split
 * into lines, each behind its own clip, and rise into place one after another; blocks marked
 * `data-reveal="fade"` rise 8px and fade in just after. It runs once, when the block reaches the
 * lower part of the screen, and only when motion is welcome; otherwise everything simply shows.
 */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        let revealed = false;
        const splits = gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]', root.current).map((heading) =>
          SplitText.create(heading, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            // Lines wait below their clip until the block is reached; after that a re-split (on resize) shows them as they are.
            onSplit: (self) => {
              if (!revealed) gsap.set(self.lines, { yPercent: 120, autoAlpha: 0 });
            },
          }),
        );
        const fades = gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]', root.current);
        gsap.set(fades, { y: 8, autoAlpha: 0 });

        ScrollTrigger.create({
          trigger: root.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            revealed = true;
            splits.forEach((split) => gsap.to(split.lines, { yPercent: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }));
            gsap.to(fades, { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.2, ease: "power2.out" });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
