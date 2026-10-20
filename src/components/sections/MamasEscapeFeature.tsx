import Image from "next/image";
import Link from "next/link";
import { BookOpenTextIcon, CalendarHeartIcon, HandHeartIcon, LightbulbIcon } from "@phosphor-icons/react/ssr";
import { IconChip, Section, SectionHeading } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { mamasEscape } from "@/content/home";
import { siteConfig } from "@/lib/site";
import photo from "@/assets/photos/mother-kissing-baby.jpg";

const icons = { mentor: HandHeartIcon, expert: LightbulbIcon, resources: BookOpenTextIcon, events: CalendarHeartIcon };

/** "A glimpse of what waits inside": copy and benefits beside a tall portrait, on the sage surface. */
export function MamasEscapeFeature() {
  return (
    <Section tone="sage" aria-labelledby="mamas-escape-heading">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <SectionHeading id="mamas-escape-heading" tag={mamasEscape.eyebrow} heading={mamasEscape.heading} intro={mamasEscape.body} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {mamasEscape.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.title} className="flex gap-4 rounded-card bg-surface p-4">
                  <IconChip className="bg-surface-sage">
                    <Icon aria-hidden size={24} />
                  </IconChip>
                  <p className="self-center">
                    <strong className="font-bold text-ink">{item.title}.</strong> {item.text}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ButtonLink href={siteConfig.joinUrl} size="large" arrow>
              {mamasEscape.primary}
            </ButtonLink>
            <Link href={mamasEscape.quiet.href} className="inline-flex min-h-12 items-center font-semibold">
              {mamasEscape.quiet.label}
            </Link>
          </div>
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
