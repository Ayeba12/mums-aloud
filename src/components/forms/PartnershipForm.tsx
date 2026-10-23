"use client";

import { useActionState, useId, type ReactNode } from "react";
import { sendPartnershipEnquiry, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { enquiry } from "@/content/partnership";
import type { ContactFields } from "@/lib/contact";

const initial: ContactState = { status: "idle" };

const fieldClasses = (invalid: boolean) =>
  `min-h-12 w-full rounded-control border-2 bg-black-100 px-4 py-3 text-base text-ink placeholder:text-text-secondary focus:outline-3 focus:outline-offset-2 focus:outline-focus ${
    invalid ? "border-error" : "border-transparent"
  }`;

/**
 * The partnership enquiry form: name, email, organisation, phone and message, always filed as a
 * partnership enquiry. Inline errors, a honeypot, and a status line that tells the truth.
 */
export function PartnershipForm() {
  const [state, action, pending] = useActionState(sendPartnershipEnquiry, initial);
  const id = useId();
  const errors = state.errors ?? {};
  const values: Partial<ContactFields> = state.values ?? {};
  const { labels, placeholders } = enquiry.form;

  if (state.status === "success") {
    return (
      <p role="status" className="rounded-card bg-surface p-6 text-ink">
        {state.message}
      </p>
    );
  }

  const field = (name: keyof ContactFields) => ({
    id: `${id}-${name}`,
    name,
    defaultValue: values[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    className: fieldClasses(Boolean(errors[name])),
  });

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label={labels.name} error={errors.name} errorId={`${id}-name-error`}>
          <input {...field("name")} type="text" autoComplete="name" required placeholder={placeholders.name} />
        </Field>
        <Field id={`${id}-email`} label={labels.email} error={errors.email} errorId={`${id}-email-error`}>
          <input {...field("email")} type="email" autoComplete="email" required placeholder={placeholders.email} />
        </Field>
        <Field id={`${id}-organisation`} label={labels.organisation} error={errors.organisation} errorId={`${id}-organisation-error`}>
          <input {...field("organisation")} type="text" autoComplete="organization" required placeholder={placeholders.organisation} />
        </Field>
        <Field id={`${id}-phone`} label={labels.phone} error={errors.phone} errorId={`${id}-phone-error`}>
          <input {...field("phone")} type="tel" autoComplete="tel" placeholder={placeholders.phone} />
        </Field>
      </div>
      <Field id={`${id}-message`} label={labels.message} error={errors.message} errorId={`${id}-message-error`}>
        <textarea {...field("message")} rows={6} required placeholder={placeholders.message} className={`${fieldClasses(Boolean(errors.message))} min-h-40 resize-y`} />
      </Field>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="large" arrow disabled={pending} aria-busy={pending || undefined}>
          {pending ? enquiry.form.sending : enquiry.form.submit}
        </Button>
        <p className="text-caption text-text-secondary">{enquiry.form.privacy}</p>
      </div>

      {state.status !== "idle" && state.message && (
        <p role="status" className={`rounded-card bg-surface p-4 ${state.status === "error" ? "font-semibold text-error" : "text-ink"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}

function Field({ id, label, error, errorId, children }: { id: string; label: string; error?: string; errorId: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-caption font-semibold text-error">
          {error}
        </p>
      )}
    </div>
  );
}
