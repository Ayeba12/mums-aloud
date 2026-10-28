# WordPress plugin

`mumsaloud-headless/` is the plugin installed on the CMS (cms.mumsaloud.com). It registers the content types the site reads, pings `POST /api/revalidate/` when content changes, and can redirect visitors from the CMS to the site. See `docs/cms-setup.md` for the setup steps.

To package it for upload: `npm run plugin:zip` writes `../output/cms/mumsaloud-headless.zip`. The folder is `mumsaloud-headless` (no hyphen between the first two words) because a faulty first upload left an unusable `mums-aloud-headless/` folder on the CMS, which activation of this plugin removes.
