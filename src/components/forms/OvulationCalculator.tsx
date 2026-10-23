"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { calculators } from "@/content/resources";
import { CYCLE, fertileWindow, parseDateInput, type FertileWindow } from "@/lib/calculators";

const longDate = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const shortDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long" });
const fieldClasses =
  "min-h-12 w-full rounded-control border-2 border-transparent bg-black-100 px-4 py-3 text-base text-ink focus:outline-3 focus:outline-offset-2 focus:outline-focus";

/** The live site's ovulation calculator, rebuilt: last period plus cycle length to a fertile window. */
export function OvulationCalculator() {
  const copy = calculators.ovulation;
  const id = useId();
  const [result, setResult] = useState<FertileWindow | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lastPeriod = parseDateInput(String(data.get("lastPeriod") ?? ""));
    const cycleLength = Number(data.get("cycleLength"));
    if (!lastPeriod) {
      setResult(null);
      setError("Please enter the first day of your last period.");
      return;
    }
    const window = fertileWindow(lastPeriod, cycleLength);
    if (!window) {
      setResult(null);
      setError(`Please choose a cycle length between ${CYCLE.min} and ${CYCLE.max} days.`);
      return;
    }
    setError(null);
    setResult(window);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-last`} className="font-semibold text-ink">
            {copy.labels.lastPeriod}
          </label>
          <input id={`${id}-last`} name="lastPeriod" type="date" required className={fieldClasses} aria-describedby={error ? `${id}-error` : undefined} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-cycle`} className="font-semibold text-ink">
            {copy.labels.cycleLength}
          </label>
          <select id={`${id}-cycle`} name="cycleLength" defaultValue={CYCLE.typical} className={fieldClasses}>
            {Array.from({ length: CYCLE.max - CYCLE.min + 1 }, (_, index) => CYCLE.min + index).map((days) => (
              <option key={days} value={days}>
                {days} days
              </option>
            ))}
          </select>
        </div>
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
          <dl className="grid gap-4 rounded-card bg-surface p-6 sm:grid-cols-3">
            <div>
              <dt className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{copy.results.fertile}</dt>
              <dd className="mt-1 font-heading text-h4 text-ink">
                {shortDate.format(result.fertileStart)} to {shortDate.format(result.fertileEnd)}
              </dd>
            </div>
            <div>
              <dt className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{copy.results.ovulation}</dt>
              <dd className="mt-1 font-heading text-h4 text-ink">{longDate.format(result.ovulation)}</dd>
            </div>
            <div>
              <dt className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{copy.results.nextPeriod}</dt>
              <dd className="mt-1 font-heading text-h4 text-ink">{longDate.format(result.nextPeriod)}</dd>
            </div>
          </dl>
        )}
      </div>
    </form>
  );
}
