import { describe, expect, it } from "vitest";
import { buildSubscribeRequest, detectProvider, subscribe } from "./newsletter";

const subscriber = { email: "ama@example.com", firstName: "Ama", source: "footer" };

describe("newsletter providers", () => {
  it("picks SendFox first (the owner's service since 11 Nov 2026), then MailerLite, Mailchimp, the webhook, else nothing", () => {
    expect(detectProvider({ SENDFOX_API_KEY: "sf", MAILERLITE_API_KEY: "ml" })).toBe("sendfox");
    expect(detectProvider({})).toBeNull();
    expect(detectProvider({ NEWSLETTER_WEBHOOK_URL: "https://hooks.example/x" })).toBe("webhook");
    expect(detectProvider({ MAILCHIMP_API_KEY: "k-us21", MAILCHIMP_AUDIENCE_ID: "abc" })).toBe("mailchimp");
    expect(detectProvider({ MAILCHIMP_API_KEY: "k-us21" })).toBeNull();
    expect(detectProvider({ MAILERLITE_API_KEY: "ml", MAILCHIMP_API_KEY: "k-us21", MAILCHIMP_AUDIENCE_ID: "abc" })).toBe("mailerlite");
  });

  it("builds a SendFox request as form fields with the token, the first name and the list", () => {
    const { url, init } = buildSubscribeRequest("sendfox", subscriber, { SENDFOX_API_KEY: "sf-token", SENDFOX_LIST_ID: "123" });
    expect(url).toBe("https://api.sendfox.com/contacts");
    expect(init.method).toBe("POST");
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer sf-token");
    expect(headers["Content-Type"]).toBe("application/x-www-form-urlencoded");
    expect(headers.Accept).toBe("application/json");
    const body = new URLSearchParams(String(init.body));
    expect(body.get("email")).toBe("ama@example.com");
    expect(body.get("first_name")).toBe("Ama");
    expect(body.getAll("lists[]")).toEqual(["123"]);
  });

  it("leaves out the first name and the list when they are not given", () => {
    const { init } = buildSubscribeRequest("sendfox", { email: "ama@example.com", source: "footer" }, { SENDFOX_API_KEY: "sf-token" });
    expect(String(init.body)).toBe("email=ama%40example.com");
  });

  it("reports a SendFox refusal (for example a revoked token) as failed, never as signed up", async () => {
    const refused = (async () => new Response(JSON.stringify({ message: "Unauthenticated." }), { status: 401 })) as unknown as typeof fetch;
    expect(await subscribe(subscriber, { SENDFOX_API_KEY: "old" }, refused)).toEqual({ ok: false, reason: "failed" });
    const ok = (async () => new Response(JSON.stringify({ id: 1, email: "ama@example.com" }), { status: 200 })) as unknown as typeof fetch;
    expect(await subscribe(subscriber, { SENDFOX_API_KEY: "sf", SENDFOX_LIST_ID: "123" }, ok)).toEqual({ ok: true });
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
