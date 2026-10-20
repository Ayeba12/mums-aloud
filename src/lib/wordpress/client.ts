import { cacheLife, cacheTag } from "next/cache";
import { collections, collectionTag, hiddenSlugs, type CollectionKey } from "./collections";
import { toPostSummary, type PostSummary, type WpPost } from "./mapping";

const API_URL = (process.env.WORDPRESS_API_URL ?? "https://mumsaloud.com/wp-json/wp/v2").replace(/\/$/, "");
const TIMEOUT_MS = 10_000;

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
