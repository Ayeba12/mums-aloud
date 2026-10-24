"use client";

import { useActionState, useId } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { subscribeToNewsletter, type NewsletterState } from "@/app/actions/newsletter";
import { footerNewsletter as copy } from "@/content/newsletter";

const initial: NewsletterState = { status: "idle" };

/** The reference's email pill: a single field with the arrow button inside it. */
export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeToNewsletter, initial);
  const id = useId();
  const invalid = state.status === "error";

  return (
    <form action={action} noValidate className="flex flex-col gap-2">
      <label htmlFor={`${id}-email`} className="font-semibold text-ink">
        {copy.heading}
      </label>
      <div
        className={`flex min-h-14 items-center rounded-pill border-2 bg-black-100 pr-2 pl-5 focus-within:outline-3 focus-within:outline-offset-4 focus-within:outline-focus ${invalid ? "border-error" : "border-transparent"}`}
      >
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={copy.placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={`${id}-status`}
          className="min-w-0 flex-1 bg-transparent py-3 text-base text-ink outline-none placeholder:text-text-secondary"
        />
        <input type="hidden" name="source" value="mumsaloud.com footer" />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-pill bg-accent text-on-accent hover:bg-marigold-200 disabled:cursor-wait"
        >
          <ArrowRightIcon aria-hidden size={20} weight="bold" />
          <span className="sr-only">{pending ? "Sending" : "Subscribe"}</span>
        </button>
      </div>
      <p id={`${id}-status`} role="status" className={`text-caption ${invalid ? "font-semibold text-error" : "text-text-secondary"}`}>
        {state.message ?? copy.hint}
      </p>
    </form>
  );
}
