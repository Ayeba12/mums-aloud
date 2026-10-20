import Image from "next/image";
import Link from "next/link";
import { NavMenu } from "./NavMenu";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/lib/site";

/** Floating rounded header, inset from the viewport edges (8px mobile, 16px desktop). */
export function SiteHeader() {
  return (
    <header className="sticky top-2 z-(--z-header) px-2 lg:top-4 lg:px-4">
      <div className="relative mx-auto flex h-16 max-w-[calc(var(--container-content)+4rem)] items-center justify-between gap-4 rounded-card border border-border-decoration bg-surface/95 pr-2 pl-4 shadow-raised backdrop-blur lg:h-18 lg:pl-6">
        <Link href="/" className="shrink-0 rounded-control" aria-label="Mums Aloud home">
          <Image src="/brand/mumsaloud-logo.webp" alt="" width={92} height={48} priority className="h-10 w-auto lg:h-12" />
        </Link>
        <NavMenu items={mainNav} joinUrl={siteConfig.joinUrl} joinLabel="Join Our Community" />
      </div>
    </header>
  );
}
