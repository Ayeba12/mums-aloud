import type { Metadata } from "next";
import Image from "next/image";
import { ProfileTile } from "@/components/content/ProfileTile";
import { Section, SectionHeading, Statement, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { about, team } from "@/content/about";
import { joinForm } from "@/lib/site";
import heroPhoto from "@/assets/photos/two-women-laughing.jpg";
import storyPhoto from "@/assets/photos/women-community-circle.jpg";

export const metadata: Metadata = {
  title: about.title,
  description: about.description,
  alternates: { canonical: "/about-mums-aloud/" },
};

/** About Mums Aloud, from the live page's story, belief, mission, vision and team. */
export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        photo={heroPhoto}
        alt=""
        position="object-[60%_25%]"
        tag={about.hero.tag}
        heading={about.hero.heading}
        intro={about.hero.intro}
        actions={
          <>
            <ButtonLink href={joinForm.href} variant="inverse" size="large" arrow>
              {about.hero.primary.label}
            </ButtonLink>
            <ButtonLink href={about.hero.secondary.href} variant="inverse-outline" size="large">
              {about.hero.secondary.label}
            </ButtonLink>
          </>
        }
      />

      {/* Our story: copy beside a photo. Decorative stock photo; the women shown are not members. */}
      <Section id="story" aria-labelledby="story-heading" className="scroll-mt-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHeading id="story-heading" tag={about.story.tag} heading={about.story.heading} />
            <div className="mt-6 flex max-w-[52ch] flex-col gap-4">
              {about.story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Image
              src={storyPhoto}
              alt=""
              placeholder="blur"
              sizes="(min-width: 64rem) 42vw, 100vw"
              className="aspect-[4/5] w-full rounded-card object-cover object-[50%_35%] ring-1 ring-black-950/10 ring-inset"
            />
          </div>
        </div>
      </Section>

      {/* Our belief, as the reference's centred statement with one highlighted phrase. */}
      <Statement id="belief-heading" {...about.belief.statement} body={about.belief.body} />

      {/* Mission and vision: the page's one berry panel. */}
      <div className="frame-x section-y">
        <section aria-labelledby="mission-heading" className="surface-dark rounded-panel">
          <div className="container-page section-y grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <SectionHeading id="mission-heading" tag={about.mission.tag} heading={about.mission.heading} />
              <p className="mt-6 max-w-[52ch]">{about.mission.body}</p>
            </div>
            <div className="flex flex-col justify-center rounded-card bg-surface-card p-6 lg:col-span-5 lg:col-start-8 lg:p-8">
              <Tag>{about.mission.visionTag}</Tag>
              <p className="mt-4 font-heading text-h3 text-ink">{about.mission.vision}</p>
            </div>
          </div>
        </section>
      </div>

      {/* The team, as cards: initials rather than stock portraits. */}
      <Section aria-labelledby="team-heading">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="team-heading" tag={about.team.tag} heading={about.team.heading} intro={about.team.intro} />
          <ButtonLink href={about.team.link.href} variant="secondary">
            {about.team.link.label}
          </ButtonLink>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {team.map((person) => (
            <li key={person.name}>
              <ProfileTile person={person} />
            </li>
          ))}
        </ul>
      </Section>

      <ClosingInvite
        id="about-closing"
        heading={about.closing.heading}
        body={about.closing.body}
        primary={about.closing.primary}
        secondary={about.closing.secondary}
      />
    </main>
  );
}
