/**
 * The two calculators from the live site, rebuilt on the standard rules of thumb. They give
 * estimates only; the pages say so and point to a midwife or GP.
 */

const DAY = 24 * 60 * 60 * 1000;

export const CYCLE = { min: 21, max: 45, typical: 28 } as const;
const LUTEAL_PHASE_DAYS = 14;
const PREGNANCY_DAYS = 280;

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY);
}

/** Whole days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from: Date, to: Date): number {
  return Math.floor((startOfDay(to).getTime() - startOfDay(from).getTime()) / DAY);
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Parses an input[type=date] value; null when it is blank or not a real date. */
export function parseDateInput(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) || date.getMonth() !== Number(match[2]) - 1 ? null : date;
}

export type FertileWindow = { ovulation: Date; fertileStart: Date; fertileEnd: Date; nextPeriod: Date };

/**
 * Ovulation is taken as 14 days before the next period (the luteal phase), so cycle length
 * minus 14 days after the first day of the last period; the fertile window runs from five days
 * before ovulation to the day after.
 */
export function fertileWindow(lastPeriod: Date, cycleLength: number): FertileWindow | null {
  if (!Number.isInteger(cycleLength) || cycleLength < CYCLE.min || cycleLength > CYCLE.max) return null;
  const start = startOfDay(lastPeriod);
  const ovulation = addDays(start, cycleLength - LUTEAL_PHASE_DAYS);
  return { ovulation, fertileStart: addDays(ovulation, -5), fertileEnd: addDays(ovulation, 1), nextPeriod: addDays(start, cycleLength) };
}

export type PregnancyEstimate = { dueDate: Date; weeks: number; days: number; trimester: 1 | 2 | 3; conception: Date };

/** Naegele's rule: due date is 280 days from the first day of the last period. Progress is measured at `today`. */
export function pregnancyEstimate(lastPeriod: Date, today: Date): PregnancyEstimate | null {
  const start = startOfDay(lastPeriod);
  const elapsed = daysBetween(start, today);
  if (elapsed < 0 || elapsed > PREGNANCY_DAYS + 14) return null;
  const weeks = Math.floor(elapsed / 7);
  const trimester = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;
  return { dueDate: addDays(start, PREGNANCY_DAYS), weeks, days: elapsed % 7, trimester, conception: addDays(start, 14) };
}
