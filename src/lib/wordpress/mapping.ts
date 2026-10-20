/** Pure functions that turn WordPress REST responses into the shapes the site uses. */

export type WpRendered = { rendered: string };

export type WpPost = {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  featured_media?: number;
  categories?: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: { width?: number; height?: number };
    }>;
  };
};

export type PostSummary = {
  id: number;
  slug: string;
  /** Path on the new site, kept identical to the WordPress permalink path. */
  path: string;
  title: string;
  excerpt: string;
  date: string;
  image?: { src: string; alt: string; width?: number; height?: number };
};

const entities: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&#39;": "'",
  "&nbsp;": " ",
  "&hellip;": "…",
};

export function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&[a-z]+;|&#0?39;/gi, (entity) => entities[entity.toLowerCase()] ?? entity);
}

export function toPlainText(html: string): string {
  const text = html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(text).replace(/\s+/g, " ").trim();
}

/** Trims to a word boundary and adds an ellipsis when shortened. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/** Keeps the legacy permalink path so existing URLs keep working. */
export function permalinkPath(link: string): string {
  try {
    const { pathname } = new URL(link);
    return pathname.endsWith("/") ? pathname : `${pathname}/`;
  } catch {
    throw new Error(`Invalid WordPress permalink: ${link}`);
  }
}

/** Many legacy titles are all caps. Convert those to sentence case for readability. */
export function tidyTitle(title: string): string {
  const plain = decodeEntities(title).trim();
  const letters = plain.replace(/[^a-z]/gi, "");
  if (letters.length < 4 || letters !== letters.toUpperCase()) return plain;
  const lower = plain.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function toPostSummary(post: WpPost): PostSummary {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return {
    id: post.id,
    slug: post.slug,
    path: permalinkPath(post.link),
    title: tidyTitle(post.title.rendered),
    excerpt: truncate(toPlainText(post.excerpt?.rendered ?? ""), 180),
    date: post.date,
    image: media?.source_url
      ? {
          src: media.source_url,
          alt: media.alt_text ?? "",
          width: media.media_details?.width,
          height: media.media_details?.height,
        }
      : undefined,
  };
}
