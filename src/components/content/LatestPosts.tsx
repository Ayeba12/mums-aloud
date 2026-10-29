import { PostTile } from "@/components/content/PostTile";
import { collections, type CollectionKey } from "@/lib/wordpress/collections";
import { getLatest } from "@/lib/wordpress/client";
import type { PostSummary } from "@/lib/wordpress/mapping";

const tileLabel: Partial<Record<CollectionKey, string>> = { storyLounge: "Story", blog: "Article" };

/** The newest items of one collection as tiles, three across. Story Lounge and Blog each get their own instance. */
export async function LatestPosts({ collection, count = 3 }: { collection: CollectionKey; count?: number }) {
  const { label } = collections[collection];
  let posts: PostSummary[];
  try {
    posts = await getLatest(collection, count);
  } catch (error) {
    console.error(`[LatestPosts] ${label} failed to load`, error);
    return (
      <p role="status" className="text-text-secondary">
        {label} posts are unavailable right now. Please try again later.
      </p>
    );
  }

  if (posts.length === 0) {
    return <p className="text-text-secondary">No {label} posts yet.</p>;
  }

  return (
    <ul data-reveal="stagger" className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
      {posts.map((post) => (
        <li key={post.id} className="min-w-0">
          <PostTile post={post} label={tileLabel[collection] ?? label} sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw" />
        </li>
      ))}
    </ul>
  );
}
