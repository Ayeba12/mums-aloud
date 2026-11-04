import { describe, expect, it } from "vitest";
import { experience, expect as whatToExpect, family, faq, hero, join, podcast, stayClose, why } from "./mamas-escape";

describe("Mama's Escape content", () => {
  it("keeps the four ways the community holds each other, in the client's order", () => {
    expect(experience.items.map((item) => item.title)).toEqual([
      "Mentor Mums",
      "Expert Series and Training",
      "Resource Sharing",
      "Community Events",
    ]);
  });

  it("brings community, podcast and newsletter together, as the owner asks", () => {
    expect(family.tiles.map((tile) => tile.title)).toEqual(["The Community", "The Podcast", "The Newsletter"]);
    expect(family.intro).toMatch(/more than the community/);
    expect(experience.itemsLead).toMatch(/four core areas/);
  });

  it("points in-page actions at sections that exist on the page", () => {
    const anchors = [hero.secondary.href, ...family.tiles.map((tile) => tile.action.href)].filter((href) =>
      href.startsWith("#"),
    );
    expect(anchors).toEqual(["#what-to-expect", "#join"]);
    expect(family.tiles[2].action.href).toBe("newsletter");
  });

  it("lists the joining questions so a mother knows what to expect", () => {
    expect(join.asks).toHaveLength(4);
    expect(join.asks.join(" ")).toMatch(/expecting, newborn, under five/);
  });

  it("offers the three stay-close routes from the copy", () => {
    const linked = stayClose.body.filter((part) => typeof part !== "string").map((part) => part.label);
    expect(linked).toEqual(["Listen to the podcast", "Work With Bokun"]);
    expect(`${stayClose.heading.lead} ${stayClose.heading.accent}`).toBe("Take your time. Stay close.");
    expect(stayClose.newsletter).toBe("Get the newsletter");
  });

  it("sends podcast listeners to the same Spotify show as the podcast card, with one highlighted phrase", () => {
    expect(podcast.action.href).toBe(family.tiles[1].action.href);
    expect(podcast.statement.highlight).toBe("far more than loneliness");
    expect(podcast.statement.trail.startsWith(".")).toBe(true);
    expect(podcast.statement.trail).toBe(".");
    expect(podcast.body).toHaveLength(2);
    expect(podcast.body[0]).toMatch(/^It also reflects maternal health disparities/);
    expect(podcast.body[1]).toMatch(/masks come off/);
  });

  it("explains the closed joining form instead of promising it", () => {
    expect(join.bodyClosed).toMatch(/being set up/);
    expect(join.pending.link).toBe("Get the newsletter");
  });

  it("names the Mama's Escape Community in the first question", () => {
    expect(faq.items[0].q).toBe("Who is the Mama's Escape Community for?");
  });

  it("heads What to expect with the line about stepping in, and keeps Not Mum. Not wife. You. beneath it", () => {
    expect(`${whatToExpect.heading.lead} ${whatToExpect.heading.accent}`).toBe("Here is what stepping in feels like.");
    expect(whatToExpect.body).toBe("Not Mum. Not wife. You.");
  });

  it("joins Why we exist's heading to its figure, and says who the figure is about", () => {
    expect(why.body).toMatch(/not listened to/);
    expect(why.stat.label).toMatch(/^Black women in the UK face around three times the risk of dying .* compared with white women\.$/);
    expect(why.stat.source.label).toBe("MBRRACE-UK");
  });

  it("says \"too\" only once in the pledge", () => {
    expect(experience.pledge.match(/\btoo\b/gi)).toHaveLength(1);
  });

  it("opens the story with \"Before we became mothers\" here and on the homepage", async () => {
    const { story } = await import("./home");
    for (const text of [experience.body, story.body]) expect(text.startsWith("Before we became mothers, we were women full of ideas, dreams and plans.")).toBe(true);
  });

  it("keeps the privacy promise warm, not solemn", () => {
    expect(hero.card.tag).toBe("Our promise to you");
    const words = [hero.card.tag, hero.card.text, ...faq.items.map((item) => item.a)].join(" ").toLowerCase();
    expect(words).not.toMatch(/covenant|anyone's story/);
  });
});
