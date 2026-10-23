import type { Metadata } from "next";
import Image from "next/image";
import {
  CalendarCheckIcon,
  ChalkboardTeacherIcon,
  HandHeartIcon,
  HandshakeIcon,
  LightbulbIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { IconChip, Section, SectionHeading, Statement } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { apply, closing, hero, impact, page, why } from "@/content/volunteer";
import { siteConfig } from "@/lib/site";
import heroPhoto from "@/assets/photos/women-community-circle.jpg";
import friendsPhoto from "@/assets/photos/two-friends-smiling.jpg";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/volunteer/" },
};

const icons = {
  empower: HandHeartIcon,
  community: UsersThreeIcon,
  skills: LightbulbIcon,
  workshops: ChalkboardTeacherIcon,
  mentor: HandshakeIcon,
  events: CalendarCheckIcon,
};

/**
 * Volunteer With Us, in the order of the owner's notes: the photo hero, six reasons to volunteer
 * as cards, the "ready to make an impact" statement, the application form beside its note, and
 * the light closing. Stock photos are decorative placeholders, never presented as volunteers.
 */
export default function VolunteerPage() {
  return (
    <main id="main">
      <PageHero
        photo={heroPhoto}
        alt=""
        position="object-[50%_40%]"
        tag={hero.tag}
        heading={hero.heading}
        intro={hero.intro}
        actions={
          <>
            <ButtonLink href={hero.primary.href} variant="inverse" size="large" arrow>
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="inverse-outline" size="large">
              {hero.secondary.label}
            </ButtonLink>
          </>
        }
      />

      {/* Why volunteer: the six reasons as cards. */}
      <Section id="why" aria-labelledby="why-heading" className="scroll-mt-24">
        <SectionHeading id="why-heading" tag={why.tag} heading={why.heading} align="center" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {why.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="flex flex-col rounded-card bg-surface-card p-6">
                <IconChip>
                  <Icon aria-hidden size={24} />
                </IconChip>
                <h3 className="mt-6 font-heading text-h4 text-ink">{item.title}</h3>
                <p className="mt-2">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* The owner's "ready to make an impact" paragraph as the centred statement. */}
      <Statement
        id="impact-heading"
        lead={impact.statement.lead}
        highlight={impact.statement.highlight}
        trail={impact.statement.trail}
        body={impact.body}
        wide
        action={
          <ButtonLink href={impact.action.href} size="large" arrow>
            {impact.action.label}
          </ButtonLink>
        }
      />

      {/* Application: the note beside the form. */}
      <Section id="apply" aria-labelledby="apply-heading" className="scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading
              id="apply-heading"
              tag={apply.tag}
              heading={apply.heading}
              intro={apply.intro}
              action={
                <p className="max-w-[46ch] text-text-secondary">
                  {apply.note.before}
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  {apply.note.after}
                </p>
              }
            />
            <div className="mt-8 hidden overflow-hidden rounded-card ring-1 ring-black-950/10 ring-inset lg:block">
              <Image src={friendsPhoto} alt="" placeholder="blur" sizes="(min-width: 64rem) 40vw, 100vw" className="aspect-[4/3] w-full object-cover object-[55%_30%]" />
            </div>
          </div>
          <div className="rounded-panel bg-surface-card p-6 lg:col-span-6 lg:col-start-7 lg:p-8">
            <VolunteerForm />
          </div>
        </div>
      </Section>

      <ClosingInvite id="closing-heading" heading={closing.heading} body={closing.body} primary={closing.primary} secondary={closing.secondary} />
    </main>
  );
}
