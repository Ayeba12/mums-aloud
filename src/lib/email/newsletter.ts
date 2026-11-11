/**
 * The welcome email a newsletter sign-up triggers (owner, 11 Nov 2026): a thank-you, the two free
 * Mama's Escape magazines as cover cards with download buttons, and what the newsletter brings.
 * Sent from the team mailbox like the forms' emails; the words live in `content/newsletter.ts`.
 */
import { newsletterGifts, welcomeEmail, type NewsletterGift } from "@/content/newsletter";
import { siteConfig } from "@/lib/site";
import type { EmailMessage } from "./message";
import { button, buttonRow, escape, fonts, heading, palette, paragraph, shell, tag } from "./template";

/** The covers beside each download (public/email/, 240px wide for sharp 120px display). */
export const giftCovers: Record<NewsletterGift["id"], { src: string; width: number; height: number }> = {
  "edition-1": { src: "/email/edition-1-cover.jpg", width: 240, height: 316 },
  "edition-2": { src: "/email/edition-2-cover.jpg", width: 240, height: 340 },
};

const bodyFont = `font-family:${fonts.body};`;

/** One magazine: the cover on the left, the edition, title, summary and download button on the right. */
export function giftCard(gift: NewsletterGift, origin: string): string {
  const cover = giftCovers[gift.id];
  const displayHeight = Math.round((cover.height * 120) / cover.width);
  const meta = `${gift.edition} · ${gift.pages} pages`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${palette.card};border-radius:16px;margin:0 0 16px;"><tr>
<td class="stack stack-top" width="136" valign="top" style="padding:20px 0 20px 20px;width:136px;"><a href="${escape(gift.pdf)}" style="text-decoration:none;"><img src="${origin}${cover.src}" alt="The cover of Mama's Escape, ${escape(gift.edition)}" width="120" height="${displayHeight}" style="display:block;width:120px;height:auto;border-radius:8px;border:1px solid ${palette.line};"></a></td>
<td class="stack stack-body" valign="top" style="padding:20px 20px 12px 16px;">
<p style="margin:0 0 4px;${bodyFont}font-size:13px;line-height:20px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:${palette.secondary};">${escape(meta)}</p>
<p style="margin:0 0 8px;font-family:${fonts.heading};font-size:22px;line-height:28px;color:${palette.ink};">${escape(gift.title)}</p>
<p style="margin:0 0 16px;${bodyFont}font-size:15px;line-height:24px;color:${palette.text};">${escape(gift.summary)}</p>
<div class="btn-wrap" style="display:inline-block;margin:0 0 8px;">${button({ label: welcomeEmail.download, href: gift.pdf })}</div>
<p style="margin:0;${bodyFont}font-size:13px;line-height:20px;color:${palette.secondary};">PDF, ${escape(gift.size)}</p>
</td></tr></table>`;
}

/** The plain list of what the newsletter brings, with marigold markers. */
function bringsList(): string {
  const items = welcomeEmail.brings
    .map((item) => `<tr><td width="20" valign="top" style="padding:10px 0 0;"><span style="display:block;width:8px;height:8px;border-radius:9999px;background:${palette.marigold};"></span></td><td style="padding:0 0 8px;${bodyFont}font-size:16px;line-height:26px;color:${palette.text};">${escape(item)}</td></tr>`)
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;">${items}</table>`;
}

/** The welcome email for one new subscriber; `firstName` is optional on the form. */
export function newsletterWelcomeEmail({ email, firstName }: { email: string; firstName?: string }, { origin }: { origin: string }): EmailMessage {
  const first = firstName?.trim().split(/\s+/)[0];
  const lead = first ? welcomeEmail.heading.named(first) : welcomeEmail.heading.unnamed;
  const buttons = [
    { label: "Join Mama's Escape", href: `${origin}${siteConfig.joinUrl}` },
    { label: "Listen to the podcast", href: "https://creators.spotify.com/pod/show/mamasescape", variant: "secondary" as const },
  ];

  const body = [
    tag(welcomeEmail.tag),
    heading(lead, welcomeEmail.heading.accent),
    paragraph(welcomeEmail.intro),
    ...newsletterGifts.map((gift) => giftCard(gift, origin)),
    `<p style="margin:24px 0 0;font-family:${fonts.heading};font-size:22px;line-height:28px;color:${palette.ink};">${escape(welcomeEmail.bringsTitle)}</p>`,
    bringsList(),
    buttonRow(buttons),
  ].join("");

  const text = [
    `${lead} ${welcomeEmail.heading.accent}`,
    "",
    welcomeEmail.intro,
    "",
    ...newsletterGifts.flatMap((gift) => [`Mama's Escape, ${gift.edition}: ${gift.title} (${gift.pages} pages)`, gift.summary, `Download (PDF, ${gift.size}): ${gift.pdf}`, ""]),
    welcomeEmail.bringsTitle,
    ...welcomeEmail.brings.map((item) => `- ${item}`),
    "",
    ...buttons.map((item) => `${item.label}: ${item.href}`),
    "",
    `${siteConfig.name}, ${siteConfig.tagline}`,
    `${siteConfig.email}, ${siteConfig.phone.display}`,
    welcomeEmail.footerNote,
  ].join("\n");

  return {
    to: email,
    subject: welcomeEmail.subject,
    html: shell({ title: welcomeEmail.subject, preheader: "Two editions of Mama's Escape, yours to keep. Download them here.", origin, body, footerNote: welcomeEmail.footerNote }),
    text,
    fromName: siteConfig.name,
    replyTo: siteConfig.email,
  };
}
