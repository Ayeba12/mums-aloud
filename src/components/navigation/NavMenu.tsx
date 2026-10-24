"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { buttonClasses } from "@/components/ui/Button";
import { isExternalHref, isGroup, type NavItem } from "@/content/navigation";

const itemClasses =
  "inline-flex min-h-12 items-center gap-1 rounded-pill px-4 font-semibold text-ink no-underline transition-colors duration-150 hover:bg-surface-tinted hover:text-ink aria-[current=page]:bg-surface-tinted";
const panelLinkClasses =
  "flex min-h-12 flex-col justify-center rounded-card px-4 py-2 text-ink no-underline hover:bg-surface-tinted hover:text-ink aria-[current=page]:bg-surface-tinted";

/**
 * Header navigation. Desktop groups open on click (not hover) as disclosures;
 * the mobile menu is a non-modal disclosure. Escape closes and returns focus.
 */
export function NavMenu({ items, joinUrl, joinLabel }: { items: NavItem[]; joinUrl: string; joinLabel: string }) {
  const pathname = usePathname();
  const baseId = useId();
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!openGroup && !mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const trigger = openGroup ? triggerRefs.current.get(openGroup) : triggerRefs.current.get("mobile");
      setOpenGroup(null);
      setMobileOpen(false);
      trigger?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openGroup, mobileOpen]);

  const closeAll = () => {
    setOpenGroup(null);
    setMobileOpen(false);
  };
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <nav ref={navRef} aria-label="Main" className="flex items-center gap-2">
      <ul className="hidden items-center gap-1 lg:flex">
        {items.map((item) => {
          if (!isGroup(item)) {
            return (
              <li key={item.label}>
                {isExternalHref(item.href) ? (
                  <a href={item.href} className={itemClasses} onClick={closeAll}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} aria-current={current(item.href)} className={itemClasses} onClick={closeAll}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          }
          const panelId = `${baseId}-${item.label.replace(/\W+/g, "-")}`;
          const open = openGroup === item.label;
          return (
            <li key={item.label} className="relative">
              <button
                type="button"
                ref={(node) => {
                  if (node) triggerRefs.current.set(item.label, node);
                }}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenGroup(open ? null : item.label)}
                className={`${itemClasses} cursor-pointer`}
              >
                {item.label}
                <CaretDownIcon
                  aria-hidden
                  size={16}
                  className={`transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                />
              </button>
              <div
                id={panelId}
                hidden={!open}
                className="absolute top-full left-0 z-(--z-overlay) mt-3 w-80 rounded-card border border-border-decoration bg-surface p-2 shadow-raised"
              >
                <ul>
                  {item.links.map((link) => (
                    <li key={link.href}>
                      {isExternalHref(link.href) ? (
                        <a href={link.href} onClick={closeAll} className={panelLinkClasses}>
                          <span className="font-semibold">{link.label}</span>
                          {link.description && <span className="text-caption text-text-secondary">{link.description}</span>}
                        </a>
                      ) : (
                        <Link href={link.href} aria-current={current(link.href)} onClick={closeAll} className={panelLinkClasses}>
                          <span className="font-semibold">{link.label}</span>
                          {link.description && <span className="text-caption text-text-secondary">{link.description}</span>}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Wrapper controls visibility; the button's own inline-flex would override `hidden`. */}
      <span className="hidden sm:block">
        <Link href={joinUrl} className={buttonClasses("primary")} onClick={closeAll}>
          {joinLabel}
        </Link>
      </span>

      <button
        type="button"
        ref={(node) => {
          if (node) triggerRefs.current.set("mobile", node);
        }}
        aria-expanded={mobileOpen}
        aria-controls={`${baseId}-mobile`}
        onClick={() => setMobileOpen((value) => !value)}
        className="inline-flex size-12 cursor-pointer items-center justify-center rounded-pill text-ink hover:bg-surface-tinted lg:hidden"
      >
        {mobileOpen ? <XIcon aria-hidden size={24} /> : <ListIcon aria-hidden size={24} />}
        <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id={`${baseId}-mobile`}
        hidden={!mobileOpen}
        className="absolute inset-x-0 top-full mt-3 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-card border border-border-decoration bg-surface p-4 shadow-raised lg:hidden"
      >
        <ul className="flex flex-col gap-6">
          {items.map((item) =>
            isGroup(item) ? (
              <li key={item.label}>
                <p className="px-3 text-caption font-semibold tracking-wide text-text-secondary uppercase">{item.label}</p>
                <ul className="mt-1">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      {isExternalHref(link.href) ? (
                        <a href={link.href} onClick={closeAll} className={`${itemClasses} w-full`}>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} aria-current={current(link.href)} onClick={closeAll} className={`${itemClasses} w-full`}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.label}>
                {isExternalHref(item.href) ? (
                  <a href={item.href} onClick={closeAll} className={`${itemClasses} w-full`}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} aria-current={current(item.href)} onClick={closeAll} className={`${itemClasses} w-full`}>
                    {item.label}
                  </Link>
                )}
              </li>
            ),
          )}
        </ul>
        <Link href={joinUrl} onClick={closeAll} className={buttonClasses("primary", "large", "mt-6 w-full")}>
          {joinLabel}
        </Link>
      </div>
    </nav>
  );
}
