import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/BlogIndexPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/blog/",
  translatedPath: "/en/blog/",
  title: "Blog sobre LLC en Wyoming, impuestos y empresas en EE. UU.",
  description: "Guías claras sobre cómo crear una LLC en Wyoming, obligaciones fiscales, formación de empresas estadounidenses y servicios para emprendedores.",
});

export default function BlogPage() {
  return <BlogIndexPage locale="es" />;
}
