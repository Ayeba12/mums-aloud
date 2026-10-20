import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section } from "@/components/layout/Section";
import { LatestPosts } from "@/components/content/LatestPosts";
import { collections } from "@/lib/wordpress/collections";
import { siteConfig } from "@/lib/site";

/**
 * Phase 0 placeholder homepage. It proves fonts, tokens and the WordPress
 * connection work. The storytelling homepage replaces it in Phase 2.
 */
export default function Home() {
  return (
    <main id="main">
      <Section>
        <div className="flex flex-col items-start gap-6">
          <Image src="/brand/mumsaloud-logo.webp" alt="Mums Aloud" width={161} height={84} priority />
          <Eyebrow>For Black mothers in the UK</Eyebrow>
          <h1 className="max-w-[20ch] text-display leading-tight">To be understood without having to explain.</h1>
          <p className="max-w-reading text-lead">
            Mama&apos;s Escape is the community for Black mothers who are ready to stop doing it all alone.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={siteConfig.joinUrl} size="large">
              Join Mama&apos;s Escape
            </ButtonLink>
            <ButtonLink href="/style-guide" variant="secondary" size="large">
              View the design system
            </ButtonLink>
          </div>
        </div>
      </Section>

      <PostsSection collection="storyLounge" heading="Stories from the Story Lounge" linkLabel="View all stories" tone="warm" />
      <PostsSection collection="blog" heading="From the blog" linkLabel="View all articles" />
    </main>
  );
}

function PostsSection({
  collection,
  heading,
  linkLabel,
  tone,
}: {
  collection: "storyLounge" | "blog";
  heading: string;
  linkLabel: string;
  tone?: "warm";
}) {
  const { label, listingPath } = collections[collection];
  const headingId = `${collection}-heading`;
  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Eyebrow>{label}</Eyebrow>
          <h2 id={headingId} className="text-h2">{heading}</h2>
        </div>
        {listingPath && (
          <Link href={listingPath} className="font-semibold">
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
