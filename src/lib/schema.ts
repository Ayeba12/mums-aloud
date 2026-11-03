import { siteConfig } from "@/lib/site";

/**
 * Structured data (schema.org JSON-LD) that tells search engines and AI assistants who Mums Aloud is.
 * The organisation and the website go on every page (root layout); pages add their own on top:
 * BlogPosting on stories and articles, PodcastSeries on the podcast, FAQPage on Mama's Escape, and
 * ProfilePage on Meet Bokun. Everything links back to the organisation by its `@id`.
 */

type Json = Record<string, unknown>;

const origin = () => siteConfig.url.replace(/\/$/, "");
export const organizationId = () => `${origin()}/#organization`;
const absolute = (path: string) => (path.startsWith("http") ? path : `${origin()}${path}`);

/** The organisation and the website, for the root layout. */
export function siteSchema(): Json {
  const sameAs = Object.values(siteConfig.social)
    .map((profile) => profile.href)
    .filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId(),
        name: siteConfig.name,
        url: `${origin()}/`,
        logo: absolute("/email/logo.png"),
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone.href.replace("tel:", ""),
        areaServed: { "@type": "Country", name: "United Kingdom" },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${origin()}/#website`,
        name: siteConfig.name,
        url: `${origin()}/`,
        inLanguage: "en-GB",
        publisher: { "@id": organizationId() },
      },
    ],
  };
}

/** A page of questions and answers, as shown on the page itself. */
export function faqSchema(items: ReadonlyArray<{ q: string; a: string }>): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** A person's profile page, tied to the organisation they work for. */
export function profileSchema(person: { name: string; jobTitle: string; path: string; image?: string; description?: string }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absolute(person.path),
    mainEntity: {
      "@type": "Person",
      name: person.name,
      jobTitle: person.jobTitle,
      description: person.description,
      image: person.image ? absolute(person.image) : undefined,
      url: absolute(person.path),
      worksFor: { "@id": organizationId() },
    },
  };
}

/** The JSON for a `<script type="application/ld+json">`, with `<` escaped so no text can close the tag. */
export function jsonLdText(data: Json): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
