/**
 * The address of a post's share card, ending in a slash like every URL on this site (`trailingSlash`).
 * Next's own link to an `opengraph-image` route has no slash, so the site answers it with a 308, and
 * WhatsApp does not follow redirects for preview images: post pages name this address instead.
 */
export function shareCardPath(postPath: string): string {
  return `${postPath.replace(/\/?$/, "/")}opengraph-image/`;
}
