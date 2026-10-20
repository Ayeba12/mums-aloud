import Link from "next/link";
import { Suspense } from "react";
import { Eyebrow, Section } from "@/components/layout/Section";
import { LatestPosts } from "@/components/content/LatestPosts";
import { Accent } from "@/components/ui/Heading";
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
  heading: { lead: string; accent: string };
  intro: string;
  linkLabel: string;
  tone?: "warm" | "tinted";
}) {
  const { label, listingPath } = collections[collection];
  const headingId = `${collection}-heading`;
  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-reading">
          <Eyebrow>{label}</Eyebrow>
          <h2 id={headingId} className="mt-2 text-h2 tracking-tight">
            <Accent {...heading} />
          </h2>
          <p className="mt-4">{intro}</p>
        </div>
        {listingPath && (
          <Link href={listingPath} className="inline-flex min-h-12 items-center font-semibold">
            {linkLabel}
          </Link>
        )}
      </div>
      <Suspense fallback={<p className="text-text-secondary">Loading {label} posts…</p>}>
        <LatestPosts collection={collection} />
      </Suspense>
    </Section>
  );
}
