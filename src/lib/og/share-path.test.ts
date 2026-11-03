import { describe, expect, it } from "vitest";
import { shareCardPath } from "./share-path";

describe("shareCardPath", () => {
  it("points at the card with a trailing slash, so crawlers get the image without a redirect", () => {
    expect(shareCardPath("/mum-story/when-next-you-meet-a-mother/")).toBe("/mum-story/when-next-you-meet-a-mother/opengraph-image/");
    expect(shareCardPath("/peanut-ball-experiences")).toBe("/peanut-ball-experiences/opengraph-image/");
  });
});
