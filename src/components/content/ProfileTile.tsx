import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Profile } from "@/content/about";
import { BioDialog } from "./BioDialog";

/**
 * A person as a card. With a portrait (the client's own photo, never stock): the photo in a 4:5
 * frame with the site's 1px outline, then the name in the serif and the role beneath, as the
 * other content cards. Without one: an initial in the marigold chip. The whole card is the link
 * when the person has a page; a person with a biography gets a "Read bio" button that opens it in
 * a dialog, tagged with `context` (the group they belong to).
 */
export function ProfileTile({ person, photo, position = "object-top", context = "Mums Aloud" }: { person: Profile; photo?: StaticImageData; position?: string; context?: string }) {
  const initial = person.name.trim().charAt(0).toUpperCase();
  const linked = Boolean(person.href);
  const bio = person.bio?.length ? <BioDialog person={{ ...person, bio: person.bio }} photo={photo} position={position} context={context} /> : null;
  const name = linked ? (
    <Link href={person.href!} className="text-ink no-underline after:absolute after:inset-0 after:rounded-card">
      {person.name}
    </Link>
  ) : (
    person.name
  );

  if (photo) {
    return (
      <article className={`relative flex h-full flex-col ${linked ? "group" : ""}`}>
        <div className="overflow-hidden rounded-card bg-surface-card ring-1 ring-black-950/10 ring-inset">
          <Image
            src={photo}
            alt={`${person.name}, ${person.role}`}
            placeholder="blur"
            sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw"
            className={`aspect-[4/5] w-full object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none ${position}`}
          />
        </div>
        <h3 className="mt-4 font-heading text-h4 text-ink">{name}</h3>
        <p className="mt-1 text-text-secondary">{person.role}</p>
        {bio}
        {linked && person.linkLabel && (
          <p className="mt-3 flex items-center gap-2 font-semibold text-action">
            {person.linkLabel}
            <ArrowRightIcon aria-hidden size={16} weight="bold" className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
          </p>
        )}
      </article>
    );
  }

  return (
    <article className={`relative flex h-full flex-col rounded-card border border-border-decoration bg-surface-card p-6 ${linked ? "group" : ""}`}>
      <span aria-hidden className="inline-flex size-12 items-center justify-center rounded-pill bg-accent-soft font-heading text-h4 text-ink">
        {initial}
      </span>
      <h3 className="mt-4 font-body text-title font-semibold text-ink">{name}</h3>
      <p className="mt-1 text-text-secondary">{person.role}</p>
      {bio}
      {linked && person.linkLabel && (
        <p className="mt-auto flex items-center gap-2 pt-6 text-caption font-semibold text-action">
          {person.linkLabel}
          <ArrowRightIcon aria-hidden size={14} weight="bold" className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
        </p>
      )}
    </article>
  );
}
