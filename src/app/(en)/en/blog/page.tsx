import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/BlogIndexPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/en/blog/",
  translatedPath: "/blog/",
  title: "U.S. LLC guides: Wyoming, taxes and company formation",
  description: "Practical guides to Wyoming LLC formation, U.S. business taxes, compliance and starting a company as a U.S. or international founder.",
});

export default function BlogPage() {
  return <BlogIndexPage locale="en" />;
}
