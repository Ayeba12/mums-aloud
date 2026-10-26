import { FacebookLogoIcon, InstagramLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/lib/site";

type SocialKey = keyof typeof siteConfig.social;

const icons = {
  instagram: InstagramLogoIcon,
  facebook: FacebookLogoIcon,
  youtube: YoutubeLogoIcon,
} satisfies Record<SocialKey, typeof InstagramLogoIcon>;

const target =
  "inline-flex size-12 items-center justify-center rounded-pill bg-surface text-ink transition-colors duration-150 hover:bg-accent-soft focus:outline-3 focus:outline-offset-2 focus:outline-focus active:scale-[0.96] motion-reduce:transition-none";

/**
 * The public profiles as a row of 48px icon targets. Reads `siteConfig.social` and shows only
 * the entries with a URL, so an empty profile never becomes a dead link; renders nothing when
 * none is set, so callers need no guard. Each link names the network and the handle for screen readers.
 */
export function SocialLinks({ className = "" }: { className?: string }) {
  const entries = (Object.keys(siteConfig.social) as SocialKey[]).filter((key) => siteConfig.social[key].href);
  if (entries.length === 0) return null;
  return (
    <nav aria-label="Follow us" className={className}>
      <ul className="flex flex-wrap gap-2">
        {entries.map((key) => {
          const { label, handle, href } = siteConfig.social[key];
          const Icon = icons[key];
          return (
            <li key={key}>
              <a href={href} className={target}>
                <Icon aria-hidden size={24} />
                <span className="sr-only">
                  {label}: {handle} (opens {label})
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
