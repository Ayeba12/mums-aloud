"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { calculators } from "@/content/resources";
import { parseDateInput, pregnancyEstimate, type PregnancyEstimate } from "@/lib/calculators";

const longDate = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const fieldClasses =
  "min-h-12 w-full rounded-control border-2 border-transparent bg-black-100 px-4 py-3 text-base text-ink focus:outline-3 focus:outline-offset-2 focus:outline-focus";

/** The live site's pregnancy calculator, rebuilt: last period to due date, weeks today and trimester. */
export function PregnancyCalculator() {
  const copy = calculators.pregnancy;
  const id = useId();
  const [result, setResult] = useState<PregnancyEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lastPeriod = parseDateInput(String(new FormData(event.currentTarget).get("lastPeriod") ?? ""));
    if (!lastPeriod) {
      setResult(null);
      setError("Please enter the first day of your last period.");
      return;
    }
    const estimate = pregnancyEstimate(lastPeriod, new Date());
    if (!estimate) {
      setResult(null);
      setError("That date is in the future or more than 42 weeks ago. Please check it.");
      return;
    }
    setError(null);
    setResult(estimate);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 sm:max-w-sm">
        <label htmlFor={`${id}-last`} className="font-semibold text-ink">
          {copy.labels.lastPeriod}
        </label>
        <input id={`${id}-last`} name="lastPeriod" type="date" required className={fieldClasses} aria-describedby={error ? `${id}-error` : undefined} />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-caption font-semibold text-error">
          {error}
        </p>
      )}
      <div>
        <Button type="submit" size="large" arrow>
          {copy.labels.submit}
        </Button>
      </div>
      <div role="status" aria-live="polite">
        {result && (
          <dl className="grid gap-4 rounded-card bg-surface p-6 sm:grid-cols-2">
            <div>
              <dt className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{copy.results.dueDate}</dt>
              <dd className="mt-1 font-heading text-h4 text-ink">{longDate.format(result.dueDate)}</dd>
            </div>
            <div>
              <dt className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{copy.results.progress}</dt>
              <dd className="mt-1 font-heading text-h4 text-ink">
                {result.weeks} {result.weeks === 1 ? "week" : "weeks"} and {result.days} {result.days === 1 ? "day" : "days"}
              </dd>
            </div>
            <div>
              <dt className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{copy.results.trimester}</dt>
              <dd className="mt-1 font-heading text-h4 text-ink">{["First", "Second", "Third"][result.trimester - 1]}</dd>
            </div>
            <div>
              <dt className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{copy.results.conception}</dt>
              <dd className="mt-1 font-heading text-h4 text-ink">{longDate.format(result.conception)}</dd>
            </div>
          </dl>
        )}
      </div>
    </form>
  );
}
