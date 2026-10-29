/**
 * The design system as email can carry it. Inboxes ignore stylesheets, classes and web fonts
 * (Apple Mail is the exception), so everything is tables and inline styles: the palette's hex
 * values, the pill and card radii, Libre Caslon Text and Urbanist with Georgia and Arial behind
 * them, a 600px column on the canvas. Every piece of user-typed text goes through `escape`.
 */
import { siteConfig } from "@/lib/site";

export const palette = {
  canvas: "#fff8fb",
  tint: "#fbe9f2",
  card: "#f1f1f4",
  line: "#e3e3e8",
  ink: "#17171c",
  text: "#2d2d39",
  secondary: "#444455",
  berry: "#8b0e42",
  berrySoft: "#fde8f1",
  marigold: "#f4c871",
  onAction: "#f1f1f4",
} as const;

export const fonts = {
  heading: "'Libre Caslon Text', Georgia, 'Times New Roman', serif",
  body: "Urbanist, 'Segoe UI', Arial, Helvetica, sans-serif",
} as const;

const WEBFONTS = "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital@0;1&family=Urbanist:wght@400;600;700&display=swap";

/** Replaced by the Google Apps Script with the spreadsheet's own address before it sends. */
export const SHEET_URL_TOKEN = "{{SHEET_URL}}";

/** Where the logo and photos load from: the production site, whichever domain it answers on today. */
export function emailOrigin(): string {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return (vercel ? `https://${vercel}` : siteConfig.url).replace(/\/$/, "");
}

export function escape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const bodyFont = `font-family:${fonts.body};`;
const bodyText = `margin:0 0 16px;${bodyFont}font-size:17px;line-height:28px;color:${palette.text};`;
const valueText = `margin:0;${bodyFont}font-size:16px;line-height:24px;color:${palette.ink};`;
const captionText = `margin:0 0 4px;${bodyFont}font-size:13px;line-height:20px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:${palette.secondary};`;

/** One escaped paragraph of body copy. */
export function paragraph(text: string): string {
  return `<p style="${bodyText}">${escape(text)}</p>`;
}

/** Typed text as HTML: blank lines split paragraphs, single line breaks stay as breaks. Escaped. */
export function paragraphs(text: string, style: string = valueText): string {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index, all) => {
      const spaced = index < all.length - 1 ? style.replace(/margin:[^;]*;/, "margin:0 0 12px;") : style;
      return `<p style="${spaced}">${escape(block).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

/** The section tag: a solid pill, caption size, uppercase. */
export function tag(label: string): string {
  return `<span style="display:inline-block;background:${palette.card};border-radius:9999px;padding:6px 12px;${bodyFont}font-size:13px;line-height:20px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:${palette.text};">${escape(label)}</span>`;
}

/** A serif heading with one italic accent phrase, 8px under the tag and 16px over the copy. */
export function heading(lead: string, accent?: string): string {
  const accentHtml = accent ? ` <em style="font-style:italic;">${escape(accent)}</em>` : "";
  return `<h1 style="margin:8px 0 16px;font-family:${fonts.heading};font-weight:400;font-size:32px;line-height:40px;letter-spacing:-0.01em;color:${palette.ink};">${escape(lead)}${accentHtml}</h1>`;
}

export type EmailImage = { src: string; alt: string; width: number; height: number };

/** A photo in the card radius with the 1px outline, full width of the column. */
export function photoCard(image: EmailImage, origin: string): string {
  return `<img src="${origin}${image.src}" alt="${escape(image.alt)}" width="${image.width}" height="${image.height}" style="display:block;width:100%;height:auto;border-radius:16px;border:1px solid ${palette.line};margin:0 0 24px;">`;
}

export type Button = { label: string; href: string; variant?: "primary" | "secondary" };

/**
 * Pill buttons as links: berry with the marigold arrow circle for the primary action, a berry
 * outline for the secondary. Both keep a 48px height and read as plain links where styles are lost.
 */
export function button({ label, href, variant = "primary" }: Button): string {
  const common = `display:inline-block;${bodyFont}font-size:16px;line-height:24px;font-weight:700;text-decoration:none;border-radius:9999px;`;
  if (variant === "secondary") {
    return `<a href="${escape(href)}" style="${common}padding:10px 24px;border:2px solid ${palette.berry};color:${palette.berry};">${escape(label)}</a>`;
  }
  const arrow = `<span style="display:inline-block;width:32px;height:32px;line-height:32px;border-radius:9999px;background:${palette.marigold};color:${palette.ink};text-align:center;font-size:18px;margin-left:12px;vertical-align:middle;" aria-hidden="true">&rarr;</span>`;
  return `<a href="${escape(href)}" style="${common}padding:8px 8px 8px 24px;background:${palette.berry};color:${palette.onAction};">${escape(label)}${arrow}</a>`;
}

/** Buttons side by side, 12px apart, wrapping on narrow screens. */
export function buttonRow(buttons: Button[]): string {
  const cells = buttons.map((item) => `<td style="padding:0 12px 12px 0;">${button(item)}</td>`).join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 0;"><tr>${cells}</tr></table>`;
}

export type DetailRow = { label: string; value: string; href?: string };

/** A card of labelled values, in the card tint with the 16px radius. Multi-line values keep their lines. */
export function detailCard(title: string, rows: DetailRow[]): string {
  const items = rows
    .map(({ label, value, href }) => {
      const body = href ? `<a href="${escape(href)}" style="color:${palette.berry};">${escape(value)}</a>` : paragraphs(value);
      const wrapped = href ? `<p style="${valueText}">${body}</p>` : body;
      return `<tr><td style="padding:0 0 16px;"><p style="${captionText}">${escape(label)}</p>${wrapped}</td></tr>`;
    })
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${palette.card};border-radius:16px;margin:8px 0 24px;"><tr><td style="padding:24px 24px 8px;"><p style="margin:0 0 16px;font-family:${fonts.heading};font-size:22px;line-height:28px;color:${palette.ink};">${escape(title)}</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table></td></tr></table>`;
}

export type Shell = {
  title: string;
  /** The line inboxes show after the subject. */
  preheader: string;
  origin: string;
  /** The column's content, already HTML. */
  body: string;
  /** Why the person is receiving this email. */
  footerNote: string;
};

/** The whole email: the hidden preheader, the logo, the column and the footer. */
export function shell({ title, preheader, origin, body, footerNote }: Shell): string {
  const { instagram, facebook } = siteConfig.social;
  const links = [instagram, facebook]
    .filter((profile) => profile.href)
    .map((profile) => `<a href="${profile.href}" style="color:${palette.berry};">${escape(profile.label)}</a>`)
    .join(" &middot; ");
  const footerText = `${bodyFont}font-size:13px;line-height:20px;color:${palette.secondary};`;
  return `<!doctype html>
<html lang="en-GB" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escape(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="${WEBFONTS}" rel="stylesheet">
<style>
@import url('${WEBFONTS}');
body{margin:0;padding:0;background:${palette.canvas};-webkit-text-size-adjust:100%;}
table{border-collapse:collapse;}
img{border:0;outline:none;text-decoration:none;}
a{color:${palette.berry};}
@media (max-width:620px){.wrap{width:100% !important;}.pad{padding-left:8px !important;padding-right:8px !important;}}
</style>
</head>
<body style="margin:0;padding:0;background:${palette.canvas};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escape(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${palette.canvas};">
<tr><td align="center" style="padding:24px 16px 40px;">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;">
<tr><td align="center" style="padding:8px 0 24px;"><a href="${origin}/" style="text-decoration:none;"><img src="${origin}/email/logo.png" alt="${escape(siteConfig.name)}" width="120" height="62" style="display:block;width:120px;height:62px;"></a></td></tr>
<tr><td class="pad" style="padding:0 8px;">${body}</td></tr>
<tr><td class="pad" style="padding:24px 8px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${palette.line};"><tr><td style="padding:24px 0 0;">
<p style="margin:0 0 8px;${footerText}"><strong style="color:${palette.ink};">${escape(siteConfig.name)}</strong> &middot; ${escape(siteConfig.tagline)}</p>
<p style="margin:0 0 8px;${footerText}"><a href="mailto:${siteConfig.email}" style="color:${palette.berry};">${siteConfig.email}</a> &middot; <a href="${siteConfig.phone.href}" style="color:${palette.berry};">${siteConfig.phone.display}</a>${links ? ` &middot; ${links}` : ""}</p>
<p style="margin:0;${footerText}">${escape(footerNote)} <a href="${origin}/privacy-policy/" style="color:${palette.berry};">Privacy notice</a></p>
</td></tr></table>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
