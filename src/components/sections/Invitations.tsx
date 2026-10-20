import Image from "next/image";
import Link from "next/link";
import { MicrophoneIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, Section } from "@/components/layout/Section";
import { buttonClasses } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { closing, newsletter } from "@/content/home";
import { siteConfig } from "@/lib/site";
import photo from "@/assets/photos/mother-baby-smiling.jpg";

/** Softer path for visitors not ready to join: newsletter and podcast. */
export function NewsletterInvite() {
  return (
    <Section aria-labelledby="newsletter-heading">
      <div className="grid overflow-hidden rounded-panel bg-surface-card lg:grid-cols-2">
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-16">
          <Eyebrow>{newsletter.eyebrow}</Eyebrow>
          <h2 id="newsletter-heading" className="mt-2 text-h2 tracking-tight">
            <Accent {...newsletter.heading} />
          </h2>
          <p className="mt-4">{newsletter.body}</p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href={siteConfig.newsletterUrl} className={buttonClasses("secondary")}>
              {newsletter.newsletterLabel}
            </Link>
            <a href={newsletter.podcast.href} className="inline-flex min-h-12 items-center gap-2 font-semibold">
              <MicrophoneIcon aria-hidden size={20} />
              {newsletter.podcast.label}
              <span className="sr-only">(opens Spotify)</span>
            </a>
          </div>
        </div>
        <div className="relative min-h-72">
          <Image
            src={photo}
            alt="A smiling mother holding her baby at home"
            fill
            placeholder="blur"
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="object-cover object-[65%_40%]"
          />
        </div>
      </div>
    </Section>
  );
}

export function ClosingInvite() {
  return (
    <Section aria-labelledby="closing-heading">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 id="closing-heading" className="text-h1 tracking-tight">
          <Accent {...closing.heading} />
        </h2>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href={siteConfig.joinUrl} className={buttonClasses("primary", "large")}>
            Join Mama&apos;s Escape
          </Link>
          <Link href={closing.secondary.href} className={buttonClasses("secondary", "large")}>
            {closing.secondary.label}
          </Link>
        </div>
      </div>
    </Section>
  );
}
