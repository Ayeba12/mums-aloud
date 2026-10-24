"use client";

import Image from "next/image";
import { useActionState, useEffect, useId, useRef } from "react";
import { XIcon } from "@phosphor-icons/react";
import { subscribeToNewsletter, type NewsletterState } from "@/app/actions/newsletter";
import { Tag } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { newsletterDialog as copy } from "@/content/newsletter";
import photo from "@/assets/photos/hero-mother-baby-golden-hour.jpg";

const initial: NewsletterState = { status: "idle" };
const fieldClasses = (invalid: boolean) =>
  `min-h-12 w-full rounded-control border-2 bg-black-100 px-4 py-3 text-base text-ink placeholder:text-text-secondary focus:outline-3 focus:outline-offset-2 focus:outline-focus ${
    invalid ? "border-error" : "border-transparent"
  }`;

/**
 * The newsletter sign-up as a dialog. Mounted once in the layout; any link to `#newsletter`
 * (every "Get the newsletter" button and menu item) opens it instead of jumping to the footer,
 * which stays the no-script fallback. Native <dialog>: focus is held, Escape closes, the page
 * behind cannot be reached and does not scroll.
 */
export function NewsletterDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [state, action, pending] = useActionState(subscribeToNewsletter, initial);
  const id = useId();
  const errors = state.errors ?? {};
  const values = state.values ?? { email: "", firstName: "" };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a[href$="#newsletter"]');
      if (!anchor || !ref.current) return;
      event.preventDefault();
      ref.current.showModal();
      // Focus the first field so a keyboard user lands on the form, not the close button.
      ref.current.querySelector<HTMLInputElement>("input[name=firstName]")?.focus();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-heading`}
      onClick={(event) => {
        // A click on the backdrop (the dialog element itself, outside the panel) closes it.
        if (event.target === ref.current) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-[56rem] translate-y-2 rounded-panel bg-surface p-0 text-text opacity-0 shadow-raised transition-[opacity,translate,overlay,display] transition-discrete duration-200 ease-standard backdrop:bg-black-950/40 backdrop:opacity-0 backdrop:backdrop-blur-sm backdrop:transition-[opacity,overlay,display] backdrop:transition-discrete backdrop:duration-200 open:translate-y-0 open:opacity-100 open:backdrop:opacity-100 starting:open:translate-y-2 starting:open:opacity-0 starting:open:backdrop:opacity-0 motion-reduce:transition-none"
    >
      <div className="grid overflow-hidden rounded-panel md:grid-cols-[2fr_3fr]">
        <div className="relative hidden min-h-full md:block">
          <Image src={photo} alt="" fill placeholder="blur" sizes="(min-width: 48rem) 22rem, 0px" className="object-cover object-[50%_30%]" />
          <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-black-950)_55%,transparent),transparent_60%)]" />
        </div>
        <div className="relative p-6 md:p-8 lg:p-10">
          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 inline-flex size-12 cursor-pointer items-center justify-center rounded-pill text-ink transition-colors duration-150 hover:bg-surface-tinted focus:outline-3 focus:outline-offset-2 focus:outline-focus active:scale-[0.96]"
          >
            <XIcon aria-hidden size={24} />
            <span className="sr-only">{copy.close}</span>
          </button>
          <Tag>{copy.tag}</Tag>
          <h2 id={`${id}-heading`} className="mt-2 max-w-[16ch] text-h3 tracking-tight text-balance">
            <Accent {...copy.heading} />
          </h2>
          {state.status === "success" ? (
            <div className="mt-4">
              <p role="status" className="rounded-card bg-surface-card p-4 text-ink">
                {state.message}
              </p>
              <Button type="button" variant="secondary" onClick={close} className="mt-6">
                {copy.done}
              </Button>
            </div>
          ) : (
            <>
              <p className="mt-4 max-w-[44ch] text-pretty">{copy.intro}</p>
              <form action={action} noValidate className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor={`${id}-first`} className="font-semibold text-ink">
                    {copy.labels.firstName}
                  </label>
                  <input
                    id={`${id}-first`}
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    defaultValue={values.firstName}
                    placeholder={copy.placeholders.firstName}
                    aria-invalid={errors.firstName ? true : undefined}
                    className={fieldClasses(Boolean(errors.firstName))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor={`${id}-email`} className="font-semibold text-ink">
                    {copy.labels.email}
                  </label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    defaultValue={values.email}
                    placeholder={copy.placeholders.email}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={`${id}-status`}
                    className={fieldClasses(Boolean(errors.email))}
                  />
                </div>
                <input type="hidden" name="source" value="mumsaloud.com dialog" />
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button type="submit" size="large" arrow disabled={pending} aria-busy={pending || undefined}>
                    {pending ? copy.sending : copy.submit}
                  </Button>
                </div>
                <p id={`${id}-status`} role="status" className={`text-caption ${state.status === "error" ? "font-semibold text-error" : "text-text-secondary"}`}>
                  {state.status !== "idle" && state.message ? state.message : copy.consent}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
