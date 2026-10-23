import type { Metadata } from "next";
import { ProfileTile } from "@/components/content/ProfileTile";
import { Section, SectionHeading, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
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
      <Section aria-labelledby="page-heading" className="bg-[linear-gradient(to_bottom,var(--color-surface-tinted),var(--color-surface)_32rem)]">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag>{teamPage.tag}</Tag>
          <h1 id="page-heading" className="mt-2 max-w-[18ch] text-h1 tracking-tight">
            <Accent {...teamPage.heading} />
          </h1>
          <p className="mt-4 max-w-[46ch] text-lead">{teamPage.intro}</p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {team.map((person) => (
            <li key={person.name}>
              <ProfileTile person={person} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-caption text-text-secondary">{teamPage.note}</p>
      </Section>

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
