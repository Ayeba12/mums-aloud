import Image from "next/image";
import Link from "next/link";
import { BookOpenTextIcon, CalendarHeartIcon, HandHeartIcon, LightbulbIcon } from "@phosphor-icons/react/ssr";
import { IconChip, Section, SectionHeading } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { mamasEscape } from "@/content/home";
import { siteConfig } from "@/lib/site";
import photo from "@/assets/photos/mother-kissing-baby.jpg";

const icons = { mentor: HandHeartIcon, expert: LightbulbIcon, resources: BookOpenTextIcon, events: CalendarHeartIcon };

/**
 * As the reference's "Built for real teams" section: heading with the action top-right,
 * a divided feature list under it, and a tall portrait in the other column.
 */
export function MamasEscapeFeature() {
  return (
    <Section aria-labelledby="mamas-escape-heading">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="mamas-escape-heading" tag={mamasEscape.eyebrow} heading={mamasEscape.heading} />
        <ButtonLink href={siteConfig.joinUrl} arrow>
          {mamasEscape.primary}
        </ButtonLink>
      </div>
      <div className="mt-12 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p className="max-w-[46ch] text-lead">{mamasEscape.body}</p>
          <ul className="mt-8 divide-y divide-border-decoration border-y border-border-decoration">
            {mamasEscape.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.title} className="flex gap-4 py-4">
                  <IconChip>
                    <Icon aria-hidden size={24} />
                  </IconChip>
                  <p className="self-center">
                    <strong className="font-bold text-ink">{item.title}.</strong> {item.text}
                  </p>
                </li>
              );
            })}
          </ul>
          <Link href={mamasEscape.quiet.href} className="mt-6 inline-flex min-h-12 items-center font-semibold">
            {mamasEscape.quiet.label}
          </Link>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Image
            src={photo}
            alt="A mother kissing her smiling baby on the cheek"
            placeholder="blur"
            sizes="(min-width: 64rem) 42vw, 100vw"
            className="aspect-[4/5] w-full rounded-card object-cover object-[50%_35%]"
          />
        </div>
      </div>
    </Section>
  );
}
