import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { AI_CRAWLERS } from "./ai-crawlers";

describe("robots.txt", () => {
  it("welcomes the AI assistants' crawlers by name and blocks nothing but the API", () => {
    for (const name of ["OAI-SearchBot", "GPTBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "PerplexityBot", "Bingbot"]) expect(AI_CRAWLERS).toContain(name);
    const { rules } = robots();
    for (const rule of [rules].flat()) {
      expect(rule.allow).toBe("/");
      expect(rule.disallow).toEqual(["/api/"]);
    }
  });
});
