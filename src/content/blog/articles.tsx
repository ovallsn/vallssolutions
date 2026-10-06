import type { MDXContent } from "mdx/types";
import { BLOG_ARTICLES, findBlogArticle, listBlogArticles, type Locale } from "@/content/blog/catalog";
import WyomingEs from "@/content/blog/articles/es/llc-wyoming.mdx";
import UsLlcEs from "@/content/blog/articles/es/llc-en-estados-unidos.mdx";
import TaxesEs from "@/content/blog/articles/es/llc-impuestos.mdx";
import UsVisaEs from "@/content/blog/articles/es/llc-visado-estados-unidos.mdx";
import ThailandVisaEs from "@/content/blog/articles/es/empresa-y-visados-tailandia.mdx";
import WyomingEn from "@/content/blog/articles/en/wyoming-llc.mdx";
import UsLlcEn from "@/content/blog/articles/en/us-llc.mdx";
import TaxesEn from "@/content/blog/articles/en/llc-taxes.mdx";
import UsVisaEn from "@/content/blog/articles/en/llc-us-visa.mdx";
import ThailandVisaEn from "@/content/blog/articles/en/business-owner-thailand-visa.mdx";
import EinEs from "@/content/blog/articles/es/ein-o-itin.mdx";
import EinEn from "@/content/blog/articles/en/ein-vs-itin.mdx";

export type BlogPost = (typeof BLOG_ARTICLES)[number] & { Content: MDXContent };

const contentByKey: Record<string, MDXContent> = {
  "es/ein-o-itin": EinEs,
  "en/ein-vs-itin": EinEn,
  "es/llc-wyoming": WyomingEs,
  "es/llc-en-estados-unidos": UsLlcEs,
  "es/llc-impuestos": TaxesEs,
  "es/llc-visado-estados-unidos": UsVisaEs,
  "es/empresa-y-visados-tailandia": ThailandVisaEs,
  "en/wyoming-llc": WyomingEn,
  "en/us-llc": UsLlcEn,
  "en/llc-taxes": TaxesEn,
  "en/llc-us-visa": UsVisaEn,
  "en/business-owner-thailand-visa": ThailandVisaEn,
};

export function listBlogPosts(locale: Locale): BlogPost[] {
  return listBlogArticles(locale).map((article) => ({
    ...article,
    Content: contentByKey[`${article.locale}/${article.slug}`],
  }));
}

export function findBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  const article = findBlogArticle(locale, slug);
  if (!article) return undefined;
  return { ...article, Content: contentByKey[`${article.locale}/${article.slug}`] };
}
