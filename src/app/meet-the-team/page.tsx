import type { Metadata } from "next";
import { ProfileTile } from "@/components/content/ProfileTile";
import { teamPortraits } from "@/components/content/teamPortraits";
import { Section, SectionHeading } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { team, teamPage } from "@/content/about";

export const metadata: Metadata = {
  title: teamPage.title,
  description: teamPage.description,
  alternates: { canonical: "/meet-the-team/" },
};

/**
 * Meet the Team: each person's own portrait (supplied by the client), name and role as the live
 * site publishes them. No stock photo anywhere near a real name.
 */
export default function MeetTheTeamPage() {
  return (
    <main id="main">
      <PageHeader tag={teamPage.tag} heading={teamPage.heading} intro={teamPage.intro}>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {team.map((person) => (
            <li key={person.name}>
              <ProfileTile person={person} {...teamPortraits[person.id]} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-caption text-text-secondary">{teamPage.note}</p>
      </PageHeader>

      <Section aria-labelledby="council-heading" tone="tinted">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="council-heading" heading={teamPage.council.heading} intro={teamPage.council.body} />
          <ButtonLink href={teamPage.council.link.href} variant="secondary">
            {teamPage.council.link.label}
          </ButtonLink>
        </div>
      </Section>

      <ClosingInvite
        id="team-closing"
        heading={teamPage.closing.heading}
        body={teamPage.closing.body}
        primary={teamPage.closing.primary}
        secondary={teamPage.closing.secondary}
      />
    </main>
  );
}
