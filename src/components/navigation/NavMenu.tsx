"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRightIcon, CaretDownIcon, HandHeartIcon, HandshakeIcon, ListIcon, PlantIcon, UsersThreeIcon, XIcon } from "@phosphor-icons/react";
import { buttonClasses } from "@/components/ui/Button";
import { founderPortrait, isExternalHref, isGroup, menuFooter, type NavFeature, type NavGroup, type NavItem, type NavLink } from "@/content/navigation";
import circlePhoto from "@/assets/photos/women-community-circle.jpg";
import laughingPhoto from "@/assets/photos/two-women-laughing.jpg";
import friendsPhoto from "@/assets/photos/two-friends-smiling.jpg";
import goldenPhoto from "@/assets/photos/hero-mother-baby-golden-hour.jpg";
import smilingPhoto from "@/assets/photos/mother-baby-smiling.jpg";
import parkPhoto from "@/assets/photos/mother-daughter-park.jpg";
import embracePhoto from "@/assets/photos/mother-daughter-embrace.jpg";
import kissingPhoto from "@/assets/photos/mother-kissing-baby.jpg";

const itemClasses =
  "inline-flex min-h-12 items-center gap-1 rounded-pill px-3 font-semibold text-ink no-underline transition-colors duration-150 hover:bg-surface-tinted hover:text-ink aria-[current=page]:bg-surface-tinted xl:px-4";
const panelLinkClasses = "inline-flex min-h-10 items-center gap-1 py-1 text-ink no-underline hover:underline";

/** Stock photos (decorative) and Bokun's own portrait, for the cards in the menus. */
const photos: Record<NavFeature["photo"], { src: StaticImageData | string; alt: string; position: string }> = {
  circle: { src: circlePhoto, alt: "", position: "object-[50%_35%]" },
  laughing: { src: laughingPhoto, alt: "", position: "object-[60%_20%]" },
  friends: { src: friendsPhoto, alt: "", position: "object-[55%_30%]" },
  golden: { src: goldenPhoto, alt: "", position: "object-[50%_30%]" },
  smiling: { src: smilingPhoto, alt: "", position: "object-[65%_40%]" },
  park: { src: parkPhoto, alt: "", position: "object-[50%_30%]" },
  embrace: { src: embracePhoto, alt: "", position: "object-[50%_30%]" },
  kissing: { src: kissingPhoto, alt: "", position: "object-[50%_35%]" },
  bokun: { src: founderPortrait.src, alt: founderPortrait.alt, position: "object-[50%_20%]" },
};
const icons = { community: UsersThreeIcon, partnership: HandshakeIcon, services: HandHeartIcon, growth: PlantIcon };

const OPEN_DELAY = 60;
const CLOSE_DELAY = 160;

/** True once on the client, so the backdrop can portal to the body without a state flip in an effect. */
const noop = () => () => {};
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

/**
 * Header navigation, centred in the pill. Groups open as mega menus the full width of the pill,
 * on hover (mouse) and on click (touch, keyboard); the page behind softens while one is open.
 * The mobile menu is a non-modal disclosure. Escape closes and returns focus.
 */
export function NavMenu({ items, joinUrl, joinLabel }: { items: NavItem[]; joinUrl: string; joinLabel: string }) {
  const pathname = usePathname();
  const baseId = useId();
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useMounted();

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

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const closeAll = () => {
    clearTimer();
    setOpenGroup(null);
    setMobileOpen(false);
  };
  /** Hover opens and closes with a short intent delay; touch and pen leave it to the click. */
  const hoverIn = (label: string) => (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    clearTimer();
    timer.current = setTimeout(() => setOpenGroup(label), OPEN_DELAY);
  };
  const hoverOut = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    clearTimer();
    timer.current = setTimeout(() => setOpenGroup(null), CLOSE_DELAY);
  };
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="contents"
      onBlur={(event) => {
        if (!navRef.current?.contains(event.relatedTarget as Node | null)) setOpenGroup(null);
      }}
    >
      <ul className="col-start-2 hidden items-center gap-1 lg:flex">
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
            <li key={item.label} onPointerEnter={hoverIn(item.label)} onPointerLeave={hoverOut}>
              <button
                type="button"
                ref={(node) => {
                  if (node) triggerRefs.current.set(item.label, node);
                }}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => {
                  clearTimer();
                  setOpenGroup(open ? null : item.label);
                }}
                className={`${itemClasses} cursor-pointer ${open ? "bg-surface-tinted" : ""}`}
              >
                {item.label}
                <CaretDownIcon
                  aria-hidden
                  size={16}
                  className={`transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                />
              </button>
              {/* The panel spans the pill (the header is the positioned ancestor); the top padding bridges the hover gap. */}
              <div
                id={panelId}
                inert={!open}
                data-open={open}
                className="absolute inset-x-0 top-full z-(--z-overlay) pt-2 transition-[opacity,translate,visibility] duration-200 ease-standard data-[open=false]:invisible data-[open=false]:-translate-y-4 data-[open=false]:opacity-0 motion-reduce:transition-none"
              >
                <MegaPanel group={item} current={current} onNavigate={closeAll} />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="col-start-3 flex items-center gap-2 justify-self-end">
        {/* Wrapper controls visibility; the button's own inline-flex would override `hidden`. */}
        <span className="hidden sm:block">
          <Link href={joinUrl} className={buttonClasses("primary", "default", "whitespace-nowrap")} onClick={closeAll}>
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
      </div>

      <div
        id={`${baseId}-mobile`}
        hidden={!mobileOpen}
        className="absolute inset-x-0 top-full z-(--z-overlay) mt-3 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-card border border-border-decoration bg-surface p-4 shadow-raised lg:hidden"
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

      {/* The page softens behind an open mega menu, as the reference does. Decorative, and clicks pass through to close it. */}
      {mounted &&
        createPortal(
          <div
            aria-hidden
            data-open={Boolean(openGroup)}
            className="pointer-events-none fixed inset-0 z-[calc(var(--z-header)-1)] hidden bg-scrim/10 backdrop-blur-sm transition-opacity duration-200 ease-standard data-[open=false]:opacity-0 motion-reduce:transition-none lg:block"
          />,
          document.body,
        )}
    </nav>
  );
}

/** One mega menu: photo card or icon rows on the left, link columns on the right, the faint footer. */
function MegaPanel({ group, current, onNavigate }: { group: NavGroup; current: (href: string) => "page" | undefined; onNavigate: () => void }) {
  // With a photo card, `links` lead the columns; with icon rows they are the rows, so only `columns` remain.
  const columnList = [...(group.highlights ? [] : [{ label: group.columnLabel ?? group.label, links: group.links }]), ...(group.columns ?? [])];
  const columns = (
    <div className={`grid gap-8 ${columnList.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {columnList.map((column) => (
        <LinkColumn key={column.label} label={column.label} links={column.links} current={current} onNavigate={onNavigate} />
      ))}
    </div>
  );
  const footer = (
    <p className="flex flex-wrap justify-between gap-x-6 gap-y-1 text-caption text-text-secondary">
      <span>{menuFooter.left}</span>
      <a href={menuFooter.right.href} className="text-text-secondary">
        {menuFooter.right.label}
      </a>
    </p>
  );
  return (
    <div className="rounded-panel border border-border-decoration bg-surface p-4 shadow-raised lg:p-6">
      {group.feature ? (
        <div className={`grid gap-8 ${group.feature.portrait ? "lg:grid-cols-[2fr_3fr]" : "lg:grid-cols-2"}`}>
          <FeatureCard feature={group.feature} onNavigate={onNavigate} />
          <div className="flex flex-col justify-between gap-12">
            {columns}
            {footer}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <ul className="flex flex-col gap-1">
              {group.highlights?.map((link) => {
                const Icon = icons[link.icon];
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={current(link.href)}
                      onClick={onNavigate}
                      className="flex items-center gap-4 rounded-card p-3 text-ink no-underline transition-colors duration-150 hover:bg-surface-tinted aria-[current=page]:bg-surface-tinted"
                    >
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-card bg-accent-soft text-ink">
                        <Icon aria-hidden size={24} />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-semibold">{link.label}</span>
                        {link.description && <span className="text-caption text-text-secondary">{link.description}</span>}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {columns}
          </div>
          {footer}
        </div>
      )}
    </div>
  );
}

function LinkColumn({ label, links, current, onNavigate }: { label: string; links: NavLink[]; current: (href: string) => "page" | undefined; onNavigate: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-caption font-semibold tracking-wide text-text-secondary uppercase">{label}</p>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            {isExternalHref(link.href) ? (
              <a href={link.href} onClick={onNavigate} className={`${panelLinkClasses} break-words`}>
                {link.label}
                {link.href.startsWith("https://") && <ArrowUpRightIcon aria-hidden size={14} />}
              </a>
            ) : (
              <Link href={link.href} aria-current={current(link.href)} onClick={onNavigate} className={`${panelLinkClasses} aria-[current=page]:underline`}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The reference's promo card, in the footer tile's clothes: photo, serif caption, outline pill. */
function FeatureCard({ feature, onNavigate }: { feature: NavFeature; onNavigate: () => void }) {
  const photo = photos[feature.photo];
  return (
    <Link
      href={feature.action.href}
      onClick={onNavigate}
      className={`group relative flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-card no-underline ring-1 ring-black-950/10 ring-inset ${feature.portrait ? "lg:min-h-[32rem]" : "lg:min-h-[22rem]"}`}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 64rem) 40vw, 100vw" className={`object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none ${photo.position}`} />
      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-scrim)_0%,color-mix(in_srgb,var(--color-scrim)_70%,transparent)_30%,transparent_60%)]" />
      <span className="relative flex flex-wrap items-end justify-between gap-4 p-6">
        <span className="max-w-[14ch] font-heading text-h3 italic text-on-photo">{feature.caption}</span>
        <span className={buttonClasses("inverse-outline")}>{feature.action.label}</span>
      </span>
    </Link>
  );
}
