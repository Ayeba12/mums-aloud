import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildSitemap, STATIC_ROUTES } from "./sitemap";
import type { PostSummary } from "./wordpress/mapping";

/** Every page folder under src/app with a fixed address (no [param] segment), as a path with a trailing slash. */
function pageRoutes(dir: string, prefix = ""): string[] {
  const routes: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (name === "page.tsx") routes.push(prefix === "" ? "/" : `${prefix}/`);
    else if (statSync(full).isDirectory() && !name.startsWith("[") && !name.startsWith("(") && name !== "api") routes.push(...pageRoutes(full, `${prefix}/${name}`));
  }
  return routes;
}

const post = (slug: string, path: string, date: string, modified?: string): PostSummary => ({ id: 1, slug, path, title: slug, excerpt: "", date, modified });

describe("sitemap", () => {
  it("lists every fixed page in the app except the style guide, and nothing that does not exist", () => {
    const expected = pageRoutes(join(process.cwd(), "src", "app")).filter((route) => route !== "/style-guide/");
    expect([...STATIC_ROUTES].sort()).toEqual(expected.sort());
  });

  it("builds absolute URLs with trailing slashes, later listing pages and every item with its modified date", () => {
    const blog = Array.from({ length: 10 }, (_, index) => post(`story-${index}`, `/mum-story/story-${index}/`, "2024-10-30T12:00:00", "2024-11-01T09:00:00"));
    const entries = buildSitemap("https://mumsaloud.com/", { blog, storyLounge: [post("emmanuella", "/emmanuella/", "2024-10-31T14:13:14")] });
    const urls = entries.map((entry) => entry.url);
    expect(urls[0]).toBe("https://mumsaloud.com/");
    expect(urls).toContain("https://mumsaloud.com/blog/");
    expect(urls).toContain("https://mumsaloud.com/blog/page/2/");
    expect(urls).not.toContain("https://mumsaloud.com/blog/page/3/");
    expect(urls).toContain("https://mumsaloud.com/mum-story/story-3/");
    expect(urls).toContain("https://mumsaloud.com/emmanuella/");
    expect(entries.find((entry) => entry.url.endsWith("/mum-story/story-3/"))?.lastModified).toBe("2024-11-01T09:00:00");
    expect(entries.find((entry) => entry.url.endsWith("/emmanuella/"))?.lastModified).toBe("2024-10-31T14:13:14");
    expect(urls.every((url) => url.endsWith("/"))).toBe(true);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
