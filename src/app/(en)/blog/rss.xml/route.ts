import { buildBlogRss } from "@/lib/blog-rss";

export const dynamic = "force-static";

export function GET(): Response {
  return new Response(buildBlogRss("en"), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
