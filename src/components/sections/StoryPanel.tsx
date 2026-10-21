import Image from "next/image";
import { SectionHeading } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
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

/** Dark berry panel inside the page frame: the founding story, then a row of community photographs. */
export function StoryPanel() {
  return (
    <section aria-labelledby="story-heading" className="frame-x">
      <div className="surface-dark rounded-panel">
        <div className="container-page section-y">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionHeading
                id="story-heading"
                tag={story.eyebrow}
                heading={story.heading}
                intro={story.body}
                action={
                  <ButtonLink href={story.link.href} variant="inverse" arrow>
                    {story.link.label}
                  </ButtonLink>
                }
              />
              <p className="mt-12 border-l-2 border-accent pl-6 font-heading text-h4 italic">{story.pledge}</p>
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

          <h3 className="mx-auto mt-24 max-w-[24ch] text-center text-h2 text-balance">
            <Accent {...story.community} />
          </h3>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3 md:gap-6 lg:gap-8">
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
