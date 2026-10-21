import { describe, expect, it } from "vitest";
import { experience, family, hero, join, stayClose } from "./mamas-escape";

describe("Mama's Escape content", () => {
  it("keeps the four ways the community holds each other, in the client's order", () => {
    expect(experience.items.map((item) => item.title)).toEqual([
      "Mentor Mums",
      "Expert Series and Training",
      "Resource Sharing",
      "Community Events",
    ]);
  });

  it("brings community, podcast and newsletter together, as the restructure brief asks", () => {
    expect(family.tiles.map((tile) => tile.title)).toEqual(["The Community", "The Podcast", "The Newsletter"]);
  });

  it("points in-page actions at sections that exist on the page", () => {
    const anchors = [hero.secondary.href, ...family.tiles.map((tile) => tile.action.href)].filter((href) =>
      href.startsWith("#"),
    );
    expect(anchors).toEqual(["#what-to-expect", "#join", "#newsletter"]);
  });

  it("lists the joining questions so a mother knows what to expect", () => {
    expect(join.asks).toHaveLength(4);
    expect(join.asks.join(" ")).toMatch(/expecting, newborn, under five/);
  });

  it("offers the three stay-close routes from the copy", () => {
    expect(stayClose.actions.map((action) => action.label)).toEqual([
      "Listen to the podcast",
      "Get the newsletter",
      "Work With Me · book a call",
    ]);
  });
});
