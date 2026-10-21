"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export type HeroPhoto = { src: StaticImageData; position?: string };

const HOLD = 5; // seconds each photo stays
const FADE = 1.2; // seconds per crossfade

/**
 * Decorative crossfade behind the hero copy. Opacity only, so it never fights the scrim.
 * Under prefers-reduced-motion the first photo stays and nothing moves; the loop also
 * pauses while the tab is hidden.
 */
export function HeroSlideshow({ photos }: { photos: HeroPhoto[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
      if (slides.length < 2) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(slides.slice(1), { autoAlpha: 0 });
        const tl = gsap.timeline({ repeat: -1 });
        slides.forEach((slide, index) => {
          const next = slides[(index + 1) % slides.length];
          const at = (index + 1) * HOLD;
          tl.to(next, { autoAlpha: 1, duration: FADE, ease: "power1.inOut" }, at);
          tl.to(slide, { autoAlpha: 0, duration: FADE, ease: "power1.inOut" }, at);
        });
        const onVisibility = () => (document.hidden ? tl.pause() : tl.play());
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="absolute inset-0">
      {photos.map((photo, index) => (
        <Image
          key={index}
          data-slide
          src={photo.src}
          alt=""
          fill
          priority={index === 0}
          placeholder="blur"
          sizes="100vw"
          className={`object-cover ${photo.position ?? "object-center"}`}
        />
      ))}
    </div>
  );
}
