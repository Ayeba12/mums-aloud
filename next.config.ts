import type { NextConfig } from "next";

/** The CMS: the REST base names it, and the media host and the admin redirects follow. */
// `||`, not `??`: a blank value in the hosting settings counts as unset.
const wordpressApiUrl = (process.env.WORDPRESS_API_URL || "https://cms.mumsaloud.com/wp-json/wp/v2").replace(/\/$/, "");
const wordpressOrigin = new URL(wordpressApiUrl).origin;
const siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").hostname;

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_WORDPRESS_ORIGIN: wordpressOrigin },
  cacheComponents: true,
  partialPrefetching: true,
  // WordPress permalinks end with a slash; keep them identical to protect existing URLs and SEO.
  trailingSlash: true,
  /**
   * Legacy coaching URLs now live inside Work With Us (Restructure Brief v2, section 6).
   * Temporary redirects until the owner confirms whether they keep their own pages.
   */
  async redirects() {
    return [
      { source: "/chaos-to-calm/", destination: "/work-with-us/", permanent: false },
      { source: "/postpartum-transition-program/", destination: "/work-with-us/", permanent: false },
      { source: "/the-empowered-life-assessment-tela/", destination: "/work-with-us/", permanent: false },
      // Owner's notes (10 Aug 2026): training sits under Services; Affiliate Programs is now Trusted Resources.
      { source: "/training-and-events/", destination: "/services/", permanent: false },
      { source: "/affiliate-programs/", destination: "/trusted-resources/", permanent: true },
      // Once the domain points here, the old WordPress addresses live on at the CMS: media links shared
      // before the move keep working, and the admin habit (mumsaloud.com/wp-admin) lands in the right place.
      ...(new URL(wordpressOrigin).hostname === siteHost
        ? []
        : [
            { source: "/wp-content/uploads/:path*", destination: `${wordpressOrigin}/wp-content/uploads/:path*`, permanent: true },
            { source: "/wp-admin/:path*", destination: `${wordpressOrigin}/wp-admin/:path*`, permanent: false },
            { source: "/wp-login.php", destination: `${wordpressOrigin}/wp-login.php`, permanent: false },
          ]),
    ];
  },
  images: {
    remotePatterns: [
      // The CMS media library (whichever host WORDPRESS_API_URL names), plus both known homes of it.
      { protocol: "https", hostname: new URL(wordpressOrigin).hostname, pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "cms.mumsaloud.com", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "mumsaloud.com", pathname: "/wp-content/uploads/**" },
      // Podcast artwork, served by Spotify for Creators.
      { protocol: "https", hostname: "d3t3ozftmdmh3i.cloudfront.net" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
