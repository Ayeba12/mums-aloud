"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** The reference's drift: about 35px a second, whatever the width. */
const SPEED = 35;

/**
 * The reference's card marquee: a row of cards drifting left at a steady pace, looping through a
 * second copy, run out to the section's edges so the cards pass under them. It pauses under the
 * mouse and while off screen. Under reduced motion it is a still row you can scroll sideways, and
 * the copy is not rendered. The first row is the one assistive technology reads; the copy is hidden.
 * `fade` softens both ends with a mask (48px, 96px from `md`), for a row that runs inside a panel
 * rather than out to the screen's edges, so items ease in and out instead of cutting off.
 */
export function CardMarquee({ children, label, fade = false, className = "" }: { children: ReactNode; label: string; fade?: boolean; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const hovered = useRef(false);
  const visible = useRef(false);
  const reduced = useReducedMotion();
  const edges = fade
    ? "[--fade:3rem] md:[--fade:6rem] [mask-image:linear-gradient(to_right,transparent,black_var(--fade),black_calc(100%-var(--fade)),transparent)]"
    : "";

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const track = root.current.querySelector<HTMLElement>("[data-track]");
      const list = root.current.querySelector<HTMLElement>("[data-list]");
      if (!track || !list) return;
      // One loop is one list plus the gap after it; function values follow the width on refresh.
      const distance = () => list.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
      tween.current = gsap.to(track, {
        x: () => -distance(),
        duration: () => distance() / SPEED,
        ease: "none",
        repeat: -1,
        paused: true,
      });
      const sync = () => {
        if (!tween.current) return;
        if (visible.current && !hovered.current) tween.current.play();
        else tween.current.pause();
      };
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          visible.current = self.isActive;
          sync();
        },
      });
      const resize = new ResizeObserver(() => tween.current?.invalidate());
      resize.observe(list);
      const node = root.current;
      const onEnter = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        hovered.current = true;
        sync();
      };
      const onLeave = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        hovered.current = false;
        sync();
      };
      node.addEventListener("pointerenter", onEnter);
      node.addEventListener("pointerleave", onLeave);
      return () => {
        resize.disconnect();
        node.removeEventListener("pointerenter", onEnter);
        node.removeEventListener("pointerleave", onLeave);
        tween.current = null;
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  if (reduced) {
    return (
      <div ref={root} className={`-mx-4 overflow-x-auto px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8 [scrollbar-width:thin] ${edges} ${className}`}>
        <ul aria-label={label} className="flex w-max gap-3 md:gap-4">
          {children}
        </ul>
      </div>
    );
  }

  return (
    <div ref={root} className={`-mx-4 overflow-hidden md:-mx-6 lg:-mx-8 ${edges} ${className}`}>
      <div data-track className="flex w-max gap-3 md:gap-4">
        <ul data-list aria-label={label} className="flex gap-3 md:gap-4">
          {children}
        </ul>
        <ul aria-hidden className="flex gap-3 md:gap-4">
          {children}
        </ul>
      </div>
    </div>
  );
}
