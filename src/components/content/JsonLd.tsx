import { jsonLdText } from "@/lib/schema";

/** One block of structured data (see `lib/schema.ts`). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdText(data) }} />;
}
