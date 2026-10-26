"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRightIcon, CaretDownIcon, HandHeartIcon, HandshakeIcon, ListIcon, PlantIcon, UsersThreeIcon } from "@phosphor-icons/react";
import { buttonClasses } from "@/components/ui/Button";
import { founderPortrait, isExternalHref, isGroup, menuFooter, menuPromo, type NavFeature, type NavGroup, type NavItem, type NavLink } from "@/content/navigation";
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
/** Rows of the phone and tablet menu: full width, 48px tall, the caret at the far end. */
const rowClasses =
  "flex min-h-12 w-full items-center justify-between gap-3 rounded-pill px-3 text-left font-semibold text-ink no-underline transition-colors duration-150 hover:bg-surface-tinted hover:text-ink aria-[current=page]:bg-surface-tinted";

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
/** The desktop menu takes over from `lg`; the phone menu closes itself if the viewport grows past it. */
const DESKTOP = "(min-width: 64rem)";

/** True once on the client, so the backdrop can portal to the body without a state flip in an effect. */
const noop = () => () => {};
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

type Current = (href: string) => "page" | undefined;
const slug = (label: string) => label.replace(/\W+/g, "-");
/** The link columns a group shows: its own links lead unless icon rows already carry them, then any extra columns. */
const columnsOf = (group: NavGroup) => [...(group.highlights ? [] : [{ label: group.columnLabel ?? group.label, links: group.links }]), ...(group.columns ?? [])];

/**
 * Header navigation, centred in the pill. From `lg`, groups open as mega menus the full width of
 * the pill, on hover (mouse) and on click (touch, keyboard); the page behind softens while one is open.
 * Below `lg` the bar is the reference's: a circle menu button on the left (inverted while open), the
 * logo in the centre and the join pill on the right. The menu is a card under the bar that fades in
 * over the dimmed, blurred page: every group is a single-open accordion row holding the same content
 * as its mega menu, then the promo card and the footer line. Escape, the backdrop or a link closes it.
 */
export function NavMenu({
  items,
  joinUrl,
  joinLabel,
  joinShortLabel,
  brand,
}: {
  items: NavItem[];
  joinUrl: string;
  joinLabel: string;
  /** The join pill's label on phones, where the full one would crowd the bar. */
  joinShortLabel: string;
  /** The logo link, placed by the menu so it sits in the centre of the bar below `lg` and at the start from `lg`. */
  brand: ReactNode;
}) {
  const pathname = usePathname();
  const baseId = useId();
  const mobileId = `${baseId}-mobile`;
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const mounted = useMounted();

  useEffect(() => {
    if (!openGroup && !mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const trigger = openGroup ? triggerRefs.current.get(openGroup) : triggerRefs.current.get("mobile");
      setOpenGroup(null);
      setMobileOpen(false);
      setOpenSection(null);
      trigger?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenGroup(null);
        setMobileOpen(false);
        setOpenSection(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openGroup, mobileOpen]);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileOpen(false);
        setOpenSection(null);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const closeAll = () => {
    clearTimer();
    setOpenGroup(null);
    setMobileOpen(false);
    setOpenSection(null);
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
  const current: Current = (href) => (pathname === href ? "page" : undefined);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="contents"
      onBlur={(event) => {
        if (!navRef.current?.contains(event.relatedTarget as Node | null)) setOpenGroup(null);
      }}
    >
      {/* The reference's circle menu button: a tinted circle that inverts while the menu is open. */}
      <button
        type="button"
        ref={(node) => {
          if (node) triggerRefs.current.set("mobile", node);
        }}
        aria-expanded={mobileOpen}
        aria-controls={mobileId}
        onClick={() => {
          setMobileOpen((value) => !value);
          setOpenSection(null);
        }}
        className={`col-start-1 row-start-1 inline-flex size-12 cursor-pointer items-center justify-center justify-self-start rounded-pill transition-colors duration-200 ease-standard active:scale-[0.96] motion-reduce:transition-none lg:hidden ${
          mobileOpen ? "bg-ink text-on-photo" : "bg-surface-tinted text-ink hover:bg-accent-soft"
        }`}
      >
        <ListIcon aria-hidden size={24} />
        <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
      </button>

      <div className="col-start-2 row-start-1 justify-self-center lg:col-start-1 lg:ml-3 lg:justify-self-start">{brand}</div>

      <ul className="col-start-2 row-start-1 hidden items-center gap-1 lg:flex">
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
          const panelId = `${baseId}-${slug(item.label)}`;
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

      <div className="col-start-3 row-start-1 justify-self-end">
        <Link href={joinUrl} className={buttonClasses("primary", "default", "whitespace-nowrap")} onClick={closeAll}>
          <span className="sm:hidden">{joinShortLabel}</span>
          <span className="hidden sm:inline">{joinLabel}</span>
        </Link>
      </div>

      {/* Phone and tablet menu: a card under the bar that fades in, scrolls inside itself, and locks the page (globals.css). */}
      <div
        id={mobileId}
        data-mobile-menu={mobileOpen ? "open" : "closed"}
        inert={!mobileOpen}
        className="absolute inset-x-0 top-full z-(--z-overlay) mt-3 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-card border border-border-decoration bg-surface p-4 shadow-raised transition-[opacity,translate,visibility] duration-300 ease-standard data-[mobile-menu=closed]:invisible data-[mobile-menu=closed]:-translate-y-2 data-[mobile-menu=closed]:opacity-0 motion-reduce:transition-none md:max-h-[calc(100dvh-8rem)] md:rounded-panel md:p-6 lg:hidden"
      >
        <ul className="flex flex-col gap-1">
          {items.map((item) =>
            isGroup(item) ? (
              <MobileGroup
                key={item.label}
                group={item}
                id={`${mobileId}-${slug(item.label)}`}
                open={openSection === item.label}
                onToggle={() => setOpenSection(openSection === item.label ? null : item.label)}
                current={current}
                onNavigate={closeAll}
              />
            ) : (
              <li key={item.label}>
                {isExternalHref(item.href) ? (
                  <a href={item.href} onClick={closeAll} className={rowClasses}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} aria-current={current(item.href)} onClick={closeAll} className={rowClasses}>
                    {item.label}
                  </Link>
                )}
              </li>
            ),
          )}
        </ul>
        <FeatureCard feature={menuPromo} onNavigate={closeAll} compact className="mt-4" />
        <MenuFooter className="mt-4" />
      </div>

      {/* The page dims and softens behind an open menu, as the reference does: heavier under the phone menu, where a tap on it closes the menu; lighter and click-through under a mega menu. */}
      {mounted &&
        createPortal(
          <div
            aria-hidden
            data-open={Boolean(openGroup) || mobileOpen}
            className="fixed inset-0 z-[calc(var(--z-header)-1)] bg-scrim/30 backdrop-blur-md transition-opacity duration-300 ease-standard data-[open=false]:pointer-events-none data-[open=false]:opacity-0 motion-reduce:transition-none lg:pointer-events-none lg:bg-scrim/10 lg:backdrop-blur-sm lg:duration-200"
          />,
          document.body,
        )}
    </nav>
  );
}

/** One accordion row of the phone menu: the group's name with a caret, opening onto its mega menu content. */
function MobileGroup({
  group,
  id,
  open,
  onToggle,
  current,
  onNavigate,
}: {
  group: NavGroup;
  id: string;
  open: boolean;
  onToggle: () => void;
  current: Current;
  onNavigate: () => void;
}) {
  const columnList = columnsOf(group);
  return (
    <li>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className={`${rowClasses} cursor-pointer ${open ? "bg-surface-tinted" : ""}`}>
        {group.label}
        <CaretDownIcon aria-hidden size={16} className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Grid rows animate the height; the closed content is inert so nothing inside can take focus. */}
      <div id={id} inert={!open} className={`grid transition-[grid-template-rows] duration-200 ease-standard motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="flex flex-col gap-6 px-3 pt-3 pb-5">
            {group.highlights && <HighlightRows links={group.highlights} current={current} onNavigate={onNavigate} />}
            <div className={`grid gap-6 ${columnList.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {columnList.map((column) => (
                <LinkColumn key={column.label} label={column.label} links={column.links} current={current} onNavigate={onNavigate} />
              ))}
            </div>
            {group.feature && <FeatureCard feature={group.feature} onNavigate={onNavigate} compact />}
          </div>
        </div>
      </div>
    </li>
  );
}

/** One mega menu: photo card or icon rows on the left, link columns on the right, the faint footer. */
function MegaPanel({ group, current, onNavigate }: { group: NavGroup; current: Current; onNavigate: () => void }) {
  const columnList = columnsOf(group);
  const columns = (
    <div className={`grid gap-8 ${columnList.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {columnList.map((column) => (
        <LinkColumn key={column.label} label={column.label} links={column.links} current={current} onNavigate={onNavigate} />
      ))}
    </div>
  );
  return (
    <div className="rounded-panel border border-border-decoration bg-surface p-4 shadow-raised lg:p-6">
      {group.feature ? (
        <div className={`grid gap-8 ${group.feature.portrait ? "lg:grid-cols-[2fr_3fr]" : "lg:grid-cols-2"}`}>
          <FeatureCard feature={group.feature} onNavigate={onNavigate} />
          <div className="flex flex-col justify-between gap-12">
            {columns}
            <MenuFooter />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          <div className="grid gap-8 lg:grid-cols-2">
            {group.highlights && <HighlightRows links={group.highlights} current={current} onNavigate={onNavigate} />}
            {columns}
          </div>
          <MenuFooter />
        </div>
      )}
    </div>
  );
}

/** The icon rows (How We Help): a marigold chip, the area's name and a one-line description. */
function HighlightRows({ links, current, onNavigate }: { links: NonNullable<NavGroup["highlights"]>; current: Current; onNavigate: () => void }) {
  return (
    <ul className="flex flex-col gap-1">
      {links.map((link) => {
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
  );
}

/** The faint line at the foot of every menu: the name and tagline, the inbox. */
function MenuFooter({ className = "" }: { className?: string }) {
  return (
    <p className={`flex flex-wrap justify-between gap-x-6 gap-y-1 text-caption text-text-secondary ${className}`}>
      <span>{menuFooter.left}</span>
      <a href={menuFooter.right.href} className="text-text-secondary">
        {menuFooter.right.label}
      </a>
    </p>
  );
}

function LinkColumn({ label, links, current, onNavigate }: { label: string; links: NavLink[]; current: Current; onNavigate: () => void }) {
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

/** The reference's promo card, in the footer tile's clothes: photo, serif caption, outline pill. `compact` is the phone menu's size. */
function FeatureCard({ feature, onNavigate, compact = false, className = "" }: { feature: NavFeature; onNavigate: () => void; compact?: boolean; className?: string }) {
  const photo = photos[feature.photo];
  // A portrait photo keeps a tall, narrow frame in the compact card too, so the face is never cropped to a strip.
  const height = compact
    ? `min-h-[14rem] ${feature.portrait ? "sm:max-w-[24rem] sm:min-h-[20rem]" : ""}`
    : `min-h-[18rem] ${feature.portrait ? "lg:min-h-[32rem]" : "lg:min-h-[22rem]"}`;
  return (
    <Link
      href={feature.action.href}
      onClick={onNavigate}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-card no-underline ring-1 ring-black-950/10 ring-inset ${height} ${className}`}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 64rem) 40vw, 100vw" className={`object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none ${photo.position}`} />
      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-scrim)_0%,color-mix(in_srgb,var(--color-scrim)_70%,transparent)_30%,transparent_60%)]" />
      <span className={`relative flex flex-wrap items-end justify-between gap-4 ${compact ? "p-5" : "p-6"}`}>
        <span className={`max-w-[14ch] font-heading italic text-on-photo ${compact ? "text-h4" : "text-h3"}`}>{feature.caption}</span>
        <span className={buttonClasses("inverse-outline")}>{feature.action.label}</span>
      </span>
    </Link>
  );
}
