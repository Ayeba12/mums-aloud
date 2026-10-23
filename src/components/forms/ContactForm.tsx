"use client";

import { useActionState, useId } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { contact } from "@/content/contact";
import { contactTopics, type ContactFields } from "@/lib/contact";

const initial: ContactState = { status: "idle" };

const fieldClasses = (invalid: boolean) =>
  `min-h-12 w-full rounded-control border-2 bg-black-100 px-4 py-3 text-base text-ink placeholder:text-text-secondary focus:outline-3 focus:outline-offset-2 focus:outline-focus ${
    invalid ? "border-error" : "border-transparent"
  }`;

/**
 * The contact form: five labelled fields with inline errors, a honeypot, and a status line that
 * tells the truth about what happened. Values come back from the action after a failed submit so
 * nothing typed is lost.
 */
export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initial);
  const id = useId();
  const { labels, placeholders } = contact.form;
  const errors = state.errors ?? {};
  const values: Partial<ContactFields> = state.values ?? {};

  if (state.status === "success") {
    return (
      <p role="status" className="rounded-card bg-surface-card p-6 text-ink">
        {state.message}
      </p>
    );
  }

  const describedBy = (field: keyof ContactFields) => (errors[field] ? `${id}-${field}-error` : undefined);

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label={labels.name} error={errors.name} errorId={`${id}-name-error`}>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={values.name ?? ""}
            placeholder={placeholders.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={fieldClasses(Boolean(errors.name))}
          />
        </Field>
        <Field id={`${id}-email`} label={labels.email} error={errors.email} errorId={`${id}-email-error`}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email ?? ""}
            placeholder={placeholders.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={fieldClasses(Boolean(errors.email))}
          />
        </Field>
        <Field id={`${id}-phone`} label={labels.phone} error={errors.phone} errorId={`${id}-phone-error`}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values.phone ?? ""}
            placeholder={placeholders.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={fieldClasses(Boolean(errors.phone))}
          />
        </Field>
        <Field id={`${id}-topic`} label={labels.topic} error={errors.topic} errorId={`${id}-topic-error`}>
          <select
            id={`${id}-topic`}
            name="topic"
            required
            defaultValue={values.topic ?? ""}
            aria-invalid={errors.topic ? true : undefined}
            aria-describedby={describedBy("topic")}
            className={fieldClasses(Boolean(errors.topic))}
          >
            <option value="" disabled>
              {contact.form.topicPrompt}
            </option>
            {contactTopics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id={`${id}-message`} label={labels.message} error={errors.message} errorId={`${id}-message-error`}>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          required
          defaultValue={values.message ?? ""}
          placeholder={placeholders.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message")}
          className={`${fieldClasses(Boolean(errors.message))} min-h-40 resize-y`}
        />
      </Field>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="large" arrow disabled={pending} aria-busy={pending || undefined}>
          {pending ? contact.form.sending : contact.form.submit}
        </Button>
        <p className="text-caption text-text-secondary">{contact.form.privacy}</p>
      </div>

      {state.status !== "idle" && state.message && (
        <p
          role="status"
          className={`rounded-card p-4 ${state.status === "error" ? "bg-surface-card font-semibold text-error" : "bg-surface-card text-ink"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

function Field({ id, label, error, errorId, children }: { id: string; label: string; error?: string; errorId: string; children: React.ReactNode }) {
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
