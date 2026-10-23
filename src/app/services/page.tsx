import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Section, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { Accent } from "@/components/ui/Heading";
import { services } from "@/content/offers";

export const metadata: Metadata = {
  title: services.title,
  description: services.description,
  alternates: { canonical: "/services/" },
};

/** Products & Services: the live page's five offers, each leading to where it now lives on the site. */
export default function ServicesPage() {
  return (
    <main id="main">
      <Section aria-labelledby="page-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface)_32rem)]">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag>{services.tag}</Tag>
          <h1 id="page-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent {...services.heading} />
          </h1>
          <p className="mt-4 max-w-[52ch] text-lead">{services.intro}</p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.items.map((item) => (
            <li key={item.title} className="group relative flex flex-col rounded-card border border-border-decoration bg-surface-card p-6">
              <h2 className="font-body text-h4 font-bold text-ink">{item.title}</h2>
              <p className="mt-2 text-text">{item.text}</p>
              <Link href={item.href} className="mt-auto inline-flex min-h-12 items-center gap-2 pt-4 font-semibold after:absolute after:inset-0">
                Learn more
                <span className="sr-only"> about {item.title}</span>
                <ArrowRightIcon aria-hidden size={16} weight="bold" className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingInvite
        id="services-closing"
        heading={services.closing.heading}
        body={services.closing.body}
        primary={services.closing.primary}
        secondary={services.closing.secondary}
      />
    </main>
  );
}
