import { cacheLife, cacheTag } from "next/cache";
import { gql } from "./graphql";
import { decodeEntities, sanitiseHtml } from "./mapping";

/** WordPress pages whose body the site renders as written in WordPress (the policies). */
export const PAGES_TAG = "wp:pages";

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

type PageNode = { databaseId: number; slug: string; modified: string; title: string | null; content: string | null };

const PAGE_QUERY = `query pageByUri($uri: ID!) {
  page(id: $uri, idType: URI) { databaseId slug modified title content }
}`;

/** A page by slug with its cleaned body, or null when it does not exist. Cached for hours; `POST /api/revalidate/` with `{ "collection": "pages" }` refreshes. */
export async function getPage(slug: string): Promise<PageContent | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(PAGES_TAG);

  if (!SLUG.test(slug)) return null;
  const { page } = await gql<{ page: PageNode | null }>(PAGE_QUERY, { uri: `/${slug}/` });
  if (!page) return null;
  return toPageContent({
    id: page.databaseId,
    slug: page.slug,
    modified: page.modified,
    title: { rendered: page.title ?? "" },
    content: { rendered: page.content ?? "" },
  });
}
