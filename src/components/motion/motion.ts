/**
 * The site's one motion language, shared by every GSAP animation so scroll reveals, the council's
 * `Reveal` and the Partnership process steps move alike (the curve is in `ease.ts`). The CSS
 * entrances in `globals.css` use the same distance and timing.
 */
export const motion = {
  /** How far a block or card travels up as it fades in. */
  rise: 16,
  /** A block or card fading up. */
  duration: 0.8,
  /** Heading lines rising from behind their clip. */
  lineDuration: 0.9,
  /** Gap between heading lines, and between things that arrive together. */
  stagger: 0.08,
  /** The most a cascade waits before its last item starts, so a long row never drags. */
  maxDelay: 0.48,
  /** Where an element starts revealing: its top crossing 88% of the viewport (clamped so the page's last blocks still reach it). */
  start: "clamp(top 88%)",
  /** Photo parallax: the photo drifts this far (per cent of its height) each way while its frame crosses the screen. */
  parallax: 5,
  /** The parallax photo is enlarged this much so the drift never shows an edge. */
  parallaxScale: 1.12,
  /** Seconds the parallax takes to catch up with the scroll, which smooths wheel steps. */
  scrub: 0.6,
} as const;

/** True when an element's top is already above the reveal line, so it is on screen (or scrolled past) and must not be hidden. */
export function isRevealed(element: Element, viewportHeight: number) {
  return element.getBoundingClientRect().top < viewportHeight * 0.88;
}

/** When the nth thing to arrive together starts: one stagger step after the last, never later than `maxDelay`. */
export function cascadeDelay(index: number) {
  return Math.min(Math.max(index, 0) * motion.stagger, motion.maxDelay);
}
