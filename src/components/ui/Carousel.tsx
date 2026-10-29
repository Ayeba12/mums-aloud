"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { slideIndex, trackEdges } from "./carousel-math";

const arrowButton =
  "inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-pill bg-accent text-on-accent transition-[background-color,scale] duration-150 ease-standard hover:bg-accent-hover active:scale-[0.96] disabled:cursor-not-allowed disabled:bg-black-100 disabled:text-black-700 motion-reduce:active:scale-100";

/** One slide plus the gap after it: the distance between two snap points. */
function strideOf(list: HTMLUListElement): number {
  const first = list.firstElementChild as HTMLElement | null;
  if (!first) return 0;
  return first.offsetWidth + (parseFloat(getComputedStyle(list).columnGap) || 0);
}

/**
 * The reference's slider: a scroll-snap row with previous and next arrows. Built on native
 * horizontal scrolling, so touch, trackpad and keyboard work without the arrows; the arrows
 * go to the neighbouring snap point and the counter says where you are. The caller hides
 * the controls at the width where the row becomes a grid.
 */
export function Carousel({
  count,
  className = "",
  controlsClassName = "",
  children,
}: {
  count: number;
  className?: string;
  controlsClassName?: string;
  children: ReactNode;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ index: 0, atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const list = track.current;
    if (!list) return;
    setPosition({
      index: slideIndex(list.scrollLeft, strideOf(list), 0),
      ...trackEdges(list.scrollLeft, list.clientWidth, list.scrollWidth),
    });
  }, []);

  useEffect(() => {
    const list = track.current;
    if (!list) return;
    measure();
    list.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => {
      list.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const move = (direction: -1 | 1) => {
    const list = track.current;
    if (!list) return;
    const stride = strideOf(list);
    const target = Math.min(Math.max(slideIndex(list.scrollLeft, stride, 0) + direction, 0), count - 1);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: target * stride, behavior: reduced ? "instant" : "smooth" });
  };

  return (
    <>
      <ul ref={track} data-reveal="stagger" className={`[scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}>
        {children}
      </ul>
      <div className={`mt-6 flex items-center gap-3 ${controlsClassName}`}>
        <button type="button" aria-label="Previous" disabled={position.atStart} onClick={() => move(-1)} className={arrowButton}>
          <ArrowLeftIcon aria-hidden size={20} weight="bold" />
        </button>
        <button type="button" aria-label="Next" disabled={position.atEnd} onClick={() => move(1)} className={arrowButton}>
          <ArrowRightIcon aria-hidden size={20} weight="bold" />
        </button>
        <p className="ml-1 text-caption font-semibold text-text-secondary tabular-nums" aria-live="polite">
          <span className="sr-only">Showing </span>
          {Math.min(position.index + 1, count)} / {count}
        </p>
      </div>
    </>
  );
}
