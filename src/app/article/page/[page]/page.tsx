import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { listingPageCount, PostListing } from "@/components/content/PostListing";
import { articles } from "@/content/stories";
import { pageHref, parsePage } from "@/lib/paging";
import { pageParams } from "@/lib/wordpress/static-params";

type Props = { params: Promise<{ page: string }> };

/** Later pages of the Articles listing; page 1 is `/article/` itself. See the Blog paging route for the notes. */
export const ensureStatic = "navigation";
export const instant = false;
export const generateStaticParams = () => pageParams("articles");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePage((await params).page);
  const pages = page ? await listingPageCount("articles") : null;
  if (!page || (pages !== null && page > pages)) return { title: "Page not found" };
  return {
    title: `${articles.title}, page ${page}`,
    description: articles.description,
    alternates: { canonical: pageHref("/article/", page) },
  };
}

export default async function ArticlesPagedPage({ params }: Props) {
  const page = parsePage((await params).page);
  if (!page) notFound();
  if (page === 1) permanentRedirect("/article/");
  const pages = await listingPageCount("articles");
  if (pages !== null && page > pages) notFound();
  return <PostListing collection="articles" copy={articles} page={page} />;
}
