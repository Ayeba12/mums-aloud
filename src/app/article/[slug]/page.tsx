import type { Metadata } from "next";
import { PostArticle, postMetadata } from "@/components/content/PostArticle";
import { articles } from "@/content/stories";

type Props = { params: Promise<{ slug: string }> };

/** The `article` collection keeps its legacy `/article/[slug]/` URLs. See the root `[slug]` route for the rendering notes. */
export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return postMetadata("articles", slug, articles);
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  return (
    <main id="main">
      <PostArticle collection="articles" slug={slug} copy={articles} />
    </main>
  );
}
