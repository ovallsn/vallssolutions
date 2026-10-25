import Link from "next/link";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import type { Locale } from "@/lib/site";

export function ContactPage({ locale }: { locale: Locale }) {
  const english = locale === "en";

  return (
    <main id="contenido">
      <header className="section-shell page-hero contact-page-hero">
        <p className="breadcrumbs">
          <Link href={english ? "/" : "/es/"}>{english ? "Home" : "Inicio"}</Link>
          {" / "}{english ? "Contact" : "Contacto"}
        </p>
        <p className="eyebrow"><span className="eyebrow-line" />{english ? "A first message is enough" : "Un primer mensaje es suficiente"}</p>
        <h1>{english ? "Tell us about the U.S. LLC you want to form." : "Cuéntanos qué LLC quieres crear en EE. UU."}</h1>
        <p>{english ? "Tell us where you’re based, which state you have in mind and what your business does. We form LLCs in Wyoming and other U.S. states, and will confirm the scope and price before work begins. Start by email or WhatsApp in English or Spanish—no call or document upload needed." : "Cuéntanos dónde resides, qué estado tienes en mente y a qué se dedica tu negocio. Creamos LLC en Wyoming y en otros estados de EE. UU.; confirmaremos el alcance y el precio antes de empezar. Puedes iniciar la conversación por email o WhatsApp, en español o inglés, sin llamadas ni documentos."}</p>
      </header>
      <LeadCaptureSection
        locale={locale}
        eyebrow={english ? "YOUR FIRST STEP" : "TU PRIMER PASO"}
        title={english ? "Tell us what you’re building." : "Cuéntanos qué estás creando."}
        body={english
          ? "A short introduction helps us point you toward the right next step for your business."
          : "Una breve presentación nos ayuda a explicarte el siguiente paso para tu negocio."}
      />
      <section className="section-shell section-block contact-next-steps" aria-labelledby="contact-next-steps-title">
        <div className="section-intro">
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "AFTER YOUR FIRST MESSAGE" : "DESPUÉS DE TU PRIMER MENSAJE"}</p>
          <h2 id="contact-next-steps-title">{english ? "A clear next step, before any paperwork." : "Un siguiente paso claro, antes de cualquier documento."}</h2>
        </div>
        <ol className="process-list">
          {(english
            ? [
                { title: "We review your plans", body: "We look at the state you have in mind and what your business does." },
                { title: "We confirm the scope and price", body: "You know what is included and what it costs before we begin." },
                { title: "We explain what we need", body: "Once you decide to proceed, we tell you which information and documents are needed to coordinate the formation." },
              ]
            : [
                { title: "Revisamos tu plan", body: "Vemos qué estado tienes en mente y a qué se dedica tu negocio." },
                { title: "Confirmamos alcance y precio", body: "Sabrás qué incluye el servicio y cuánto cuesta antes de empezar." },
                { title: "Te explicamos qué necesitamos", body: "Cuando decidas continuar, te indicamos qué información y documentos hacen falta para coordinar la creación." },
              ]).map((step, index) => (
            <li key={step.title}>
              <span className="process-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
