import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // WordPress permalinks end with a slash; keep them identical to protect existing URLs and SEO.
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mumsaloud.com", pathname: "/wp-content/uploads/**" },
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
