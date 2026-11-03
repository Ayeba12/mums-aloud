import type { MetadataRoute } from "next";
import { AI_CRAWLERS } from "@/lib/ai-crawlers";
import { siteConfig } from "@/lib/site";

/** /robots.txt: everything public may be crawled, by search engines and AI assistants alike; the API route is not a page. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
