import type { Metadata } from "next";
import { Libre_Caslon_Text, Urbanist } from "next/font/google";
import { ScrollReveals } from "@/components/motion/ScrollReveals";
import { CookieNotice } from "@/components/navigation/CookieNotice";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { NewsletterDialog } from "@/components/newsletter/NewsletterDialog";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const libreCaslon = Libre_Caslon_Text({
  variable: "--font-libre-caslon",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: siteConfig.name,
  },
  // The share image and icons are the files beside this layout: opengraph-image.png, twitter-image.png,
  // icon.png, apple-icon.png and favicon.ico (Next's file conventions add the tags).
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: anchors glide (globals.css), but Next turns smooth scrolling off while it changes page, so a new page opens at its top at once.
    <html lang="en-GB" data-scroll-behavior="smooth" className={`${urbanist.variable} ${libreCaslon.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-6 focus:py-3 focus:font-semibold"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <NewsletterDialog />
        <CookieNotice />
        <ScrollReveals />
      </body>
    </html>
  );
}
