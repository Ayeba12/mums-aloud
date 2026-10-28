import { cacheLife, cacheTag } from "next/cache";
import { collectionTag, hiddenSlugs, type CollectionKey } from "./collections";
import { gql, itemUri, listQuery, nodeToPost, singleQuery, type ListResult, type SingleResult } from "./graphql";
import { toPostDetail, toPostSummary, type PostDetail, type PostSummary } from "./mapping";

export { WordPressError } from "./graphql";

/** WPGraphQL answers at most 100 items per request; the largest collection holds 31 today. */
const PAGE_LIMIT = 100;

/** Latest published items in a collection, newest first. Hidden slugs are removed. */
export async function getLatest(key: CollectionKey, count = 3): Promise<PostSummary[]> {
  "use cache";
  // Hours as a safety net; the publish webhook refreshes sooner via the tag.
  cacheLife("hours");
  cacheTag(collectionTag(key));

  const { items } = await gql<ListResult>(listQuery(key), { first: Math.min(count + hiddenSlugs.size, PAGE_LIMIT) });
  return (items?.nodes ?? [])
    .filter((node) => !hiddenSlugs.has(node.slug))
    .slice(0, count)
    .map((node) => toPostSummary(nodeToPost(node)));
}

/**
 * Every published item in a collection, newest first, up to WPGraphQL's 100 per request; paging
 * can wait until a listing nears that.
 */
export async function getAll(key: CollectionKey): Promise<PostSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(collectionTag(key));

  const { items } = await gql<ListResult>(listQuery(key), { first: PAGE_LIMIT });
  return (items?.nodes ?? []).filter((node) => !hiddenSlugs.has(node.slug)).map((node) => toPostSummary(nodeToPost(node)));
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
