import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { PODCAST_TAG } from "@/lib/podcast/feed";
import { PAGES_TAG } from "@/lib/wordpress/pages";
import { collections, collectionTag, type CollectionKey } from "@/lib/wordpress/collections";

/**
 * Called by WordPress when content is published or updated.
 * POST /api/revalidate with header `x-revalidate-secret` and JSON `{ "collection": "blog" }`
 * (`"podcast"` for the episode feed, `"pages"` for policy pages). Omit `collection` to refresh everything.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "Revalidation is not configured" }, { status: 503 });
  }
  if (!isSameSecret(request.headers.get("x-revalidate-secret") ?? "", secret)) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }

  let body: { collection?: string } = {};
  try {
    body = await request.json();
  } catch {
    // An empty body means "refresh everything".
  }

  const extra: Record<string, string> = { podcast: PODCAST_TAG, pages: PAGES_TAG };
  if (body.collection && !(body.collection in extra) && !(body.collection in collections)) {
    return Response.json({ error: `Unknown collection "${body.collection}"` }, { status: 400 });
  }

  const everything = [...(Object.keys(collections) as CollectionKey[]).map(collectionTag), ...Object.values(extra)];
  const tags = !body.collection ? everything : body.collection in extra ? [extra[body.collection]] : [collectionTag(body.collection as CollectionKey)];
  for (const tag of tags) revalidateTag(tag, "max");

  return Response.json({ revalidated: tags });
}

function isSameSecret(received: string, expected: string) {
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
