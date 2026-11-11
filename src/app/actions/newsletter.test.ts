import { beforeEach, describe, expect, it, vi } from "vitest";

const subscribe = vi.fn();
const sendEmails = vi.fn();
vi.mock("@/lib/newsletter", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/lib/newsletter")>()), subscribe: (...args: unknown[]) => subscribe(...args) }));
vi.mock("@/lib/email/send", () => ({ sendEmails: (...args: unknown[]) => sendEmails(...args) }));

const { subscribeToNewsletter } = await import("./newsletter");

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};
const idle = { status: "idle" as const };

beforeEach(() => {
  subscribe.mockReset();
  sendEmails.mockReset();
});

describe("newsletter sign-up", () => {
  it("sends the welcome email once the provider has the sign-up, and says the magazines are on their way", async () => {
    subscribe.mockResolvedValue({ ok: true });
    sendEmails.mockResolvedValue({ configured: true, results: [true], failed: [] });
    const state = await subscribeToNewsletter(idle, form({ email: "ama@example.com", firstName: "Ama" }));
    expect(state.status).toBe("success");
    expect(state.message).toMatch(/two free Mama's Escape magazines are on their way/);
    const [messages] = sendEmails.mock.calls[0];
    expect(messages).toHaveLength(1);
    expect(messages[0].to).toBe("ama@example.com");
  });

  it("does not promise the magazines when the email could not be sent", async () => {
    subscribe.mockResolvedValue({ ok: true });
    sendEmails.mockResolvedValue({ configured: false, results: [false], failed: [] });
    const state = await subscribeToNewsletter(idle, form({ email: "ama@example.com" }));
    expect(state.status).toBe("success");
    expect(state.message).not.toMatch(/magazines/);
  });

  it("sends nothing when the provider refuses, or when the honeypot is filled", async () => {
    subscribe.mockResolvedValue({ ok: false, reason: "failed" });
    expect((await subscribeToNewsletter(idle, form({ email: "ama@example.com" }))).status).toBe("error");
    expect((await subscribeToNewsletter(idle, form({ email: "bot@example.com", website: "spam" }))).status).toBe("success");
    expect(sendEmails).not.toHaveBeenCalled();
  });
});
