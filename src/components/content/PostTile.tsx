import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/layout/Section";
import type { PostSummary } from "@/lib/wordpress/mapping";

/**
 * A post as the reference's tile: photo, tag and title, no card around them, the whole tile as
 * the link. Used by the listings' grids and the homepage's Story Lounge and Blog sections.
 */
export function PostTile({
  post,
  label,
  sizes = "(min-width: 48rem) 50vw, 100vw",
}: {
  post: PostSummary;
  label: string;
  sizes?: string;
}) {
  return (
    <article className="group relative flex flex-col">
      {post.image ? (
        <div className="overflow-hidden rounded-card ring-1 ring-black-950/10 ring-inset">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width ?? 1200}
            height={post.image.height ?? 900}
            sizes={sizes}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center rounded-card bg-surface-tinted">
          <span className="font-heading text-h3 text-text-secondary">{label}</span>
        </div>
      )}
      <Tag className="mt-4 self-start">{label}</Tag>
      <h3 className="mt-3 max-w-[40ch] font-body text-title font-semibold text-ink">
        <Link href={post.path} className="text-ink no-underline after:absolute after:inset-0 hover:underline">
          {post.title}
        </Link>
      </h3>
    </article>
  );
}
