/**
 * A listing can draw on more than one WordPress type (the Blog shows Mums Stories and Mum Topics
 * together). These helpers say which types feed a collection key and merge their items.
 */
import { collections, type CollectionKey } from "./collections";
import type { PostSummary } from "./mapping";

/** The WordPress types read for a collection: its own, or the sources it aggregates. */
export function sourcesOf(key: CollectionKey): CollectionKey[] {
  return collections[key].sources ?? [key];
}

/** One list from several, newest first; the same item (by path) appears once. */
export function mergeNewestFirst(lists: PostSummary[][]): PostSummary[] {
  const seen = new Set<string>();
  return lists
    .flat()
    .filter((item) => (seen.has(item.path) ? false : (seen.add(item.path), true)))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
