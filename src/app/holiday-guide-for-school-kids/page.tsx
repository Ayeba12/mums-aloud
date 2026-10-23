import type { Metadata } from "next";
import { GuidePage } from "@/components/content/GuidePage";
import { guides } from "@/content/resources";

const guide = guides[0];

export const metadata: Metadata = {
  title: guide.title,
  description: guide.intro,
  alternates: { canonical: `/${guide.slug}/` },
};

/** Keeps the live site's URL for the holiday guide. */
export default function HolidayGuidePage() {
  return <GuidePage guide={guide} />;
}
