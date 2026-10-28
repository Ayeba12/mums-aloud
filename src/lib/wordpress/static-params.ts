/**
 * Build-time params for the dynamic routes, which run with `ensureStatic = "navigation"`: every
 * listed URL is prerendered, and any other URL waits for its complete render before the response
 * starts, so `notFound()` and redirects set the real status code instead of streaming into a 200
 * shell. That mode needs at least one complete parameter set per route, so a CMS outage at build
 * time yields one placeholder entry rather than a failed build; its page renders the collection's
 * unavailable or not-found state and real URLs render on demand.
 */
import { listingPages } from "@/lib/paging";
import { getAll } from "./client";
import type { CollectionKey } from "./collections";
import { itemUri } from "./graphql";

export const PLACEHOLDER_SLUG = "unavailable";

export async function slugParams(key: CollectionKey): Promise<Array<{ slug: string }>> {
  try {
    // Only this type's own items: an aggregated listing's other sources have their own routes.
    const slugs = (await getAll(key)).filter((post) => post.path === itemUri(key, post.slug)).map((post) => post.slug);
    return (slugs.length ? slugs : [PLACEHOLDER_SLUG]).map((slug) => ({ slug }));
  } catch {
    return [{ slug: PLACEHOLDER_SLUG }];
  }
}

/** Pages 2 to N of a listing (page 1 is the listing itself); "2" alone when there is no second page, so the route still has an entry. */
export async function pageParams(key: CollectionKey): Promise<Array<{ page: string }>> {
  let pages = 1;
  try {
    pages = listingPages((await getAll(key)).length);
  } catch {
    pages = 1;
  }
  const later = Array.from({ length: Math.max(0, pages - 1) }, (_, index) => String(index + 2));
  return (later.length ? later : ["2"]).map((page) => ({ page }));
}
