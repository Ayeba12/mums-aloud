import { articles } from "@/content/stories";
import { postCard } from "@/lib/og/post-card";
import { slugParams } from "@/lib/wordpress/static-params";

/** This item's link preview card: its title, excerpt and feature photo in the site's card design (see `lib/og/post-card.tsx`). */
export const alt = "An article from Mums Aloud.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";
export const generateStaticParams = () => slugParams("articles");

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return postCard("articles", slug, articles);
}
