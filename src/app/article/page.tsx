import type { Metadata } from "next";
import { PostListing } from "@/components/content/PostListing";
import { articles } from "@/content/stories";

export const metadata: Metadata = {
  title: articles.title,
  description: articles.description,
  alternates: { canonical: "/article/" },
};

/** Articles: the WordPress `article` collection, at the live site's own archive URL (`has_archive`). */
export default function ArticlesPage() {
  return <PostListing collection="articles" copy={articles} />;
}
