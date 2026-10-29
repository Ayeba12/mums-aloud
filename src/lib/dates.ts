/** Dates as the site writes them: "30 October 2024". */
export const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** A date with its time in London, for emails and records: "29 October 2026 at 12:45". */
export const dateTimeFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" });
