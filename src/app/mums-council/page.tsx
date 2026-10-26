import type { Metadata } from "next";
import Link from "next/link";
import {
  ChartBarIcon,
  GraduationCapIcon,
  HandHeartIcon,
  MegaphoneIcon,
  ScalesIcon,
  SparkleIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import { ProfileTile } from "@/components/content/ProfileTile";
import { teamPortraits } from "@/components/content/teamPortraits";
import { IconChip, Section, SectionHeading, Statement } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CardMarquee } from "@/components/sections/CardMarquee";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { PageHeader } from "@/components/sections/PageHeader";
import { council } from "@/content/about";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: council.title,
  description: council.description,
  alternates: { canonical: "/mums-council/" },
};

const roleIcons = { advocacy: MegaphoneIcon, research: ChartBarIcon, community: UsersThreeIcon, policy: ScalesIcon, mentorship: HandHeartIcon };
const expectIcons = { empowerment: SparkleIcon, education: GraduationCapIcon, inspiration: UsersThreeIcon };

/**
 * Mum's Council, from the live page: what the council does (the reference's statement over a
 * drifting row of cards, revealed on scroll), its members (their own portraits, roles and
 * biographies behind "Read bio"), and what a mother can expect. Registration has no destination
 * on the live site yet, so the page says so rather than inventing one.
 */
export default function MumsCouncilPage() {
  return (
    <main id="main">
      <PageHeader tag={council.tag} heading={council.heading} intro={council.intro} />

      <Reveal>
        <Statement id="roles-heading" {...council.roles.statement} size="h3" reveal>
          <div data-reveal="fade">
            <CardMarquee label="What the council does">
              {council.roles.items.map((item) => {
                const Icon = roleIcons[item.icon];
                return (
                  <li
                    key={item.title}
                    className="flex h-[20rem] w-[16rem] shrink-0 flex-col justify-between rounded-card border border-border-decoration bg-surface-card p-6 md:h-[22rem] md:w-[29rem] md:rounded-panel md:p-8"
                  >
                    <div>
                      <IconChip>
                        <Icon aria-hidden size={24} />
                      </IconChip>
                      <h3 className="mt-5 font-heading text-h4 text-ink md:mt-6">{item.title}</h3>
                    </div>
                    <p>{item.text}</p>
                  </li>
                );
              })}
            </CardMarquee>
          </div>
        </Statement>
      </Reveal>

      <Statement
        id="council-statement"
        {...council.statement}
        action={
          <p role="status" className="max-w-[46rem] rounded-card bg-surface-card p-4 text-center">
            {council.register.pending}{" "}
            <Link href={siteConfig.newsletterUrl} className="font-semibold">
              Get the newsletter
            </Link>
          </p>
        }
      />

      <Section aria-labelledby="members-heading" tone="tinted">
        <SectionHeading id="members-heading" tag={council.members.tag} heading={council.members.heading} />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {council.members.people.map((person) => (
            <li key={person.name}>
              <ProfileTile person={person} {...teamPortraits[person.id]} context={council.tag} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-caption text-text-secondary">{council.members.note}</p>
      </Section>

      {/* What you can expect: the page's one berry panel. */}
      <div className="frame-x section-y">
        <section aria-labelledby="expect-heading" className="surface-dark rounded-panel">
          <div className="container-page section-y">
            <SectionHeading id="expect-heading" tag={council.expect.tag} heading={council.expect.heading} align="center" />
            <ul className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-6">
              {council.expect.items.map((item) => {
                const Icon = expectIcons[item.icon];
                return (
                  <li key={item.title} className="flex flex-col rounded-card border border-border-decoration p-6">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-surface-card text-accent">
                      <Icon aria-hidden size={24} />
                    </span>
                    <h3 className="mt-6 font-heading text-h4 text-ink">{item.title}</h3>
                    <p className="mt-2">{item.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>

      <ClosingInvite
        id="council-closing"
        heading={council.closing.heading}
        body={council.closing.body}
        primary={council.closing.primary}
        secondary={council.closing.secondary}
      />
    </main>
  );
}
