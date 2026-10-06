import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/BlogArticlePage";
import { findBlogPost, listBlogPosts } from "@/content/blog/articles";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return listBlogPosts("es").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost("es", slug);
  if (!post) return {};

  return pageMetadata({
    locale: "es",
    path: `/blog/${post.slug}/`,
    translatedPath: `/en/blog/${post.translatedSlug}/`,
    title: post.title,
    description: post.description,
    kind: "article",
  });
}

export default async function BlogArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  const post = findBlogPost("es", slug);
  if (!post) notFound();
  return <BlogArticlePage locale="es" post={post} />;
}
