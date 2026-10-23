import type { Metadata } from "next";
import { PostListing } from "@/components/content/PostListing";
import { blog } from "@/content/stories";

export const metadata: Metadata = {
  title: blog.title,
  description: blog.description,
  alternates: { canonical: "/blog/" },
};

/** Blog: the WordPress `mum-story` collection (owner decision, 20 Oct 2026). */
export default function BlogPage() {
  return <PostListing collection="blog" copy={blog} />;
}
