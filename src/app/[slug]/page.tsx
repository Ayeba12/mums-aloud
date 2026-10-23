import type { Metadata } from "next";
import { PostArticle, postMetadata } from "@/components/content/PostArticle";
import { storyLounge } from "@/content/stories";

type Props = { params: Promise<{ slug: string }> };

/**
 * Root-level posts keep their legacy WordPress URLs (e.g. /emmanuella/). Explicit pages win over
 * this segment. The route renders per request from cached WordPress data rather than prerendering
 * a slug list, so a slow WordPress host cannot fail the build, and it is allowed to block
 * (`instant = false`) so an unknown slug answers with a real 404 status instead of a streamed
 * not-found page inside a 200 shell.
 */
export const instant = false;

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
