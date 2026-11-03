import { describe, expect, it } from "vitest";
import { faq } from "@/content/mamas-escape";
import { faqSchema, jsonLdText, organizationId, profileSchema, siteSchema } from "./schema";

describe("structured data", () => {
  it("describes the organisation and the website on every page", () => {
    const graph = siteSchema()["@graph"] as Array<Record<string, unknown>>;
    const organisation = graph.find((node) => node["@type"] === "Organization")!;
    expect(organisation["@id"]).toBe(organizationId());
    expect(organisation.email).toBe("info@mumsaloud.com");
    expect(organisation.telephone).toBe("+447587542609");
    expect(organisation.sameAs).toEqual(["https://www.instagram.com/mumsaloud/", "https://www.facebook.com/mumsaloud/"]);
    expect(graph.find((node) => node["@type"] === "WebSite")?.publisher).toEqual({ "@id": organizationId() });
  });

  it("marks up every Mama's Escape question with its answer", () => {
    const data = faqSchema(faq.items);
    const questions = data.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>;
    expect(questions).toHaveLength(faq.items.length);
    expect(questions[0].name).toBe(faq.items[0].q);
    expect(questions[0].acceptedAnswer.text).toBe(faq.items[0].a);
  });

  it("ties a profile to the organisation and makes its addresses absolute", () => {
    const data = profileSchema({ name: "Bokun Imoukhuede", jobTitle: "Founder", path: "/meet-bokun/" });
    expect(data.url).toMatch(/^https?:\/\/.+\/meet-bokun\/$/);
    expect((data.mainEntity as { worksFor: unknown }).worksFor).toEqual({ "@id": organizationId() });
  });

  it("escapes < so text can never close the script tag", () => {
    expect(jsonLdText({ text: "</script><b>" })).not.toContain("<");
  });
});
