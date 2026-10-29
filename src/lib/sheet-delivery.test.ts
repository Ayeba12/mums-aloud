import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { deliverToSheet, formsSecret, formsWebhook, notifyAddress, sheetPayload, type SheetSubmission } from "./sheet-delivery";

const NAMES = ["FORMS_WEBHOOK_URL", "FORMS_WEBHOOK_SECRET", "FORMS_NOTIFY_EMAIL", "VOLUNTEER_WEBHOOK_URL", "VOLUNTEER_WEBHOOK_SECRET", "VOLUNTEER_NOTIFY_EMAIL"] as const;
const saved: Partial<Record<(typeof NAMES)[number], string | undefined>> = {};
beforeEach(() => {
  for (const name of NAMES) {
    saved[name] = process.env[name];
    delete process.env[name];
  }
});
afterEach(() => {
  for (const name of NAMES) if (saved[name] !== undefined) process.env[name] = saved[name];
});

const submission: SheetSubmission = {
  sheet: "Contact",
  source: "mumsaloud.com contact",
  submittedAt: new Date("2026-10-29T12:45:00Z"),
  row: { Name: "Ama" },
  emails: [{ to: "ama@example.com", subject: "Hi", html: "<!doctype html>", text: "Hi", fromName: "Mums Aloud" }],
};

/** A stand-in for fetch that records the request and answers as told. */
function fakeFetch(answer: () => Response | Promise<Response>) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const impl = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return answer();
  }) as typeof fetch;
  return { impl, calls };
}

describe("the script's settings", () => {
  it("reads the FORMS_* names first and the older VOLUNTEER_* names as a fallback", () => {
    expect(formsWebhook()).toBe("");
    expect(notifyAddress()).toBe("info@mumsaloud.com");
    process.env.VOLUNTEER_WEBHOOK_URL = "https://old.example/exec";
    process.env.VOLUNTEER_WEBHOOK_SECRET = "old";
    process.env.VOLUNTEER_NOTIFY_EMAIL = "old@example.com";
    expect([formsWebhook(), formsSecret(), notifyAddress()]).toEqual(["https://old.example/exec", "old", "old@example.com"]);
    process.env.FORMS_WEBHOOK_URL = "https://new.example/exec";
    process.env.FORMS_WEBHOOK_SECRET = "new";
    process.env.FORMS_NOTIFY_EMAIL = "new@example.com";
    expect([formsWebhook(), formsSecret(), notifyAddress()]).toEqual(["https://new.example/exec", "new", "new@example.com"]);
  });
});

describe("sheetPayload", () => {
  it("names the tab and carries the secret, the row and the emails", () => {
    process.env.FORMS_WEBHOOK_SECRET = "s3cret";
    const payload = sheetPayload(submission);
    expect(payload).toMatchObject({ secret: "s3cret", sheet: "Contact", source: "mumsaloud.com contact", sentAt: "2026-10-29T12:45:00.000Z", row: { Name: "Ama" } });
    expect(payload.emails).toHaveLength(1);
  });
});

describe("deliverToSheet", () => {
  it("is unavailable until the script URL is set, without calling anything", async () => {
    const { impl, calls } = fakeFetch(() => new Response("{}"));
    expect(await deliverToSheet(submission, impl)).toEqual({ ok: false, reason: "unavailable" });
    expect(calls).toHaveLength(0);
  });

  it("posts the payload as JSON and succeeds on the script's ok", async () => {
    process.env.FORMS_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
    const { impl, calls } = fakeFetch(() => new Response(JSON.stringify({ ok: true, sheet: "Contact", row: 2, sent: 1, failures: [] }), { status: 200 }));
    expect(await deliverToSheet(submission, impl)).toEqual({ ok: true });
    expect(calls[0].url).toBe("https://script.google.com/macros/s/abc/exec");
    expect(calls[0].init.method).toBe("POST");
    expect(JSON.parse(String(calls[0].init.body)).sheet).toBe("Contact");
  });

  it("fails when the script refuses, answers an error status, or cannot be reached", async () => {
    process.env.FORMS_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
    expect(await deliverToSheet(submission, fakeFetch(() => new Response(JSON.stringify({ ok: false, error: "Wrong secret" }))).impl)).toEqual({ ok: false, reason: "failed" });
    expect(await deliverToSheet(submission, fakeFetch(() => new Response("nope", { status: 500 })).impl)).toEqual({ ok: false, reason: "failed" });
    expect(await deliverToSheet(submission, fakeFetch(() => Promise.reject(new Error("offline"))).impl)).toEqual({ ok: false, reason: "failed" });
  });
});
