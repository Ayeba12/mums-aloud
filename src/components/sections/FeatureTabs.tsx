"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { IconChip } from "@/components/layout/Section";

export type FeatureTab = {
  id: string;
  icon: ReactNode;
  title: string;
  text: string;
  photo: StaticImageData;
  alt: string;
  position?: string;
};

/**
 * The reference's feature tabs: one expanded item in a card, the rest collapsed,
 * and a portrait that changes with the open item. Built as a single-open accordion so
 * the description is real content, not a decoration; the photo swap is decorative.
 */
export function FeatureTabs({ items }: { items: FeatureTab[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const open = items[openIndex];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: items.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = (moves[event.key] + items.length) % items.length;
    buttons.current[next]?.focus();
  };

  return (
    <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-8">
      <ul className="flex flex-col gap-2 lg:col-span-5">
        {items.map((item, index) => {
          const isOpen = index === openIndex;
          const panelId = `${baseId}-${item.id}-panel`;
          const buttonId = `${baseId}-${item.id}-button`;
          return (
            <li key={item.id} className={`rounded-panel transition-colors duration-200 ${isOpen ? "bg-surface-card" : ""}`}>
              <h3 className="font-body text-h4 font-bold">
                <button
                  type="button"
                  id={buttonId}
                  ref={(node) => {
                    buttons.current[index] = node;
                  }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className="flex w-full cursor-pointer items-center gap-4 rounded-panel p-6 text-left text-ink hover:bg-surface-card"
                >
                  <IconChip>{item.icon}</IconChip>
                  {item.title}
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="px-6 pb-6 pl-22">
                <p>{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="lg:col-span-6 lg:col-start-7">
        {items.map((item, index) => (
          <Image
            key={item.id}
            src={item.photo}
            alt={index === openIndex ? item.alt : ""}
            placeholder="blur"
            sizes="(min-width: 64rem) 50vw, 100vw"
            className={`aspect-[3/4] w-full rounded-card object-cover md:aspect-auto md:h-[32rem] lg:h-[36rem] ${item.position ?? "object-center"} ${index === openIndex ? "" : "hidden"}`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing: {open.title}
      </p>
    </div>
  );
}
