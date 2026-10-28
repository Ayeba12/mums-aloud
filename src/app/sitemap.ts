import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { siteConfig } from "@/lib/site";
import { buildSitemap, type SitemapContent } from "@/lib/sitemap";
import { getAll } from "@/lib/wordpress/client";
import { collectionTag } from "@/lib/wordpress/collections";

/**
 * /sitemap.xml: the fixed pages plus every published post, story and article. The CMS reads are
 * cached and tagged, so a publish refreshes the sitemap with the pages; if the CMS cannot be
 * reached, the fixed pages are listed alone rather than failing the request.
 */
async function entries(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("hours");
  cacheTag(collectionTag("storyLounge"), collectionTag("blog"), collectionTag("articles"));

  const content: SitemapContent = {};
  for (const key of ["storyLounge", "blog", "articles"] as const) {
    try {
      content[key] = await getAll(key);
    } catch (error) {
      console.error(`[sitemap] ${key} could not be read`, error);
    }
  }
  return buildSitemap(siteConfig.url, content);
}

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return entries();
}
