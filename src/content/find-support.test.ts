import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { findSupport, type SupportEntry } from "./find-support";

const entries: SupportEntry[] = [...findSupport.urgent.entries, ...findSupport.groups.flatMap((group) => group.entries)];

describe("Find Support content", () => {
  it("gives every organisation an https website and, where there is a line, a matching dialable link", () => {
    for (const entry of entries) {
      expect(entry.url, entry.name).toMatch(/^https:\/\//);
      if (entry.phone) {
        expect(entry.phoneHref, entry.name).toBeDefined();
        const digits = entry.phone.replace(/\D/g, "");
        expect((entry.phoneHref ?? "").replace(/\D/g, ""), entry.name).toContain(digits.replace(/^0/, ""));
      }
    }
  });

  it("opens with the lines that are free and open day and night", () => {
    expect(findSupport.urgent.entries.map((entry) => entry.phone)).toEqual(["999", "111", "116 123", "Text SHOUT to 85258", "0808 2000 247"]);
    expect(findSupport.urgent.entries.every((entry) => /24 hours/.test(entry.hours ?? ""))).toBe(true);
  });

  it("flags the two lines still to be confirmed by hand", () => {
    expect(entries.filter((entry) => entry.confirm).map((entry) => entry.name)).toEqual(["Tommy's midwives", "NSPCC helpline"]);
  });
});

describe("site copy", () => {
  it("has no em or en dashes, as the owner asked", () => {
    const dir = __dirname;
    const offenders = readdirSync(dir)
      .filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"))
      .filter((file) => /[–—]/.test(readFileSync(join(dir, file), "utf8")));
    expect(offenders).toEqual([]);
  });
});
