import type { Metadata } from "next";
import { GuidePage } from "@/components/content/GuidePage";
import { guides } from "@/content/resources";

const guide = guides[1];

export const metadata: Metadata = {
  title: guide.title,
  description: guide.intro,
  alternates: { canonical: `/${guide.slug}/` },
};

/** The activities guide. The live site spelled its address "ativites"; that address redirects here (next.config.ts). */
export default function ActivitiesGuidePage() {
  return <GuidePage guide={guide} />;
}
