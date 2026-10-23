import { describe, expect, it } from "vitest";
import { daysBetween, fertileWindow, parseDateInput, pregnancyEstimate } from "./calculators";

const iso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

describe("parseDateInput", () => {
  it("accepts a real calendar date and rejects the rest", () => {
    expect(iso(parseDateInput("2026-10-01")!)).toBe("2026-10-01");
    expect(parseDateInput("2026-02-30")).toBeNull();
    expect(parseDateInput("")).toBeNull();
    expect(parseDateInput("1 Oct 2026")).toBeNull();
  });
});

describe("fertileWindow", () => {
  it("places ovulation 14 days before the next period", () => {
    const window = fertileWindow(new Date(2026, 9, 1), 28)!;
    expect(iso(window.ovulation)).toBe("2026-10-15");
    expect(iso(window.fertileStart)).toBe("2026-10-10");
    expect(iso(window.fertileEnd)).toBe("2026-10-16");
    expect(iso(window.nextPeriod)).toBe("2026-10-29");
  });

  it("follows the cycle length", () => {
    expect(iso(fertileWindow(new Date(2026, 9, 1), 35)!.ovulation)).toBe("2026-10-22");
  });

  it("refuses cycle lengths outside 21 to 45 days", () => {
    expect(fertileWindow(new Date(2026, 9, 1), 20)).toBeNull();
    expect(fertileWindow(new Date(2026, 9, 1), 46)).toBeNull();
    expect(fertileWindow(new Date(2026, 9, 1), 28.5)).toBeNull();
  });
});

describe("pregnancyEstimate", () => {
  it("puts the due date 280 days after the last period and counts weeks to today", () => {
    const estimate = pregnancyEstimate(new Date(2026, 0, 1), new Date(2026, 3, 1))!;
    expect(iso(estimate.dueDate)).toBe("2026-10-08");
    expect(estimate.weeks).toBe(12);
    expect(estimate.days).toBe(6);
    expect(estimate.trimester).toBe(1);
  });

  it("moves through the trimesters", () => {
    expect(pregnancyEstimate(new Date(2026, 0, 1), new Date(2026, 3, 2))!.trimester).toBe(2);
    expect(pregnancyEstimate(new Date(2026, 0, 1), new Date(2026, 6, 10))!.trimester).toBe(3);
  });

  it("returns nothing for a date in the future or too long ago", () => {
    expect(pregnancyEstimate(new Date(2026, 9, 1), new Date(2026, 8, 1))).toBeNull();
    expect(pregnancyEstimate(new Date(2025, 0, 1), new Date(2026, 8, 1))).toBeNull();
  });
});

describe("daysBetween", () => {
  it("ignores the time of day", () => {
    expect(daysBetween(new Date(2026, 9, 1, 23), new Date(2026, 9, 3, 1))).toBe(2);
  });
});
