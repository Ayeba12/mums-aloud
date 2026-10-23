import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { PODCAST_TAG } from "@/lib/podcast/feed";
import { collections, collectionTag, type CollectionKey } from "@/lib/wordpress/collections";

/**
 * Called by WordPress when content is published or updated.
 * POST /api/revalidate with header `x-revalidate-secret` and JSON `{ "collection": "blog" }`
 * (or `"podcast"` for the episode feed). Omit `collection` to refresh everything.
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

  if (body.collection && body.collection !== PODCAST_TAG && !(body.collection in collections)) {
    return Response.json({ error: `Unknown collection "${body.collection}"` }, { status: 400 });
  }

  const everything = [...(Object.keys(collections) as CollectionKey[]).map(collectionTag), PODCAST_TAG];
  const tags = !body.collection ? everything : body.collection === PODCAST_TAG ? [PODCAST_TAG] : [collectionTag(body.collection as CollectionKey)];
  for (const tag of tags) revalidateTag(tag, "max");

  return Response.json({ revalidated: tags });
}

function isSameSecret(received: string, expected: string) {
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
