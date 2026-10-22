import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { NewsletterForm } from "./NewsletterForm";
import { footerGroups, legalLinks } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import photo from "@/assets/photos/mother-daughter-park.jpg";

/** Cached so the static shell can include the year; refreshes daily. */
async function Year() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/**
 * The reference footer: a light card inside the page frame holding a media tile with a
 * caption and action, link columns, the email field and a legal bar.
 */
export function SiteFooter() {
  return (
    <footer className="frame-x pt-8 pb-2 md:pb-4">
      <div className="rounded-panel bg-surface-card p-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="relative flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-card lg:col-span-4 lg:min-h-[40rem]">
            <Image
              src={photo}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 64rem) 33vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-black-950)_0%,color-mix(in_srgb,var(--color-black-950)_70%,transparent)_30%,transparent_60%)]" />
            <span className="absolute top-4 left-4 rounded-control bg-surface p-2">
              <Image src="/brand/mumsaloud-logo.webp" alt="Mums Aloud" width={92} height={48} className="h-8 w-auto" />
            </span>
            <div className="relative flex flex-wrap items-end justify-between gap-4 p-6">
              <p className="max-w-[14ch] font-heading text-h3 italic text-black-50">Empowering Mums to Thrive</p>
              <ButtonLink href={siteConfig.joinUrl} variant="inverse-outline">
                Join Mama&apos;s Escape
              </ButtonLink>
            </div>
          </div>

          <div className="flex flex-col gap-12 py-2 lg:col-span-8 lg:pr-4">
            {/* "Get the newsletter" links across the site land here, on the field itself. */}
            <div id="newsletter" className="max-w-form scroll-mt-24">
              <NewsletterForm />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {footerGroups.map((group) => (
                <nav key={group.label} aria-label={group.label}>
                  <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{group.label}</p>
                  <ul className="mt-2 flex flex-col">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="inline-flex min-h-12 items-center text-ink no-underline hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
              <nav aria-label="Listen and contact">
                <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">Listen</p>
                <ul className="mt-2 flex flex-col">
                  <li>
                    <a
                      href="https://creators.spotify.com/pod/show/mamasescape"
                      className="inline-flex min-h-12 items-center gap-1 text-ink no-underline hover:underline"
                    >
                      Mama&apos;s Escape podcast
                      <ArrowUpRightIcon aria-hidden size={16} />
                      <span className="sr-only">(opens Spotify)</span>
                    </a>
                  </li>
                  <li>
                    <Link href="/contact/" className="inline-flex min-h-12 items-center text-ink no-underline hover:underline">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="mt-auto flex flex-col gap-2 border-t border-border-decoration pt-6 text-caption text-text-secondary sm:flex-row sm:items-center sm:justify-between">
              <p>
                © <Year /> Mums Aloud. All rights reserved.
              </p>
              <ul className="flex flex-wrap gap-x-6">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-12 items-center">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
