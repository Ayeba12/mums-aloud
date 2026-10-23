import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { dateFormat } from "@/components/content/PostCard";
import { Section, SectionHeading, Tag } from "@/components/layout/Section";
import { buttonClasses, ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { postInvite, type ListingCopy } from "@/content/stories";
import { pageCount, pageHref, pageSlice } from "@/lib/paging";
import { joinForm } from "@/lib/site";
import { getAll } from "@/lib/wordpress/client";
import { collections, type CollectionKey } from "@/lib/wordpress/collections";
import type { PostSummary } from "@/lib/wordpress/mapping";

const imageRing = "ring-1 ring-black-950/10 ring-inset";

/**
 * How many pages a listing has, for the paged routes to validate a page number before the
 * response starts (so a page past the end is a real 404). Null when WordPress cannot be reached;
 * the listing then shows its own unavailable state.
 */
export async function listingPageCount(collection: CollectionKey): Promise<number | null> {
  try {
    const posts = await getAll(collection);
    return pageCount(Math.max(0, posts.length - 1));
  } catch {
    return null;
  }
}

/**
 * A listing page after the reference's blog: a centred title on a soft tint, the newest item as a
 * photo beside a light panel, a "latest" grid of photo, tag and title, paging, and a light closing
 * with two pills. Story Lounge and Blog each get an instance with their own copy and query.
 */
export function PostListing({ collection, copy, page = 1 }: { collection: CollectionKey; copy: ListingCopy; page?: number }) {
  return (
    <main id="main">
      <Section
        aria-labelledby="listing-heading"
        className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface)_32rem)]"
      >
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag>{copy.tag}</Tag>
          <h1 id="listing-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent {...copy.heading} />
          </h1>
          <p className="mt-4 max-w-[46ch] text-lead">{copy.intro}</p>
        </div>
        <div className="mt-12">
          <Suspense fallback={<p className="text-center text-text-secondary">Loading {copy.title.toLowerCase()}…</p>}>
            <ListingPosts collection={collection} copy={copy} page={page} />
          </Suspense>
        </div>
      </Section>

      <Section aria-labelledby="listing-invite" className="bg-[linear-gradient(to_bottom,var(--color-surface),var(--color-surface-tinted))]">
        <SectionHeading
          id="listing-invite"
          heading={postInvite.heading}
          intro={postInvite.body}
          align="center"
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={joinForm.href} size="large" arrow>
                {postInvite.primary.label}
              </ButtonLink>
              <ButtonLink href={postInvite.secondary.href} variant="secondary" size="large">
                {postInvite.secondary.label}
              </ButtonLink>
            </div>
          }
        />
      </Section>
    </main>
  );
}

async function ListingPosts({ collection, copy, page }: { collection: CollectionKey; copy: ListingCopy; page: number }) {
  const { listingPath = "/" } = collections[collection];
  let posts: PostSummary[];
  try {
    posts = await getAll(collection);
  } catch (error) {
    console.error(`[PostListing] ${copy.title} failed to load`, error);
    return (
      <p role="status" className="text-center text-text-secondary">
        {copy.title} is unavailable right now. Please try again later.
      </p>
    );
  }
  if (posts.length === 0) {
    return <p className="text-center text-text-secondary">{copy.empty}</p>;
  }

  const [featured, ...rest] = posts;
  const pages = pageCount(rest.length);
  if (page > pages) notFound();
  const items = pageSlice(rest, page);

  return (
    <>
      <FeaturedPost post={featured} copy={copy} />
      {rest.length > 0 && (
        <>
          <h2 id="latest-heading" className="mt-16 text-center text-h2 lg:mt-24">
            {copy.latestHeading}
          </h2>
          <ul aria-labelledby="latest-heading" className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:gap-x-8">
            {items.map((post) => (
              <li key={post.id} className="min-w-0">
                <PostTile post={post} label={copy.cardLabel} />
              </li>
            ))}
          </ul>
          <Pagination page={page} pages={pages} listingPath={listingPath} />
        </>
      )}
    </>
  );
}

/** The newest item: photo beside a light panel, as the reference's featured article. */
function FeaturedPost({ post, copy }: { post: PostSummary; copy: ListingCopy }) {
  return (
    <article className="group relative grid gap-2 md:grid-cols-12 md:gap-4">
      {post.image ? (
        <div className={`relative aspect-card overflow-hidden rounded-card md:col-span-7 md:aspect-auto md:min-h-[30rem] ${imageRing}`}>
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            priority
            sizes="(min-width: 48rem) 58vw, 100vw"
            className="object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      ) : (
        <div className="flex aspect-card items-center justify-center rounded-card bg-surface-tinted md:col-span-7 md:aspect-auto md:min-h-[30rem]">
          <span className="font-heading text-h2 text-text-secondary">{copy.cardLabel}</span>
        </div>
      )}
      <div className="flex flex-col rounded-card bg-surface-card p-6 md:col-span-5 lg:p-8">
        <Tag className="self-start">{copy.featuredLabel}</Tag>
        <h2 className="mt-4 text-h3">
          <Link href={post.path} className="text-ink no-underline after:absolute after:inset-0 hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-caption font-semibold tracking-wide text-text-secondary uppercase">
          <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
        </p>
        {post.excerpt && <p className="mt-8 text-text md:mt-auto md:pt-8">{post.excerpt}</p>}
        <span aria-hidden className={`mt-6 self-start ${buttonClasses("secondary")}`}>
          {copy.readLabel}
        </span>
      </div>
    </article>
  );
}

/** A grid item, as the reference's post tile: photo, tag and title, no card around them. */
function PostTile({ post, label }: { post: PostSummary; label: string }) {
  return (
    <article className="group relative flex flex-col">
      {post.image ? (
        <div className={`overflow-hidden rounded-card ${imageRing}`}>
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width ?? 1200}
            height={post.image.height ?? 900}
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center rounded-card bg-surface-tinted">
          <span className="font-heading text-h3 text-text-secondary">{label}</span>
        </div>
      )}
      <Tag className="mt-4 self-start">{label}</Tag>
      <h3 className="mt-3 max-w-[40ch] font-body text-h4 font-bold text-ink">
        <Link href={post.path} className="text-ink no-underline after:absolute after:inset-0 hover:underline">
          {post.title}
        </Link>
      </h3>
    </article>
  );
}

function Pagination({ page, pages, listingPath }: { page: number; pages: number; listingPath: string }) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Pages" className="mt-12 flex flex-wrap items-center justify-center gap-3">
      {page > 1 && (
        <ButtonLink href={pageHref(listingPath, page - 1)} variant="secondary">
          <ArrowLeftIcon aria-hidden size={16} weight="bold" />
          Previous page
        </ButtonLink>
      )}
      <p className="px-2 text-caption font-semibold text-text-secondary tabular-nums">
        Page {page} of {pages}
      </p>
      {page < pages && (
        <ButtonLink href={pageHref(listingPath, page + 1)} variant="secondary">
          Next page
          <ArrowRightIcon aria-hidden size={16} weight="bold" />
        </ButtonLink>
      )}
    </nav>
  );
}
