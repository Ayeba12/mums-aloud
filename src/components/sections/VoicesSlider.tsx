"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, PauseIcon, PlayIcon } from "@phosphor-icons/react/ssr";
import { centreDistance, centredIndex, centredScrollLeft, loopShift } from "@/components/ui/carousel-math";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export type Portrait = { src: StaticImageData; alt: string; position: string };

/** Time each card holds the centre: the reference's 2.5s delay plus most of its 1s slide. */
const HOLD = 3000;
/** Quiet time after the last scroll event before the row counts as settled on a card. */
const SETTLE = 120;
/** The row is rendered three times so the loop never reaches an edge; the middle copy is the live one. */
const COPIES = 3;

const arrowButton =
  "inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-pill bg-accent text-on-accent transition-[background-color,scale] duration-150 ease-standard hover:bg-accent-hover active:scale-[0.96] motion-reduce:active:scale-100";
const playButton =
  "inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-pill border border-on-photo/40 text-on-photo transition-[background-color,scale] duration-150 ease-standard hover:bg-on-photo/15 active:scale-[0.96] motion-reduce:active:scale-100";

/** The card width and the gap after it: together the distance between two centred cards. */
function metrics(list: HTMLUListElement) {
  const first = list.firstElementChild as HTMLElement | null;
  const slide = first?.offsetWidth ?? 0;
  const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
  return { slide, gap, stride: slide + gap };
}
/** Scroll position that centres card `index`. */
const leftFor = (list: HTMLUListElement, index: number) => {
  const { slide, gap } = metrics(list);
  return centredScrollLeft(index, slide, gap, list.clientWidth);
};
/** The card nearest the centre now. */
const indexAt = (list: HTMLUListElement) => {
  const { slide, gap } = metrics(list);
  return centredIndex(list.scrollLeft, slide, gap, list.clientWidth);
};

/**
 * The reference's testimonial slider, for the voices strip: one card holds the centre in full
 * colour while its neighbours sit dimmed, smaller and desaturated. Here the dimming follows each
 * card's distance from the centre as it moves, so a swipe fades one card up as the other fades
 * down. Native horizontal scroll with snap points, so touch, trackpad and keyboard all work; the
 * arrows step one card, the row advances itself every few seconds and loops, and it holds while
 * hovered, focused, paused, off screen or under reduced motion.
 */
export function VoicesSlider({ portraits, label }: { portraits: Portrait[]; label: string }) {
  const count = portraits.length;
  const region = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(count);
  const pending = useRef<number | null>(null);
  const programmatic = useRef(false);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(count);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);

  /** Sets each card's distance from the centre (0 to 1) as a custom property the CSS dims by. */
  const paint = useCallback(() => {
    const list = track.current;
    if (!list) return;
    const { stride } = metrics(list);
    if (!stride) return;
    const centre = list.scrollLeft + list.clientWidth / 2;
    for (const card of Array.from(list.children) as HTMLElement[]) {
      card.style.setProperty("--t", centreDistance(card.offsetLeft + card.offsetWidth / 2 - centre, stride).toFixed(3));
    }
  }, []);

  const moveBy = useCallback(
    (direction: 1 | -1) => {
      const list = track.current;
      if (!list) return;
      if (!metrics(list).stride) return;
      const target = (pending.current ?? indexRef.current) + direction;
      pending.current = target;
      programmatic.current = true;
      list.scrollTo({ left: leftFor(list, target), behavior: reduced ? "instant" : "smooth" });
    },
    [reduced],
  );

  useEffect(() => {
    const list = track.current;
    if (!list) return;
    // Start on the middle copy so there is always a card on either side.
    programmatic.current = true;
    list.scrollTo({ left: leftFor(list, count), behavior: "instant" });
    paint();

    let frame = 0;
    const onSettle = () => {
      const { stride } = metrics(list);
      const at = indexAt(list);
      const shift = loopShift(at, count);
      const fromUser = !programmatic.current;
      programmatic.current = false;
      pending.current = null;
      if (shift) {
        // Past the middle copy: jump a whole copy while the cards line up, which the eye cannot see.
        programmatic.current = true;
        list.scrollTo({ left: list.scrollLeft + shift * stride, behavior: "instant" });
      }
      indexRef.current = at + shift;
      setIndex(at + shift);
      if (fromUser) setCycle((value) => value + 1);
    };
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          paint();
        });
      }
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(onSettle, SETTLE);
    };
    list.addEventListener("scroll", onScroll, { passive: true });

    // Keep the current card centred when the width changes.
    const resize = new ResizeObserver(() => {
      programmatic.current = true;
      list.scrollTo({ left: leftFor(list, indexRef.current), behavior: "instant" });
      paint();
    });
    resize.observe(list);

    const seen = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    if (region.current) seen.observe(region.current);

    return () => {
      list.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      if (settleTimer.current) clearTimeout(settleTimer.current);
      resize.disconnect();
      seen.disconnect();
    };
  }, [count, paint]);

  const running = visible && !paused && !held && !reduced;
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (!document.hidden) moveBy(1);
    }, HOLD);
    return () => clearInterval(id);
    // `cycle` restarts the hold after a swipe or an arrow press.
  }, [running, moveBy, cycle]);

  const step = (direction: 1 | -1) => {
    moveBy(direction);
    setCycle((value) => value + 1);
  };
  const shown = (((index - count) % count) + count) % count;

  return (
    <div
      ref={region}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHeld(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHeld(false);
      }}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      {/* Decorative stock portraits, rendered three times for the loop; the controls below carry the accessible state. */}
      <ul
        ref={track}
        aria-hidden
        className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden"
        style={{ ["--slide" as string]: "clamp(11rem, 48vw, 21.75rem)" }}
      >
        {Array.from({ length: COPIES }, (_, copy) =>
          portraits.map((photo, position) => (
            <li key={`${copy}-${position}`} className="w-(--slide) shrink-0 snap-center [--t:0]">
              <div className="aspect-[2/3] w-full overflow-hidden rounded-panel [filter:saturate(calc(1_-_0.68_*_var(--t)))] [opacity:calc(1_-_0.6_*_var(--t))] [scale:calc(1_-_0.04_*_var(--t))]">
                <Image
                  src={photo.src}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 48rem) 21.75rem, 48vw"
                  className={`size-full object-cover ${photo.position}`}
                />
              </div>
            </li>
          )),
        )}
      </ul>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className={arrowButton}>
          <ArrowLeftIcon aria-hidden size={20} weight="bold" />
        </button>
        {!reduced && (
          <button type="button" aria-label={paused ? "Play" : "Pause"} onClick={() => setPaused((value) => !value)} className={playButton}>
            {paused ? <PlayIcon aria-hidden size={20} weight="fill" /> : <PauseIcon aria-hidden size={20} weight="fill" />}
          </button>
        )}
        <button type="button" aria-label="Next photo" onClick={() => step(1)} className={arrowButton}>
          <ArrowRightIcon aria-hidden size={20} weight="bold" />
        </button>
        <p className="ml-1 text-caption font-semibold text-text-secondary tabular-nums" aria-live="polite">
          <span className="sr-only">Photo </span>
          {shown + 1}
          <span aria-hidden> / </span>
          <span className="sr-only">of </span>
          {count}
        </p>
      </div>
    </div>
  );
}
