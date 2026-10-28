import { describe, expect, it } from "vitest";
import { decodeEntities, permalinkPath, sanitiseHtml, tidyTitle, toPlainText, toPostDetail, toPostSummary, truncate, type WpPost } from "./mapping";

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
      modified: "2024-10-28T10:00:00",
      image: { src: "https://mumsaloud.com/wp-content/uploads/a.jpg", alt: "", width: 800, height: 600 },
    });
  });
});

describe("sanitiseHtml", () => {
  it("removes scripts, embeds and inline handlers but keeps the writing", () => {
    const dirty =
      '<p class="wp-block-paragraph">Hello <strong>mums</strong></p><script>alert(1)</script>' +
      '<iframe src="https://example.com"></iframe><p onclick="steal()">Keep me</p><a href="javascript:void(0)">x</a>';
    expect(sanitiseHtml(dirty)).toBe(
      '<p class="wp-block-paragraph">Hello <strong>mums</strong></p><p>Keep me</p><a>x</a>',
    );
  });

  it("drops the empty paragraphs WordPress leaves behind", () => {
    expect(sanitiseHtml("<p>One</p><p>&nbsp;</p><p> </p><p><br></p><p>Two</p>")).toBe("<p>One</p><p>Two</p>");
  });
});

describe("toPostDetail", () => {
  it("adds the cleaned body, the modified date and the category names", () => {
    const post: WpPost = {
      id: 442,
      slug: "emmanuella",
      link: "https://mumsaloud.com/emmanuella/",
      date: "2024-10-31T09:00:00",
      modified: "2024-11-02T09:00:00",
      title: { rendered: "Emmanuella" },
      excerpt: { rendered: "<p>Her story.</p>" },
      content: { rendered: '<p class="wp-block-paragraph">Once upon a time.</p><script>x()</script>' },
      _embedded: {
        "wp:term": [
          [{ id: 7, name: "Story Lounge", slug: "story-lounge", taxonomy: "category" }],
          [{ id: 9, name: "tag", slug: "tag", taxonomy: "post_tag" }],
        ],
      },
    };
    const detail = toPostDetail(post);
    expect(detail.path).toBe("/emmanuella/");
    expect(detail.html).toBe('<p class="wp-block-paragraph">Once upon a time.</p>');
    expect(detail.modified).toBe("2024-11-02T09:00:00");
    expect(detail.categories).toEqual([{ name: "Story Lounge", slug: "story-lounge" }]);
  });
});
