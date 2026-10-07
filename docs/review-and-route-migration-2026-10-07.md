# Public website review and route cleanup — 7 October 2026

## Scope and evidence

Publish the pending bilingual redesign and make the public site easier to navigate.
Reviewed current official formation/pricing pages from Bizee, Northwest, doola and
Tailor Brands using the web reader. The in-app browser failed to attach and Chrome
was unavailable, so no fresh rendered screenshots or visual accessibility claims
are made in this review. This is a content, navigation and SEO review, not a new
screenshot-based visual audit. No competitor assets or code were reused.

| Reference | Observed content pattern | Decision for Valls Solutions |
| --- | --- | --- |
| [Bizee](https://bizee.com/llc) | Package comparison, formation steps and extensive educational links | Put scope and price together; link guides to the relevant service |
| [Northwest](https://www.northwestregisteredagent.com/incorporation-service) | Formation plus business identity, human support, detailed inclusions and FAQ | Explain the included website, email, agent and address; expose About in navigation |
| [doola](https://www.doola.com/pricing/) | Recurring plans, feature comparisons, FAQ and an existing-client entry | Distinguish the initial package from renewal; configure the portal only after its actual URL is available |
| [Tailor Brands](https://www.tailorbrands.com/product-pricing) | Formation plans plus business setup services | State the confirmed bundle without adding unconfirmed services |

The existing forest green, terracotta and paper identity remains the visual direction.
The header now offers formation, pricing, process, guides and About without a
duplicate Services anchor. No rankings, traffic or competitor analytics were
available; observations concern public page content and information architecture.

## Canonical route structure

English is default and has unprefixed paths. Spanish is entirely under `/es/`:

| English | Spanish |
| --- | --- |
| `/` | `/es/` |
| `/llc-formation/` | `/es/crear-llc/` |
| `/pricing/` | `/es/precios/` |
| `/about/` | `/es/nosotros/` |
| `/contact/` | `/es/contacto/` |
| `/blog/` | `/es/blog/` |

The general benefits guide and international formation guide now have separate
search intent. International guide slugs are `llc-for-non-us-residents` and
`llc-para-no-residentes`; historic general-guide slugs map to these current pages.
Other established article slugs remain short, descriptive and localized.

All metadata, hreflang, sitemap entries, structured-data URLs, MDX links, navigation
and language switches use current URLs. Historic root Spanish service/archive URLs
now show the corresponding English service/archive, consistent with English default.
Old `/en/` paths and old Spanish article URLs redirect directly to current equivalents.
Unrelated unknown paths return 404 instead of an irrelevant homepage redirect.

GitHub Pages does not support custom 301/308 rules. Postbuild emits immediate HTML
refresh redirects with canonical links, noindex and a manual link, plus JavaScript
replacement preserving the query string and fragment. This hosting limitation is
documented; server redirects would be preferable if hosting later supports them.

Reference: [Google Search Central — site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## Release gate

Run the project tests, typecheck, production build and exported SEO audit. The audit
checks canonical pages, reciprocal translations, headings, JSON-LD syntax, social
assets, internal links and each legacy redirect target. CI performs the same SEO
audit before uploading the Pages artifact. Publish to main as explicitly authorized
by the owner; verify the workflow and public routes afterward.
