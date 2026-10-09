import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import type { Locale } from "@/lib/site";

export function AboutPage({ locale }: { locale: Locale }) {
  const english = locale === "en";

  return (
    <main id="contenido">
      <header className="section-shell page-hero">
        <p className="breadcrumbs"><Link href={english ? "/" : "/es/"}>{english ? "Home" : "Inicio"}</Link> / {english ? "About" : "Sobre nosotros"}</p>
        <p className="eyebrow"><span className="eyebrow-line" />{english ? "About Valls Solutions" : "Sobre Valls Solutions"}</p>
        <h1>{english ? "A clearer way to start your U.S. company." : "Una forma más clara de crear tu empresa en EE. UU."}</h1>
        <p>{english ? "Valls Solutions helps founders form and organize a Wyoming LLC, with direct support in English and Spanish." : "Valls Solutions ayuda a emprendedores a crear y organizar una LLC en Wyoming, con atención directa en español e inglés."}</p>
      </header>

      <section className="section-shell section-block about-story">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "Built around the real process" : "Pensado para el proceso real"}</p>
          <h2>{english ? "More than a filing form." : "Más que presentar un formulario."}</h2>
        </div>
        <div className="about-story-copy">
          <p>{english ? "Starting a company comes with a sequence of decisions and documents. Our role is to make the formation steps easier to follow, explain what is included and stay available while your Wyoming LLC is set up." : "Crear una empresa implica una serie de decisiones y documentos. Nuestro trabajo es hacer más comprensibles los pasos de formación, explicar qué está incluido y acompañarte mientras se crea tu LLC en Wyoming."}</p>
          <p>{english ? "The $699 package brings the state filing, EIN application handling, first-year Registered Agent and Wyoming mailing address, a company website and business email, and guidance for preparing a business bank application into one service." : "El paquete de $699 reúne en un mismo servicio la presentación estatal, la gestión del EIN, el primer año de Registered Agent y dirección postal de Wyoming, una página web y un correo empresarial, y orientación para preparar una solicitud bancaria."}</p>
          <ul className="about-points">
            <li><strong>{english ? "More than 100 LLCs formed" : "Más de 100 LLC constituidas"}</strong><span>{english ? "Practical experience with the formation process." : "Experiencia práctica con el proceso de formación."}</span></li>
            <li><strong>{english ? "One clear package" : "Un paquete claro"}</strong><span>{english ? "The initial price and annual renewal are explained before you begin." : "El precio inicial y la renovación anual se explican antes de empezar."}</span></li>
            <li><strong>{english ? "Direct, bilingual communication" : "Comunicación directa y bilingüe"}</strong><span>{english ? "Start with an email in English or Spanish; a call can be arranged when it helps." : "Empieza por email en español o inglés; podemos reunirnos si resulta útil."}</span></li>
          </ul>
          <div className="about-cta"><ContactActions locale={locale} ctaLabel={english ? "Ask us a question" : "Hacernos una consulta"} /></div>
        </div>
      </section>

      <section className="section-shell section-block">
        <div className="page-highlight">
          <h2>{english ? "What happens after formation?" : "¿Qué ocurre después de crear la LLC?"}</h2>
          <p>{english ? "From year two, the $449 annual renewal includes Registered Agent service, Wyoming mailing address, the Annual Report and its state tax, plus website hosting and maintenance. We help you prepare a bank application; you submit it directly to the provider, which reviews it under its own requirements." : "Desde el segundo año, la renovación anual de $449 incluye Registered Agent, dirección postal de Wyoming, el Annual Report y su tasa estatal, además del alojamiento y mantenimiento de la web. Te ayudamos a preparar la solicitud bancaria; tú la presentas directamente al proveedor, que la revisa según sus propios requisitos."}</p>
          <Link className="text-link" href={english ? "/pricing/" : "/es/precios/"}>{english ? "See package pricing" : "Ver el precio del paquete"}</Link>
        </div>
      </section>
    </main>
  );
}
