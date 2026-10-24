import { describe, expect, it } from "vitest";
import { buildSubscribeRequest, detectProvider, subscribe } from "./newsletter";

const subscriber = { email: "ama@example.com", firstName: "Ama", source: "footer" };

describe("newsletter providers", () => {
  it("picks MailerLite first, then Mailchimp, then the webhook, else nothing", () => {
    expect(detectProvider({})).toBeNull();
    expect(detectProvider({ NEWSLETTER_WEBHOOK_URL: "https://hooks.example/x" })).toBe("webhook");
    expect(detectProvider({ MAILCHIMP_API_KEY: "k-us21", MAILCHIMP_AUDIENCE_ID: "abc" })).toBe("mailchimp");
    expect(detectProvider({ MAILCHIMP_API_KEY: "k-us21" })).toBeNull();
    expect(detectProvider({ MAILERLITE_API_KEY: "ml", MAILCHIMP_API_KEY: "k-us21", MAILCHIMP_AUDIENCE_ID: "abc" })).toBe("mailerlite");
  });

  it("builds a MailerLite request with the group and the name", () => {
    const { url, init } = buildSubscribeRequest("mailerlite", subscriber, { MAILERLITE_API_KEY: "ml-key", MAILERLITE_GROUP_ID: "42" });
    expect(url).toBe("https://connect.mailerlite.com/api/subscribers");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer ml-key");
    expect(JSON.parse(String(init.body))).toEqual({ email: "ama@example.com", fields: { name: "Ama", signup_source: "footer" }, groups: ["42"] });
  });

  it("builds a Mailchimp request on the key's data centre with double opt-in", () => {
    const { url, init } = buildSubscribeRequest("mailchimp", subscriber, { MAILCHIMP_API_KEY: "secret-us21", MAILCHIMP_AUDIENCE_ID: "list1" });
    expect(url).toBe("https://us21.api.mailchimp.com/3.0/lists/list1/members");
    expect((init.headers as Record<string, string>).Authorization).toMatch(/^Basic /);
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ email_address: "ama@example.com", status: "pending", merge_fields: { FNAME: "Ama" }, tags: ["footer"] });
  });

  it("posts plain JSON to the webhook", () => {
    const { url, init } = buildSubscribeRequest("webhook", subscriber, { NEWSLETTER_WEBHOOK_URL: "https://hooks.example/x" });
    expect(url).toBe("https://hooks.example/x");
    expect(JSON.parse(String(init.body))).toMatchObject({ email: "ama@example.com", firstName: "Ama", source: "footer" });
  });

  it("reports unavailable with no provider, success on 2xx, and treats a known Mailchimp member as signed up", async () => {
    expect(await subscribe(subscriber, {})).toEqual({ ok: false, reason: "unavailable" });
    const ok = (async () => new Response("{}", { status: 200 })) as unknown as typeof fetch;
    expect(await subscribe(subscriber, { NEWSLETTER_WEBHOOK_URL: "https://hooks.example/x" }, ok)).toEqual({ ok: true });
    const exists = (async () => new Response(JSON.stringify({ title: "Member Exists" }), { status: 400 })) as unknown as typeof fetch;
    expect(await subscribe(subscriber, { MAILCHIMP_API_KEY: "k-us21", MAILCHIMP_AUDIENCE_ID: "l" }, exists)).toEqual({ ok: true, already: true });
    const down = (async () => new Response("", { status: 500 })) as unknown as typeof fetch;
    expect(await subscribe(subscriber, { NEWSLETTER_WEBHOOK_URL: "https://hooks.example/x" }, down)).toEqual({ ok: false, reason: "failed" });
  });
});
