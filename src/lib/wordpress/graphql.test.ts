import { afterEach, describe, expect, it, vi } from "vitest";
import { gql, GRAPHQL_URL, itemUri, listQuery, nodeToPost, singleQuery, WordPressError, type GraphQLPostNode } from "./graphql";
import { toPostDetail, toPostSummary } from "./mapping";

const node: GraphQLPostNode = {
  databaseId: 449,
  slug: "atinuke-a-journey-to-rediscovery",
  link: "https://cms.mumsaloud.com/atinuke-a-journey-to-rediscovery/",
  date: "2024-10-31T14:13:14",
  modified: "2024-11-01T09:00:00",
  title: "Atinuke &#8211; A Journey",
  excerpt: "<p>March 1999. The flames&nbsp;of the stove.</p>",
  content: "<p>Body</p><script>bad()</script>",
  categories: { nodes: [{ name: "Story Lounge", slug: "story-lounge" }] },
  featuredImage: { node: { sourceUrl: "https://cms.mumsaloud.com/wp-content/uploads/2024/10/a.jpeg", altText: "A mother", mediaDetails: { width: 1253, height: 836 } } },
};

describe("GraphQL endpoint", () => {
  it("lives at /graphql on the CMS origin", () => {
    expect(GRAPHQL_URL).toBe("https://cms.mumsaloud.com/graphql");
  });
});

describe("queries", () => {
  it("lists every post for the Story Lounge and the custom types through their own fields", () => {
    expect(listQuery("storyLounge")).toContain("posts(first: $first, where: { orderby");
    expect(listQuery("storyLounge")).not.toContain("categoryName");
    expect(listQuery("blog")).toContain("mumStories(first: $first, where: { orderby");
    expect(listQuery("articles")).toContain("articles(first: $first");
    expect(listQuery("mumTopics")).toContain("mumTopics(first: $first");
  });

  it("fetches one item by its WordPress URI through the single field, with its body", () => {
    expect(singleQuery("blog")).toContain("mumStory(id: $uri, idType: URI)");
    expect(singleQuery("storyLounge")).toContain("post(id: $uri, idType: URI)");
    expect(singleQuery("articles")).toContain("article(id: $uri, idType: URI)");
    expect(singleQuery("articles")).toContain("content");
    expect(itemUri("storyLounge", "emmanuella")).toBe("/emmanuella/");
    expect(itemUri("blog", "when-next-you-meet-a-mother")).toBe("/mum-story/when-next-you-meet-a-mother/");
    expect(itemUri("articles", "permission-to-stop-performing")).toBe("/article/permission-to-stop-performing/");
  });
});

describe("nodeToPost", () => {
  it("gives the mapping functions the same summary and detail as the REST shape did", () => {
    const summary = toPostSummary(nodeToPost(node));
    expect(summary).toMatchObject({
      id: 449,
      slug: "atinuke-a-journey-to-rediscovery",
      path: "/atinuke-a-journey-to-rediscovery/",
      title: "Atinuke – A Journey",
      excerpt: "March 1999. The flames of the stove.",
      date: "2024-10-31T14:13:14",
      image: { src: "https://cms.mumsaloud.com/wp-content/uploads/2024/10/a.jpeg", alt: "A mother", width: 1253, height: 836 },
    });
    const detail = toPostDetail(nodeToPost(node));
    expect(detail.modified).toBe("2024-11-01T09:00:00");
    expect(detail.html).toBe("<p>Body</p>");
    expect(detail.categories).toEqual([{ name: "Story Lounge", slug: "story-lounge" }]);
  });

  it("copes with a missing image, excerpt and categories", () => {
    const bare = toPostSummary(nodeToPost({ ...node, excerpt: null, categories: null, featuredImage: null }));
    expect(bare.image).toBeUndefined();
    expect(bare.excerpt).toBe("");
    expect(toPostDetail(nodeToPost({ ...node, categories: null })).categories).toEqual([]);
  });
});

describe("gql", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("posts the query and returns the data", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ data: { ok: true } }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(gql<{ ok: boolean }>("{ ok }", { a: 1 })).resolves.toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(GRAPHQL_URL);
    expect(init.method).toBe("POST");
    expect(JSON.parse(String(init.body))).toEqual({ query: "{ ok }", variables: { a: 1 } });
  });

  it("turns GraphQL errors and bad statuses into WordPressError", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ errors: [{ message: "Cannot query field" }] }), { status: 200 })));
    await expect(gql("{ nope }")).rejects.toBeInstanceOf(WordPressError);
    vi.stubGlobal("fetch", vi.fn(async () => new Response("down", { status: 503 })));
    await expect(gql("{ ok }")).rejects.toThrow(/503/);
  });
});
