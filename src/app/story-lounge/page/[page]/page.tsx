import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { listingPageCount, PostListing } from "@/components/content/PostListing";
import { storyLounge } from "@/content/stories";
import { pageHref, parsePage } from "@/lib/paging";
import { pageParams } from "@/lib/wordpress/static-params";

type Props = { params: Promise<{ page: string }> };

/** Later pages of the Story Lounge; page 1 is `/story-lounge/` itself. See the Blog paging route for the notes. */
export const ensureStatic = "navigation";
export const generateStaticParams = () => pageParams("storyLounge");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePage((await params).page);
  const pages = page ? await listingPageCount("storyLounge") : null;
  if (!page || (pages !== null && page > pages)) return { title: "Page not found" };
  return {
    title: `${storyLounge.title}, page ${page}`,
    description: storyLounge.description,
    alternates: { canonical: pageHref("/story-lounge/", page) },
  };
}

export default async function StoryLoungePagedPage({ params }: Props) {
  const page = parsePage((await params).page);
  if (!page) notFound();
  if (page === 1) permanentRedirect("/story-lounge/");
  const pages = await listingPageCount("storyLounge");
  if (pages !== null && page > pages) notFound();
  return <PostListing collection="storyLounge" copy={storyLounge} page={page} />;
}
