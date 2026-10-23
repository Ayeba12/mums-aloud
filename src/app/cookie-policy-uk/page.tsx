import type { Metadata } from "next";
import Link from "next/link";
import { Section, Tag } from "@/components/layout/Section";
import { Accent } from "@/components/ui/Heading";
import { cookiePolicy } from "@/content/policies";

export const metadata: Metadata = {
  title: cookiePolicy.title,
  description: cookiePolicy.description,
  alternates: { canonical: "/cookie-policy-uk/" },
};

/** A short cookie statement written for what this site does; keeps the live site's URL. */
export default function CookiePolicyPage() {
  return (
    <main id="main">
      <Section aria-labelledby="page-heading">
        <div className="mx-auto max-w-reading">
          <Tag>{cookiePolicy.tag}</Tag>
          <h1 id="page-heading" className="mt-2 text-h1 tracking-tight">
            <Accent {...cookiePolicy.heading} />
          </h1>
          <p className="mt-4 text-caption text-text-secondary">{cookiePolicy.reviewed}</p>
          <div className="mt-8 flex flex-col gap-8">
            {cookiePolicy.sections.map((section) => (
              <section key={section.title} aria-labelledby={`cookie-${section.title.replace(/\W+/g, "-").toLowerCase()}`}>
                <h2 id={`cookie-${section.title.replace(/\W+/g, "-").toLowerCase()}`} className="text-h3">
                  {section.title}
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/contact/" className="font-semibold">
              Contact us
            </Link>{" "}
            ·{" "}
            <Link href="/privacy-policy/" className="font-semibold">
              Privacy policy
            </Link>
          </p>
        </div>
      </Section>
    </main>
  );
}
