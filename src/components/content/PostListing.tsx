import { Suspense } from "react";
import { PostCard } from "@/components/content/PostCard";
import { Section, Tag } from "@/components/layout/Section";
import { ClosingPanel } from "@/components/sections/ClosingPanel";
import { Accent } from "@/components/ui/Heading";
import { postInvite, type ListingCopy } from "@/content/stories";
import { joinForm } from "@/lib/site";
import { getAll } from "@/lib/wordpress/client";
import type { CollectionKey } from "@/lib/wordpress/collections";
import type { PostSummary } from "@/lib/wordpress/mapping";

/**
 * A listing page for one collection: its own introduction, the newest item as a featured card,
 * the rest in a grid, and the contextual invitation. Story Lounge and Blog each get an instance
 * with their own copy and query, so the two never mix.
 */
export function PostListing({ collection, copy }: { collection: CollectionKey; copy: ListingCopy }) {
  return (
    <main id="main">
      <Section aria-labelledby="listing-heading">
        <div className="flex flex-col items-start">
          <Tag>{copy.tag}</Tag>
          <h1 id="listing-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent {...copy.heading} />
          </h1>
          <p className="mt-4 max-w-[46ch] text-lead">{copy.intro}</p>
        </div>
        <div className="mt-12">
          <Suspense fallback={<p className="text-text-secondary">Loading {copy.title.toLowerCase()}…</p>}>
            <ListingPosts collection={collection} copy={copy} />
          </Suspense>
        </div>
      </Section>
      <ClosingPanel
        id="listing-invite"
        heading={postInvite.heading}
        body={postInvite.body}
        primary={{ label: postInvite.primary.label, href: joinForm.href }}
        secondary={postInvite.secondary}
      />
    </main>
  );
}

async function ListingPosts({ collection, copy }: { collection: CollectionKey; copy: ListingCopy }) {
  let posts: PostSummary[];
  try {
    posts = await getAll(collection);
  } catch (error) {
    console.error(`[PostListing] ${copy.title} failed to load`, error);
    return (
      <p role="status" className="text-text-secondary">
        {copy.title} is unavailable right now. Please try again later.
      </p>
    );
  }
  if (posts.length === 0) {
    return <p className="text-text-secondary">{copy.empty}</p>;
  }

  const [featured, ...rest] = posts;
  return (
    <>
      <PostCard post={featured} label={copy.cardLabel} featured headingLevel="h2" />
      {rest.length > 0 && (
        <ul className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {rest.map((post) => (
            <li key={post.id} className="min-w-0">
              <PostCard post={post} label={copy.cardLabel} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
