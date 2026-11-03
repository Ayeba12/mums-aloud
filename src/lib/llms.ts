import { cards } from "@/content/share-cards.json";
import { siteConfig } from "@/lib/site";
import { truncate, type PostSummary } from "@/lib/wordpress/mapping";

/**
 * /llms.txt: a plain summary of the site for AI assistants (llmstxt.org): who Mums Aloud is, then
 * the key pages in groups, each with its one-line summary. The lines are the share cards' own
 * (`content/share-cards.json`), so the two never drift apart; a page added to the cards needs a
 * place in one of the groups below, which the test checks.
 */

export const GROUPS: Array<{ title: string; routes: string[] }> = [
  { title: "Start here", routes: ["/", "/mamas-escape/", "/about-mums-aloud/", "/contact/"] },
  { title: "Support and services", routes: ["/services/", "/work-with-us/", "/find-support/", "/new-mums-circle/", "/partnership/", "/volunteer/"] },
  { title: "Stories and listening", routes: ["/story-lounge/", "/blog/", "/article/", "/podcast/"] },
  {
    title: "Resources",
    routes: ["/resources/", "/trusted-resources/", "/holiday-guide-for-school-kids/", "/activities-guide-for-babies/", "/ovulation-calculator/", "/pregnancy-calculator/"],
  },
  { title: "People", routes: ["/meet-bokun/", "/meet-the-team/", "/mums-council/"] },
  { title: "Optional", routes: ["/privacy-policy/", "/cookie-policy-uk/", "/terms-and-conditions/"] },
];

/** The editorial collections, each listed item by item after the main pages. */
export const POST_SECTIONS = [
  { key: "storyLounge", title: "Story Lounge: stories from mothers in their own words" },
  { key: "blog", title: "Blog: practical pieces, mum to mum" },
  { key: "articles", title: "Articles: longer reads" },
] as const;

export type LlmsPosts = Partial<Record<(typeof POST_SECTIONS)[number]["key"], PostSummary[]>>;

export function llmsText(origin: string, posts: LlmsPosts = {}): string {
  const base = origin.replace(/\/$/, "");
  const byRoute = new Map(cards.map((card) => [card.route, card]));
  const section = ({ title, routes }: (typeof GROUPS)[number]) => {
    const lines = routes.map((route) => {
      const card = byRoute.get(route)!;
      const name = route === "/" ? "Home" : card.tag ?? route;
      return `- [${name}](${base}${route}): ${card.line}`;
    });
    return `## ${title}\n\n${lines.join("\n")}`;
  };
  // Every story, post and article by title, so an assistant can find and cite each one; the
  // "Optional" group (policies) stays last, as llmstxt.org intends.
  const postSections = POST_SECTIONS.flatMap(({ key, title }) => {
    const items = posts[key] ?? [];
    if (!items.length) return [];
    const lines = items.map((item) => `- [${item.title}](${base}${item.path})${item.excerpt ? `: ${truncate(item.excerpt, 150)}` : ""}`);
    return [`## ${title}\n\n${lines.join("\n")}`];
  });
  const sections = [
    ...GROUPS.filter((group) => group.title !== "Optional").map(section),
    ...postSections,
    ...GROUPS.filter((group) => group.title === "Optional").map(section),
  ];
  return [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    `${siteConfig.name} is a UK community for Black mothers: Mama's Escape (the community), a podcast, a newsletter, one-to-one and group support, mentor mums, training and events, partnerships with health and community organisations, and stories written by mothers. It is not a crisis service: in an emergency call 999, for urgent health advice call NHS 111, and Samaritans answer on 116 123. Contact: ${siteConfig.email}, ${siteConfig.phone.display}.`,
    ...sections,
  ].join("\n\n") + "\n";
}
