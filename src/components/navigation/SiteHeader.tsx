import Image from "next/image";
import Link from "next/link";
import { NavMenu } from "./NavMenu";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/lib/site";

/**
 * Floating pill header: an island inside the hero frame. It sits one frame inset below the
 * frame's top edge and is pulled in from its sides, so the photo shows above and around it.
 * Three columns, the outer two equal, so the menu sits in the exact centre of the pill whatever
 * the logo and the join button measure. Below `lg` the same grid holds the reference's phone bar:
 * circle menu button, logo in the centre, join pill; `NavMenu` places the logo so the order can
 * change with the breakpoint. Pages pull the hero up underneath it with `-mt-(--header-offset)`.
 */
export function SiteHeader() {
  return (
    <header className="frame-x sticky top-4 z-(--z-header) h-16 md:top-8">
      <div className="relative mx-2 grid h-16 max-w-[calc(var(--container-content)-16rem)] grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-pill border border-border-decoration bg-surface/95 p-2 shadow-raised backdrop-blur md:mx-6 xl:mx-auto">
        {/* Equal padding keeps the grid's centre on the pill's centre; from `lg` the logo's own margin gives it the deeper inset. */}
        <NavMenu
          items={mainNav}
          joinUrl={siteConfig.joinUrl}
          joinLabel="Join Our Community"
          joinShortLabel="Join us"
          brand={
            <Link href="/" className="inline-flex shrink-0 rounded-control" aria-label="Mums Aloud home">
              <Image src="/brand/mumsaloud-logo.webp" alt="" width={92} height={48} priority className="h-10 w-auto" />
            </Link>
          }
        />
      </div>
    </header>
  );
}
