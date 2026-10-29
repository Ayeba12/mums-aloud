import type { Metadata } from "next";
import { Suspense } from "react";
import { dateFormat } from "@/lib/dates";
import { Section, Tag } from "@/components/layout/Section";
import { privacyPage } from "@/content/policies";
import { getPage } from "@/lib/wordpress/pages";

export const metadata: Metadata = {
  title: privacyPage.title,
  description: privacyPage.description,
  alternates: { canonical: "/privacy-policy/" },
};

/** The privacy policy as written in WordPress, so the owner keeps editing it there. */
export default function PrivacyPolicyPage() {
  return (
    <main id="main">
      <Section aria-labelledby="page-heading">
        <div className="mx-auto max-w-reading">
          <Tag data-enter>Policy</Tag>
          <h1 id="page-heading" data-enter className="mt-2 text-h1 tracking-tight [--enter-step:1]">
            {privacyPage.title}
          </h1>
          <Suspense fallback={<p className="mt-8 text-text-secondary">Loading…</p>}>
            <PolicyBody />
          </Suspense>
        </div>
      </Section>
    </main>
  );
}

async function PolicyBody() {
  let page: Awaited<ReturnType<typeof getPage>> = null;
  let failed = false;
  try {
    page = await getPage("privacy-policy");
  } catch (error) {
    console.error("[privacy] policy failed to load", error);
    failed = true;
  }
  if (!page) {
    return (
      <p role={failed ? "status" : undefined} className="mt-8 text-text-secondary">
        {privacyPage.unavailable}
      </p>
    );
  }
  return (
    <>
      <p className="mt-4 text-caption text-text-secondary">
        {privacyPage.updated} <time dateTime={page.modified}>{dateFormat.format(new Date(page.modified))}</time>
      </p>
      <div className="rich-text mt-8" dangerouslySetInnerHTML={{ __html: page.html }} />
    </>
  );
}
