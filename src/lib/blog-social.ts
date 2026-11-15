import type { Locale } from "@/lib/site";

export function blogSocialImagePath(locale: Locale, slug: string): string {
  return `/assets/media/blog/${locale}/${slug}.png`;
}
