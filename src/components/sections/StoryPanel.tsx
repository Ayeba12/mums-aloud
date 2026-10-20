import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/layout/Section";
import { buttonClasses } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { story } from "@/content/home";
import circle from "@/assets/photos/women-community-circle.jpg";
import embrace from "@/assets/photos/mother-daughter-embrace.jpg";
import friends from "@/assets/photos/two-friends-smiling.jpg";
import goldenHour from "@/assets/photos/hero-mother-baby-golden-hour.jpg";

const community = [
  { src: embrace, alt: "A mother and daughter embracing, foreheads touching", position: "object-[50%_30%]" },
  { src: goldenHour, alt: "Two smiling women in golden evening light, one fixing the other's headwrap", position: "object-[50%_25%]" },
  { src: friends, alt: "Two friends smiling side by side", position: "object-[50%_30%]" },
];

/** Dark berry panel: the founding story, then a row of community photographs. */
export function StoryPanel() {
  return (
    <section aria-labelledby="story-heading" className="px-2 lg:px-4">
      <div className="surface-dark rounded-panel">
        <div className="container-page section-y">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Eyebrow>{story.eyebrow}</Eyebrow>
              <h2 id="story-heading" className="mt-2 text-h2 tracking-tight">
                <Accent {...story.heading} />
              </h2>
              <p className="mt-4 text-lead">{story.body}</p>
              <p className="mt-6 font-heading text-h4 italic">{story.pledge}</p>
              <Link href={story.link.href} className={buttonClasses("inverse-outline", "default", "mt-8")}>
                {story.link.label}
              </Link>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Image
                src={circle}
                alt="Three women in bright African-print clothing chatting over tea"
                placeholder="blur"
                sizes="(min-width: 64rem) 50vw, 100vw"
                className="aspect-[3/2] w-full rounded-card object-cover"
              />
            </div>
          </div>

          <p className="mx-auto mt-24 max-w-[24ch] text-center font-heading text-h2 tracking-tight text-balance">
            <Accent {...story.community} />
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3 lg:gap-8">
            {community.map((photo) => (
              <li key={photo.alt}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  placeholder="blur"
                  sizes="(min-width: 40rem) 33vw, 100vw"
                  className={`aspect-[3/4] w-full rounded-card object-cover ${photo.position}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
