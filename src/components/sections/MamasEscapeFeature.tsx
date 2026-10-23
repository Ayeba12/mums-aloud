import Link from "next/link";
import { ArrowRightIcon, BookOpenTextIcon, CalendarHeartIcon, HandHeartIcon, LightbulbIcon } from "@phosphor-icons/react/ssr";
import { Section, SectionHeading } from "@/components/layout/Section";
import { FeatureTabs } from "@/components/sections/FeatureTabs";
import { ButtonLink } from "@/components/ui/Button";
import { mamasEscape } from "@/content/home";
import { siteConfig } from "@/lib/site";
import mentorPhoto from "@/assets/photos/mother-kissing-baby.jpg";
import expertPhoto from "@/assets/photos/women-community-circle.jpg";
import resourcesPhoto from "@/assets/photos/mother-baby-smiling.jpg";
import eventsPhoto from "@/assets/photos/two-friends-smiling.jpg";

const media = {
  mentor: { icon: <HandHeartIcon aria-hidden size={24} />, photo: mentorPhoto, alt: "A mother kissing her smiling baby on the cheek", position: "object-[50%_35%]" },
  expert: { icon: <LightbulbIcon aria-hidden size={24} />, photo: expertPhoto, alt: "Three women in bright African-print clothing chatting over tea", position: "object-[40%_50%]" },
  resources: { icon: <BookOpenTextIcon aria-hidden size={24} />, photo: resourcesPhoto, alt: "A smiling mother holding her baby at home", position: "object-[65%_40%]" },
  events: { icon: <CalendarHeartIcon aria-hidden size={24} />, photo: eventsPhoto, alt: "Two friends smiling side by side", position: "object-[50%_30%]" },
};

/**
 * As the reference's "Built for real teams" section: heading with the action top-right,
 * then the feature tabs (expanded card + changing portrait).
 */
export function MamasEscapeFeature() {
  return (
    <Section aria-labelledby="mamas-escape-heading">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <SectionHeading id="mamas-escape-heading" tag={mamasEscape.eyebrow} heading={mamasEscape.heading} />
        <ButtonLink href={siteConfig.joinUrl} size="large" arrow>
          {mamasEscape.primary}
        </ButtonLink>
      </div>
      <p className="mt-6 max-w-[46ch] text-lead">{mamasEscape.body}</p>
      {/* Mama's Escape is more than the community: the three parts, each a link. */}
      <p className="mt-6 font-semibold text-ink">{mamasEscape.partsLead}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {mamasEscape.parts.map((part) => {
          const href = part.href === "newsletter" ? siteConfig.newsletterUrl : part.href;
          const Part = href.startsWith("/") ? Link : "a";
          return (
            <li key={part.label}>
              <Part href={href} className="inline-flex min-h-12 items-center gap-2 rounded-pill border border-border-decoration bg-surface-card px-4 font-semibold text-ink no-underline hover:border-action">
                {part.label}
                <ArrowRightIcon aria-hidden size={16} weight="bold" />
              </Part>
            </li>
          );
        })}
      </ul>
      <p className="mt-8 font-semibold text-ink">{mamasEscape.itemsLead}</p>
      <div className="mt-4">
        <FeatureTabs
          items={mamasEscape.items.map((item) => ({
            id: item.icon,
            title: item.title,
            text: item.text,
            ...media[item.icon],
          }))}
        />
      </div>
      <Link href={mamasEscape.quiet.href} className="mt-6 inline-flex min-h-12 items-center font-semibold">
        {mamasEscape.quiet.label}
      </Link>
    </Section>
  );
}
