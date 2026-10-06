import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/BlogArticlePage";
import { findBlogPost, listBlogPosts } from "@/content/blog/articles";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return listBlogPosts("en").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost("en", slug);
  if (!post) return {};

  return pageMetadata({
    locale: "en",
    path: `/en/blog/${post.slug}/`,
    translatedPath: `/blog/${post.translatedSlug}/`,
    title: post.title,
    description: post.description,
    kind: "article",
  });
}

export default async function BlogArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  const post = findBlogPost("en", slug);
  if (!post) notFound();
  return <BlogArticlePage locale="en" post={post} />;
}
