/**
 * Which WordPress content feeds which part of the site.
 * Owner decision (20 Oct 2026): Story Lounge = `post` in the `story-lounge` category,
 * Blog = `mum-story`, `article` is its own collection, `mum-topic` stays in the model.
 * Change the mapping here; components only use the collection keys.
 */
export type CollectionKey = "storyLounge" | "blog" | "articles" | "mumTopics";

export type Collection = {
  key: CollectionKey;
  label: string;
  /** REST base under /wp-json/wp/v2, e.g. "posts" or "mum-story" (the importer and the plugin speak REST). */
  restBase: string;
  /** WPGraphQL field names: the single item and the list, as the Mums Aloud Headless plugin registers them. */
  graphql: { single: string; plural: string };
  /** Where an item's WordPress URI starts (`/` for root-level posts, `/mum-story/` for stories); a slug appended gives the URI. */
  uriPrefix: string;
  /** Optional category slug that narrows the type. */
  categorySlug?: string;
  /** Listing page on the new site, if it has one. */
  listingPath?: string;
};

export const collections: Record<CollectionKey, Collection> = {
  storyLounge: {
    key: "storyLounge",
    label: "Story Lounge",
    restBase: "posts",
    graphql: { single: "post", plural: "posts" },
    uriPrefix: "/",
    categorySlug: "story-lounge",
    listingPath: "/story-lounge/",
  },
  blog: {
    key: "blog",
    label: "Blog",
    restBase: "mum-story",
    graphql: { single: "mumStory", plural: "mumStories" },
    uriPrefix: "/mum-story/",
    listingPath: "/blog/",
  },
  articles: {
    key: "articles",
    label: "Articles",
    restBase: "article",
    graphql: { single: "article", plural: "articles" },
    uriPrefix: "/article/",
    /** The live site's own archive URL (`has_archive`), kept; later pages live at `/article/page/<n>/`. */
    listingPath: "/article/",
  },
  mumTopics: {
    key: "mumTopics",
    label: "Mum Topics",
    restBase: "mum-topic",
    graphql: { single: "mumTopic", plural: "mumTopics" },
    uriPrefix: "/mum-topic/",
  },
};

/** Slugs that must never be shown (test or placeholder content). */
export const hiddenSlugs = new Set(["testing"]);

/** Cache tag for a collection; the revalidation webhook uses the same names. */
export const collectionTag = (key: CollectionKey) => `wp:${key}`;
