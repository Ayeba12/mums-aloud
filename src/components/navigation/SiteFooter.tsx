import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
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

/** Light footer on the canvas: photo tile, link columns, newsletter, legal bar. */
export function SiteFooter() {
  return (
    <footer className="frame-x pb-2 md:pb-4">
      <div className="container-page border-t border-border-decoration pt-12 pb-6 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative min-h-72 overflow-hidden rounded-card lg:col-span-4">
            <Image
              src={photo}
              alt="A mother laughing as she lifts her young daughter in a park"
              fill
              placeholder="blur"
              sizes="(min-width: 64rem) 33vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
            <p className="absolute right-4 bottom-4 left-4 rounded-card bg-surface/95 p-4 font-heading text-h4 italic text-ink">
              Empowering Mums to Thrive
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5">
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
          </div>

          <div className="flex flex-col items-start gap-4 lg:col-span-3">
            <Image src="/brand/mumsaloud-logo.webp" alt="Mums Aloud" width={92} height={48} className="h-12 w-auto" />
            <p>Mama&apos;s Escape is part of Mums Aloud. Real stories and real support, straight to your inbox.</p>
            <ButtonLink href={siteConfig.newsletterUrl} variant="secondary">
              Get the newsletter
            </ButtonLink>
            <a
              href="https://creators.spotify.com/pod/show/mamasescape"
              className="inline-flex min-h-12 items-center gap-1 font-semibold"
            >
              Mama&apos;s Escape podcast
              <ArrowUpRightIcon aria-hidden size={16} />
              <span className="sr-only">(opens Spotify)</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-decoration pt-6 text-caption text-text-secondary sm:flex-row sm:items-center sm:justify-between">
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
    </footer>
  );
}
