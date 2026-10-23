import { PostCard } from "@/components/content/PostCard";
import { collections, type CollectionKey } from "@/lib/wordpress/collections";
import { getLatest } from "@/lib/wordpress/client";
import type { PostSummary } from "@/lib/wordpress/mapping";

/** Featured cards for one collection. Story Lounge and Blog each get their own instance. */
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
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
      {posts.map((post) => (
        <li key={post.id} className="min-w-0">
          <PostCard post={post} label={label} />
        </li>
      ))}
    </ul>
  );
}
