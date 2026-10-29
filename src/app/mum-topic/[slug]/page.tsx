import type { Metadata } from "next";
import { PostArticle, postMetadata } from "@/components/content/PostArticle";
import { blog } from "@/content/stories";
import { slugParams } from "@/lib/wordpress/static-params";

type Props = { params: Promise<{ slug: string }> };

/**
 * Mum Topics keep their WordPress URLs at `/mum-topic/[slug]/` and read as part of the Blog (owner,
 * 28 Oct 2026): the Blog listing merges them with the Mums Stories, and this page carries the Blog's
 * labels. See the root `[slug]` route for the rendering notes.
 */
export const ensureStatic = "navigation";
export const instant = false;
export const generateStaticParams = () => slugParams("mumTopics");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return postMetadata("mumTopics", slug, blog);
}

export default async function MumTopicPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main id="main">
      <PostArticle collection="mumTopics" slug={slug} copy={blog} />
    </main>
  );
}
