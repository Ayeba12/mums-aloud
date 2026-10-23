import { cacheLife, cacheTag } from "next/cache";
import { decodeEntities, sanitiseHtml } from "./mapping";

/** WordPress pages whose body the site renders as written in WordPress (the policies). */
export const PAGES_TAG = "wp:pages";

const API_URL = (process.env.WORDPRESS_API_URL ?? "https://mumsaloud.com/wp-json/wp/v2").replace(/\/$/, "");
const TIMEOUT_MS = 15_000;
const SLUG = /^[a-z0-9][a-z0-9-]*$/i;

export type WpPage = { id: number; slug: string; modified: string; title: { rendered: string }; content: { rendered: string } };
export type PageContent = { id: number; slug: string; title: string; modified: string; html: string };

export function toPageContent(page: WpPage): PageContent {
  return {
    id: page.id,
    slug: page.slug,
    title: decodeEntities(page.title.rendered).trim(),
    modified: page.modified,
    html: sanitiseHtml(page.content.rendered),
  };
}

/** A page by slug with its cleaned body, or null when it does not exist. Cached for hours; `POST /api/revalidate/` with `{ "collection": "pages" }` refreshes. */
export async function getPage(slug: string): Promise<PageContent | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(PAGES_TAG);

  if (!SLUG.test(slug)) return null;
  const params = new URLSearchParams({ slug, _fields: "id,slug,modified,title,content" });
  const response = await fetch(`${API_URL}/pages?${params}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`WordPress returned ${response.status} for /pages?slug=${slug}`);
  const [page] = (await response.json()) as WpPage[];
  return page ? toPageContent(page) : null;
}
