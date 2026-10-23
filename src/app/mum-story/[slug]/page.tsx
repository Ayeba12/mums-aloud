import type { Metadata } from "next";
import { PostArticle, postMetadata } from "@/components/content/PostArticle";
import { blog } from "@/content/stories";

type Props = { params: Promise<{ slug: string }> };

/** Blog articles keep their legacy `/mum-story/[slug]/` URLs. See the root `[slug]` route for the rendering notes. */
export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return postMetadata("blog", slug, blog);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main id="main">
      <PostArticle collection="blog" slug={slug} copy={blog} />
    </main>
  );
}
