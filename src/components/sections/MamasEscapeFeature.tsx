import Image from "next/image";
import Link from "next/link";
import { BookOpenTextIcon, CalendarHeartIcon, HandHeartIcon, LightbulbIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, Section } from "@/components/layout/Section";
import { buttonClasses } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { mamasEscape } from "@/content/home";
import { siteConfig } from "@/lib/site";
import photo from "@/assets/photos/mother-kissing-baby.jpg";

const icons = { mentor: HandHeartIcon, expert: LightbulbIcon, resources: BookOpenTextIcon, events: CalendarHeartIcon };

/** "A glimpse of what waits inside": copy and list beside a tall portrait. */
export function MamasEscapeFeature() {
  return (
    <Section tone="tinted" aria-labelledby="mamas-escape-heading">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Eyebrow>{mamasEscape.eyebrow}</Eyebrow>
          <h2 id="mamas-escape-heading" className="mt-2 text-h2 tracking-tight">
            <Accent {...mamasEscape.heading} />
          </h2>
          <p className="mt-4 text-lead">{mamasEscape.body}</p>
          <ul className="mt-8 divide-y divide-border-decoration border-y border-border-decoration">
            {mamasEscape.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.title} className="flex gap-4 py-4">
                  <Icon aria-hidden size={24} className="mt-1 shrink-0 text-action" />
                  <p>
                    <strong className="font-bold text-ink">{item.title}.</strong> {item.text}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href={siteConfig.joinUrl} className={buttonClasses("primary", "large")}>
              {mamasEscape.primary}
            </Link>
            <Link href={mamasEscape.quiet.href} className="inline-flex min-h-12 items-center font-semibold">
              {mamasEscape.quiet.label}
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Image
            src={photo}
            alt="A mother kissing her smiling baby on the cheek"
            placeholder="blur"
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="aspect-[4/5] w-full rounded-panel object-cover object-[50%_35%]"
          />
        </div>
      </div>
    </Section>
  );
}
