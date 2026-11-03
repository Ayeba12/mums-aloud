import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife, cacheTag } from "next/cache";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { ListingCopy } from "@/content/stories";
import { getBySlug } from "@/lib/wordpress/client";
import { collectionTag, type CollectionKey } from "@/lib/wordpress/collections";
import type { PostDetail } from "@/lib/wordpress/mapping";

/**
 * The link preview card of a story, post or article, drawn when the page is first shared and then
 * cached with the post. It is the fixed pages' card (scripts/share-cards.mjs) in code: the soft pink
 * tint, the logo, the collection's Tag pill, the post title in Libre Caslon, the excerpt in Urbanist,
 * the berry pill with the marigold arrow and the domain, and the feature photo in the 24px panel
 * radius. A post without a usable JPEG or PNG photo gets a community photo instead. The drawing comes out
 * as PNG; it is saved as JPEG (about a sixth of the size) so WhatsApp, which skips large preview images,
 * still shows it.
 */

const cardSize = { width: 1200, height: 630 };

// Literal paths, so the build traces exactly these files into the function (not the whole project).
const [caslon, caslonItalic, urbanist, urbanistSemiBold, urbanistBold, logo, fallbackPhoto] = await Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/og/LibreCaslonText-Regular.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/og/LibreCaslonText-Italic.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/og/Urbanist-Medium.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/og/Urbanist-SemiBold.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/og/Urbanist-Bold.ttf")),
  readFile(join(process.cwd(), "public/email/logo.png")),
  readFile(join(process.cwd(), "src/assets/photos/women-community-circle.jpg")),
]);
const dataUrl = (bytes: Buffer, type: string) => `data:${type};base64,${bytes.toString("base64")}`;
const logoSrc = dataUrl(logo, "image/png");
const fallbackSrc = dataUrl(fallbackPhoto, "image/jpeg");

const colour = {
  canvas: "#fff8fb",
  tint: "#fbe9f2",
  ink: "#17171c",
  text: "#2d2d39",
  muted: "#444455",
  card: "#f1f1f4",
  berry: "#8b0e42",
  onBerry: "#f1f1f4",
  accent: "#f4c871",
  onAccent: "#17171c",
};

/** Title size by length, so long titles still fit in four lines beside the photo. */
export function titleSize(title: string): { fontSize: number; lineHeight: number } {
  if (title.length <= 30) return { fontSize: 64, lineHeight: 72 };
  if (title.length <= 60) return { fontSize: 52, lineHeight: 60 };
  return { fontSize: 44, lineHeight: 52 };
}

/** Clips text at a word boundary, with an ellipsis when anything was cut. */
export function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1).replace(/\s+\S*$/, "").replace(/[,;:.!?]+$/, "");
  return `${cut}…`;
}

/** The feature photo as a data URL when it is a JPEG or PNG the renderer can draw; otherwise the community photo. */
async function photoSrc(post: PostDetail | null): Promise<string> {
  if (!post?.image?.src) return fallbackSrc;
  try {
    const response = await fetch(post.image.src, { signal: AbortSignal.timeout(8000) });
    const type = response.headers.get("content-type")?.split(";")[0] ?? "";
    if (!response.ok || !["image/jpeg", "image/png"].includes(type)) return fallbackSrc;
    return dataUrl(Buffer.from(await response.arrayBuffer()), type);
  } catch {
    return fallbackSrc;
  }
}

function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" fill={colour.onAccent}>
      <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
    </svg>
  );
}

/** The card for one post, as a JPEG response, cached for browsers for an hour and at the edge for a day. */
export async function postCard(collection: CollectionKey, slug: string, copy: ListingCopy): Promise<Response> {
  const jpeg = await cardJpeg(collection, slug, copy);
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" },
  });
}

/**
 * Draws the card once and keeps the JPEG with the post's data: a publish in WordPress refreshes it through
 * the collection's tag. An unknown slug or a CMS outage still draws a card, with the listing's name.
 */
async function cardJpeg(collection: CollectionKey, slug: string, copy: ListingCopy): Promise<Uint8Array> {
  "use cache";
  cacheLife("hours");
  cacheTag(collectionTag(collection));
  let post: PostDetail | null = null;
  try {
    post = await getBySlug(collection, slug);
  } catch {
    // The page reports the outage; the card falls back to the listing's own title.
  }
  const title = clip(post?.title ?? copy.title, 90);
  const excerpt = post?.excerpt ? clip(post.excerpt, 110) : copy.intro;
  const photo = await photoSrc(post);
  const { fontSize, lineHeight } = titleSize(title);

  const drawing = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px 64px",
          gap: 56,
          backgroundImage: `linear-gradient(to bottom, ${colour.tint}, ${colour.canvas} 72%)`,
          fontFamily: "Urbanist",
          color: colour.text,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, minWidth: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- the card renderer draws plain img elements */}
          <img src={logoSrc} width={168} height={87} alt="" style={{ objectFit: "contain", objectPosition: "left" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 36,
                  padding: "0 16px",
                  borderRadius: 999,
                  background: colour.card,
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: colour.text,
                }}
              >
                {copy.cardLabel}
              </div>
            </div>
            <div
              style={{
                marginTop: 20,
                fontFamily: "Libre Caslon Text",
                fontSize,
                lineHeight: `${lineHeight}px`,
                letterSpacing: "-0.015em",
                color: colour.ink,
                textWrap: "balance",
              }}
            >
              {title}
            </div>
            <div style={{ marginTop: 18, fontSize: 23, lineHeight: "32px", color: colour.muted, maxWidth: 560 }}>{excerpt}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                height: 64,
                padding: "8px 8px 8px 28px",
                borderRadius: 999,
                background: colour.berry,
                color: colour.onBerry,
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              {copy.readLabel}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 999, background: colour.accent }}>
                <ArrowIcon />
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, color: colour.muted }}>mumsaloud.com</div>
          </div>
        </div>
        <div style={{ display: "flex", width: 440, height: "100%", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(16,16,20,0.1)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- the card renderer draws plain img elements */}
          <img src={photo} alt="" width={440} height={518} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    ),
    {
      ...cardSize,
      fonts: [
        { name: "Libre Caslon Text", data: caslon, style: "normal", weight: 400 },
        { name: "Libre Caslon Text", data: caslonItalic, style: "italic", weight: 400 },
        { name: "Urbanist", data: urbanist, style: "normal", weight: 500 },
        { name: "Urbanist", data: urbanistSemiBold, style: "normal", weight: 600 },
        { name: "Urbanist", data: urbanistBold, style: "normal", weight: 700 },
      ],
    },
  );
  const jpeg = await sharp(Buffer.from(await drawing.arrayBuffer())).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
  return new Uint8Array(jpeg);
}
