"use client";

import { useActionState, useId, type ReactNode } from "react";
import { sendVolunteerApplication, type VolunteerState } from "@/app/actions/volunteer";
import { Button, buttonClasses } from "@/components/ui/Button";
import { apply } from "@/content/volunteer";
import type { VolunteerFields } from "@/lib/volunteer";

const initial: VolunteerState = { status: "idle" };

const fieldClasses = (invalid: boolean) =>
  `min-h-12 w-full rounded-control border-2 bg-black-100 px-4 py-3 text-base text-ink placeholder:text-text-secondary focus:outline-3 focus:outline-offset-2 focus:outline-focus ${
    invalid ? "border-error" : "border-transparent"
  }`;

/**
 * The volunteer application: names, email, phone, skills and availability. Inline errors, a
 * honeypot, a status line that tells the truth, and a prefilled email to the team when the
 * online form is not open yet.
 */
export function VolunteerForm() {
  const [state, action, pending] = useActionState(sendVolunteerApplication, initial);
  const id = useId();
  const errors = state.errors ?? {};
  const values: Partial<VolunteerFields> = state.values ?? {};
  const { labels, placeholders } = apply.form;

  if (state.status === "success") {
    return (
      <p role="status" className="rounded-card bg-surface p-6 text-ink">
        {state.message}
      </p>
    );
  }

  const field = (name: keyof VolunteerFields) => ({
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
        <Field id={`${id}-firstName`} label={labels.firstName} error={errors.firstName} errorId={`${id}-firstName-error`}>
          <input {...field("firstName")} type="text" autoComplete="given-name" required placeholder={placeholders.firstName} />
        </Field>
        <Field id={`${id}-lastName`} label={labels.lastName} error={errors.lastName} errorId={`${id}-lastName-error`}>
          <input {...field("lastName")} type="text" autoComplete="family-name" required placeholder={placeholders.lastName} />
        </Field>
        <Field id={`${id}-email`} label={labels.email} error={errors.email} errorId={`${id}-email-error`}>
          <input {...field("email")} type="email" autoComplete="email" required placeholder={placeholders.email} />
        </Field>
        <Field id={`${id}-phone`} label={labels.phone} error={errors.phone} errorId={`${id}-phone-error`}>
          <input {...field("phone")} type="tel" autoComplete="tel" placeholder={placeholders.phone} />
        </Field>
      </div>
      <Field id={`${id}-skills`} label={labels.skills} error={errors.skills} errorId={`${id}-skills-error`}>
        <textarea
          {...field("skills")}
          rows={5}
          required
          placeholder={placeholders.skills}
          className={`${fieldClasses(Boolean(errors.skills))} min-h-32 resize-y`}
        />
      </Field>
      <Field id={`${id}-availability`} label={labels.availability} error={errors.availability} errorId={`${id}-availability-error`}>
        <input {...field("availability")} type="text" autoComplete="off" required placeholder={placeholders.availability} />
      </Field>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="large" arrow disabled={pending} aria-busy={pending || undefined}>
          {pending ? apply.form.sending : apply.form.submit}
        </Button>
        <p className="text-caption text-text-secondary">{apply.form.privacy}</p>
      </div>

      {state.status !== "idle" && state.message && (
        <p role="status" className={`rounded-card bg-surface p-4 ${state.status === "error" ? "font-semibold text-error" : "text-ink"}`}>
          {state.message}
        </p>
      )}
      {state.fallback && (
        <a href={state.fallback.href} className={buttonClasses("secondary", "default", "self-start")}>
          {state.fallback.label}
        </a>
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
