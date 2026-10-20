import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { footerGroups, legalLinks } from "@/content/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

/** Cached so the static shell can include the year; refreshes daily. */
async function Year() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="px-2 pb-2 lg:px-4 lg:pb-4">
      <div className="surface-dark rounded-panel">
        <div className="container-page pt-16 pb-8 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col items-start gap-4 lg:col-span-4">
              <span className="rounded-card bg-black-50 p-3">
                <Image src="/brand/mumsaloud-logo.webp" alt="Mums Aloud" width={92} height={48} />
              </span>
              <p className="font-heading text-h3 italic">Empowering Mums to Thrive</p>
              <p>Mama&apos;s Escape is part of Mums Aloud.</p>
              <Link href={siteConfig.newsletterUrl} className={buttonClasses("inverse-outline", "default", "mt-2")}>
                Get the newsletter
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
              {footerGroups.map((group) => (
                <nav key={group.label} aria-label={group.label}>
                  <p className="text-caption font-semibold tracking-wide uppercase">{group.label}</p>
                  <ul className="mt-4 flex flex-col gap-1">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="inline-flex min-h-12 items-center no-underline hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
          <div className="mt-16 flex flex-col gap-4 border-t border-black-50/30 pt-8 text-caption sm:flex-row sm:items-center sm:justify-between">
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
    </footer>
  );
}
