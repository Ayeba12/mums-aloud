"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ease } from "./ease";
import { cascadeDelay, isRevealed, motion } from "./motion";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * True once React has hydrated the element. The page's `main` sits in a Suspense boundary that can hydrate
 * a moment after the layout; changing its DOM before then (SplitText's lines) makes React discard and
 * re-render that part, so nothing is touched until React has claimed it (it tags hydrated nodes with an
 * internal `__reactFiber$` key). Should that key ever change, the reveals simply stay off: nothing hides.
 */
const hydrated = (element: Element) => Object.keys(element).some((key) => key.startsWith("__reactFiber$"));

/** One thing waiting below the fold: how many cascade steps it takes and how to bring it in. */
type Unit = { steps: number; play: (delay: number) => void };

/**
 * The site's scroll reveals, mounted once in the root layout, so pages only mark what moves and stay
 * server components:
 *
 * - `data-reveal="lines"` on a heading: its lines rise from behind their own clip, one after another.
 * - `data-reveal="fade"` on a block: it rises 16px and fades in.
 * - `data-reveal="stagger"` on a list or grid: its children fade up in turn, row by row as they arrive.
 * - `data-reveal="parallax"` on a photo inside a clipping frame: it drifts a little while the frame crosses the screen.
 *
 * Whatever reaches the reveal line together plays in page order, one short step apart. Only what is still
 * below that line once the page has settled is held back, so the first screen never blinks and nothing is
 * hidden without JavaScript. Held-back blocks keep their place and stay focusable (opacity, not
 * visibility), and every reveal hands the element back to its own CSS when it ends. Under reduced motion
 * nothing is touched. A `Reveal` block (`data-reveal-scope`) runs its own entrance and is left alone.
 * Marks are picked up only once React has hydrated them (see `hydrated`).
 */
export function ScrollReveals() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", (context) => {
        const handled = new WeakSet<Element>();
        const units = new Map<Element, Unit>();

        const fade = (element: HTMLElement): Unit => {
          const opacity = getComputedStyle(element).opacity;
          gsap.set(element, { opacity: 0, y: motion.rise, transition: "none" });
          return {
            steps: 1,
            play: (delay) =>
              gsap.to(element, { opacity, y: 0, duration: motion.duration, ease, delay, clearProps: "opacity,transform,transition" }),
          };
        };

        const lines = (heading: HTMLElement): Unit => {
          let revealed = false;
          const split = SplitText.create(heading, {
            type: "lines",
            mask: "lines",
            linesClass: "reveal-line",
            autoSplit: true,
            // Lines wait below their clip until the heading is reached; a re-split after that (fonts, resize) shows them as they are.
            onSplit: (self) => {
              if (!revealed) gsap.set(self.lines, { yPercent: 110, opacity: 0 });
            },
          });
          return {
            steps: split.lines.length,
            play: (delay) => {
              revealed = true;
              gsap.to(split.lines, {
                yPercent: 0,
                opacity: 1,
                duration: motion.lineDuration,
                stagger: motion.stagger,
                ease,
                delay,
                // Back to the heading as written: no masks left to clip an italic descender.
                onComplete: () => split.revert(),
              });
            },
          };
        };

        const parallax = (photo: HTMLElement) => {
          const frame = photo.parentElement;
          if (!frame) return;
          gsap.fromTo(
            photo,
            { yPercent: -motion.parallax, scale: motion.parallaxScale },
            {
              yPercent: motion.parallax,
              scale: motion.parallaxScale,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: motion.scrub },
            },
          );
        };

        // Arrivals play in page order: a heading's lines first, then whatever came with it, a step apart.
        const play = (elements: Element[], triggers: ScrollTrigger[]) => {
          triggers.forEach((trigger) => trigger.kill());
          let step = 0;
          [...elements]
            .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
            .forEach((element) => {
              const unit = units.get(element);
              if (!unit) return;
              units.delete(element);
              unit.play(cascadeDelay(step));
              step += unit.steps;
            });
        };

        /** Picks up every hydrated mark not seen yet: `found` when something new was set up, `pending` while some wait for hydration. */
        const scan = () => {
          const main = document.querySelector("main");
          if (!main) return { found: false, pending: true };
          const viewport = window.innerHeight;
          const waiting: HTMLElement[] = [];
          const hold = (element: HTMLElement, make: (element: HTMLElement) => Unit) => {
            if (isRevealed(element, viewport)) return;
            units.set(element, make(element));
            waiting.push(element);
          };
          let found = false;
          let pending = false;
          main.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
            if (handled.has(element) || element.closest("[data-reveal-scope]")) return;
            if (!hydrated(element)) {
              pending = true;
              return;
            }
            handled.add(element);
            found = true;
            const kind = element.dataset.reveal;
            if (kind === "parallax") parallax(element);
            else if (kind === "stagger") {
              for (const child of element.children) if (child instanceof HTMLElement) hold(child, fade);
            } else hold(element, kind === "lines" ? lines : fade);
          });
          // onLeave as well as onEnter, so a jump past a block (an anchor link, a restored scroll) still shows it.
          if (waiting.length) ScrollTrigger.batch(waiting, { start: motion.start, interval: 0.1, onEnter: play, onLeave: play });
          return { found, pending };
        };

        // Marks still waiting for hydration are retried every 200ms (for up to 30s); content that streams in
        // later (Suspense) is picked up as it lands. New triggers measure themselves; the others are only
        // re-measured when content lands after the first setup (a refresh stops a gliding anchor scroll, so
        // it is never spent on the first one).
        let frame = 0;
        let retry = 0;
        let setUp = false;
        const deadline = performance.now() + 30_000;
        const run = () =>
          context.add(() => {
            const { found, pending } = scan();
            if (found && setUp) ScrollTrigger.refresh();
            setUp ||= found;
            window.clearTimeout(retry);
            if (pending && performance.now() < deadline) retry = window.setTimeout(run, 200);
          });
        frame = requestAnimationFrame(run);
        const observer = new MutationObserver(() => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(run);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // A resize or a rotation can bring waiting blocks on screen without any scrolling (a taller window,
        // a phone turned upright). Whatever now sits above the line plays; at the very end of the page,
        // where nothing can scroll further up, everything on screen does.
        let resized = 0;
        const sweep = () => {
          const root = document.documentElement;
          const atEnd = window.scrollY >= root.scrollHeight - window.innerHeight - 1;
          const line = window.innerHeight * (atEnd ? 1 / 0.88 : 1);
          const ready = [...units.keys()].filter((element) => isRevealed(element, line));
          if (ready.length) context.add(() => play(ready, []));
        };
        const onResize = () => {
          window.clearTimeout(resized);
          resized = window.setTimeout(sweep, 250);
        };
        ScrollTrigger.addEventListener("refresh", sweep);
        window.addEventListener("resize", onResize);

        return () => {
          ScrollTrigger.removeEventListener("refresh", sweep);
          window.removeEventListener("resize", onResize);
          window.clearTimeout(resized);
          observer.disconnect();
          cancelAnimationFrame(frame);
          window.clearTimeout(retry);
        };
      });
    },
    // A new page starts afresh: the last page's reveals are reverted and the new one scanned after Next has scrolled it to the top.
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
