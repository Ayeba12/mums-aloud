"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ease } from "./ease";
import { motion } from "./motion";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The reference's scroll-in motion for a block. Headings marked `data-reveal="lines"` are split
 * into lines, each behind its own clip, and rise into place one after another; blocks marked
 * `data-reveal="fade"` rise and fade in just after. It runs once, when the block reaches the
 * lower part of the screen, and only when motion is welcome; otherwise everything simply shows.
 * It plays the whole block on one cue, where the site-wide `ScrollReveals` cues each element on its
 * own; the root is marked `data-reveal-scope` so the two never animate the same thing. Timing and
 * curve come from the shared motion language (`motion.ts`, `ease.ts`).
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
              if (!revealed) gsap.set(self.lines, { yPercent: 110, opacity: 0 });
            },
          }),
        );
        const fades = gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]', root.current);
        gsap.set(fades, { y: motion.rise, opacity: 0 });

        ScrollTrigger.create({
          trigger: root.current,
          start: motion.start,
          once: true,
          onEnter: () => {
            revealed = true;
            splits.forEach((split) =>
              gsap.to(split.lines, { yPercent: 0, opacity: 1, duration: motion.lineDuration, stagger: motion.stagger, ease }),
            );
            gsap.to(fades, { y: 0, opacity: 1, duration: motion.duration, delay: 0.2, ease, stagger: motion.stagger });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} data-reveal-scope className={className}>
      {children}
    </div>
  );
}
