import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { EmailMessage } from "./message";
import { mailConfigured, sendEmails, smtpSettings, type Mailer } from "./send";
import { SHEET_URL_TOKEN } from "./template";

const NAMES = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD"] as const;
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

const messages: EmailMessage[] = [
  { to: "ama@example.com", subject: "Thanks", html: "<p>Hi</p>", text: "Hi", fromName: "Mums Aloud", replyTo: "info@mumsaloud.com" },
  { to: "info@mumsaloud.com", subject: "New message", html: `<a href="${SHEET_URL_TOKEN}">sheet</a>`, text: `Sheet: ${SHEET_URL_TOKEN}`, fromName: "Mums Aloud", replyTo: "ama@example.com" },
];

/** A transport stand-in that records what it was asked to send and fails on demand. */
function fakeMailer(failOn: string[] = []) {
  const sent: Array<Parameters<Mailer["sendMail"]>[0]> = [];
  const mailer: Mailer = {
    async sendMail(options) {
      if (failOn.includes(options.subject)) throw new Error("refused");
      sent.push(options);
      return {};
    },
  };
  return { sent, create: () => mailer };
}

describe("smtp settings", () => {
  it("default to Titan and the team mailbox, and are off until the password is set", () => {
    expect(smtpSettings()).toEqual({ host: "smtp.titan.email", port: 465, user: "info@mumsaloud.com", password: "" });
    expect(mailConfigured()).toBe(false);
    process.env.SMTP_PASSWORD = "pw";
    process.env.SMTP_PORT = "587";
    expect(mailConfigured()).toBe(true);
    expect(smtpSettings().port).toBe(587);
  });
});

describe("sendEmails", () => {
  it("sends nothing while the mailbox is not set up", async () => {
    const { sent, create } = fakeMailer();
    expect(await sendEmails(messages, {}, create)).toEqual({ configured: false, results: [false, false], failed: [] });
    expect(sent).toHaveLength(0);
  });

  it("sends each email from the team mailbox with its reply-to, filling in the sheet link", async () => {
    process.env.SMTP_PASSWORD = "pw";
    const { sent, create } = fakeMailer();
    const result = await sendEmails(messages, { sheetUrl: "https://docs.google.com/spreadsheets/d/x/edit#gid=1" }, create);
    expect(result).toEqual({ configured: true, results: [true, true], failed: [] });
    expect(sent[0].from).toEqual({ name: "Mums Aloud", address: "info@mumsaloud.com" });
    expect(sent[0].replyTo).toBe("info@mumsaloud.com");
    expect(sent[1].replyTo).toBe("ama@example.com");
    expect(sent[1].html).toContain('href="https://docs.google.com/spreadsheets/d/x/edit#gid=1"');
    expect(sent[1].text).toContain("Sheet: https://docs.google.com/spreadsheets/d/x/edit#gid=1");
  });

  it("reports a failure per message and keeps going", async () => {
    process.env.SMTP_PASSWORD = "pw";
    const { sent, create } = fakeMailer(["Thanks"]);
    expect(await sendEmails(messages, {}, create)).toEqual({ configured: true, results: [false, true], failed: ["Thanks"] });
    expect(sent.map((m) => m.subject)).toEqual(["New message"]);
  });
});
