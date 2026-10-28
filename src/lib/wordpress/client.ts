import { cacheLife, cacheTag } from "next/cache";
import { collections, collectionTag, hiddenSlugs, type CollectionKey } from "./collections";
import { toPostDetail, toPostSummary, type PostDetail, type PostSummary, type WpPost } from "./mapping";

const API_URL = (process.env.WORDPRESS_API_URL ?? "https://cms.mumsaloud.com/wp-json/wp/v2").replace(/\/$/, "");
const TIMEOUT_MS = 15_000; // the current WordPress host can take 8s+ to answer

export class WordPressError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "WordPressError";
  }
}

async function wpFetch<T>(path: string): Promise<T> {
  const url = `${API_URL}${path}`;
  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    throw new WordPressError(`WordPress request failed for ${path}: ${(error as Error).message}`);
  }
  if (!response.ok) {
    throw new WordPressError(`WordPress returned ${response.status} for ${path}`, response.status);
  }
  return (await response.json()) as T;
}

async function getCategoryId(slug: string): Promise<number> {
  "use cache";
  cacheLife("days");
  cacheTag("wp:categories");
  const [category] = await wpFetch<Array<{ id: number }>>(
    `/categories?slug=${encodeURIComponent(slug)}&_fields=id`,
  );
  if (!category) throw new WordPressError(`Category "${slug}" not found`);
  return category.id;
}

/** Latest published items in a collection, newest first. Hidden slugs are removed. */
export async function getLatest(key: CollectionKey, count = 3): Promise<PostSummary[]> {
  "use cache";
  // Hours as a safety net; the publish webhook refreshes sooner via the tag.
  cacheLife("hours");
  cacheTag(collectionTag(key));

  const collection = collections[key];
  const params = new URLSearchParams({
    per_page: String(Math.min(count + hiddenSlugs.size, 100)),
    orderby: "date",
    order: "desc",
    _embed: "wp:featuredmedia",
  });
  if (collection.categorySlug) {
    params.set("categories", String(await getCategoryId(collection.categorySlug)));
  }
  const posts = await wpFetch<WpPost[]>(`/${collection.restBase}?${params}`);
  return posts.filter((post) => !hiddenSlugs.has(post.slug)).slice(0, count).map(toPostSummary);
}

/**
 * Every published item in a collection, newest first. WordPress serves at most 100 per request;
 * the largest collection holds 31 today, so paging can wait until a listing nears that.
 */
export async function getAll(key: CollectionKey): Promise<PostSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(collectionTag(key));

  const collection = collections[key];
  const params = new URLSearchParams({ per_page: "100", orderby: "date", order: "desc", _embed: "wp:featuredmedia" });
  if (collection.categorySlug) {
    params.set("categories", String(await getCategoryId(collection.categorySlug)));
  }
  const posts = await wpFetch<WpPost[]>(`/${collection.restBase}?${params}`);
  return posts.filter((post) => !hiddenSlugs.has(post.slug)).map(toPostSummary);
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
  const params = new URLSearchParams({ slug, _embed: "wp:featuredmedia,wp:term" });
  const [post] = await wpFetch<WpPost[]>(`/${collections[key].restBase}?${params}`);
  return post ? toPostDetail(post) : null;
}
