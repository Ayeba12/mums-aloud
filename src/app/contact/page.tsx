import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { ContactForm } from "@/components/forms/ContactForm";
import { Section, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { Accent } from "@/components/ui/Heading";
import { contact } from "@/content/contact";
import { joinForm } from "@/lib/site";

export const metadata: Metadata = {
  title: contact.title,
  description: contact.description,
  alternates: { canonical: "/contact/" },
};

/**
 * Contact: a centred introduction, the form beside the quicker routes, and the invitation. The
 * form forwards to CONTACT_WEBHOOK_URL and says plainly when that is not set up yet.
 */
export default function ContactPage() {
  return (
    <main id="main">
      <Section aria-labelledby="page-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface)_32rem)]">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag>{contact.tag}</Tag>
          <h1 id="page-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent {...contact.heading} />
          </h1>
          <p className="mt-4 max-w-[46ch] text-lead">{contact.intro}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-8">
          <section aria-labelledby="form-heading" className="rounded-panel bg-surface-card p-6 lg:col-span-7 lg:self-start lg:p-8">
            <h2 id="form-heading" className="text-h3">
              {contact.form.heading}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </section>

          <aside aria-labelledby="routes-heading" className="lg:col-span-4 lg:col-start-9">
            <h2 id="routes-heading" className="text-h3">
              {contact.routes.heading}
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {contact.routes.items.map((item) => {
                const href = "join" in item && item.join ? joinForm.href : (item.href ?? "/");
                const external = "external" in item && item.external;
                return (
                  <li key={item.title} className="group relative rounded-card border border-border-decoration bg-surface p-5">
                    <h3 className="font-body text-h4 font-bold text-ink">{item.title}</h3>
                    <p className="mt-1 text-text">{item.text}</p>
                    {external ? (
                      <a href={href} className="mt-3 inline-flex min-h-12 items-center gap-2 font-semibold after:absolute after:inset-0">
                        {item.label}
                        <ArrowUpRightIcon aria-hidden size={16} weight="bold" />
                        <span className="sr-only">(opens Calendly)</span>
                      </a>
                    ) : (
                      <Link href={href} className="mt-3 inline-flex min-h-12 items-center gap-2 font-semibold after:absolute after:inset-0">
                        {item.label}
                        <ArrowRightIcon aria-hidden size={16} weight="bold" className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </Section>

      <ClosingInvite
        id="contact-closing"
        heading={contact.closing.heading}
        body={contact.closing.body}
        primary={contact.closing.primary}
        secondary={contact.closing.secondary}
      />
    </main>
  );
}
