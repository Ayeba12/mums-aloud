import { cards } from "@/content/share-cards.json";
import { siteConfig } from "@/lib/site";

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

export function llmsText(origin: string): string {
  const base = origin.replace(/\/$/, "");
  const byRoute = new Map(cards.map((card) => [card.route, card]));
  const sections = GROUPS.map(({ title, routes }) => {
    const lines = routes.map((route) => {
      const card = byRoute.get(route)!;
      const name = route === "/" ? "Home" : card.tag ?? route;
      return `- [${name}](${base}${route}): ${card.line}`;
    });
    return `## ${title}\n\n${lines.join("\n")}`;
  });
  return [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    `${siteConfig.name} is a UK community for Black mothers: Mama's Escape (the community), a podcast, a newsletter, one-to-one and group support, mentor mums, training and events, partnerships with health and community organisations, and stories written by mothers. It is not a crisis service: in an emergency call 999, for urgent health advice call NHS 111, and Samaritans answer on 116 123. Contact: ${siteConfig.email}, ${siteConfig.phone.display}.`,
    ...sections,
  ].join("\n\n") + "\n";
}
