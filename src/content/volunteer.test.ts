import { describe, expect, it } from "vitest";
import * as volunteer from "./volunteer";

describe("Volunteer page content", () => {
  it("lists the six reasons from the owner's notes, in order", () => {
    expect(volunteer.why.items.map((item) => item.title)).toEqual([
      "Empower mums",
      "Foster community",
      "Share your skills",
      "Facilitate workshops",
      "Become a mentor",
      "Event support",
    ]);
  });

  it("asks for the six application fields in the owner's order", () => {
    expect(Object.keys(volunteer.apply.form.labels)).toEqual(["firstName", "lastName", "email", "phone", "skills", "availability"]);
    expect(Object.keys(volunteer.apply.form.placeholders)).toEqual(Object.keys(volunteer.apply.form.labels));
  });

  it("uses no dashes, as the owner asked", () => {
    expect(JSON.stringify(volunteer)).not.toMatch(/[–—]/);
  });

  it("sends every action to the application on the page", () => {
    expect(volunteer.hero.primary.href).toBe("#apply");
    expect(volunteer.impact.action.href).toBe("#apply");
    expect(volunteer.closing.primary.href).toBe("#apply");
  });
});
