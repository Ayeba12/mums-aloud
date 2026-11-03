/**
 * Renders the link preview card of every fixed page (src/content/share-cards.json) to
 * src/app/<route>/opengraph-image.jpg, with its opengraph-image.alt.txt. Next's file convention
 * then adds og:image (and its size and alt) to that page; X falls back to og:image.
 *
 *   npm run share-cards            every card
 *   npm run share-cards -- /podcast/ /blog/   only these routes
 *
 * One template in the design system: the soft pink tint fading to the canvas, the logo, a Tag pill,
 * a Libre Caslon heading with its italic accent, an Urbanist line, the berry pill with the marigold
 * arrow circle and the domain; on the right a photo in the 24px panel radius with the 1px outline,
 * a grid of real portraits, or a berry panel with the pledge. Rendered at 1200x630 by headless
 * Chrome (fonts from Google Fonts, so it needs a connection) and saved as JPEG, which keeps every
 * card well under WhatsApp's preview limit. Chrome's path is the Windows default; set CHROME_PATH
 * elsewhere.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { cards } = JSON.parse(readFileSync(join(root, "src/content/share-cards.json"), "utf8"));
const only = process.argv.slice(2);
const chosen = only.length ? cards.filter((card) => only.includes(card.route)) : cards;
if (!chosen.length) {
  console.error(`No card for ${only.join(", ")}`);
  process.exit(2);
}

const file = (path) => pathToFileURL(join(root, path)).href;
const escape = (text = "") => text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** Keeps hyphenated words (school-age) on one line. */
const keepWords = (text) => escape(text).replace(/(\S+-\S+)/g, '<span style="white-space:nowrap">$1</span>');

/** Heading size by length, so long page titles still fit in three lines. */
function headingSize(card) {
  const length = `${card.lead} ${card.accent}`.length;
  if (length <= 26) return [72, 80];
  if (length <= 44) return [60, 68];
  return [50, 58];
}

const arrow = `<svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"/></svg>`;

function aside(card) {
  const position = card.position || "50% 35%";
  if (card.variant === "panel") {
    return `<div class="panel"><span class="quote" aria-hidden="true">&ldquo;</span><div><p class="pledge">Say it out loud.<br><em>You are allowed.</em></p><p class="promise">The Mums Aloud promise</p></div></div>`;
  }
  if (card.variant === "portraits") {
    const many = card.photos.length > 4 ? " five" : "";
    return `<div class="portraits${many}">${card.photos
      .map((photo) => `<div class="frame"><img src="${file(photo)}" style="object-position:${position}" alt=""></div>`)
      .join("")}</div>`;
  }
  return `<div class="frame"><img src="${file(card.photos[0])}" style="object-position:${position}" alt=""></div>`;
}

function html(card) {
  const [size, leading] = headingSize(card);
  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;1,400&family=Urbanist:wght@500;600;700&display=block" rel="stylesheet">
<style>
  :root { --canvas: #fff8fb; --tint: #fbe9f2; --ink: #17171c; --text: #2d2d39; --muted: #444455; --card: #f1f1f4;
          --berry: #8b0e42; --muted-on-berry: #e3e3e8; --on-berry: #f1f1f4; --accent: #f4c871; --on-accent: #17171c; }
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { background: linear-gradient(to bottom, var(--tint), var(--canvas) 72%); font-family: Urbanist, Arial, sans-serif; color: var(--text); }
  .card { display: grid; grid-template-columns: 1fr 440px; grid-template-rows: minmax(0, 1fr); gap: 56px; width: 1200px; height: 630px; padding: 56px 64px; }
  .copy { display: flex; flex-direction: column; justify-content: space-between; min-width: 0; }
  .logo { width: 168px; height: auto; display: block; }
  .tag { display: inline-flex; align-items: center; min-height: 36px; padding: 4px 16px; border-radius: 999px; background: var(--card);
         font-size: 17px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text); margin-bottom: 20px; }
  h1 { font-family: "Libre Caslon Text", Georgia, serif; font-weight: 400; font-size: ${size}px; line-height: ${leading}px;
       letter-spacing: -0.015em; color: var(--ink); text-wrap: balance; }
  h1 em { font-style: italic; }
  .line { font-size: 23px; line-height: 32px; color: var(--muted); margin-top: 18px; max-width: 32ch; text-wrap: pretty; }
  .foot { display: flex; align-items: center; gap: 24px; }
  .pill { display: inline-flex; align-items: center; gap: 14px; min-height: 64px; padding: 8px 8px 8px 28px; border-radius: 999px;
          background: var(--berry); color: var(--on-berry); font-weight: 700; font-size: 22px; white-space: nowrap; }
  .pill .arrow { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 999px;
                 background: var(--accent); color: var(--on-accent); }
  .site { font-size: 22px; font-weight: 600; color: var(--muted); }
  .frame { position: relative; height: 100%; min-height: 0; border-radius: 24px; overflow: hidden; }
  .frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .frame::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 0 1px rgba(16,16,20,.1); }
  .portraits { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 12px; height: 100%; min-height: 0; }
  .portraits .frame { border-radius: 16px; }
  .portraits.five { grid-template-columns: repeat(6, 1fr); }
  .portraits.five .frame { grid-column: span 2; }
  .portraits.five .frame:nth-child(-n+2) { grid-column: span 3; }
  .panel { display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding: 40px; border-radius: 24px;
           background: var(--berry); color: var(--on-berry); }
  .quote { font-family: "Libre Caslon Text", Georgia, serif; font-size: 200px; line-height: 140px; height: 120px; color: var(--accent); }
  .pledge { font-family: "Libre Caslon Text", Georgia, serif; font-size: 44px; line-height: 52px; white-space: nowrap; letter-spacing: -0.015em; }
  .promise { margin-top: 20px; font-size: 17px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted-on-berry); }
  .pledge em { color: var(--accent); }
</style></head>
<body><div class="card">
  <div class="copy">
    <img class="logo" src="${file("public/brand/mumsaloud-logo.webp")}" alt="Mums Aloud">
    <div>
      ${card.tag ? `<p class="tag">${escape(card.tag)}</p>` : ""}
      <h1>${keepWords(card.lead)} <em>${keepWords(card.accent)}</em></h1>
      <p class="line">${escape(card.line)}</p>
    </div>
    <div class="foot"><span class="pill">${escape(card.action)}<span class="arrow">${arrow}</span></span><span class="site">mumsaloud.com</span></div>
  </div>
  ${aside(card)}
</div></body></html>`;
}

// Headless Chrome through the DevTools protocol, as tmp/capture-section.mjs does (no extra packages).
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn(
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe",
  ["--headless=new", `--remote-debugging-port=${port}`, "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--window-size=1200,630", "--no-first-run", "about:blank"],
  { stdio: "ignore" },
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let socketUrl;
for (let i = 0; i < 50 && !socketUrl; i++) {
  try {
    const list = await (await fetch(`http://localhost:${port}/json`)).json();
    socketUrl = list.find((target) => target.type === "page")?.webSocketDebuggerUrl;
  } catch {}
  if (!socketUrl) await sleep(200);
}
if (!socketUrl) throw new Error("Chrome did not start");
const ws = new WebSocket(socketUrl);
await new Promise((r) => (ws.onopen = r));
let nextId = 0;
const pending = new Map();
ws.onmessage = (message) => {
  const msg = JSON.parse(message.data);
  if (msg.id && pending.has(msg.id)) {
    const { ok, fail } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) fail(new Error(msg.error.message));
    else ok(msg.result);
  }
};
const send = (method, params = {}) =>
  new Promise((ok, fail) => {
    const id = ++nextId;
    pending.set(id, { ok, fail });
    ws.send(JSON.stringify({ id, method, params }));
  });

const work = mkdtempSync(join(tmpdir(), "share-cards-"));
try {
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  for (const card of chosen) {
    const page = join(work, "card.html");
    writeFileSync(page, html(card));
    await send("Page.navigate", { url: pathToFileURL(page).href });
    // Wait for the fonts and every image, then let layout settle.
    for (let i = 0; i < 100; i++) {
      const { result } = await send("Runtime.evaluate", {
        expression: `document.readyState === "complete" && document.fonts.status === "loaded" && [...document.images].every((img) => img.complete && img.naturalWidth > 0)`,
        returnByValue: true,
      });
      if (result.value) break;
      await sleep(100);
    }
    await sleep(150);
    const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 86, clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
    const dir = join(root, "src/app", card.route);
    writeFileSync(join(dir, "opengraph-image.jpg"), Buffer.from(data, "base64"));
    // No trailing newline: Next copies the file as is into og:image:alt and twitter:image:alt.
    writeFileSync(join(dir, "opengraph-image.alt.txt"), card.alt);
    console.log(`${card.route} -> ${Math.round(Buffer.from(data, "base64").length / 1024)} KB`);
  }
} finally {
  ws.close();
  chrome.kill();
  rmSync(work, { recursive: true, force: true });
}
