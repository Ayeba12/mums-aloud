/**
 * The WPGraphQL side of the CMS: the endpoint, the queries each collection needs, and the adapter
 * that turns a GraphQL node into the REST-shaped `WpPost` the mapping functions already understand,
 * so the pages and their tests see the same `PostSummary` and `PostDetail` as before.
 *
 * The endpoint is `<CMS origin>/graphql`, derived from `WORDPRESS_API_URL` (the one setting that
 * names the CMS); `WORDPRESS_GRAPHQL_URL` overrides it. The custom types are exposed to GraphQL by
 * the Mums Aloud Headless plugin (1.1.0+): `mumStory/mumStories`, `article/articles`,
 * `mumTopic/mumTopics`. WPGraphQL must stay installed and active on the CMS.
 */
import { collections, type CollectionKey } from "./collections";
import type { WpPost } from "./mapping";

// `||`, not `??`: a blank value in the hosting settings counts as unset.
const API_URL = (process.env.WORDPRESS_API_URL || "https://cms.mumsaloud.com/wp-json/wp/v2").replace(/\/$/, "");
export const GRAPHQL_URL = (process.env.WORDPRESS_GRAPHQL_URL || `${new URL(API_URL).origin}/graphql`).replace(/\/$/, "");
const TIMEOUT_MS = 15_000;

export class WordPressError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "WordPressError";
  }
}

type GraphQLResponse<T> = { data?: T; errors?: Array<{ message: string }> };

/** One GraphQL request. Transport failures, non-200 answers and GraphQL errors all become `WordPressError`. */
export async function gql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    throw new WordPressError(`WordPress GraphQL request failed: ${(error as Error).message}`);
  }
  if (!response.ok) {
    throw new WordPressError(`WordPress GraphQL returned ${response.status}`, response.status);
  }
  const body = (await response.json()) as GraphQLResponse<T>;
  if (body.errors?.length) {
    throw new WordPressError(`WordPress GraphQL error: ${body.errors.map((error) => error.message).join("; ")}`);
  }
  if (body.data === undefined) {
    throw new WordPressError("WordPress GraphQL answered without data");
  }
  return body.data;
}

export type GraphQLPostNode = {
  databaseId: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: string | null;
  excerpt?: string | null;
  content?: string | null;
  categories?: { nodes: Array<{ name: string; slug: string }> } | null;
  featuredImage?: {
    node: { sourceUrl?: string | null; altText?: string | null; mediaDetails?: { width?: number | null; height?: number | null } | null } | null;
  } | null;
};

const SUMMARY_FIELDS = `
  databaseId
  slug
  link
  date
  modified
  title
  excerpt
  categories { nodes { name slug } }
  featuredImage { node { sourceUrl altText mediaDetails { width height } } }`;

/** The list query for a collection: newest first, published only (WPGraphQL's default for public requests). */
export function listQuery(key: CollectionKey): string {
  const { graphql, categorySlug } = collections[key];
  const filter = categorySlug ? `categoryName: "${categorySlug}", ` : "";
  return `query ${graphql.plural}List($first: Int!) {
  items: ${graphql.plural}(first: $first, where: { ${filter}orderby: { field: DATE, order: DESC } }) {
    nodes {${SUMMARY_FIELDS}
    }
  }
}`;
}

/**
 * One item by its WordPress URI, with its body. URI rather than slug because hierarchical types
 * (Articles) have no slug lookup in WPGraphQL, and the URI is the legacy URL shape anyway. No
 * category filter: a URI is unique.
 */
export function singleQuery(key: CollectionKey): string {
  const { graphql } = collections[key];
  return `query ${graphql.single}ByUri($uri: ID!) {
  item: ${graphql.single}(id: $uri, idType: URI) {${SUMMARY_FIELDS}
    content
  }
}`;
}

/** The WordPress URI of an item in a collection, as its permalink path. */
export function itemUri(key: CollectionKey, slug: string): string {
  return `${collections[key].uriPrefix}${slug}/`;
}

export type ListResult = { items: { nodes: GraphQLPostNode[] } | null };
export type SingleResult = { item: GraphQLPostNode | null };

/** A GraphQL node in the REST shape the mapping functions take, so `toPostSummary` and `toPostDetail` stay as they are. */
export function nodeToPost(node: GraphQLPostNode): WpPost {
  const image = node.featuredImage?.node;
  const categories = node.categories?.nodes ?? [];
  return {
    id: node.databaseId,
    slug: node.slug,
    link: node.link,
    date: node.date,
    modified: node.modified,
    title: { rendered: node.title ?? "" },
    excerpt: { rendered: node.excerpt ?? "" },
    content: { rendered: node.content ?? "" },
    featured_media: 0,
    _embedded: {
      "wp:featuredmedia": image?.sourceUrl
        ? [
            {
              source_url: image.sourceUrl,
              alt_text: image.altText ?? "",
              media_details: { width: image.mediaDetails?.width ?? undefined, height: image.mediaDetails?.height ?? undefined },
            },
          ]
        : [],
      "wp:term": [categories.map((category, index) => ({ id: index, name: category.name, slug: category.slug, taxonomy: "category" }))],
    },
  };
}
