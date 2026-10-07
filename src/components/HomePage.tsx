import Link from "next/link";
import { findBlogArticle } from "@/content/blog/catalog";
import { ContactActions } from "@/components/ContactActions";
import { HeroVideo } from "@/components/HeroVideo";
import { PriceCard } from "@/components/PriceCard";
import type { Locale } from "@/lib/site";

type HomeCopy = {
  eyebrow: string;
  headline: string;
  accent: string;
  lede: string;
  primaryCta: string;
  secondaryCta: string;
  priceLine: string;
  proof: Array<{ value: string; title: string; detail: string }>;
  whyEyebrow: string;
  whyTitle: string;
  whyIntro: string;
  reasons: Array<{ title: string; body: string }>;
  guideLink: string;
  offerEyebrow: string;
  offerTitle: string;
  offerBody: string;
  offerNote: string;
  audienceEyebrow: string;
  audienceTitle: string;
  audienceIntro: string;
  audiences: Array<{ label: string; title: string; body: string }>;
  processEyebrow: string;
  processTitle: string;
  processIntro: string;
  steps: Array<{ title: string; body: string }>;
  bankingEyebrow: string;
  bankingTitle: string;
  bankingBody: string;
  bankingSteps: Array<{ title: string; body: string }>;
  guidesEyebrow: string;
  guidesTitle: string;
  guidesBody: string;
  guidesLink: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  closingEyebrow: string;
  closingTitle: string;
  closingBody: string;
  closingCta: string;
};

const copy: Record<Locale, HomeCopy> = {
  en: {
    eyebrow: "Wyoming LLC formation for U.S. and international founders",
    headline: "Start your U.S. company",
    accent: "with the essentials in place.",
    lede: "We form your Wyoming LLC and help you get the first business essentials organized—from your EIN application to guidance for a business bank application.",
    primaryCta: "Start your LLC",
    secondaryCta: "See what is included",
    priceLine: "$699 one-time · $449/year from year two",
    proof: [
      { value: "100+", title: "LLCs formed", detail: "Experience with the formation process." },
      { value: "EN / ES", title: "Bilingual support", detail: "Speak with us in English or Spanish." },
      { value: "$699", title: "Clear package price", detail: "Wyoming state formation fee included." },
    ],
    whyEyebrow: "A structure for your business",
    whyTitle: "Why create a U.S. LLC?",
    whyIntro: "A limited liability company gives your business a formal legal structure under state law. It can help you organize business activity separately from your personal affairs and give clients and providers a clear company to work with.",
    reasons: [
      { title: "Give the business its own structure", body: "Create a company entity for contracts, business records and day-to-day operations." },
      { title: "Keep business activity organized", body: "Use the LLC as a clear starting point for separating business and personal finances and records." },
      { title: "Prepare for the next business step", body: "An EIN and organized formation documents help you prepare for business services and account applications." },
    ],
    guideLink: "Read our guide to U.S. LLCs",
    offerEyebrow: "The formation package",
    offerTitle: "The important setup, together in one place.",
    offerBody: "One guided Wyoming LLC formation package for founders based in the United States or abroad. We explain the scope before we begin and keep the next steps clear as your company is formed.",
    offerNote: "Your first message can be a short email. No call or document upload is needed to get started.",
    audienceEyebrow: "For founders wherever they live",
    audienceTitle: "Support for founders in the U.S. and around the world.",
    audienceIntro: "Valls Solutions works with U.S. citizens, U.S. residents and international founders who want to establish a Wyoming LLC.",
    audiences: [
      { label: "U.S.-based founders", title: "Build around where you do business.", body: "We help organize the Wyoming formation and explain the filing steps. If you live or operate in another state, we can discuss what to check before choosing Wyoming." },
      { label: "Founders abroad", title: "Form your company from outside the U.S.", body: "You do not need to be a U.S. citizen or have an ITIN just to form an LLC. We explain the EIN and application steps based on the information relevant to your situation." },
    ],
    processEyebrow: "How it works",
    processTitle: "A guided process, from first message to filed LLC.",
    processIntro: "You will know what is happening and what we need from you at each step.",
    steps: [
      { title: "Tell us about your business", body: "Email your country or state of residence, what your business does and any questions you have." },
      { title: "Review the package together", body: "We confirm the service, price and information needed before beginning the Wyoming filing." },
      { title: "Receive your company documents", body: "We coordinate formation, EIN application handling and the included first-year services." },
    ],
    bankingEyebrow: "Business banking preparation",
    bankingTitle: "Get your application organized with personal guidance.",
    bankingBody: "We walk you through the usual steps and help you prepare the documents for a business account application, including options such as Mercury or Wise when appropriate. You submit the application directly to the provider, which reviews it under its own requirements.",
    bankingSteps: [
      { title: "We help you prepare", body: "Understand the process and organize the requested company information." },
      { title: "You apply directly", body: "Submit your application to the bank or financial platform you choose." },
      { title: "The provider reviews it", body: "Each provider sets its own eligibility requirements and makes its own decision." },
    ],
    guidesEyebrow: "Founder resources",
    guidesTitle: "Useful answers for building a U.S. business.",
    guidesBody: "Plain-language guides on LLC formation, Wyoming, EINs, taxes and business operations.",
    guidesLink: "Explore all business guides",
    faqEyebrow: "Frequently asked questions",
    faqTitle: "Know what to expect before you begin.",
    faqs: [
      { question: "What does the $699 Wyoming LLC package include?", answer: "It includes the Wyoming formation filing and state formation fee, EIN application handling, the first year of Registered Agent service and Wyoming mailing address, a company website and business email, and guidance for preparing a business bank application." },
      { question: "What does the $449 annual renewal include?", answer: "From year two, the $449 annual renewal includes Registered Agent service, Wyoming mailing address, the Wyoming Annual Report filing and state tax, and website hosting and maintenance. If you do not renew, the website is taken offline and we provide its files." },
      { question: "Can U.S. citizens and residents use the service?", answer: "Yes. We work with founders based in the United States and internationally. The details needed for the EIN and business account application depend on the founder and business." },
      { question: "Do you open the business bank account?", answer: "We provide guidance and help you prepare the application documents. You submit the application directly, and the financial provider makes the account decision." },
      { question: "Do I need an ITIN to form an LLC?", answer: "An ITIN is not required simply to form a Wyoming LLC. EIN application information depends on the responsible party and IRS process." },
    ],
    closingEyebrow: "Your next step",
    closingTitle: "A U.S. company starts with a clear plan.",
    closingBody: "Tell us where you are based and what you are building. We will explain the package and next steps in English or Spanish.",
    closingCta: "Email Valls Solutions",
  },
  es: {
    eyebrow: "Formación de LLC en Wyoming para fundadores en EE. UU. y en el extranjero",
    headline: "Pon en marcha tu empresa en EE. UU.",
    accent: "con lo esencial bien preparado.",
    lede: "Creamos tu LLC en Wyoming y te ayudamos a organizar los primeros pasos empresariales: desde la solicitud del EIN hasta la preparación para solicitar una cuenta bancaria empresarial.",
    primaryCta: "Empezar mi LLC",
    secondaryCta: "Ver qué incluye",
    priceLine: "$699 pago único · $449/año desde el segundo año",
    proof: [
      { value: "100+", title: "LLC constituidas", detail: "Experiencia en el proceso de formación." },
      { value: "ES / EN", title: "Atención bilingüe", detail: "Hablamos contigo en español o inglés." },
      { value: "$699", title: "Precio claro", detail: "Incluye la tasa estatal de creación en Wyoming." },
    ],
    whyEyebrow: "Una estructura para tu negocio",
    whyTitle: "¿Por qué crear una LLC en Estados Unidos?",
    whyIntro: "Una LLC (Limited Liability Company) da a tu negocio una estructura legal formal bajo la legislación estatal. Puede ayudarte a organizar la actividad separada de tus asuntos personales y ofrecer a clientes y proveedores una empresa clara con la que trabajar.",
    reasons: [
      { title: "Dale una estructura propia al negocio", body: "Crea una entidad empresarial para contratos, registros y operaciones del día a día." },
      { title: "Organiza la actividad empresarial", body: "Utiliza la LLC como base para separar con claridad las finanzas y los registros del negocio y los personales." },
      { title: "Prepárate para el siguiente paso", body: "Un EIN y los documentos de formación organizados ayudan a prepararte para solicitar servicios y cuentas empresariales." },
    ],
    guideLink: "Lee nuestra guía sobre LLC en EE. UU.",
    offerEyebrow: "El paquete de formación",
    offerTitle: "Lo importante para empezar, en un solo lugar.",
    offerBody: "Un paquete guiado para crear una LLC en Wyoming, tanto si resides en Estados Unidos como si vives en otro país. Te explicamos el alcance antes de empezar y mantenemos claros los siguientes pasos durante la creación de tu empresa.",
    offerNote: "Puedes empezar con un email breve. No necesitas reservar una llamada ni subir documentos para hacer la primera consulta.",
    audienceEyebrow: "Para fundadores, vivan donde vivan",
    audienceTitle: "Acompañamiento para crear tu empresa, vivas donde vivas.",
    audienceIntro: "Valls Solutions trabaja con ciudadanos y residentes de EE. UU. y con emprendedores internacionales que quieren crear una LLC en Wyoming.",
    audiences: [
      { label: "Fundadores en EE. UU.", title: "Ten en cuenta dónde desarrollas la actividad.", body: "Te ayudamos a organizar la formación en Wyoming y explicamos los pasos de presentación. Si resides u operas en otro estado, podemos comentar qué conviene revisar antes de elegir Wyoming." },
      { label: "Fundadores en el extranjero", title: "Crea tu empresa desde otro país.", body: "No necesitas ser ciudadano estadounidense ni tener un ITIN para crear una LLC. Te explicamos los pasos del EIN y la solicitud según la información relevante para tu situación." },
    ],
    processEyebrow: "Cómo funciona",
    processTitle: "Un proceso acompañado, desde el primer mensaje hasta la LLC.",
    processIntro: "Sabrás qué está ocurriendo y qué necesitamos de ti en cada paso.",
    steps: [
      { title: "Cuéntanos sobre tu negocio", body: "Escríbenos tu país o estado de residencia, a qué se dedica tu negocio y tus preguntas." },
      { title: "Revisamos juntos el paquete", body: "Confirmamos el servicio, el precio y la información necesaria antes de iniciar la presentación en Wyoming." },
      { title: "Recibe los documentos de tu empresa", body: "Coordinamos la formación, la gestión de la solicitud del EIN y los servicios incluidos del primer año." },
    ],
    bankingEyebrow: "Preparación bancaria empresarial",
    bankingTitle: "Prepara tu solicitud con orientación personalizada.",
    bankingBody: "Te explicamos los pasos habituales y te ayudamos a preparar los documentos para solicitar una cuenta empresarial, incluidas opciones como Mercury o Wise cuando encajen. Presentas la solicitud directamente al proveedor, que la revisará según sus propios requisitos.",
    bankingSteps: [
      { title: "Te ayudamos a prepararla", body: "Entiende el proceso y organiza la información de la empresa que te soliciten." },
      { title: "Solicitas directamente", body: "Presenta la solicitud al banco o plataforma financiera que elijas." },
      { title: "El proveedor la revisa", body: "Cada proveedor define sus requisitos y toma su propia decisión." },
    ],
    guidesEyebrow: "Recursos para emprendedores",
    guidesTitle: "Respuestas útiles para crear una empresa en EE. UU.",
    guidesBody: "Guías claras sobre LLC, Wyoming, EIN, impuestos y gestión de una empresa.",
    guidesLink: "Ver todas las guías empresariales",
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Conoce el proceso antes de empezar.",
    faqs: [
      { question: "¿Qué incluye el paquete de LLC en Wyoming de $699?", answer: "Incluye la presentación de la formación en Wyoming y su tasa estatal, la gestión de la solicitud del EIN, el primer año de Registered Agent y dirección postal de Wyoming, una página web y un correo empresarial, y orientación para preparar una solicitud bancaria empresarial." },
      { question: "¿Qué incluye la renovación anual de $449?", answer: "Desde el segundo año, incluye Registered Agent, dirección postal de Wyoming, presentación y tasa estatal del Annual Report, y alojamiento y mantenimiento de la página web. Si no renuevas, la web deja de estar publicada y te entregamos sus archivos." },
      { question: "¿Pueden contratar el servicio ciudadanos y residentes de EE. UU.?", answer: "Sí. Trabajamos con fundadores que viven en Estados Unidos y en otros países. La información necesaria para el EIN y la solicitud bancaria depende del fundador y del negocio." },
      { question: "¿Abrís la cuenta bancaria empresarial?", answer: "Te orientamos y te ayudamos a preparar los documentos de la solicitud. Tú la presentas directamente y el proveedor financiero decide sobre la apertura de la cuenta." },
      { question: "¿Necesito un ITIN para crear una LLC?", answer: "No necesitas un ITIN simplemente para crear una LLC en Wyoming. La información para solicitar el EIN depende del responsable y del proceso del IRS." },
    ],
    closingEyebrow: "El siguiente paso",
    closingTitle: "Una empresa en EE. UU. empieza con un plan claro.",
    closingBody: "Cuéntanos dónde resides y qué negocio estás poniendo en marcha. Te explicamos el paquete y los siguientes pasos en español o inglés.",
    closingCta: "Escribir a Valls Solutions",
  },
};

export function HomePage({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const content = copy[locale];
  const routePrefix = english ? "" : "/es";
  const articles = english
    ? ["wyoming-llc", "ein-vs-itin"]
    : ["llc-wyoming", "ein-o-itin"];
  const guides = articles.map((slug) => findBlogArticle(locale, slug)!).filter(Boolean);
  const llcGuide = findBlogArticle(locale, english ? "do-i-need-an-llc" : "necesito-una-llc");

  return (
    <main id="contenido" className="home-page">
      <section className="section-shell hero home-hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />{content.eyebrow}</p>
          <h1>{content.headline} <em>{content.accent}</em></h1>
          <p className="hero-lede">{content.lede}</p>
          <div className="hero-actions">
            <ContactActions locale={locale} emailLabel={content.primaryCta} />
            <Link className="text-link" href="#package">{content.secondaryCta}<span aria-hidden="true">↓</span></Link>
          </div>
          <p className="hero-price-note"><span className="status-dot" aria-hidden="true" /><strong>{content.priceLine}</strong></p>
          <p className="hero-contact-note">{english ? "Start by email in English or Spanish." : "Empieza por email, en español o en inglés."}</p>
        </div>
        <HeroVideo locale={locale} />
      </section>

      <section className="section-shell proof-strip home-proof" aria-label={english ? "Valls Solutions at a glance" : "Valls Solutions en resumen"}>
        {content.proof.map((item) => (
          <div key={item.title}>
            <strong className="proof-value">{item.value}</strong>
            <span>{item.title}<small>{item.detail}</small></span>
          </div>
        ))}
      </section>

      <section className="section-shell section-block home-why" id={english ? "why-llc" : "por-que-llc"}>
        <div className="home-why-intro">
          <p className="eyebrow"><span className="eyebrow-line" />{content.whyEyebrow}</p>
          <h2>{content.whyTitle}</h2>
          <p>{content.whyIntro}</p>
          {llcGuide && <Link className="text-link" href={`${routePrefix}/blog/${llcGuide.slug}/`}>{content.guideLink}<span aria-hidden="true">↗</span></Link>}
        </div>
        <div className="home-reasons">
          {content.reasons.map((reason, index) => (
            <article className="home-reason" key={reason.title}>
              <span className="home-reason-index">0{index + 1}</span>
              <div><h3>{reason.title}</h3><p>{reason.body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-package-band" id="package">
        <div className="section-shell home-package">
          <div className="home-package-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />{content.offerEyebrow}</p>
            <h2>{content.offerTitle}</h2>
            <p>{content.offerBody}</p>
            <div className="home-package-note"><span aria-hidden="true">↗</span><p>{content.offerNote}</p></div>
            <Link className="text-link home-package-link" href={english ? "/pricing/" : "/es/precios/"}>
              {english ? "Review full pricing details" : "Consulta todos los detalles del precio"}<span aria-hidden="true">↗</span>
            </Link>
          </div>
          <PriceCard locale={locale} />
        </div>
      </section>

      <section className="audience-section">
        <div className="section-shell audience-layout">
          <div className="audience-heading">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />{content.audienceEyebrow}</p>
            <h2>{content.audienceTitle}</h2>
            <p>{content.audienceIntro}</p>
          </div>
          <div className="audience-list">
            {content.audiences.map((item) => (
              <article className="audience-item" key={item.label}>
                <span className="audience-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-block process-section" id={english ? "process" : "proceso"}>
        <div className="section-intro section-intro-wide">
          <p className="eyebrow"><span className="eyebrow-line" />{content.processEyebrow}</p>
          <h2>{content.processTitle}</h2>
          <p>{content.processIntro}</p>
        </div>
        <ol className="process-list">
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <span className="process-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="banking-section" id={english ? "banking" : "banca"}>
        <div className="section-shell banking-layout home-banking-layout">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" />{content.bankingEyebrow}</p>
            <h2>{content.bankingTitle}</h2>
            <p className="banking-lede">{content.bankingBody}</p>
            <ContactActions locale={locale} emailLabel={english ? "Ask about banking guidance" : "Consultar sobre orientación bancaria"} />
          </div>
          <ol className="banking-facts home-banking-steps">
            {content.bankingSteps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell section-block journal-section home-guides">
        <div className="section-intro section-intro-wide">
          <p className="eyebrow"><span className="eyebrow-line" />{content.guidesEyebrow}</p>
          <h2>{content.guidesTitle}</h2>
          <p>{content.guidesBody}</p>
        </div>
        {llcGuide && (
          <Link className="featured-guide" href={`${routePrefix}/blog/${llcGuide.slug}/`}>
            <span className="featured-guide-label">{english ? "Start here" : "Empieza aquí"}</span>
            <div><p className="journal-category">{llcGuide.category} · {llcGuide.readMinutes} {english ? "MIN READ" : "MIN DE LECTURA"}</p><h3>{llcGuide.title}</h3><p>{llcGuide.description}</p></div>
            <span className="journal-arrow" aria-hidden="true">↗</span>
          </Link>
        )}
        <div className="journal-list home-guide-list">
          {guides.map((guide) => (
            <Link className="journal-entry" href={`${routePrefix}/blog/${guide.slug}/`} key={guide.slug}>
              <span className="journal-category">{guide.category}</span>
              <div><h3>{guide.title}</h3><p>{guide.description}</p></div>
              <span className="journal-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <Link className="journal-more" href={`${routePrefix}/blog/`}>{content.guidesLink}<span aria-hidden="true">↗</span></Link>
      </section>

      <section className="section-shell section-block faq-section home-faq" id={english ? "faq" : "preguntas"}>
        <div className="section-intro">
          <p className="eyebrow"><span className="eyebrow-line" />{content.faqEyebrow}</p>
          <h2>{content.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {content.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section className="closing-cta">
        <div className="section-shell closing-layout">
          <div>
            <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />{content.closingEyebrow}</p>
            <h2>{content.closingTitle}</h2>
            <p>{content.closingBody}</p>
          </div>
          <ContactActions locale={locale} emailLabel={content.closingCta} />
        </div>
      </section>
    </main>
  );
}
