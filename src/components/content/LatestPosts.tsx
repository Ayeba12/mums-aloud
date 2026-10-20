import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { collections, type CollectionKey } from "@/lib/wordpress/collections";
import { getLatest } from "@/lib/wordpress/client";
import type { PostSummary } from "@/lib/wordpress/mapping";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

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
          <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border-decoration bg-surface-card">
            {post.image && (
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={post.image.width ?? 1200}
                height={post.image.height ?? 800}
                sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"
                className="aspect-card w-full object-cover"
              />
            )}
            <div className="flex flex-1 flex-col gap-2 p-6">
              <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{label}</p>
              <h3 className="text-h4 font-body font-bold text-ink">
                <Link
                  href={post.path}
                  className="text-ink no-underline after:absolute after:inset-0 hover:underline"
                >
                  {post.title}
                </Link>
              </h3>
              {post.excerpt && <p className="text-text">{post.excerpt}</p>}
              <p className="mt-auto flex items-center justify-between gap-2 pt-4 text-caption text-text-secondary">
                <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
                <ArrowRightIcon aria-hidden size={20} className="text-action" />
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
