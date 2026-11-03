import { llmsText } from "@/lib/llms";
import { siteConfig } from "@/lib/site";

/** /llms.txt, built by `lib/llms.ts`. */
export function GET() {
  return new Response(llmsText(siteConfig.url), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
