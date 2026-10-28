import { describe, expect, it } from "vitest";
import { about, council, founder, team } from "./about";
import { teamPortraits } from "@/components/content/teamPortraits";
import { uploadUrl } from "@/lib/wordpress/urls";

describe("About content", () => {
  it("lists the four team members from the live site, Bokun first with a link to her page", () => {
    expect(team.map((person) => person.name)).toEqual(["Bokun Imoukhuede", "Oyindamola", "Dk Jonah", "Yemi Komolafe"]);
    expect(team[0].href).toBe("/meet-bokun/");
    expect(team.slice(1).every((person) => person.href === undefined)).toBe(true);
    expect(new Set([...team, ...council.members.people].map((person) => person.id)).size).toBe(9);
  });

  it("keeps the founder letter in her words, ending with her sign-off", () => {
    expect(founder.letter.paragraphs[1]).toEqual({ text: "Then I became a mother.", emphasis: true });
    expect(founder.letter.paragraphs.at(-1)?.text).toMatch(/Welcome to MumsAloud/);
    expect(founder.letter.signoff).toEqual({ name: "Bokun Imoukhuede", role: "Founder, MumsAloud" });
  });

  it("uses Bokun's own portrait from the WordPress media library, not a stock photo", () => {
    expect(founder.hero.portrait.src).toBe(uploadUrl("2024/10/Mrs-Bokun-1025x1536.jpeg"));
  });

  it("carries the council's five roles and five members", () => {
    expect(council.roles.items).toHaveLength(5);
    expect(council.roles.statement.highlight).toBe("makes a difference");
    expect(council.roles.items.every((item) => item.icon && item.title && item.text)).toBe(true);
    expect(council.members.people).toHaveLength(5);
    expect(council.register.pending).toMatch(/being set up/);
  });

  it("gives every council member her own portrait, a role and a biography for the Read bio dialog", () => {
    for (const person of council.members.people) {
      expect(teamPortraits[person.id]?.photo, person.name).toBeTruthy();
      expect(person.role, person.name).not.toBe("Council member");
      expect(person.bio?.length, person.name).toBeGreaterThan(0);
      expect(person.bio?.join(" "), person.name).not.toMatch(/\bmy\b|\bI\b/);
    }
  });

  it("sets the mission as two paragraphs with one door, and keeps the vision as one sentence", () => {
    expect(about.mission.paragraphs).toHaveLength(2);
    expect(about.mission.paragraphs.join(" ")).toMatch(/^A platform where you can share your stories/);
    expect(about.mission.action.label).toBe("Join Mama's Escape");
    expect(about.mission.vision).toMatch(/every mother thrives/);
  });

  it("points the About page's secondary actions at pages that exist", () => {
    expect(about.hero.secondary.href).toBe("/meet-bokun/");
    expect(about.team.link.href).toBe("/meet-the-team/");
  });
});
