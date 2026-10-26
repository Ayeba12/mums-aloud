import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { PostSummary } from "@/lib/wordpress/mapping";

export const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

/**
 * One post as a card: image (when the post has one), label, title, excerpt and date, with the
 * whole card as the link target. Used for the homepage rows and the related posts on a post page.
 */
export function PostCard({ post, label }: { post: PostSummary; label: string }) {
  return (
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
        <h3 className="font-body text-title font-semibold text-ink">
          <Link href={post.path} className="text-ink no-underline after:absolute after:inset-0 hover:underline">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && <p className="text-text">{post.excerpt}</p>}
        <p className="mt-auto flex items-center justify-between gap-2 pt-4 text-caption text-text-secondary">
          <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
          <span
            aria-hidden
            className="inline-flex size-8 items-center justify-center rounded-pill bg-accent text-on-accent transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none"
          >
            <ArrowRightIcon size={16} weight="bold" />
          </span>
        </p>
      </div>
    </article>
  );
}
