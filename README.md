# Mums Aloud website

Next.js 16 + Tailwind CSS v4 front end for mumsaloud.com. WordPress is the headless CMS, read through WPGraphQL. GitHub runs CI; Vercel hosts the site.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The design system is at http://localhost:3000/style-guide/.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types, then runs TypeScript |
| `npm test` | Unit tests (Vitest) |

## Where things live

- `src/styles/theme.css`: design tokens as a Tailwind v4 `@theme`. Source: `../output/design-system/tailwind-theme.css`.
- `src/components/`: `ui/` (buttons), `layout/` (sections), `content/` (post cards).
- `src/lib/wordpress/`: the WPGraphQL client and queries (`graphql.ts`), the cached reads (`client.ts`, `pages.ts`), the response mapping and the collection map (which WordPress type feeds Story Lounge, Blog and the rest).
- `src/app/api/revalidate/`: webhook that refreshes cached WordPress content.

## Content freshness

WordPress data is cached with tags (`wp:storyLounge`, `wp:blog`, `wp:articles`, `wp:mumTopics`, `wp:pages`, `podcast`) and refreshes hourly as a safety net. The Mums Aloud Headless plugin (`wp-plugin/`, installed on the CMS) calls this on every publish, update, bin and delete:

```
POST https://<site>/api/revalidate/
Header: x-revalidate-secret: <REVALIDATE_SECRET>
Body: {"collection": "blog"}   (omit to refresh everything)
```

## The CMS

Content is edited at https://cms.mumsaloud.com/ (WordPress) and read through WPGraphQL at `https://cms.mumsaloud.com/graphql`. The WPGraphQL plugin must stay installed and active on the CMS, and the Mums Aloud Headless plugin (1.1.0 or later) exposes Mums Stories, Articles and Mum Topics to it. The REST API is still used by the WordPress importer and by the plugin's own settings. `docs/cms-setup.md` has the setup, the content import and the go-live steps; `wp-plugin/` holds the plugin that registers the content types and sends the refresh requests. `WORDPRESS_API_URL` names the CMS; the GraphQL endpoint (its origin plus `/graphql`, or `WORDPRESS_GRAPHQL_URL`), the media host and the `/wp-admin` and `/wp-content/uploads/` redirects follow it.

## The lock file

`package-lock.json` must be complete for Linux, where CI and Vercel run `npm ci`. npm on Windows leaves out the optional WASM packages that sharp and Tailwind depend on (`@emnapi/runtime`, `@emnapi/core`), so after changing dependencies on a Windows machine run the **Refresh lock file** workflow on GitHub (Actions > Refresh lock file > Run workflow) and pull `main`. It resolves the full tree on Linux, proves `npm ci` accepts it, and commits the lock.

## Deploying

1. The code lives at https://github.com/Ayeba12/mums-aloud (`main`).
2. In Vercel, import the repository. Framework: Next.js. Root directory: the repository root.
3. Add the variables from `.env.example` in Vercel for Production and Preview.
4. Every pull request gets a preview URL; merging to `main` deploys to production.
5. Protect `main` in GitHub: require a pull request and a passing `CI / check`.
6. Volunteer applications: `docs/volunteer-sheet-setup.md` connects the form to a Google Sheet and the two emails (`VOLUNTEER_WEBHOOK_URL`, `VOLUNTEER_WEBHOOK_SECRET`).
