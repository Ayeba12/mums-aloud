import { CoreAreas } from "@/components/sections/CoreAreas";
import { Hero } from "@/components/sections/Hero";
import { HomePosts } from "@/components/sections/HomePosts";
import { Impact, Partners } from "@/components/sections/ImpactAndPartners";
import { ClosingInvite, NewsletterInvite } from "@/components/sections/Invitations";
import { MamasEscapeFeature } from "@/components/sections/MamasEscapeFeature";
import { StoryPanel } from "@/components/sections/StoryPanel";

/**
 * Homepage, following the client's Website Restructure Brief v2 (section 3),
 * laid out after the People Work reference. Surface rhythm: photo, olive, canvas,
 * sage, berry panel, canvas, tinted, canvas, sage, card panel, canvas.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <CoreAreas />
      <MamasEscapeFeature />
      <div className="section-y">
        <StoryPanel />
      </div>
      <Impact />
      <Partners />
      <HomePosts
        collection="storyLounge"
        heading={{ lead: "Stories from the", accent: "Story Lounge" }}
        intro="Real and imagined stories of motherhood, told by women who understand."
        linkLabel="View all stories"
      />
      <HomePosts
        collection="blog"
        tone="sage"
        heading={{ lead: "Practical help,", accent: "mum to mum" }}
        intro="Advice on pregnancy, babies, toddlers and growing children, from the Mums Aloud blog."
        linkLabel="View all articles"
      />
      <NewsletterInvite />
      <ClosingInvite />
    </main>
  );
}
