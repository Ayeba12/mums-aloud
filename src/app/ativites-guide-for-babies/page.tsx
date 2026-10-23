import type { Metadata } from "next";
import { GuidePage } from "@/components/content/GuidePage";
import { guides } from "@/content/resources";

const guide = guides[1];

export const metadata: Metadata = {
  title: guide.title,
  description: guide.intro,
  alternates: { canonical: `/${guide.slug}/` },
};

/** Keeps the live site's URL (including its spelling) for the activities guide. */
export default function ActivitiesGuidePage() {
  return <GuidePage guide={guide} />;
}
