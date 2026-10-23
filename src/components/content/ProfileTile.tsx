import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Profile } from "@/content/about";

/**
 * A person as a card: an initial in the marigold chip (no stock portraits stand in for real
 * people), name, role, and an optional link to their own page. The whole card is the link when
 * there is one.
 */
export function ProfileTile({ person }: { person: Profile }) {
  const initial = person.name.trim().charAt(0).toUpperCase();
  return (
    <article className={`relative flex h-full flex-col rounded-card border border-border-decoration bg-surface-card p-6 ${person.href ? "group" : ""}`}>
      <span aria-hidden className="inline-flex size-12 items-center justify-center rounded-pill bg-accent-soft font-heading text-h4 text-ink">
        {initial}
      </span>
      <h3 className="mt-4 font-body text-h4 font-bold text-ink">
        {person.href ? (
          <Link href={person.href} className="text-ink no-underline after:absolute after:inset-0 hover:underline">
            {person.name}
          </Link>
        ) : (
          person.name
        )}
      </h3>
      <p className="mt-1 text-text-secondary">{person.role}</p>
      {person.href && person.linkLabel && (
        <p className="mt-auto flex items-center gap-2 pt-6 text-caption font-semibold text-action">
          {person.linkLabel}
          <ArrowRightIcon aria-hidden size={14} weight="bold" className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
        </p>
      )}
    </article>
  );
}
