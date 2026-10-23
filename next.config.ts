import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      { source: "/chaos-to-calm/", destination: "/work-with-us/#chaos-to-calm", permanent: false },
      { source: "/postpartum-transition-program/", destination: "/work-with-us/#postpartum", permanent: false },
      { source: "/the-empowered-life-assessment-tela/", destination: "/work-with-us/#tela", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
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
