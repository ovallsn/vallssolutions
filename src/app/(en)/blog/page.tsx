import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/BlogIndexPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/blog/",
  translatedPath: "/es/blog/",
  title: "U.S. LLC Guides: Wyoming, EIN, Taxes & Formation",
  description: "Practical, source-backed guides to U.S. LLC formation, Wyoming requirements, EIN applications, tax classification and business operations.",
});

export default function BlogPage() {
  return <BlogIndexPage locale="en" />;
}
