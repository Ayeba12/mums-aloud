/**
 * The reference's running text line: one sentence repeated in the editorial italic, drifting
 * slowly across the page. Decorative: the sentence is read once by assistive technology,
 * the strip pauses on hover and stands still under reduced motion.
 */
export function TextMarquee({ text }: { text: string }) {
  const copies = Array.from({ length: 6 }, (_, index) => index);
  return (
    <section
      aria-label="Our pledge"
      className="group overflow-hidden py-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] lg:py-16"
    >
      <p className="sr-only">{text}</p>
      <div aria-hidden className="flex w-max animate-marquee gap-12 whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {copies.map((copy) => (
          <span key={copy} className="flex items-center gap-12 font-heading text-h1 italic text-action">
            {text}
            <span className="size-3 shrink-0 rounded-pill bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}
