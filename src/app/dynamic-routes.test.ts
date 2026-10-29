import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

const appDir = join(process.cwd(), "src", "app");
const dynamicPages = readdirSync(appDir, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name === "page.tsx" && /\[[^\]]+\]/.test(entry.parentPath))
  .map((entry) => join(entry.parentPath, entry.name))
  .sort();
const routeName = (file: string) => relative(appDir, file).split(sep).join("/");

/**
 * Every dynamic route renders a URL-specific page, so it blocks on purpose: `ensureStatic = "navigation"`
 * decides the status code before anything streams (real 404s and redirects under Cache Components) and
 * `instant = false` tells the instant-navigation check the same, so the dev overlay stays quiet. Both
 * need `generateStaticParams`. Removing any of the three brings the soft 404s or the overlay error back.
 */
describe("dynamic routes", () => {
  it("covers the post, article, topic and paged listing routes", () => {
    expect(dynamicPages.map(routeName)).toEqual([
      "[slug]/page.tsx",
      "article/[slug]/page.tsx",
      "article/page/[page]/page.tsx",
      "blog/page/[page]/page.tsx",
      "mum-story/[slug]/page.tsx",
      "mum-topic/[slug]/page.tsx",
      "story-lounge/page/[page]/page.tsx",
    ]);
  });

  it.each(dynamicPages.map((file) => [routeName(file), file]))("%s blocks on purpose with static params", (_name, file) => {
    const source = readFileSync(file, "utf8");
    expect(source).toMatch(/^export const ensureStatic = "navigation";$/m);
    expect(source).toMatch(/^export const instant = false;$/m);
    expect(source).toMatch(/^export const generateStaticParams = /m);
  });
});
