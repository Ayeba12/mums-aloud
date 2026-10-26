import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { PageHeader } from "@/components/sections/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { collections } from "@/lib/wordpress/collections";

export const metadata: Metadata = { title: "Page not found" };

/** The quickest ways back, as quiet pill links under the two actions. */
const waysOnward = [
  { label: "Mama's Escape", href: "/mamas-escape/" },
  { label: "Our Services", href: "/services/" },
  { label: "Find Support", href: "/find-support/" },
  { label: "Contact us", href: "/contact/" },
];

/**
 * A real 404 in the site's own voice, centred on the shared page header: the tint fades under the
 * floating bar, the title and intro sit in the middle, two pills lead onward, and four quiet links
 * cover the rest. No redirect to the homepage, nothing invented. The page fills the screen on its
 * own: `data-no-footer` hides the site footer here (owner, 26 Oct 2026; see globals.css).
 */
export default function NotFound() {
  return (
    <main id="main" data-no-footer="">
      <PageHeader
        id="not-found-heading"
        tag="Page not found"
        heading={{ lead: "We could not find", accent: "that page." }}
        intro="The link may be out of date, or the page may have moved. Everything else is still here, and these are the quickest ways back."
        actions={
          <>
            <ButtonLink href="/" size="large" arrow>
              Back to the homepage
            </ButtonLink>
            <ButtonLink href={collections.storyLounge.listingPath ?? "/"} variant="secondary" size="large">
              Story Lounge
            </ButtonLink>
          </>
        }
        className="flex min-h-svh flex-col justify-center"
      >
        <nav aria-label="Popular pages" className="mx-auto mt-12 flex max-w-[60rem] flex-col items-center text-center">
          <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">Or go straight to</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {waysOnward.map((way) => (
              <li key={way.href}>
                <Link
                  href={way.href}
                  className="group inline-flex min-h-12 items-center gap-2 rounded-pill border border-border-decoration bg-surface-card px-4 font-semibold text-ink no-underline transition-colors duration-150 hover:border-action"
                >
                  {way.label}
                  <ArrowRightIcon aria-hidden size={16} weight="bold" className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-caption text-text-secondary">Error 404</p>
        </nav>
      </PageHeader>
    </main>
  );
}
