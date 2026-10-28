import Image from "next/image";
import type { Partner } from "@/content/home";

/**
 * One partner tile: the organisation's logo at a shared height so a row reads evenly, with the
 * name as its alt text, or the name in type while no logo is held. Logos are static files in
 * `public/partners/` and skip image optimisation (SVG). `grid` tiles fill their cell (the homepage
 * strip). `marquee` slots have no fill: they keep a fixed size, so the drifting row never changes
 * width, and sit straight on the Partnership page's berry panel, where every logo is turned the
 * panel's light ink by CSS (the usual single-colour strip on a dark ground). A mark that cannot
 * be flattened that way, the NHS lozenge, brings its own `onDark` file with the letters cut out.
 */
export function PartnerTile({ partner, variant = "grid" }: { partner: Partner; variant?: "grid" | "marquee" }) {
  const frame =
    variant === "marquee"
      ? "h-24 w-48 shrink-0 whitespace-nowrap text-ink md:h-28 md:w-60"
      : "min-h-24 rounded-card bg-surface-card text-ink md:min-h-28";
  const marquee = variant === "marquee";
  const src = marquee && partner.logo?.onDark ? partner.logo.onDark : partner.logo?.src;
  // brightness(0) flattens any colour to black, invert(95%) lifts it to the panel's black 50 ink; files drawn for dark grounds are shown as they are.
  const tone = marquee && !partner.logo?.onDark ? "brightness-0 invert-95" : "";
  return (
    <li className={`flex items-center justify-center px-6 py-6 text-center font-semibold ${frame}`}>
      {partner.logo && src ? (
        <Image
          src={src}
          alt={partner.name}
          width={partner.logo.width}
          height={partner.logo.height}
          unoptimized
          // A drifting row must never show an empty tile, so marquee logos load up front; grid tiles stay lazy.
          loading={marquee ? "eager" : undefined}
          className={`w-auto max-w-[9rem] object-contain md:max-w-[11rem] ${partner.logo.tall ? "h-14 md:h-16" : "h-10 md:h-12"} ${tone}`}
        />
      ) : (
        partner.name
      )}
    </li>
  );
}
