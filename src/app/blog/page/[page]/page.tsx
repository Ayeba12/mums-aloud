import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { listingPageCount, PostListing } from "@/components/content/PostListing";
import { blog } from "@/content/stories";
import { pageHref, parsePage } from "@/lib/paging";
import { pageParams } from "@/lib/wordpress/static-params";

type Props = { params: Promise<{ page: string }> };

/**
 * Later pages of the Blog; page 1 is `/blog/` itself. `ensureStatic = "navigation"` prerenders the
 * pages that exist and makes any other number wait for its complete render, so page 1 redirects and
 * a page past the end answers with a real 404 before anything streams.
 */
export const ensureStatic = "navigation";
export const generateStaticParams = () => pageParams("blog");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePage((await params).page);
  const pages = page ? await listingPageCount("blog") : null;
  if (!page || (pages !== null && page > pages)) return { title: "Page not found" };
  return {
    title: `${blog.title}, page ${page}`,
    description: blog.description,
    alternates: { canonical: pageHref("/blog/", page) },
  };
}

export default async function BlogPagedPage({ params }: Props) {
  const page = parsePage((await params).page);
  if (!page) notFound();
  if (page === 1) permanentRedirect("/blog/");
  const pages = await listingPageCount("blog");
  if (pages !== null && page > pages) notFound();
  return <PostListing collection="blog" copy={blog} page={page} />;
}
