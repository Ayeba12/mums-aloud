import Image from "next/image";
import Link from "next/link";
import { NavMenu } from "./NavMenu";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/lib/site";

/**
 * Floating pill header: an island inside the hero frame. It sits one frame inset below the
 * frame's top edge and is pulled in from its sides, so the photo shows above and around it.
 * Pages pull the hero up underneath it with `-mt-(--header-offset)`.
 */
export function SiteHeader() {
  return (
    <header className="frame-x sticky top-4 z-(--z-header) h-16 md:top-8">
      <div className="relative mx-2 flex h-16 max-w-[calc(var(--container-content)-16rem)] items-center justify-between gap-4 rounded-pill border border-border-decoration bg-surface/95 py-2 pr-2 pl-5 shadow-raised backdrop-blur md:mx-6 xl:mx-auto">
        <Link href="/" className="shrink-0 rounded-control" aria-label="Mums Aloud home">
          <Image src="/brand/mumsaloud-logo.webp" alt="" width={92} height={48} priority className="h-10 w-auto" />
        </Link>
        <NavMenu items={mainNav} joinUrl={siteConfig.joinUrl} joinLabel="Join Our Community" />
      </div>
    </header>
  );
}
