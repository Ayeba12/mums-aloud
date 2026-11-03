import { cacheLife, cacheTag } from "next/cache";
import { llmsText, POST_SECTIONS, type LlmsPosts } from "@/lib/llms";
import { siteConfig } from "@/lib/site";
import { getAll } from "@/lib/wordpress/client";
import { collectionTag } from "@/lib/wordpress/collections";

/**
 * /llms.txt, built by `lib/llms.ts`: the main pages, then every story, post and article. The CMS
 * reads are cached and tagged like the sitemap's, so a publish refreshes this file too; if the CMS
 * cannot be reached, the main pages are listed alone.
 */
async function text(): Promise<string> {
  "use cache";
  cacheLife("hours");
  cacheTag(...POST_SECTIONS.map(({ key }) => collectionTag(key)));

  const posts: LlmsPosts = {};
  for (const { key } of POST_SECTIONS) {
    try {
      posts[key] = await getAll(key);
    } catch (error) {
      console.error(`[llms.txt] ${key} could not be read`, error);
    }
  }
  return llmsText(siteConfig.url, posts);
}

export async function GET() {
  return new Response(await text(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
