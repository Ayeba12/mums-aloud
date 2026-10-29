import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { Mailer } from "./email/send";
import { deliverSubmission, deliverToSheet, formsSecret, formsWebhook, notifyAddress, sheetPayload, type SheetSubmission } from "./sheet-delivery";

const NAMES = ["FORMS_WEBHOOK_URL", "FORMS_WEBHOOK_SECRET", "FORMS_NOTIFY_EMAIL", "VOLUNTEER_WEBHOOK_URL", "VOLUNTEER_WEBHOOK_SECRET", "VOLUNTEER_NOTIFY_EMAIL", "SMTP_PASSWORD"] as const;
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
  emails: [
    { to: "ama@example.com", subject: "Thanks", html: "<!doctype html>", text: "Hi", fromName: "Mums Aloud" },
    { to: "info@mumsaloud.com", subject: "New message", html: "<!doctype html>", text: "Hi", fromName: "Mums Aloud" },
  ],
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

function fakeMailer(failOn: string[] = []) {
  const sent: string[] = [];
  const mailer: Mailer = {
    async sendMail(options) {
      if (failOn.includes(options.subject)) throw new Error("refused");
      sent.push(options.subject);
      return {};
    },
  };
  return { sent, create: () => mailer };
}

const SCRIPT = "https://script.google.com/macros/s/abc/exec";
const okAnswer = () => new Response(JSON.stringify({ ok: true, sheet: "Contact", row: 2, sheetUrl: "https://docs.google.com/spreadsheets/d/x/edit#gid=1" }), { status: 200 });

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
  it("names the tab and carries the secret and the row, never the emails", () => {
    process.env.FORMS_WEBHOOK_SECRET = "s3cret";
    expect(sheetPayload(submission)).toEqual({ secret: "s3cret", sheet: "Contact", source: "mumsaloud.com contact", sentAt: "2026-10-29T12:45:00.000Z", row: { Name: "Ama" } });
  });
});

describe("deliverToSheet", () => {
  it("is unavailable until the script URL is set, without calling anything", async () => {
    const { impl, calls } = fakeFetch(() => new Response("{}"));
    expect(await deliverToSheet(submission, impl)).toEqual({ ok: false, reason: "unavailable" });
    expect(calls).toHaveLength(0);
  });

  it("posts the row as JSON and hands back the tab's address", async () => {
    process.env.FORMS_WEBHOOK_URL = SCRIPT;
    const { impl, calls } = fakeFetch(okAnswer);
    expect(await deliverToSheet(submission, impl)).toEqual({ ok: true, sheetUrl: "https://docs.google.com/spreadsheets/d/x/edit#gid=1" });
    expect(calls[0].url).toBe(SCRIPT);
    expect(calls[0].init.method).toBe("POST");
    expect(JSON.parse(String(calls[0].init.body))).not.toHaveProperty("emails");
  });

  it("fails when the script refuses, answers an error status, or cannot be reached", async () => {
    process.env.FORMS_WEBHOOK_URL = SCRIPT;
    expect(await deliverToSheet(submission, fakeFetch(() => new Response(JSON.stringify({ ok: false, error: "Wrong secret" }))).impl)).toEqual({ ok: false, reason: "failed" });
    expect(await deliverToSheet(submission, fakeFetch(() => new Response("nope", { status: 500 })).impl)).toEqual({ ok: false, reason: "failed" });
    expect(await deliverToSheet(submission, fakeFetch(() => Promise.reject(new Error("offline"))).impl)).toEqual({ ok: false, reason: "failed" });
  });
});

describe("deliverSubmission", () => {
  it("records the row, then sends both emails with the sheet link", async () => {
    process.env.FORMS_WEBHOOK_URL = SCRIPT;
    process.env.SMTP_PASSWORD = "pw";
    const { sent, create } = fakeMailer();
    const result = await deliverSubmission(submission, { fetchImpl: fakeFetch(okAnswer).impl, createMailer: create });
    expect(result).toEqual({ ok: true, recorded: true, confirmed: true, notified: true });
    expect(sent).toEqual(["Thanks", "New message"]);
  });

  it("still counts as delivered when the row is saved but the mailbox is not set up", async () => {
    process.env.FORMS_WEBHOOK_URL = SCRIPT;
    const result = await deliverSubmission(submission, { fetchImpl: fakeFetch(okAnswer).impl });
    expect(result).toEqual({ ok: true, recorded: true, confirmed: false, notified: false });
  });

  it("counts as delivered when the sheet is down but the team was emailed", async () => {
    process.env.FORMS_WEBHOOK_URL = SCRIPT;
    process.env.SMTP_PASSWORD = "pw";
    const { create } = fakeMailer();
    const result = await deliverSubmission(submission, { fetchImpl: fakeFetch(() => new Response("nope", { status: 500 })).impl, createMailer: create });
    expect(result).toEqual({ ok: true, recorded: false, confirmed: true, notified: true });
  });

  it("is unavailable when neither the sheet nor the mailbox is set up, and failed when something broke", async () => {
    expect(await deliverSubmission(submission, { fetchImpl: fakeFetch(okAnswer).impl })).toEqual({ ok: false, reason: "unavailable" });
    process.env.FORMS_WEBHOOK_URL = SCRIPT;
    process.env.SMTP_PASSWORD = "pw";
    const { create } = fakeMailer(["Thanks", "New message"]);
    expect(await deliverSubmission(submission, { fetchImpl: fakeFetch(okAnswer).impl, createMailer: create })).toEqual({ ok: true, recorded: true, confirmed: false, notified: false });
    expect(await deliverSubmission(submission, { fetchImpl: fakeFetch(() => new Response("nope", { status: 500 })).impl, createMailer: create })).toEqual({ ok: false, reason: "failed" });
  });
});
