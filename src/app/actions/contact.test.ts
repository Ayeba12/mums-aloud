import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendContactMessage, sendPartnershipEnquiry } from "./contact";

// No real SMTP in tests: the transport records subjects and succeeds.
const sentSubjects: string[] = [];
vi.mock("nodemailer", () => ({
  default: {
    createTransport: () => ({
      sendMail: async (options: { subject: string }) => {
        sentSubjects.push(options.subject);
        return {};
      },
    }),
  },
}));

const NAMES = ["FORMS_WEBHOOK_URL", "VOLUNTEER_WEBHOOK_URL", "CONTACT_WEBHOOK_URL", "SMTP_PASSWORD"] as const;
const saved: Partial<Record<(typeof NAMES)[number], string | undefined>> = {};
beforeEach(() => {
  sentSubjects.length = 0;
  for (const name of NAMES) {
    saved[name] = process.env[name];
    delete process.env[name];
  }
});
afterEach(() => {
  for (const name of NAMES) if (saved[name] !== undefined) process.env[name] = saved[name];
});

const good = { name: "Ama Mensah", email: "ama@example.com", organisation: "", phone: "", topic: "general", message: "Hello, how does the community work?" };

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

/** Replaces fetch for one call and hands back the JSON bodies it was given. */
async function withFakeFetch<T>(run: () => Promise<T>): Promise<{ result: T; bodies: Array<Record<string, unknown>> }> {
  const bodies: Array<Record<string, unknown>> = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")));
    return new Response(JSON.stringify({ ok: true, row: 2, sheetUrl: "https://docs.google.com/spreadsheets/d/x/edit#gid=1" }), { status: 200 });
  }) as typeof fetch;
  try {
    return { result: await run(), bodies };
  } finally {
    globalThis.fetch = original;
  }
}

describe("the contact and partnership actions", () => {
  it("offer a prefilled email to info@mumsaloud.com while no delivery route is set", async () => {
    const state = await sendContactMessage({ status: "idle" }, form(good));
    expect(state.status).toBe("unavailable");
    expect(state.fallback?.href).toMatch(/^mailto:info@mumsaloud\.com\?subject=Message%20from%20the%20website/);
    expect(state.values?.message).toBe(good.message);
  });

  it("record a message on the Contact tab and, with the mailbox set up, send both emails and promise the confirmation", async () => {
    process.env.FORMS_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
    process.env.SMTP_PASSWORD = "pw";
    const { result, bodies } = await withFakeFetch(() => sendContactMessage({ status: "idle" }, form(good)));
    expect(result.status).toBe("success");
    expect(result.message).toMatch(/message is with us, and a confirmation email/);
    expect(bodies[0].sheet).toBe("Contact");
    expect(bodies[0]).not.toHaveProperty("emails");
    expect(sentSubjects).toEqual(["We have your message, Ama", "New message from Ama Mensah: A general question"]);
  });

  it("record the message without promising a confirmation while the mailbox is not set up", async () => {
    process.env.FORMS_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
    const { result } = await withFakeFetch(() => sendContactMessage({ status: "idle" }, form(good)));
    expect(result.status).toBe("success");
    expect(result.message).toBe("Thank you. Your message is with us and we will reply by email.");
    expect(sentSubjects).toEqual([]);
  });

  it("send an enquiry to the Partnership tab, with the organisation required", async () => {
    process.env.FORMS_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
    process.env.SMTP_PASSWORD = "pw";
    const missing = await sendPartnershipEnquiry({ status: "idle" }, form(good));
    expect(missing.status).toBe("error");
    expect(missing.errors?.organisation).toBeDefined();

    const { result, bodies } = await withFakeFetch(() => sendPartnershipEnquiry({ status: "idle" }, form({ ...good, organisation: "Northfield Family Hub" })));
    expect(result.status).toBe("success");
    expect(result.message).toMatch(/enquiry is with us, and a confirmation email/);
    expect(bodies[0].sheet).toBe("Partnership");
    expect((bodies[0].row as Record<string, string>).About).toBe("Partnership or commissioning");
    expect(sentSubjects[1]).toBe("New partnership enquiry: Northfield Family Hub");
  });
});
