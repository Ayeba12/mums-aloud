/**
 * What the XML sitemap lists: every public page of the site, then every published Story Lounge
 * post, Blog story and Article. Pure functions; `app/sitemap.ts` feeds them the CMS data.
 */
import { listingPages, pageHref } from "@/lib/paging";
import type { CollectionKey } from "@/lib/wordpress/collections";
import type { PostSummary } from "@/lib/wordpress/mapping";

export type SitemapEntry = { url: string; lastModified?: string; changeFrequency?: "daily" | "weekly" | "monthly" | "yearly"; priority?: number };

/** Every page with a fixed address, as paths with trailing slashes. The style guide and the 404 page are left out. */
export const STATIC_ROUTES = [
  "/",
  "/about-mums-aloud/",
  "/article/",
  "/ativites-guide-for-babies/",
  "/blog/",
  "/contact/",
  "/cookie-policy-uk/",
  "/find-support/",
  "/holiday-guide-for-school-kids/",
  "/mamas-escape/",
  "/meet-bokun/",
  "/meet-the-team/",
  "/mums-council/",
  "/new-mums-circle/",
  "/ovulation-calculator/",
  "/partnership/",
  "/podcast/",
  "/pregnancy-calculator/",
  "/privacy-policy/",
  "/terms-and-conditions/",
  "/resources/",
  "/services/",
  "/story-lounge/",
  "/trusted-resources/",
  "/volunteer/",
  "/work-with-us/",
] as const;

const LISTING_PATHS: Record<Exclude<CollectionKey, "mumTopics">, string> = {
  storyLounge: "/story-lounge/",
  blog: "/blog/",
  articles: "/article/",
};

export type SitemapContent = Partial<Record<keyof typeof LISTING_PATHS, PostSummary[]>>;

/** Absolute URLs on the site's origin: the static pages, the later listing pages, then every item, newest first. */
export function buildSitemap(origin: string, content: SitemapContent): SitemapEntry[] {
  const base = origin.replace(/\/$/, "");
  const entries: SitemapEntry[] = STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
  for (const [key, listingPath] of Object.entries(LISTING_PATHS) as Array<[keyof typeof LISTING_PATHS, string]>) {
    const items = content[key] ?? [];
    for (let page = 2; page <= listingPages(items.length); page += 1) {
      entries.push({ url: `${base}${pageHref(listingPath, page)}`, changeFrequency: "weekly", priority: 0.4 });
    }
    for (const item of items) {
      entries.push({ url: `${base}${item.path}`, lastModified: item.modified ?? item.date, changeFrequency: "monthly", priority: 0.6 });
    }
  }
  return entries;
}
