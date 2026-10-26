import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarHeartIcon,
  ChalkboardTeacherIcon,
  CheckIcon,
  GraduationCapIcon,
  HandHeartIcon,
  HandshakeIcon,
  HeartIcon,
  UsersIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import { IconChip, Section, SectionHeading } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { SmartLink } from "@/components/ui/SmartLink";
import { services } from "@/content/offers";
import { joinForm } from "@/lib/site";
import volunteerPhoto from "@/assets/photos/two-friends-smiling.jpg";
import approachPhoto from "@/assets/photos/women-community-circle.jpg";

export const metadata: Metadata = {
  title: services.title,
  description: services.description,
  alternates: { canonical: "/services/" },
};

const pathwayIcons = {
  support: HandHeartIcon,
  group: UsersThreeIcon,
  mentor: HandshakeIcon,
  community: UsersIcon,
  training: GraduationCapIcon,
  events: CalendarHeartIcon,
  experts: ChalkboardTeacherIcon,
};
const audienceIcons = { mums: HeartIcon, volunteers: HandHeartIcon };
const imageRing = "ring-1 ring-black-950/10 ring-inset";

/**
 * Our Services, to the owner's outline (10 Aug 2026): a centred introduction, the seven pathways
 * as numbered cards in two groups so a mother can pick hers at a glance, the volunteer invitation
 * as the page's one berry panel, how Mums Aloud aims to help for mums and for volunteers, and
 * the two-way closing (get support, volunteer).
 */
export default function ServicesPage() {
  /** Pathways are numbered 01 to 07 across both groups. */
  const starts = services.groups.map((_, index) => services.groups.slice(0, index).reduce((count, group) => count + group.pathways.length, 0));
  return (
    <main id="main">
      <PageHeader tag={services.tag} heading={services.heading} intro={services.intro} />

      {/* The pathways: four about support and belonging, then three about learning and gathering. */}
      {services.groups.map((group, groupIndex) => (
        <Section key={group.id} aria-labelledby={`${group.id}-heading`} tone={groupIndex % 2 === 1 ? "tinted" : "default"}>
          <SectionHeading id={`${group.id}-heading`} tag={group.tag} heading={group.heading} />
          <ul className={`mt-12 grid gap-4 md:grid-cols-2 lg:gap-6 ${group.pathways.length === 3 ? "lg:grid-cols-3" : ""}`}>
            {group.pathways.map((pathway, index) => {
              const Icon = pathwayIcons[pathway.icon];
              const number = String(starts[groupIndex] + index + 1).padStart(2, "0");
              return (
                <li key={pathway.id} id={pathway.id} className="flex flex-col rounded-card border border-border-decoration bg-surface-card p-6 scroll-mt-24 lg:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <IconChip>
                      <Icon aria-hidden size={24} />
                    </IconChip>
                    <span className="text-caption font-semibold tracking-wide text-text-secondary uppercase">Pathway {number}</span>
                  </div>
                  <h3 className="mt-6 text-h3">{pathway.title}</h3>
                  <p className="mt-3 max-w-[46ch]">{pathway.summary}</p>
                  <ul className="mt-6 flex flex-col gap-2 border-t border-border-decoration pt-6">
                    {pathway.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-pill bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {/* The one door for this service, at the foot of the card. */}
                  <div className="mt-auto pt-6">
                    {pathway.action.external ? (
                      <a href={pathway.action.href} className="group inline-flex min-h-12 items-center gap-2 font-semibold">
                        {pathway.action.label}
                        <ArrowUpRightIcon aria-hidden size={16} weight="bold" />
                        <span className="sr-only">(opens Calendly)</span>
                      </a>
                    ) : (
                      <SmartLink href={pathway.action.join ? joinForm.href : (pathway.action.href ?? "/")} className="group inline-flex min-h-12 items-center gap-2 font-semibold">
                        {pathway.action.label}
                        <ArrowRightIcon aria-hidden size={16} weight="bold" className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
                      </SmartLink>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      ))}

      {/* Want to volunteer? The page's one berry panel: the invitation beside a decorative photo. */}
      <div className="frame-x section-y">
        <section id="volunteer" aria-labelledby="volunteer-heading" className="surface-dark rounded-panel scroll-mt-24">
          <div className="container-page section-y grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-6">
              <SectionHeading id="volunteer-heading" tag={services.volunteer.tag} heading={services.volunteer.heading} intro={services.volunteer.intro} />
              <ul className="mt-8 flex flex-col gap-3">
                {services.volunteer.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon aria-hidden size={20} weight="bold" className="mt-1 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-[46ch] font-heading text-h4 italic">{services.volunteer.note}</p>
              <div className="mt-6">
                <ButtonLink href={services.volunteer.action.href} variant="inverse" size="large" arrow>
                  {services.volunteer.action.label}
                </ButtonLink>
              </div>
            </div>
            <div className={`overflow-hidden rounded-card lg:col-span-5 lg:col-start-8 ${imageRing}`}>
              <Image src={volunteerPhoto} alt="" placeholder="blur" sizes="(min-width: 64rem) 42vw, 100vw" className="aspect-[4/5] w-full object-cover object-[55%_30%]" />
            </div>
          </div>
        </section>
      </div>

      {/* How Mums Aloud aims to help: a photo beside the two audiences. */}
      <Section aria-labelledby="approach-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className={`overflow-hidden rounded-card lg:col-span-5 ${imageRing}`}>
            <Image src={approachPhoto} alt="" placeholder="blur" sizes="(min-width: 64rem) 42vw, 100vw" className="aspect-[4/5] w-full object-cover object-[50%_40%]" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading id="approach-heading" tag={services.approach.tag} heading={services.approach.heading} intro={services.approach.intro} />
            <ul className="mt-12 flex flex-col gap-4">
              {services.approach.audiences.map((audience) => {
                const Icon = audienceIcons[audience.icon];
                return (
                  <li key={audience.title} className="flex gap-5 rounded-card border border-border-decoration bg-surface-card p-6">
                    <IconChip>
                      <Icon aria-hidden size={24} />
                    </IconChip>
                    <div>
                      <h3 className="font-heading text-h4 text-ink">{audience.title}</h3>
                      <ul className="mt-3 flex flex-col gap-2">
                        {audience.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-pill bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      <ClosingInvite
        id="services-closing"
        heading={services.closing.heading}
        body={services.closing.body}
        primary={services.closing.primary}
        secondary={services.closing.secondary}
      />
    </main>
  );
}
