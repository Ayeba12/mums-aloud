# WordPress plugin

`mums-aloud-headless/` is the plugin installed on the CMS (cms.mumsaloud.com). It registers the content types the site reads, pings `POST /api/revalidate/` when content changes, and can redirect visitors from the CMS to the site. See `docs/cms-setup.md` for the setup steps.

To package it for upload: `npm run plugin:zip` writes `../output/cms/mums-aloud-headless.zip`.
