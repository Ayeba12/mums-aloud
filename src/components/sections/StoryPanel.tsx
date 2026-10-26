import Image from "next/image";
import { SectionHeading, Tag } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";
import { VoicesSlider, type Portrait } from "./VoicesSlider";
import { story } from "@/content/home";
import storyPhoto from "@/assets/photos/women-community-circle.jpg";
import embrace from "@/assets/photos/mother-daughter-embrace.jpg";
import goldenHour from "@/assets/photos/hero-mother-baby-golden-hour.jpg";
import friends from "@/assets/photos/two-friends-smiling.jpg";
import kissing from "@/assets/photos/mother-kissing-baby.jpg";
import park from "@/assets/photos/mother-daughter-park.jpg";
import smiling from "@/assets/photos/mother-baby-smiling.jpg";

/**
 * Portraits for the voices slider. Stock photography: never captioned as members.
 * When consented quotes arrive, add `name` and `quote` here and render them on the card.
 */
const portraits: Portrait[] = [
  { src: embrace, alt: "A mother and daughter embracing, foreheads touching", position: "object-[50%_30%]" },
  { src: goldenHour, alt: "Two smiling women in golden evening light, one fixing the other's headwrap", position: "object-[50%_25%]" },
  { src: friends, alt: "Two friends smiling side by side", position: "object-[55%_30%]" },
  { src: kissing, alt: "A mother kissing her smiling baby on the cheek", position: "object-[50%_35%]" },
  { src: park, alt: "A mother laughing as she lifts her young daughter in a park", position: "object-[50%_30%]" },
  { src: smiling, alt: "A smiling mother holding her baby at home", position: "object-[65%_40%]" },
];

/**
 * The reference's story frame: one dark rounded panel holding a photo that fades into the
 * panel colour, with the story copy over the fade, then the voices section and its slider.
 */
export function StoryPanel() {
  return (
    <div className="frame-x">
      <div className="surface-dark overflow-hidden rounded-panel">
        <section aria-labelledby="story-heading" className="relative flex min-h-[34rem] flex-col justify-end md:min-h-[40rem] lg:h-[45rem]">
          <Image src={storyPhoto} alt="" fill placeholder="blur" sizes="100vw" className="object-cover object-[50%_40%]" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-berry-lipstick-700)_0%,var(--color-berry-lipstick-700)_16%,color-mix(in_srgb,var(--color-scrim)_90%,transparent)_40%,color-mix(in_srgb,var(--color-scrim)_86%,transparent)_66%,color-mix(in_srgb,var(--color-scrim)_30%,transparent)_86%,transparent_100%)]"
          />
          <div className="container-page relative pt-40 pb-16 lg:pb-24">
            <Tag className="bg-scrim text-on-photo">{story.eyebrow}</Tag>
            <h2 id="story-heading" className="mt-2 max-w-[26ch] text-h2 text-on-photo">
              <Accent {...story.heading} />
            </h2>
            <p className="mt-4 max-w-[46ch] text-lead text-on-photo">{story.body}</p>
            <div className="mt-6">
              <ButtonLink href={story.link.href} variant="inverse-outline">
                {story.link.label}
              </ButtonLink>
            </div>
          </div>
        </section>

        <section aria-labelledby="voices-heading" className="pt-24 pb-20 lg:pt-32 lg:pb-24">
          <div className="container-page">
            <SectionHeading id="voices-heading" tag={story.voices.tag} heading={story.voices.heading} align="center" />
          </div>
          <div className="mt-12">
            <VoicesSlider portraits={portraits} label={story.voices.tag} />
          </div>
          <p className="container-page mt-8 text-center text-caption">{story.voices.note}</p>
        </section>
      </div>
    </div>
  );
}
