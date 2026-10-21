import { Suspense } from "react";
import { Section, SectionHeading } from "@/components/layout/Section";
import { LatestPosts } from "@/components/content/LatestPosts";
import { ButtonLink } from "@/components/ui/Button";
import type { AccentText } from "@/components/ui/Heading";
import { collections } from "@/lib/wordpress/collections";

/** One homepage editorial section. Story Lounge and Blog each get their own, never a mixed feed. */
export function HomePosts({
  collection,
  heading,
  intro,
  linkLabel,
  tone,
}: {
  collection: "storyLounge" | "blog";
  heading: AccentText;
  intro: string;
  linkLabel: string;
  tone?: "card" | "tinted";
}) {
  const { label, listingPath } = collections[collection];
  const headingId = `${collection}-heading`;
  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id={headingId} tag={label} heading={heading} intro={intro} />
        {listingPath && (
          <ButtonLink href={listingPath} variant="secondary">
            {linkLabel}
          </ButtonLink>
        )}
      </div>
      <div className="mt-12">
        <Suspense fallback={<p className="text-text-secondary">Loading {label} posts…</p>}>
          <LatestPosts collection={collection} />
        </Suspense>
      </div>
    </Section>
  );
}
