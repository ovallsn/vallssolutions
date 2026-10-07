import { BLOG_ARTICLES } from "../src/content/blog/catalog.ts";
import { ROUTES, blogPath } from "../src/lib/routes.ts";

// GitHub Pages cannot serve custom HTTP 301/308 rules. These aliases are
// exported as immediate HTML redirects with a canonical to the final page.
export function legacyRoutes() {
  const aliases = new Map([["/en/", "/"], ["/contacto/", ROUTES.contact.es]]);
  for (const [key, paths] of Object.entries(ROUTES)) {
    if (key !== "home") aliases.set(`/en/${key === "formation" ? "llc-formation" : key}/`, paths.en);
  }
  for (const article of BLOG_ARTICLES) {
    const oldPath = `${article.locale === "en" ? "/en" : ""}/blog/${article.slug}/`;
    aliases.set(oldPath, blogPath(article.locale, article.slug));
  }
  aliases.set("/en/blog/us-llc/", "/blog/llc-for-non-us-residents/");
  aliases.set("/blog/us-llc/", "/blog/llc-for-non-us-residents/");
  aliases.set("/blog/llc-en-estados-unidos/", "/es/blog/llc-para-no-residentes/");
  aliases.set("/es/blog/llc-en-estados-unidos/", "/es/blog/llc-para-no-residentes/");
  // Historical index.html bookmarks use the same destination, in one hop.
  for (const [from, to] of [...aliases]) aliases.set(`${from}index.html`, to);
  aliases.set("/es/llc-formation/", ROUTES.formation.es);
  aliases.set("/es/pricing/", ROUTES.pricing.es);
  aliases.set("/es/about/", ROUTES.about.es);
  return aliases;
}
