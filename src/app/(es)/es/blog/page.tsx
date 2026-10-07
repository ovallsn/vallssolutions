import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/BlogIndexPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/blog/",
  translatedPath: "/blog/",
  title: "Guías sobre LLC, Wyoming, EIN e impuestos de EE. UU.",
  description: "Artículos prácticos sobre cómo crear una LLC en EE. UU., los requisitos de Wyoming, la solicitud del EIN y la clasificación fiscal empresarial.",
});

export default function BlogPage() {
  return <BlogIndexPage locale="es" />;
}
