=== Mums Aloud Headless ===
Contributors: mumsaloud
Requires at least: 6.1
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.1.0
License: GPL-2.0-or-later

Makes this WordPress the content editor for the Mums Aloud website.

== Description ==

* Registers the Mums Stories (mum-story), Articles (article) and Mum Topics (mum-topic) content types for the REST API and for WPGraphQL (mumStories, articles, mumTopics), with the same slugs and URL shapes as the previous site.
* When a post, story, article, page or image is published, updated, binned or deleted, sends one refresh request to the site (POST /api/revalidate/ with the shared secret).
* Optionally sends visitors who open this CMS to the same page on the site.

== Settings ==

Settings > Headless site: the site's URL, the shared secret (REVALIDATE_SECRET on the site) and the visitor redirect. Both values can instead be fixed in wp-config.php:

    define('MUMSALOUD_SITE_URL', 'https://mumsaloud.com');
    define('MUMSALOUD_REVALIDATE_SECRET', '...');

== Changelog ==

= 1.1.0 =
* The three content types are exposed to WPGraphQL (mumStory/mumStories, article/articles, mumTopic/mumTopics); the site reads them through GraphQL.

= 1.0.0 =
* First version. The folder is mumsaloud-headless; activation removes the unusable mums-aloud-headless folder left by a faulty first upload.
