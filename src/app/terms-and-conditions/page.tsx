import type { Metadata } from "next";
import { PolicyArticle } from "@/components/content/PolicyArticle";
import { termsPage } from "@/content/policies";

export const metadata: Metadata = {
  title: termsPage.title,
  description: termsPage.description,
  alternates: { canonical: "/terms-and-conditions/" },
};

/** The website's terms and conditions (new on 30 October 2026; the old site had none). */
export default function TermsPage() {
  return <PolicyArticle policy={termsPage} prefix="terms" current="/terms-and-conditions/" />;
}
