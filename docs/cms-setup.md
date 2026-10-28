# Connecting the CMS (cms.mumsaloud.com)

The new website reads its stories, articles, posts and policy pages from WordPress through the REST API. This guide moves that WordPress from the old site to **cms.mumsaloud.com** and connects publishing to the site, so an edit in WordPress shows on mumsaloud.com within seconds.

## Where things stand (28 October 2026)

- **cms.mumsaloud.com** is a brand-new, empty WordPress (7.1.3, Hostinger). It has one "Hello world!" post and no content types of its own.
- **mumsaloud.com** (the old Elementor site) still holds all the content: 31 blog stories (Mums Stories), 4 articles, 6 Story Lounge posts, 25 pages, 188 media files. Three content types there (Mums Stories, Articles, Mum Topics) come from a plugin, so the new CMS needs them registered before anything can be imported.
- Since step 4 (28 October 2026) the new site reads from the CMS. After step 6 the domain mumsaloud.com points at the new site, and the CMS is the only WordPress left.

**A note on access.** Never send passwords in chat. Two ways to do the WordPress steps:

1. Do them yourself from this guide. It is about an hour, most of it waiting for the import.
2. Sign in to both WordPress admins yourself in the browser pane inside Claude, and let Claude click through them while you watch. Claude asks before every change and never sees the password.

## Who does what

| Step | What | Who | Time |
| --- | --- | --- | --- |
| 1 | Tidy the new CMS | You | 10 min |
| 2 | Install the Mums Aloud Headless plugin | You | 5 min |
| 3 | Move the content across | You | 30 to 60 min, mostly waiting |
| 4 | Check the import and switch the site to the CMS | Claude | 15 min |
| 5 | Connect publishing to the site | You and Claude | 10 min, once the site is on Vercel |
| 6 | Go live on the domain | You and Claude | 1 hour, plus DNS time |
| 7 | Day to day | You | |

## Step 1. Tidy the new CMS

Sign in at https://cms.mumsaloud.com/wp-admin/ and go through **Settings**:

- **General**: Site Title `Mums Aloud`, Tagline `Content for mumsaloud.com`, Timezone `London`, Site Language `English (UK)`.
- **Reading**: tick **Discourage search engines from indexing this site**. The CMS must never compete with mumsaloud.com in Google.
- **Permalinks**: choose **Post name**. The site relies on this URL shape.
- **Discussion**: untick **Allow people to submit comments on new posts**.
- **Posts**: bin "Hello world!". **Pages**: bin "Sample Page" if there is one.
- **Appearance**: the theme is never shown to visitors after step 6, so the Hostinger AI theme can stay. Do not install Elementor or any page builder, and no SEO plugin either; the site does all of that itself.
- **Users**: one Administrator account with a strong password. Hostinger's own security is enough; no extra security plugin is needed.

## Step 2. Install the Mums Aloud Headless plugin

The plugin does three jobs: it registers the three content types the site reads (Mums Stories, Articles, Mum Topics) with the same URLs as before; it tells the site to refresh whenever something is published, updated, binned or deleted; and, after go-live, it sends anyone who opens the CMS to the site.

1. The file is `output/cms/mumsaloud-headless.zip` (built from `web/wp-plugin/`).
2. In the CMS: **Plugins > Add New Plugin > Upload Plugin**, choose the zip, **Install Now**, then **Activate**.
3. Check: the left menu now shows **Mums Stories**, **Articles** and **Mum Topics**, and https://cms.mumsaloud.com/wp-json/wp/v2/mum-story answers `[]` instead of an error.
4. **Settings > Headless site** appears. Leave the Site URL and Secret empty for now (step 5), and leave "Send visitors" unticked.

## Step 3. Move the content across

The standard WordPress export and import does this cleanly. The post bodies are ordinary block-editor content, so nothing Elementor-specific is needed.

**On the old site** (https://mumsaloud.com/wp-admin/):

1. **Tools > Export**, choose **All content**, **Download Export File**. You get a small XML file; the images are not inside it, the importer fetches them.

**On the CMS** (https://cms.mumsaloud.com/wp-admin/):

2. **Tools > Import > WordPress > Install Now**, then **Run Importer**.
3. Choose the XML file and **Upload file and import**.
4. On the next screen, for each author choose **assign posts to an existing user** and pick your account. Tick **Download and import file attachments**. **Submit**.
5. Wait. The importer copies 188 files from mumsaloud.com, so this can take several minutes. If it stops with a timeout, run the same import again from step 2; it skips everything already imported.

**Check the result**:

- Posts 6, Mums Stories 31, Articles 4, Pages 25, Media 188. Categories include "Story Lounge".
- Open a Mum Story: the featured image is there and the body reads as before.

Notes:

- Pages built with Elementor (Home, About and the rest) arrive as plain pages with leftover shortcodes. That is harmless: the site does not use them. Keep **Privacy Policy** and **Cookie Policy UK**, which the site renders; the others can be binned later.
- The "Pregnancy weeks" type on the old site has no items and is not carried over.
- The "testing" post is hidden by the site.
- Hostinger's "clone website" or All-in-One WP Migration would copy the whole old site, Elementor and all twenty plugins included. Not recommended; the point is a clean CMS.
- Anything edited on the old site after the export is not on the CMS. Stop editing the old site once the export is done.

## Step 4. Check the import and switch the site to the CMS (Claude)

Tell Claude the import is done. Claude then:

1. Checks through the REST API: the counts, a story with its featured image, the two policy pages.
2. Switches the site's WordPress address to the CMS: the default in the code, the CI setting and `.env.example`. The media host and the `/wp-admin` and `/wp-content/uploads/` redirects follow that one address.
3. Re-checks every listing and post page, Bokun's portrait on the About pages and the two guide PDFs, then commits.

From then on the CMS is the source.

## Step 5. Connect publishing to the site

This needs the site deployed (README, "Deploying": the GitHub repository and the Vercel project).

**In Vercel** (Project > Settings > Environment Variables), for Production and Preview:

| Name | Value |
| --- | --- |
| `WORDPRESS_API_URL` | `https://cms.mumsaloud.com/wp-json/wp/v2` |
| `REVALIDATE_SECRET` | a long random value, generated with the command below |
| `NEXT_PUBLIC_SITE_URL` | `https://mumsaloud.com` (the Vercel address until the domain moves) |

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Redeploy after saving the variables.

**In the CMS**, **Settings > Headless site**:

1. **Site URL**: the site's address, with no path. Use the Vercel address (`https://....vercel.app`) until the domain moves, then `https://mumsaloud.com`.
2. **Secret**: the same value as `REVALIDATE_SECRET`. **Save Changes**.
3. Click **Refresh the site now**. A green notice says `The site refreshed. HTTP 200 {"revalidated":[...]}`.

If the notice is red: `HTTP 401` means the two secrets differ; `HTTP 503` means `REVALIDATE_SECRET` is not set on the site yet; "Could not reach the site" means the Site URL is wrong or the site is not deployed.

**Test it**: change a story's title in the CMS, **Update**, reload the story on the site. The new title shows within seconds.

## Step 6. Go live on the domain

1. In Vercel, add the domains `mumsaloud.com` and `www.mumsaloud.com`. Vercel shows the DNS records to set.
2. In Hostinger's DNS for mumsaloud.com, set those records (the A record for `mumsaloud.com` and the CNAME for `www`). Leave `cms.mumsaloud.com` as it is; it keeps pointing at the Hostinger WordPress.
3. Wait for the domain to switch (minutes to a few hours). Check https://mumsaloud.com/ shows the new site.
4. In the CMS, **Settings > Headless site**: Site URL `https://mumsaloud.com`, tick **Send visitors from this CMS to the site**, **Save Changes**. From now on anyone who opens a CMS page is sent to the same page on the site; signed-in editors are not affected.
5. Old links keep working: `mumsaloud.com/wp-content/uploads/...` goes to the CMS's copy of the file (permanent redirect), and `mumsaloud.com/wp-admin` goes to the CMS admin.
6. Keep the old Hostinger site for a month as a backup, then remove it.

## Step 7. Day to day

- Write and publish in the CMS. Where things show on the site:
  - **Posts** in the **Story Lounge** category: the Story Lounge.
  - **Mums Stories**: the Blog.
  - **Articles**: their own pages at `/article/...`.
  - **Pages** `privacy-policy` and `cookie-policy-uk`: the policy pages.
  - Everything else in WordPress is not shown.
- Set a **featured image** (shown on the cards) and an **excerpt** (the card text; without one, the first 180 characters of the body are used).
- Changes show on the site within seconds. If one does not, **Settings > Headless site > Refresh the site now**. Failing that, the site refreshes itself within the hour.
- Upload images in the CMS's media library. Their addresses start with `https://cms.mumsaloud.com/wp-content/uploads/`.
- Two plugins must stay active: **WPGraphQL** (the site reads all content through it) and **Mums Aloud Headless** (it registers the content types, exposes them to WPGraphQL and sends the refresh requests). Deactivating either empties the site's listings.
