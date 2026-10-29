import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { VolunteerFields } from "./volunteer";
import { deliverToSheet, SHEET_COLUMNS, sheetPayload, sheetRow } from "./volunteer-sheet";

const fields: VolunteerFields = {
  firstName: "Ama",
  lastName: "Mensah",
  email: "ama@example.com",
  phone: "",
  skills: "Ten years as a midwife, and a mum of two.",
  availability: "Weekday evenings",
};
const when = new Date("2026-10-29T12:45:00Z");

const env = { url: process.env.VOLUNTEER_WEBHOOK_URL, secret: process.env.VOLUNTEER_WEBHOOK_SECRET, notify: process.env.VOLUNTEER_NOTIFY_EMAIL };
beforeEach(() => {
  delete process.env.VOLUNTEER_WEBHOOK_URL;
  delete process.env.VOLUNTEER_WEBHOOK_SECRET;
  delete process.env.VOLUNTEER_NOTIFY_EMAIL;
});
afterEach(() => {
  if (env.url) process.env.VOLUNTEER_WEBHOOK_URL = env.url;
  if (env.secret) process.env.VOLUNTEER_WEBHOOK_SECRET = env.secret;
  if (env.notify) process.env.VOLUNTEER_NOTIFY_EMAIL = env.notify;
});

/** A stand-in for fetch that records the request and answers as told. */
function fakeFetch(answer: () => Response | Promise<Response>) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const impl = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return answer();
  }) as typeof fetch;
  return { impl, calls };
}

describe("sheetRow", () => {
  it("fills every column in order, with the London time beside the ISO one", () => {
    const row = sheetRow(fields, when, "mumsaloud.com volunteer");
    expect(Object.keys(row)).toEqual([...SHEET_COLUMNS]);
    expect(row["Submitted (ISO)"]).toBe("2026-10-29T12:45:00.000Z");
    expect(row["Submitted (London)"]).toMatch(/29 October 2026/);
    expect(row.Phone).toBe("");
    expect(row.Source).toBe("mumsaloud.com volunteer");
  });
});

describe("sheetPayload", () => {
  it("carries the secret, the row and both emails, the team's to the notify address when set", () => {
    process.env.VOLUNTEER_WEBHOOK_SECRET = "s3cret";
    process.env.VOLUNTEER_NOTIFY_EMAIL = "team@example.com";
    const payload = sheetPayload(fields, "mumsaloud.com volunteer", when);
    expect(payload.secret).toBe("s3cret");
    expect(payload.sentAt).toBe("2026-10-29T12:45:00.000Z");
    expect(payload.row["First name"]).toBe("Ama");
    expect(payload.emails.map((email) => email.to)).toEqual(["ama@example.com", "team@example.com"]);
  });

  it("notifies the site inbox by default", () => {
    expect(sheetPayload(fields, "x", when).emails[1].to).toBe("info@mumsaloud.com");
  });
});

describe("deliverToSheet", () => {
  it("is unavailable until the script URL is set, without calling anything", async () => {
    const { impl, calls } = fakeFetch(() => new Response("{}"));
    expect(await deliverToSheet(fields, "x", impl)).toEqual({ ok: false, reason: "unavailable" });
    expect(calls).toHaveLength(0);
  });

  it("posts the payload as JSON and succeeds on the script's ok", async () => {
    process.env.VOLUNTEER_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
    process.env.VOLUNTEER_WEBHOOK_SECRET = "s3cret";
    const { impl, calls } = fakeFetch(() => new Response(JSON.stringify({ ok: true, row: 2, sent: 2, failures: [] }), { status: 200 }));
    expect(await deliverToSheet(fields, "mumsaloud.com volunteer", impl)).toEqual({ ok: true });
    expect(calls[0].url).toBe("https://script.google.com/macros/s/abc/exec");
    expect(calls[0].init.method).toBe("POST");
    const body = JSON.parse(String(calls[0].init.body));
    expect(body.secret).toBe("s3cret");
    expect(body.row["Skills & experience"]).toBe(fields.skills);
    expect(body.emails).toHaveLength(2);
    expect(body.emails[0].html).toContain("<!doctype html>");
  });

  it("fails when the script refuses, answers an error status, or cannot be reached", async () => {
    process.env.VOLUNTEER_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
    expect(await deliverToSheet(fields, "x", fakeFetch(() => new Response(JSON.stringify({ ok: false, error: "Wrong secret" }))).impl)).toEqual({ ok: false, reason: "failed" });
    expect(await deliverToSheet(fields, "x", fakeFetch(() => new Response("nope", { status: 500 })).impl)).toEqual({ ok: false, reason: "failed" });
    expect(await deliverToSheet(fields, "x", fakeFetch(() => Promise.reject(new Error("offline"))).impl)).toEqual({ ok: false, reason: "failed" });
  });
});
