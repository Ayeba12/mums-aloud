/**
 * Where WordPress lives. `WORDPRESS_API_URL` names the REST base (the CMS); `next.config.ts` derives
 * the origin from it at build time as `NEXT_PUBLIC_WORDPRESS_ORIGIN`, so media addresses agree on the
 * server and in the browser and the whole site moves with one variable.
 */
export const WORDPRESS_ORIGIN = (process.env.NEXT_PUBLIC_WORDPRESS_ORIGIN ?? "https://mumsaloud.com").replace(/\/$/, "");

/** A file in the WordPress media library by its path under `wp-content/uploads`, e.g. `2025/08/guide.pdf`. */
export const uploadUrl = (path: string) => `${WORDPRESS_ORIGIN}/wp-content/uploads/${path.replace(/^\/+/, "")}`;
