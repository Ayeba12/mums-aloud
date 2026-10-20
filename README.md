# Mums Aloud website

Next.js 16 + Tailwind CSS v4 front end for mumsaloud.com. WordPress is the headless CMS. GitHub runs CI; Vercel hosts the site.

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
- `src/lib/wordpress/`: REST client, response mapping and the collection map (which WordPress type feeds Story Lounge, Blog and the rest).
- `src/app/api/revalidate/`: webhook that refreshes cached WordPress content.

## Content freshness

WordPress data is cached with tags (`wp:storyLounge`, `wp:blog`, `wp:articles`, `wp:mumTopics`) and refreshes hourly as a safety net. For instant updates, have WordPress call this on publish:

```
POST https://<site>/api/revalidate/
Header: x-revalidate-secret: <REVALIDATE_SECRET>
Body: {"collection": "blog"}   (omit to refresh everything)
```

## Deploying

1. Push this folder to a new GitHub repository.
2. In Vercel, import the repository. Framework: Next.js. Root directory: the repository root.
3. Add the variables from `.env.example` in Vercel for Production and Preview.
4. Every pull request gets a preview URL; merging to `main` deploys to production.
5. Protect `main` in GitHub: require a pull request and a passing `CI / check`.
