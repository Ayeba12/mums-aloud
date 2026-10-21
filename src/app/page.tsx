import { Statement } from "@/components/layout/Section";
import { CoreAreas } from "@/components/sections/CoreAreas";
import { Hero } from "@/components/sections/Hero";
import { HomePosts } from "@/components/sections/HomePosts";
import { Impact, Partners } from "@/components/sections/ImpactAndPartners";
import { ClosingInvite, NewsletterInvite } from "@/components/sections/Invitations";
import { MamasEscapeFeature } from "@/components/sections/MamasEscapeFeature";
import { StoryPanel } from "@/components/sections/StoryPanel";
import { statement } from "@/content/home";

/**
 * Homepage, following the client's Website Restructure Brief v2 (section 3), laid out
 * after the People Work Home C reference: hero, centred statement, four cards, list + portrait,
 * dark panel, stat cards on a gradient, partners, editorial sections, split panel, closing.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Statement id="statement-heading" {...statement} />
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
        tone="card"
        heading={{ lead: "Practical help,", accent: "mum to mum" }}
        intro="Advice on pregnancy, babies, toddlers and growing children, from the Mums Aloud blog."
        linkLabel="View all articles"
      />
      <NewsletterInvite />
      <ClosingInvite />
    </main>
  );
}
