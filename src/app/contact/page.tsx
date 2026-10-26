import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, EnvelopeSimpleIcon, InstagramLogoIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { ContactForm } from "@/components/forms/ContactForm";
import { IconChip } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { PageHeader } from "@/components/sections/PageHeader";
import { contact } from "@/content/contact";
import { joinForm, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: contact.title,
  description: contact.description,
  alternates: { canonical: "/contact/" },
};

/** The ways to reach the team, from `siteConfig`; a social card appears only once its URL is set. */
const reachLinks = {
  email: { href: `mailto:${siteConfig.email}`, label: siteConfig.email, Icon: EnvelopeSimpleIcon },
  phone: { href: siteConfig.phone.href, label: siteConfig.phone.display, Icon: PhoneIcon },
  instagram: { href: siteConfig.social.instagram.href, label: siteConfig.social.instagram.handle, Icon: InstagramLogoIcon },
};

/**
 * Contact, laid out as the owner's reference: the ways to reach us (email, phone, Instagram), the
 * form beside the quicker routes, the help-right-now lines, and the invitation. The form forwards
 * to the team inbox, and offers a prefilled email while that route is not set up.
 */
export default function ContactPage() {
  const reach = contact.reach.items.filter((item) => reachLinks[item.kind].href);
  return (
    <main id="main">
      <PageHeader tag={contact.tag} heading={contact.heading} intro={contact.intro}>

        <h2 id="reach-heading" className="sr-only">
          {contact.reach.heading}
        </h2>
        <ul aria-labelledby="reach-heading" className={`mt-12 grid gap-4 sm:grid-cols-2 lg:gap-6 ${reach.length > 2 ? "lg:grid-cols-3" : ""}`}>
          {reach.map((item) => {
            const { href, label, Icon } = reachLinks[item.kind];
            const external = item.kind === "instagram";
            return (
              <li key={item.kind} className="group relative flex flex-col rounded-card border border-border-decoration bg-surface-card p-6">
                <IconChip>
                  <Icon aria-hidden size={24} />
                </IconChip>
                <h3 className="mt-4 font-body text-title font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-text">{item.text}</p>
                <a href={href} className="mt-3 inline-flex min-h-12 items-center gap-2 font-semibold break-all after:absolute after:inset-0">
                  {label}
                  {external ? <ArrowUpRightIcon aria-hidden size={16} weight="bold" /> : <ArrowRightIcon aria-hidden size={16} weight="bold" className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />}
                  {external && <span className="sr-only">(opens Instagram)</span>}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-8">
          <section aria-labelledby="form-heading" className="rounded-panel bg-surface-card p-6 lg:col-span-7 lg:self-start lg:p-8">
            <h2 id="form-heading" className="text-h3">
              {contact.form.heading}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </section>

          <aside className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
            <section aria-labelledby="routes-heading">
              <h2 id="routes-heading" className="text-h3">
                {contact.routes.heading}
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {contact.routes.items.map((item) => {
                  const href = "join" in item && item.join ? joinForm.href : (item.href ?? "/");
                  const external = "external" in item && item.external;
                  return (
                    <li key={item.title} className="group relative rounded-card border border-border-decoration bg-surface p-5">
                      <h3 className="font-body text-title font-semibold text-ink">{item.title}</h3>
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
            </section>

            <section aria-labelledby="urgent-heading" className="rounded-card bg-surface-warm p-6">
              <h2 id="urgent-heading" className="text-h3">
                {contact.urgent.heading}
              </h2>
              <p className="mt-2 text-text">{contact.urgent.intro}</p>
              <ul className="mt-4 flex flex-col divide-y divide-border-decoration">
                {contact.urgent.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-4 py-3">
                    <div>
                      <p className="font-semibold text-ink">{item.name}</p>
                      <p className="text-caption text-text-secondary">{item.text}</p>
                    </div>
                    <a href={item.href} className="inline-flex min-h-12 shrink-0 items-center font-heading text-h4 text-ink no-underline hover:underline">
                      {item.phone}
                    </a>
                  </li>
                ))}
              </ul>
              <Link href={contact.urgent.link.href} className="mt-2 inline-flex min-h-12 items-center gap-2 font-semibold">
                {contact.urgent.link.label}
                <ArrowRightIcon aria-hidden size={16} weight="bold" />
              </Link>
            </section>
          </aside>
        </div>
      </PageHeader>

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
