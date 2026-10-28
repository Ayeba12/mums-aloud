import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** /robots.txt: everything public may be crawled; the API route is not a page. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
