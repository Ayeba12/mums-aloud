"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useRef } from "react";
import { ArrowRightIcon, XIcon } from "@phosphor-icons/react/ssr";
import { Tag } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import type { Profile } from "@/content/about";

/**
 * "Read bio" on a profile card: opens the person's biography in a dialog, as the previous site's
 * pop-ups did. Native <dialog>: focus is held inside, Escape or the backdrop closes it, focus
 * returns to the button, and the page behind holds still (globals.css). Portrait beside the text
 * from `md`, above it on phones; the whole panel scrolls when a biography runs long.
 */
export function BioDialog({
  person,
  photo,
  position = "object-top",
  context,
}: {
  person: Profile & { bio: string[] };
  photo?: StaticImageData;
  position?: string;
  /** The tag over the name, naming the group the person belongs to. */
  context: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const close = () => ref.current?.close();

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => ref.current?.showModal()}
        className="group/bio mt-3 inline-flex min-h-12 cursor-pointer items-center gap-2 font-semibold text-action transition-colors duration-150 hover:text-action-hover"
      >
        Read bio
        <ArrowRightIcon aria-hidden size={16} weight="bold" className="transition-transform duration-150 group-hover/bio:translate-x-1 motion-reduce:transition-none" />
        <span className="sr-only">: {person.name}</span>
      </button>
      <dialog
        ref={ref}
        aria-labelledby={`${id}-name`}
        onClick={(event) => {
          // A click on the backdrop (the dialog element itself, outside the panel) closes it.
          if (event.target === ref.current) close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[52rem] translate-y-2 overflow-y-auto rounded-panel bg-surface p-0 text-text opacity-0 shadow-raised transition-[opacity,translate,overlay,display] transition-discrete duration-200 ease-standard backdrop:bg-scrim/40 backdrop:opacity-0 backdrop:backdrop-blur-sm backdrop:transition-[opacity,overlay,display] backdrop:transition-discrete backdrop:duration-200 open:translate-y-0 open:opacity-100 open:backdrop:opacity-100 starting:open:translate-y-2 starting:open:opacity-0 starting:open:backdrop:opacity-0 motion-reduce:transition-none"
      >
        <div className="grid md:grid-cols-[2fr_3fr]">
          {photo && (
            <div className="relative aspect-[4/3] md:aspect-[4/5] md:self-start">
              <Image src={photo} alt={`${person.name}, ${person.role}`} fill placeholder="blur" sizes="(min-width: 48rem) 21rem, 100vw" className={`object-cover ${position}`} />
            </div>
          )}
          <div className="relative p-6 md:p-8 lg:p-10">
            <button
              type="button"
              onClick={close}
              className="absolute top-3 right-3 inline-flex size-12 cursor-pointer items-center justify-center rounded-pill text-ink transition-colors duration-150 hover:bg-surface-tinted focus:outline-3 focus:outline-offset-2 focus:outline-focus active:scale-[0.96]"
            >
              <XIcon aria-hidden size={24} />
              <span className="sr-only">Close</span>
            </button>
            <Tag>{context}</Tag>
            <h2 id={`${id}-name`} className="mt-2 pr-12 text-h3 tracking-tight text-balance">
              {person.name}
            </h2>
            <p className="mt-1 text-lead text-text-secondary">{person.role}</p>
            <div className="mt-6 flex max-w-reading flex-col gap-4 text-reading">
              {person.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Button type="button" variant="secondary" onClick={close} className="mt-8">
              Close
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
