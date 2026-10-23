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
  /** REST base under /wp-json/wp/v2, e.g. "posts" or "mum-story". */
  restBase: string;
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
    categorySlug: "story-lounge",
    listingPath: "/story-lounge/",
  },
  blog: {
    key: "blog",
    label: "Blog",
    restBase: "mum-story",
    listingPath: "/blog/",
  },
  articles: {
    key: "articles",
    label: "Articles",
    restBase: "article",
    /** No listing of their own yet (owner to decide); article pages link back to the Blog. */
    listingPath: "/blog/",
  },
  mumTopics: {
    key: "mumTopics",
    label: "Mum Topics",
    restBase: "mum-topic",
  },
};

/** Slugs that must never be shown (test or placeholder content). */
export const hiddenSlugs = new Set(["testing"]);

/** Cache tag for a collection; the revalidation webhook uses the same names. */
export const collectionTag = (key: CollectionKey) => `wp:${key}`;
