import type { Metadata } from "next";
import { ProfileTile } from "@/components/content/ProfileTile";
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
 * Meet the Team: name and role for each person as the live site publishes them, with initials in
 * place of portraits so no stock photo is ever read as a team member. No photo hero for the same
 * reason.
 */
export default function MeetTheTeamPage() {
  return (
    <main id="main">
      <PageHeader tag={teamPage.tag} heading={teamPage.heading} intro={teamPage.intro}>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {team.map((person) => (
            <li key={person.name}>
              <ProfileTile person={person} />
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
