import { cacheLife, cacheTag } from "next/cache";
import { collectionTag, hiddenSlugs, type CollectionKey } from "./collections";
import { gql, itemUri, listQuery, nodeToPost, singleQuery, type ListResult, type SingleResult } from "./graphql";
import { mergeNewestFirst, sourcesOf } from "./listing";
import { toPostDetail, toPostSummary, type PostDetail, type PostSummary } from "./mapping";

export { WordPressError } from "./graphql";

/** WPGraphQL answers at most 100 items per request; the largest collection holds 31 today. */
const PAGE_LIMIT = 100;

/** Every published item of one WordPress type, newest first, up to WPGraphQL's 100 per request. */
async function readSource(key: CollectionKey, first: number): Promise<PostSummary[]> {
  const { items } = await gql<ListResult>(listQuery(key), { first });
  return (items?.nodes ?? []).filter((node) => !hiddenSlugs.has(node.slug)).map((node) => toPostSummary(nodeToPost(node)));
}

/** Latest published items in a collection (all its sources together), newest first. Hidden slugs are removed. */
export async function getLatest(key: CollectionKey, count = 3): Promise<PostSummary[]> {
  "use cache";
  // Hours as a safety net; the publish webhook refreshes sooner via the tags.
  cacheLife("hours");
  const sources = sourcesOf(key);
  cacheTag(...sources.map(collectionTag));

  const first = Math.min(count + hiddenSlugs.size, PAGE_LIMIT);
  const lists = await Promise.all(sources.map((source) => readSource(source, first)));
  return mergeNewestFirst(lists).slice(0, count);
}

/**
 * Every published item in a collection (all its sources together), newest first; each source gives
 * up to WPGraphQL's 100 per request, and paging past that can wait until a type nears it.
 */
export async function getAll(key: CollectionKey): Promise<PostSummary[]> {
  "use cache";
  cacheLife("hours");
  const sources = sourcesOf(key);
  cacheTag(...sources.map(collectionTag));

  const lists = await Promise.all(sources.map((source) => readSource(source, PAGE_LIMIT)));
  return mergeNewestFirst(lists);
}

const SLUG = /^[a-z0-9][a-z0-9-]*$/i;

/**
 * One item by slug, with its body, or null when it does not exist or is hidden. The category
 * filter is not applied here: a slug is unique within its post type, and legacy root-level posts
 * outside the Story Lounge category keep their URLs (the page labels them by their own category).
 */
export async function getBySlug(key: CollectionKey, slug: string): Promise<PostDetail | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(collectionTag(key));

  if (!SLUG.test(slug) || hiddenSlugs.has(slug)) return null;
  const { item } = await gql<SingleResult>(singleQuery(key), { uri: itemUri(key, slug) });
  return item ? toPostDetail(nodeToPost(item)) : null;
}
