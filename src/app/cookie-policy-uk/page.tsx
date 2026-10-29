import type { Metadata } from "next";
import { PolicyArticle } from "@/components/content/PolicyArticle";
import { cookiePolicy } from "@/content/policies";

export const metadata: Metadata = {
  title: cookiePolicy.title,
  description: cookiePolicy.description,
  alternates: { canonical: "/cookie-policy-uk/" },
};

/** The cookie policy, written for what this site does; keeps the live site's URL. */
export default function CookiePolicyPage() {
  return <PolicyArticle policy={cookiePolicy} prefix="cookie" current="/cookie-policy-uk/" />;
}
