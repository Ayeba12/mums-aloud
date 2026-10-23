import type { Metadata } from "next";
import { PostListing } from "@/components/content/PostListing";
import { storyLounge } from "@/content/stories";

export const metadata: Metadata = {
  title: storyLounge.title,
  description: storyLounge.description,
  alternates: { canonical: "/story-lounge/" },
};

/** Story Lounge: WordPress `post` in the `story-lounge` category (owner decision, 20 Oct 2026). */
export default function StoryLoungePage() {
  return <PostListing collection="storyLounge" copy={storyLounge} />;
}
