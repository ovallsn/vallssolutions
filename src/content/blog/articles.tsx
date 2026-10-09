import type { MDXContent } from "mdx/types";
import {
  BLOG_ARTICLES,
  findBlogArticle,
  listBlogArticles,
  type Locale,
} from "@/content/blog/catalog";
import WyomingEs from "@/content/blog/articles/es/llc-wyoming.mdx";
import WyomingVsDelawareEs from "@/content/blog/articles/es/wyoming-o-delaware-llc.mdx";
import UsLlcEs from "@/content/blog/articles/es/llc-en-estados-unidos.mdx";
import TaxesEs from "@/content/blog/articles/es/llc-impuestos.mdx";
import UsVisaEs from "@/content/blog/articles/es/llc-visado-estados-unidos.mdx";
import ThailandVisaEs from "@/content/blog/articles/es/empresa-y-visados-tailandia.mdx";
import WyomingEn from "@/content/blog/articles/en/wyoming-llc.mdx";
import WyomingVsDelawareEn from "@/content/blog/articles/en/wyoming-vs-delaware-llc.mdx";
import UsLlcEn from "@/content/blog/articles/en/us-llc.mdx";
import TaxesEn from "@/content/blog/articles/en/llc-taxes.mdx";
import UsVisaEn from "@/content/blog/articles/en/llc-us-visa.mdx";
import ThailandVisaEn from "@/content/blog/articles/en/business-owner-thailand-visa.mdx";
import EinEs from "@/content/blog/articles/es/ein-o-itin.mdx";
import EinEn from "@/content/blog/articles/en/ein-vs-itin.mdx";
import NeedLlcEs from "@/content/blog/articles/es/necesito-una-llc.mdx";
import NeedLlcEn from "@/content/blog/articles/en/do-i-need-an-llc.mdx";

import PracticalGuide0EN from "@/content/blog/articles/en/choosing-llc-formation-service.mdx";
import PracticalGuide0ES from "@/content/blog/articles/es/elegir-servicio-creacion-llc.mdx";
import PracticalGuide1EN from "@/content/blog/articles/en/business-bank-account-llc.mdx";
import PracticalGuide1ES from "@/content/blog/articles/es/cuenta-bancaria-llc.mdx";
import PracticalGuide2EN from "@/content/blog/articles/en/wyoming-llc-annual-renewal.mdx";
import PracticalGuide2ES from "@/content/blog/articles/es/renovacion-anual-llc-wyoming.mdx";

export type BlogPost = (typeof BLOG_ARTICLES)[number] & { Content: MDXContent };

const contentByKey: Record<string, MDXContent> = {
  "en/choosing-llc-formation-service": PracticalGuide0EN,
  "es/elegir-servicio-creacion-llc": PracticalGuide0ES,
  "en/business-bank-account-llc": PracticalGuide1EN,
  "es/cuenta-bancaria-llc": PracticalGuide1ES,
  "en/wyoming-llc-annual-renewal": PracticalGuide2EN,
  "es/renovacion-anual-llc-wyoming": PracticalGuide2ES,
  "es/ein-o-itin": EinEs,
  "en/ein-vs-itin": EinEn,
  "es/necesito-una-llc": NeedLlcEs,
  "en/do-i-need-an-llc": NeedLlcEn,
  "es/llc-wyoming": WyomingEs,
  "es/wyoming-o-delaware-llc": WyomingVsDelawareEs,
  "es/llc-para-no-residentes": UsLlcEs,
  "es/llc-impuestos": TaxesEs,
  "es/llc-visado-estados-unidos": UsVisaEs,
  "es/empresa-y-visados-tailandia": ThailandVisaEs,
  "en/wyoming-llc": WyomingEn,
  "en/wyoming-vs-delaware-llc": WyomingVsDelawareEn,
  "en/llc-for-non-us-residents": UsLlcEn,
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

export function findBlogPost(
  locale: Locale,
  slug: string,
): BlogPost | undefined {
  const article = findBlogArticle(locale, slug);
  if (!article) return undefined;
  return {
    ...article,
    Content: contentByKey[`${article.locale}/${article.slug}`],
  };
}
