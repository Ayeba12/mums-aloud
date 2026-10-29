import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import { PostTile } from "@/components/content/PostTile";
import { Section, SectionHeading } from "@/components/layout/Section";
import { ClosingPanel } from "@/components/sections/ClosingPanel";
import { ButtonLink } from "@/components/ui/Button";
import { postInvite, type ListingCopy } from "@/content/stories";
import { dateFormat } from "@/lib/dates";
import { joinForm, siteConfig } from "@/lib/site";
import { getAll, getBySlug } from "@/lib/wordpress/client";
import { collections, type CollectionKey } from "@/lib/wordpress/collections";
import type { PostDetail, PostSummary } from "@/lib/wordpress/mapping";

/**
 * The label shown above a post. Story Lounge posts carry the collection's label; a legacy
 * root-level post from another category keeps its own category name, so nothing is mislabelled.
 */
export function postLabel(post: PostDetail, collection: CollectionKey, copy: ListingCopy): string {
  const { categorySlug } = collections[collection];
  if (!categorySlug || post.categories.some((category) => category.slug === categorySlug)) return copy.cardLabel;
  return post.categories[0]?.name ?? copy.cardLabel;
}

/** Metadata for a post page, from the cached post. Unknown slugs fall through to the not-found page. */
export async function postMetadata(collection: CollectionKey, slug: string, copy: ListingCopy): Promise<Metadata> {
  let post: PostDetail | null;
  try {
    post = await getBySlug(collection, slug);
  } catch {
    // The page itself reports the outage; metadata stays generic.
    return { title: copy.title };
  }
  if (!post) return { title: "Page not found" };
  return {
    title: post.title,
    description: post.excerpt || copy.description,
    alternates: { canonical: post.path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || copy.description,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.image ? [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }] : undefined,
    },
  };
}

/**
 * One story or article: label and title, dates, the feature image when there is one, the body in
 * a 65ch reading column, three more from the same collection as the Blog's tiles, and the contextual invitation.
 */
export async function PostArticle({ collection, slug, copy }: { collection: CollectionKey; slug: string; copy: ListingCopy }) {
  const { listingPath = "/" } = collections[collection];
  let post: PostDetail | null;
  try {
    post = await getBySlug(collection, slug);
  } catch (error) {
    console.error(`[PostArticle] ${copy.title} "${slug}" failed to load`, error);
    return (
      <Section aria-labelledby="post-heading">
        <h1 id="post-heading" className="text-h1">
          {copy.title}
        </h1>
        <p role="status" className="mt-4 text-text-secondary">
          This page is unavailable right now. Please try again later.
        </p>
      </Section>
    );
  }
  if (!post) notFound();

  let related: PostSummary[] = [];
  try {
    related = (await getAll(collection)).filter((item) => item.id !== post.id).slice(0, 3);
  } catch (error) {
    console.error(`[PostArticle] related ${copy.title} failed to load`, error);
  }

  const label = postLabel(post, collection, copy);
  const updated = post.modified.slice(0, 10) !== post.date.slice(0, 10);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.image?.src,
    mainEntityOfPage: `${siteConfig.url}${post.path}`,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <article>
        <Section aria-labelledby="post-heading">
          <div className="mx-auto max-w-[52rem]">
            <p data-enter className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-semibold tracking-wide text-text-secondary uppercase">
              <Link href={listingPath} className="text-text-secondary">
                {copy.tag}
              </Link>
              <span aria-hidden>·</span>
              <span>{label}</span>
            </p>
            <h1 id="post-heading" data-enter className="mt-4 text-h1 tracking-tight [--enter-step:1]">
              {post.title}
            </h1>
            <p data-enter className="mt-4 text-caption text-text-secondary [--enter-step:2]">
              Published <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
              {updated && (
                <>
                  {" · "}Updated <time dateTime={post.modified}>{dateFormat.format(new Date(post.modified))}</time>
                </>
              )}
            </p>
          </div>
          {post.image && (
            <div data-enter className="mx-auto mt-8 max-w-[64rem] overflow-hidden rounded-card ring-1 ring-black-950/10 ring-inset md:mt-12 [--enter-step:3]">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={post.image.width ?? 1600}
                height={post.image.height ?? 1067}
                priority
                sizes="(min-width: 64rem) 64rem, 100vw"
                className="aspect-card w-full object-cover"
              />
            </div>
          )}
          <div className="rich-text mx-auto mt-8 max-w-reading md:mt-12" dangerouslySetInnerHTML={{ __html: post.html }} />
          <p className="mx-auto mt-12 max-w-reading">
            <Link href={listingPath} className="inline-flex min-h-12 items-center gap-2 font-semibold">
              <ArrowLeftIcon aria-hidden size={16} weight="bold" />
              {copy.allLabel}
            </Link>
          </p>
        </Section>
      </article>

      {related.length > 0 && (
        <Section aria-labelledby="more-heading" tone="tinted">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="more-heading" heading={copy.moreHeading} />
            <ButtonLink href={listingPath} variant="secondary">
              {copy.allLabel}
            </ButtonLink>
          </div>
          <ul data-reveal="stagger" className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {related.map((item) => (
              <li key={item.id} className="min-w-0">
                <PostTile post={item} label={copy.cardLabel} sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw" />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <ClosingPanel
        id="post-invite"
        heading={postInvite.heading}
        body={postInvite.body}
        primary={{ label: postInvite.primary.label, href: joinForm.href }}
        secondary={postInvite.secondary}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

