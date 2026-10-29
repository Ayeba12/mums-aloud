import Link from "next/link";
import { Section, Tag } from "@/components/layout/Section";
import { Accent } from "@/components/ui/Heading";
import { policyLinks, type PolicyPage } from "@/content/policies";

const slug = (text: string) => text.replace(/\W+/g, "-").replace(/^-|-$/g, "").toLowerCase();

/**
 * A policy page in one reading column: tag, serif title with its accent, the review date, an
 * optional intro, a short contents list, then each section with its paragraphs and list, and the
 * other policies at the foot. Shared by the cookie policy and the terms.
 */
export function PolicyArticle({ policy, prefix, current }: { policy: PolicyPage; prefix: string; current: string }) {
  return (
    <main id="main">
      <Section aria-labelledby="page-heading">
        <article className="mx-auto max-w-reading">
          <Tag>{policy.tag}</Tag>
          <h1 id="page-heading" className="mt-2 text-h1 tracking-tight">
            <Accent {...policy.heading} />
          </h1>
          <p className="mt-4 text-caption text-text-secondary">{policy.reviewed}</p>
          {policy.intro && <p className="mt-6 text-lead">{policy.intro}</p>}

          <nav aria-label="On this page" className="mt-8 rounded-card bg-surface-card p-6">
            <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">On this page</p>
            <ol className="mt-3 flex flex-col gap-1">
              {policy.sections.map((section) => (
                <li key={section.title}>
                  <a href={`#${prefix}-${slug(section.title)}`} className="inline-flex min-h-10 items-center">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 flex flex-col gap-10">
            {policy.sections.map((section) => {
              const id = `${prefix}-${slug(section.title)}`;
              return (
                <section key={section.title} id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
                  <h2 id={`${id}-heading`} className="text-h3">
                    {section.title}
                  </h2>
                  <div className="rich-text mt-3 flex flex-col gap-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                    {section.items && (
                      <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-accent">
                        {section.items.map((item) => (
                          <li key={item.slice(0, 32)}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              );
            })}
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 border-t border-border-decoration pt-6">
            {[{ label: "Contact us", href: "/contact/" }, ...policyLinks]
              .filter((link) => link.href !== current)
              .map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-12 items-center font-semibold">
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </article>
      </Section>
    </main>
  );
}
