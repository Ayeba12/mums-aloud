import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { sendVolunteerApplication } from "@/app/actions/volunteer";
import { readVolunteerFields, validateVolunteer, type VolunteerFields } from "./volunteer";

const good: VolunteerFields = {
  firstName: "Ama",
  lastName: "Mensah",
  email: "ama@example.com",
  phone: "",
  skills: "Ten years as a midwife, and a mum of two.",
  availability: "Weekday evenings",
};

describe("validateVolunteer", () => {
  it("accepts a complete application with the phone left blank", () => {
    expect(validateVolunteer(good)).toEqual({});
  });

  it("asks for both names, a real email address, some skills and an availability", () => {
    const errors = validateVolunteer({ ...good, firstName: "", lastName: "", email: "not-an-email", skills: "Hi", availability: "" });
    expect(Object.keys(errors).sort()).toEqual(["availability", "email", "firstName", "lastName", "skills"]);
  });

  it("checks a phone number only when one is given", () => {
    expect(validateVolunteer({ ...good, phone: "+44 7700 900123" })).toEqual({});
    expect(validateVolunteer({ ...good, phone: "call me" }).phone).toMatch(/phone/);
  });

  it("caps very long answers", () => {
    expect(validateVolunteer({ ...good, skills: "x".repeat(4001) }).skills).toMatch(/4,000/);
    expect(validateVolunteer({ ...good, availability: "x".repeat(201) }).availability).toMatch(/line or two/);
  });
});

describe("readVolunteerFields", () => {
  it("trims every field and treats missing ones as empty", () => {
    const data = new FormData();
    data.set("firstName", "  Ama ");
    data.set("email", " ama@example.com ");
    data.set("skills", " Midwife. ");
    expect(readVolunteerFields(data)).toEqual({
      firstName: "Ama",
      lastName: "",
      email: "ama@example.com",
      phone: "",
      skills: "Midwife.",
      availability: "",
    });
  });
});

describe("sendVolunteerApplication", () => {
  const env = { inbox: process.env.CONTACT_WEBHOOK_URL, sheet: process.env.VOLUNTEER_WEBHOOK_URL };
  beforeEach(() => {
    delete process.env.CONTACT_WEBHOOK_URL;
    delete process.env.VOLUNTEER_WEBHOOK_URL;
  });
  afterEach(() => {
    if (env.inbox) process.env.CONTACT_WEBHOOK_URL = env.inbox;
    if (env.sheet) process.env.VOLUNTEER_WEBHOOK_URL = env.sheet;
  });

  const submit = (fields: Partial<VolunteerFields>) => {
    const data = new FormData();
    for (const [key, value] of Object.entries({ ...good, ...fields })) data.set(key, value);
    return sendVolunteerApplication({ status: "idle" }, data);
  };

  it("hands back field errors with what was typed", async () => {
    const state = await submit({ email: "nope" });
    expect(state.status).toBe("error");
    expect(state.errors?.email).toBeDefined();
    expect(state.values?.firstName).toBe("Ama");
  });

  it("offers a prefilled email to the team while the online form is not open", async () => {
    const state = await submit({});
    expect(state.status).toBe("unavailable");
    expect(state.fallback?.href).toMatch(/^mailto:info@mumsaloud\.com\?subject=Volunteer%20application&body=/);
    expect(decodeURIComponent(state.fallback?.href ?? "")).toContain("First name: Ama");
    expect(decodeURIComponent(state.fallback?.href ?? "")).toContain("Skills & experience: Ten years");
    expect(state.values).toEqual(good);
  });

  it("delivers to the applications sheet first, with both emails, and promises the confirmation", async () => {
    process.env.VOLUNTEER_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
    const bodies: string[] = [];
    const original = globalThis.fetch;
    globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
      bodies.push(String(init?.body ?? ""));
      return new Response(JSON.stringify({ ok: true, row: 2, sent: 2, failures: [] }), { status: 200 });
    }) as typeof fetch;
    try {
      const state = await submit({});
      expect(state.status).toBe("success");
      expect(state.message).toMatch(/confirmation email/);
      expect(JSON.parse(bodies[0]).emails).toHaveLength(2);
    } finally {
      globalThis.fetch = original;
    }
  });
});
