import type { Metadata } from "next";
import { PostArticle, postMetadata } from "@/components/content/PostArticle";
import { storyLounge } from "@/content/stories";
import { slugParams } from "@/lib/wordpress/static-params";

type Props = { params: Promise<{ slug: string }> };

/**
 * Root-level posts keep their legacy WordPress URLs (e.g. /emmanuella/). Explicit pages win over
 * this segment. `ensureStatic = "navigation"` prerenders every slug listed by `generateStaticParams`
 * and makes any other URL wait for its complete render, so an unknown slug answers with a real 404
 * status instead of a not-found page streamed into a 200 shell (Cache Components otherwise sends
 * the shell first). The params come from the cached CMS data with a placeholder on outage, so a
 * slow WordPress host cannot fail the build.
 */
export const ensureStatic = "navigation";
export const generateStaticParams = () => slugParams("storyLounge");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return postMetadata("storyLounge", slug, storyLounge);
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main id="main">
      <PostArticle collection="storyLounge" slug={slug} copy={storyLounge} />
    </main>
  );
}
