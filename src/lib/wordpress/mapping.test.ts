import { describe, expect, it } from "vitest";
import { decodeEntities, permalinkPath, tidyTitle, toPlainText, toPostSummary, truncate, type WpPost } from "./mapping";

describe("decodeEntities", () => {
  it("decodes numeric and named entities from WordPress titles", () => {
    expect(decodeEntities("Atinuke &#8211; A Journey")).toBe("Atinuke – A Journey");
    expect(decodeEntities("Mama&#8217;s Escape &amp; more")).toBe("Mama’s Escape & more");
  });
});

describe("permalinkPath", () => {
  it("keeps legacy permalink paths unchanged", () => {
    expect(permalinkPath("https://mumsaloud.com/mum-story/child-teeth/")).toBe("/mum-story/child-teeth/");
    expect(permalinkPath("https://mumsaloud.com/emmanuella/")).toBe("/emmanuella/");
  });

  it("adds a trailing slash to match the site's URL style", () => {
    expect(permalinkPath("https://mumsaloud.com/article/permission-to-stop-performing")).toBe(
      "/article/permission-to-stop-performing/",
    );
  });

  it("fails loudly on an invalid link", () => {
    expect(() => permalinkPath("not a url")).toThrow("Invalid WordPress permalink");
  });
});

describe("tidyTitle", () => {
  it("converts all-caps legacy titles to sentence case", () => {
    expect(tidyTitle("WHEN NEXT YOU MEET A MOTHER")).toBe("When next you meet a mother");
  });

  it("leaves mixed-case titles alone", () => {
    expect(tidyTitle("The Small Wins That Kept Me Going")).toBe("The Small Wins That Kept Me Going");
  });
});

describe("toPlainText and truncate", () => {
  it("strips tags and collapses whitespace", () => {
    expect(toPlainText("<p>Hello&nbsp;<strong>mums</strong></p>\n<p>again</p>")).toBe("Hello mums again");
  });

  it("cuts at a word boundary", () => {
    expect(truncate("one two three four five", 12)).toBe("one two…");
    expect(truncate("short", 12)).toBe("short");
  });
});

describe("toPostSummary", () => {
  it("maps a WordPress post with featured media", () => {
    const post: WpPost = {
      id: 1,
      slug: "hello-world",
      link: "https://mumsaloud.com/hello-world/",
      date: "2024-10-28T10:00:00",
      modified: "2024-10-28T10:00:00",
      title: { rendered: "Habibah" },
      excerpt: { rendered: "<p>A story about &#8216;home&#8217;.</p>" },
      _embedded: {
        "wp:featuredmedia": [
          { source_url: "https://mumsaloud.com/wp-content/uploads/a.jpg", alt_text: "", media_details: { width: 800, height: 600 } },
        ],
      },
    };
    expect(toPostSummary(post)).toEqual({
      id: 1,
      slug: "hello-world",
      path: "/hello-world/",
      title: "Habibah",
      excerpt: "A story about ‘home’.",
      date: "2024-10-28T10:00:00",
      image: { src: "https://mumsaloud.com/wp-content/uploads/a.jpg", alt: "", width: 800, height: 600 },
    });
  });
});
