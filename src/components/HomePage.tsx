import Link from "next/link";
import { findBlogArticle } from "@/content/blog/catalog";
import { ContactActions } from "@/components/ContactActions";
import { HeroVideo } from "@/components/HeroVideo";
import { PriceCard } from "@/components/PriceCard";
import { type Locale } from "@/lib/site";

type HomeCopy = {
  eyebrow: string;
  headline: string;
  accent: string;
  lede: string;
  priceNote: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesIntro: string;
  services: Array<{ title: string; body: string; link?: string; label?: string }>;
  audienceEyebrow: string;
  audienceTitle: string;
  audienceIntro: string;
  audience: Array<{ label: string; title: string; body: string }>;
  processEyebrow: string;
  processTitle: string;
  process: Array<{ title: string; body: string }>;
  bankingEyebrow: string;
  bankingTitle: string;
  bankingBody: string;
  bankingFacts: string[];
  pricingEyebrow: string;
  pricingTitle: string;
  pricingBody: string;
  stateTitle: string;
  stateBody: string;
  stateLink: string;
  guidesEyebrow: string;
  guidesTitle: string;
  guidesBody: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  closingEyebrow: string;
  closingTitle: string;
  closingBody: string;
};

const copy: Record<Locale, HomeCopy> = {
  es: {
    eyebrow: "Formación de LLC para fundadores en EE. UU. y en el extranjero",
    headline: "Crea tu LLC en EE. UU.",
    accent: "Nos encargamos del trámite.",
    lede: "Constitución en Wyoming, EIN, agente registrado y dirección postal. Te acompañamos desde los primeros documentos hasta la preparación de tu solicitud bancaria, en español o inglés.",
    priceNote: "LLC en Wyoming · $699 total · primer año de Registered Agent incluido",
    servicesEyebrow: "Qué hacemos por ti",
    servicesTitle: "La base de tu empresa, resuelta.",
    servicesIntro: "Te ayudamos a entender qué toca en cada etapa y qué dependerá del estado, el IRS o el banco.",
    services: [
      { title: "Formación de LLC en Wyoming", body: "Preparamos y presentamos la creación de tu LLC. La tasa estatal de formación está incluida en el precio publicado.", link: "/llc-formation/", label: "Más información sobre formación de LLC" },
      { title: "EIN", body: "Gestionamos la solicitud del número de identificación fiscal federal. Los datos y los plazos dependen de cada caso y del IRS.", link: "/blog/ein-o-itin/", label: "Guía del EIN" },
      { title: "Registered Agent y dirección postal", body: "El primer año del Registered Agent y la dirección postal de Wyoming están incluidos en la formación.", label: "Primer año incluido" },
      { title: "Tu web y correo empresarial", body: "Incluidos en el paquete de creación. La renovación anual mantiene tu web alojada y operativa; si no renuevas, te entregamos los archivos.", link: "/pricing/", label: "Ver qué incluye la web" },
      { title: "Orientación para solicitar una cuenta bancaria", body: "Revisamos contigo los pasos y documentos. Tú presentas la solicitud y el banco decide si la aprueba.", link: "#banca", label: "Acompañamiento administrativo" },
    ],
    audienceEyebrow: "Aquí o al otro lado del mundo",
    audienceTitle: "Un negocio en EE. UU. empieza con tu situación.",
    audienceIntro: "La formación de una LLC puede ser similar; el EIN y los requisitos bancarios pueden variar según tu residencia, actividad y estructura.",
    audience: [
      { label: "01 / Vives en Estados Unidos", title: "La LLC debe encajar con el estado donde operas.", body: "Si trabajas desde tu estado de residencia, puede que debas registrar allí tu empresa aunque la formes en Wyoming. No recomendamos un estado automáticamente." },
      { label: "02 / Vives fuera de Estados Unidos", title: "Empezar desde otro país también es posible.", body: "No necesitas ser ciudadano estadounidense para formar una LLC. Los requisitos del EIN y de cada banco dependen de tu situación; no prometemos aprobación bancaria." },
    ],
    processEyebrow: "Cómo funciona",
    processTitle: "Un proceso sencillo, con expectativas claras.",
    process: [
      { title: "Nos escribes con lo esencial", body: "Cuéntanos tu país de residencia, la actividad del negocio y el estado que estás considerando. No hace falta reservar una llamada ni enviar documentos." },
      { title: "Acordamos el servicio y preparamos la LLC", body: "Te explicamos el alcance y los siguientes pasos. Cuando decidamos avanzar, coordinamos la información necesaria por un canal adecuado." },
      { title: "Te orientamos con la solicitud bancaria", body: "Repasamos contigo la información y los documentos. Tú completas la solicitud con el banco o proveedor financiero." },
    ],
    bankingEyebrow: "Orientación bancaria",
    bankingTitle: "Llega a tu solicitud con los documentos preparados.",
    bankingBody: "Te explicamos los pasos y revisamos contigo la documentación para que puedas presentar una solicitud informada. Valls Solutions no abre la cuenta en tu nombre.",
    bankingFacts: [
      "La entidad financiera revisa cada solicitud y toma su propia decisión.",
      "Los requisitos pueden depender del país de residencia, la actividad y las operaciones previstas.",
      "Una dirección postal de Wyoming no equivale necesariamente a una dirección física de operaciones.",
    ],
    pricingEyebrow: "Sin sumas sorpresa",
    pricingTitle: "Un precio total para empezar.",
    pricingBody: "Los $699 incluyen la tasa de creación, tu web y correo empresarial. Desde el segundo año, los $449/año cubren la renovación, el Annual Report y su tasa estatal.",
    stateTitle: "¿Wyoming es adecuado para ti?",
    stateBody: "No siempre. Si operas desde otro estado, quizá tengas que registrar allí la LLC o cumplir obligaciones adicionales. Te explicamos el proceso administrativo; para consejo legal o fiscal individual, consulta a un profesional cualificado.",
    stateLink: "Cuéntanos tu caso",
    guidesEyebrow: "Guías para decidir con calma",
    guidesTitle: "Entiende la LLC antes de dar el paso.",
    guidesBody: "Guías bilingües sobre Wyoming, impuestos, visados y obligaciones de una empresa estadounidense.",
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Respuestas antes de empezar.",
    faqs: [
      { question: "¿Tengo que ser ciudadano de EE. UU. para crear una LLC?", answer: "No. Personas que viven en Estados Unidos y fundadores internacionales pueden crear una LLC. Los requisitos del EIN y de los bancos dependen de cada situación." },
      { question: "¿Me abrís una cuenta bancaria?", answer: "No. Te orientamos con los pasos y la documentación, y tú presentas la solicitud. La entidad financiera decide si abre la cuenta." },
      { question: "¿La dirección postal de Wyoming sirve para abrir una cuenta?", answer: "No necesariamente. La dirección postal o del Registered Agent cumple una función distinta de una dirección física de operaciones, y cada banco aplica sus propios criterios." },
      { question: "¿Wyoming es siempre el mejor estado?", answer: "No. Si resides u operas en otro estado, puede que debas registrar allí la empresa. La elección depende de la actividad y de dónde se desarrolla." },
      { question: "¿Qué incluye la renovación anual de $449?", answer: "Incluye Registered Agent, dirección postal de Wyoming, presentación y tasa estatal del Annual Report, y mantenimiento de la web." },
    ],
    closingEyebrow: "Tu siguiente paso",
    closingTitle: "¿Listo para poner tu LLC en marcha?",
    closingBody: "Escríbenos con tu país de residencia y una breve descripción del negocio. No envíes números de identificación ni documentos sensibles por email.",
  },
  en: {
    eyebrow: "LLC formation for U.S. and international founders",
    headline: "Start your U.S. LLC.",
    accent: "We’ll handle the filing.",
    lede: "Wyoming formation, an EIN, a registered agent and a mailing address. We work with you from the first paperwork to preparing your business bank application, in English or Spanish.",
    priceNote: "Wyoming LLC · $699 total · first year of Registered Agent included",
    servicesEyebrow: "What we take care of",
    servicesTitle: "The foundations of your business, sorted.",
    servicesIntro: "We explain what happens at each stage and what depends on the state, the IRS or the bank.",
    services: [
      { title: "Wyoming LLC formation", body: "We prepare and file your LLC formation. The state formation fee is included in the published price.", link: "/en/llc-formation/", label: "Learn about LLC formation" },
      { title: "EIN", body: "We handle the federal tax identification number application. Information and timing depend on your situation and the IRS.", link: "/en/blog/ein-vs-itin/", label: "EIN guide" },
      { title: "Registered Agent and mailing address", body: "Your first year of Registered Agent service and Wyoming mailing address are included with formation.", label: "First year included" },
      { title: "Your website and business email", body: "Included in your formation package. Annual renewal keeps your website hosted and maintained; if you do not renew, we hand over the files.", link: "/en/pricing/", label: "See website inclusions" },
      { title: "Guidance for a business bank application", body: "We review the steps and documents with you. You submit the application and the bank decides whether to approve it.", link: "#banking", label: "Administrative guidance" },
    ],
    audienceEyebrow: "Across the country. Across the world.",
    audienceTitle: "A U.S. business starts with your situation.",
    audienceIntro: "LLC formation may be similar; EIN and banking requirements can vary with your residence, business activity and structure.",
    audience: [
      { label: "01 / You live in the U.S.", title: "Your LLC should fit the state where you operate.", body: "If you work from your home state, you may need to register there even if you form in Wyoming. We do not recommend a state automatically." },
      { label: "02 / You live outside the U.S.", title: "You can start from another country.", body: "You do not need to be a U.S. citizen to form an LLC. EIN and bank requirements depend on your circumstances; we do not promise bank approval." },
    ],
    processEyebrow: "How it works",
    processTitle: "A simple process, with clear expectations.",
    process: [
      { title: "Email us the essentials", body: "Tell us your country of residence, business activity and the state you are considering. No call booking or documents are needed to start." },
      { title: "Agree on the service and prepare the LLC", body: "We explain the scope and next steps. Once we decide to move forward, we coordinate the necessary information through an appropriate channel." },
      { title: "Get guidance for the bank application", body: "We review the information and documents with you. You complete the application with the bank or financial provider." },
    ],
    bankingEyebrow: "Banking guidance",
    bankingTitle: "Go into your application with your paperwork ready.",
    bankingBody: "We explain the steps and review the paperwork with you so you can submit an informed application. Valls Solutions does not open the account on your behalf.",
    bankingFacts: [
      "The financial provider reviews each application and makes its own decision.",
      "Requirements may depend on your country of residence, business activity and planned operations.",
      "A Wyoming mailing address is not necessarily the same as a physical operating address.",
    ],
    pricingEyebrow: "No surprise totals",
    pricingTitle: "One clear price to get started.",
    pricingBody: "The $699 includes the state formation fee, your website and business email. From year two, $449/year covers renewal services, your Annual Report and its state tax.",
    stateTitle: "Is Wyoming right for your business?",
    stateBody: "Not always. If you operate from another state, you may need to register the LLC there or meet additional requirements. We explain the administrative process; consult a qualified professional for individual legal or tax advice.",
    stateLink: "Tell us about your plans",
    guidesEyebrow: "Guides to help you decide",
    guidesTitle: "Understand the LLC before you take the next step.",
    guidesBody: "Bilingual guides to Wyoming, taxes, visas and the obligations of running a U.S. company.",
    faqEyebrow: "Frequently asked questions",
    faqTitle: "Answers before you get started.",
    faqs: [
      { question: "Do I need to be a U.S. citizen to form an LLC?", answer: "No. People who live in the United States and international founders can form an LLC. EIN and bank requirements depend on each situation." },
      { question: "Do you open the bank account for me?", answer: "No. We guide you through the steps and paperwork, and you submit the application. The financial provider decides whether to open the account." },
      { question: "Can I use the Wyoming mailing address to open an account?", answer: "Not necessarily. A mailing or Registered Agent address serves a different purpose from a physical operating address, and each bank applies its own criteria." },
      { question: "Is Wyoming always the best state?", answer: "No. If you live or operate in another state, you may need to register the company there. The right choice depends on your activity and where it takes place." },
      { question: "What does the $449 annual renewal include?", answer: "Includes Registered Agent renewal, Wyoming mailing address, Annual Report filing and state tax, and website maintenance." },
    ],
    closingEyebrow: "Your next step",
    closingTitle: "Ready to get your LLC moving?",
    closingBody: "Email us your country of residence and a short description of your business. Do not send identification numbers or sensitive documents by email.",
  },
};

export function HomePage({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const content = copy[locale];
  const guides = (english ? ["wyoming-llc", "ein-vs-itin", "llc-taxes"] : ["llc-wyoming", "ein-o-itin", "llc-impuestos"]).map((slug) => findBlogArticle(locale, slug)!);
  const homePrefix = english ? "" : "/es";
  const routePrefix = english ? "/en" : "";

  return (
    <main id="contenido" className="home-page">
      <section className="section-shell hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />{content.eyebrow}</p>
          <h1>{content.headline} <em>{content.accent}</em></h1>
          <p className="hero-lede">{content.lede}</p>
          <div className="hero-actions">
            <ContactActions locale={locale} emailLabel={english ? "Email us about your LLC" : "Escribirnos sobre mi LLC"} />
            <Link className="text-link" href={`${homePrefix}/#${english ? "process" : "proceso"}`}>{english ? "See how it works" : "Ver cómo funciona"}<span aria-hidden="true">↓</span></Link>
          </div>
          <p className="hero-price-note"><span className="status-dot" aria-hidden="true" /><span>{content.priceNote}</span></p>
          <p className="hero-contact-note">{english ? "Start with an email. No call booking required." : "Empieza por email. Sin reservar una llamada."}</p>
        </div>
        <HeroVideo locale={locale} />
      </section>

      <section className="section-shell proof-strip" aria-label={english ? "Service overview" : "Resumen del servicio"}>
        <div><strong className="proof-value">100+</strong><span>{english ? "LLCs formed" : "LLCs constituidas"}<small>{english ? "Experience with the paperwork that matters." : "Experiencia con los trámites de tu empresa."}</small></span></div>
        <div><strong className="proof-value">$699</strong><span>{english ? "One-time formation package" : "Paquete de formación, pago único"}<small>{english ? "Wyoming state filing fee included." : "Tasa estatal de Wyoming incluida."}</small></span></div>
        <div><strong className="proof-value proof-language">EN / ES</strong><span>{english ? "Talk to us in your language" : "Hablemos en tu idioma"}<small>{english ? "Direct support by email." : "Atención directa por email."}</small></span></div>
      </section>

      <section className="section-shell section-block services-layout" id={english ? "services" : "servicios"}>
        <div className="section-intro">
          <p className="eyebrow"><span className="eyebrow-line" />{content.servicesEyebrow}</p>
          <h2>{content.servicesTitle}</h2>
          <p>{content.servicesIntro}</p>
        </div>
        <div className="service-rows">
          {content.services.map((service, index) => (
            <article className="service-row" key={service.title}>
              <span className="service-index">0{index + 1}</span>
              <div><h3>{service.title}</h3><p>{service.body}</p></div>
              {service.link ? <Link href={service.link} aria-label={service.label}>{"↗"}</Link> : <span className="row-note">{service.label}</span>}
            </article>
          ))}
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
            {content.audience.map((item) => <article className="audience-item" key={item.label}><span className="audience-label">{item.label}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-shell section-block process-section" id={english ? "process" : "proceso"}>
        <div className="section-intro section-intro-wide">
          <p className="eyebrow"><span className="eyebrow-line" />{content.processEyebrow}</p>
          <h2>{content.processTitle}</h2>
        </div>
        <ol className="process-list">
          {content.process.map((step, index) => <li key={step.title}><span className="process-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}
        </ol>
      </section>

      <section className="banking-section" id={english ? "banking" : "banca"}>
        <div className="section-shell banking-layout">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" />{content.bankingEyebrow}</p>
            <h2>{content.bankingTitle}</h2>
            <p className="banking-lede">{content.bankingBody}</p>
            <ContactActions locale={locale} emailLabel={english ? "Ask about banking guidance" : "Consultar sobre orientación bancaria"} />
          </div>
          <div className="banking-facts">{content.bankingFacts.map((fact, index) => <div key={fact}><span>0{index + 1}</span><p>{fact}</p></div>)}</div>
        </div>
      </section>

      <section className="section-shell pricing-teaser" id={english ? "pricing" : "precios"}>
        <div className="pricing-copy">
          <p className="eyebrow"><span className="eyebrow-line" />{content.pricingEyebrow}</p>
          <h2>{content.pricingTitle}</h2>
          <p>{content.pricingBody}</p>
          <Link className="text-link" href={`${routePrefix}/pricing/`}>{english ? "See full pricing details" : "Ver el desglose completo"}<span aria-hidden="true">↗</span></Link>
        </div>
        <PriceCard locale={locale} />
      </section>

      <section className="section-shell location-note">
        <span className="location-mark" aria-hidden="true">i</span>
        <div><h2>{content.stateTitle}</h2><p>{content.stateBody}</p></div>
        <a href={`mailto:${english ? "info@vallssolutions.com?subject=Question%20about%20forming%20in%20Wyoming" : "info@vallssolutions.com?subject=Consulta%20sobre%20formar%20en%20Wyoming"}`}>{content.stateLink} <span aria-hidden="true">↗</span></a>
      </section>

      <section className="section-shell section-block journal-section">
        <div className="section-intro section-intro-wide">
          <p className="eyebrow"><span className="eyebrow-line" />{content.guidesEyebrow}</p>
          <h2>{content.guidesTitle}</h2>
          <p>{content.guidesBody}</p>
        </div>
        <div className="journal-list">
          {guides.map((guide, index) => (
            <Link className="journal-entry" href={`${routePrefix}/blog/${guide.slug}/`} key={guide.slug}>
              <span className="guide-topic" aria-hidden="true">{["WY", "EIN", "Tax"][index]}</span>
              <div><p className="journal-category">{guide.category} · {guide.readMinutes} MIN</p><h3>{guide.title}</h3><p>{guide.description}</p></div>
              <span className="journal-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <Link className="journal-more" href={`${routePrefix}/blog/`}>{english ? "Browse all guides" : "Ver todas las guías"} <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="section-shell section-block faq-section" id={english ? "faq" : "preguntas"}>
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
          <div><p className="eyebrow eyebrow-light"><span className="eyebrow-line" />{content.closingEyebrow}</p><h2>{content.closingTitle}</h2><p>{content.closingBody}</p></div>
          <ContactActions locale={locale} emailLabel={english ? "Email Valls Solutions" : "Escribir a Valls Solutions"} />
        </div>
      </section>
    </main>
  );
}
