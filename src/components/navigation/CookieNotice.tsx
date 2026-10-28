"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { cookieNotice } from "@/content/policies";
import { cookieNoticeStore } from "@/lib/cookie-notice";

/** Re-render on a closing here, or in another tab of this site. */
const subscribe = (listener: () => void) => {
  const unsubscribe = cookieNoticeStore.subscribe(listener);
  window.addEventListener("storage", listener);
  return () => {
    unsubscribe();
    window.removeEventListener("storage", listener);
  };
};

/**
 * The cookie notice: a berry bar the full width of the screen, stuck to the foot of the viewport
 * until the page's own end scrolls up under it (so it never covers the footer), gone once closed.
 * The server renders nothing, since the closed state lives in the visitor's browser, so it appears
 * after hydration and rises in. This site sets no cookies and the notice says so; closing it keeps
 * one setting in localStorage, which the cookie policy explains.
 */
export function CookieNotice() {
  const dismissed = useSyncExternalStore(subscribe, cookieNoticeStore.isDismissed, () => true);
  if (dismissed) return null;
  return (
    <aside
      aria-label={cookieNotice.label}
      className="surface-dark sticky bottom-0 z-(--z-sticky) w-full transition-[translate,opacity] duration-300 ease-standard starting:translate-y-4 starting:opacity-0 motion-reduce:transition-none"
    >
      <div className="container-page flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:py-5">
        <p className="max-w-[64ch]">{cookieNotice.text}</p>
        <div className="flex shrink-0 items-center gap-6">
          <Link href={cookieNotice.link.href} className="font-semibold">
            {cookieNotice.link.label}
          </Link>
          <Button type="button" variant="inverse" onClick={() => cookieNoticeStore.dismiss()}>
            {cookieNotice.dismiss}
          </Button>
        </div>
      </div>
    </aside>
  );
}
