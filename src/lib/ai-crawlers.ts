/**
 * The AI assistants' crawlers, welcomed by name (owner, 3 Nov 2026: Mums Aloud should be found and
 * cited when people ask ChatGPT, Claude, Gemini and the rest). `*` already allows them; naming them
 * makes the welcome explicit for crawlers that look for their own entry, and keeps it if a stricter
 * default is ever added.
 */
export const AI_CRAWLERS = [
  // OpenAI: ChatGPT search, browsing on a user's request, training.
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic: Claude's search, browsing on a user's request, training.
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  // Google: Gemini and AI Overviews (Google-Extended is a permission token, not a crawler).
  "Google-Extended",
  // Perplexity, Apple Intelligence, Microsoft Copilot (Bing), DuckDuckGo's DuckAssist, Meta AI, Mistral.
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "meta-externalagent",
  "MistralAI-User",
];
