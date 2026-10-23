import { Section, Tag } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { collections } from "@/lib/wordpress/collections";

/** A real 404 in the site's own voice: no redirect to the homepage, two honest ways onward. */
export default function NotFound() {
  return (
    <main id="main">
      <Section aria-labelledby="not-found-heading">
        <div className="flex flex-col items-start">
          <Tag>Page not found</Tag>
          <h1 id="not-found-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent lead="We could not find" accent="that page." />
          </h1>
          <p className="mt-4 max-w-[46ch] text-lead">
            The link may be out of date, or the page may have moved. The stories and articles are still here.
          </p>
          <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/" size="large" arrow>
              Back to the homepage
            </ButtonLink>
            <ButtonLink href={collections.storyLounge.listingPath ?? "/"} variant="secondary" size="large">
              Story Lounge
            </ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
