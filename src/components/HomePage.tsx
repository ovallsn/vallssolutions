import Link from "next/link";
import { findBlogArticle } from "@/content/blog/catalog";
import { ContactActions } from "@/components/ContactActions";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import {
  FormationServiceIcon,
  type FormationServiceIconName,
} from "@/components/ContactIcons";
import { HeroVideo } from "@/components/HeroVideo";
import { FormationJourney } from "@/components/FormationJourney";
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
  stateChoiceNote: string;
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
};

const copy: Record<Locale, HomeCopy> = {
  en: {
    eyebrow: "Wyoming LLC formation for U.S. and international founders",
    headline: "Form your Wyoming LLC.",
    accent: "With real guidance.",
    lede: "One bilingual point of contact for Wyoming formation, EIN assistance and help preparing your bank application.",
    primaryCta: "Start your LLC",
    secondaryCta: "See the package",
    priceLine: "$699 one-time · $449/year from year two",
    proof: [
      {
        value: "100+",
        title: "LLCs formed",
        detail: "Practical formation experience.",
      },
      {
        value: "EN / ES",
        title: "Bilingual support",
        detail: "Speak with us in English or Spanish.",
      },
      {
        value: "$699",
        title: "Published price",
        detail: "Wyoming formation fee included.",
      },
    ],
    whyEyebrow: "A structure for your business",
    whyTitle: "Why create a U.S. LLC?",
    whyIntro:
      "A limited liability company gives your business a formal legal structure under state law. It can help you organize business activity separately from your personal affairs and give clients and providers a clear company to work with.",
    reasons: [
      {
        title: "A company your clients can work with",
        body: "Sign contracts and organize invoices under your company’s name. Give your freelance business, agency or online brand a formal business identity.",
      },
      {
        title: "Business and personal finances, separated",
        body: "Build company records and prepare a business account application. A clearer financial structure makes day-to-day administration easier to manage.",
      },
      {
        title: "A foundation that can grow with you",
        body: "An LLC offers limited liability under state law and a structure for ownership and operations. Keeping company affairs separate helps preserve that protection.",
      },
    ],
    guideLink: "Read our guide to U.S. LLCs",
    offerEyebrow: "The formation package",
    offerTitle: "A clear start for your Wyoming LLC.",
    offerBody:
      "Here is exactly what the $699 Wyoming formation package covers, with one point of contact from filing through banking preparation.",
    offerNote:
      "Your first message can be a short email. No call or document upload is needed to get started.",
    stateChoiceNote:
      "This published package is for Wyoming. If you are considering another state, write to us first and we will confirm availability, scope and price.",
    audienceEyebrow: "For founders wherever they live",
    audienceTitle: "Support for founders in the U.S. and around the world.",
    audienceIntro:
      "Valls Solutions works with U.S. citizens, U.S. residents and international founders who want to establish a Wyoming LLC.",
    audiences: [
      {
        label: "U.S.-based founders",
        title: "Build around where you do business.",
        body: "We help organize the Wyoming formation and explain the filing steps. If you live or operate in another state, we can discuss what to check before choosing Wyoming.",
      },
      {
        label: "Founders abroad",
        title: "Form your company from outside the U.S.",
        body: "You do not need to be a U.S. citizen or have an ITIN just to form an LLC. We explain the EIN and application steps based on the information relevant to your situation.",
      },
    ],
    processEyebrow: "How it works",
    processTitle: "A clear process, with someone to guide you.",
    processIntro:
      "You will know what is happening and what we need from you at each step.",
    steps: [
      {
        title: "Tell us about your business",
        body: "Email your country or state of residence, what your business does and any questions you have.",
      },
      {
        title: "Review the package together",
        body: "We confirm the service, price and information needed before beginning the Wyoming filing.",
      },
      {
        title: "Receive your company documents",
        body: "We coordinate formation, EIN application handling and the included first-year services.",
      },
    ],
    bankingEyebrow: "Business banking preparation",
    bankingTitle: "Get your application organized with personal guidance.",
    bankingBody:
      "We walk you through the usual steps and help you prepare the documents for a business account application, including options such as Mercury or Wise when appropriate. You submit the application directly to the provider, which reviews it under its own requirements.",
    bankingSteps: [
      {
        title: "We help you prepare",
        body: "Understand the process and organize the requested company information.",
      },
      {
        title: "You apply directly",
        body: "Submit your application to the bank or financial platform you choose.",
      },
      {
        title: "The provider reviews it",
        body: "Each provider sets its own eligibility requirements and makes its own decision.",
      },
    ],
    guidesEyebrow: "Founder resources",
    guidesTitle: "Useful answers for building a U.S. business.",
    guidesBody:
      "Plain-language guides on LLC formation, Wyoming, EINs, taxes and business operations.",
    guidesLink: "Explore all business guides",
    faqEyebrow: "Frequently asked questions",
    faqTitle: "Know what to expect before you begin.",
    faqs: [
      {
        question: "What does the $699 Wyoming LLC package include?",
        answer:
          "It includes the Wyoming formation filing and state formation fee, EIN application handling, the first year of Registered Agent service and Wyoming mailing address, a company website and business email, and guidance for preparing a business bank application.",
      },
      {
        question: "What does the $449 annual renewal include?",
        answer:
          "From year two, the $449 annual renewal includes Registered Agent service, Wyoming mailing address, the Wyoming Annual Report filing and state tax, and website hosting and maintenance. If you do not renew, the website is taken offline and we provide its files.",
      },
      {
        question: "Can U.S. citizens and residents use the service?",
        answer:
          "Yes. We work with founders based in the United States and internationally. The details needed for the EIN and business account application depend on the founder and business.",
      },
      {
        question: "Do you open the business bank account?",
        answer:
          "We provide guidance and help you prepare the application documents. You submit the application directly, and the financial provider makes the account decision.",
      },
      {
        question: "Do I need an ITIN to form an LLC?",
        answer:
          "An ITIN is not required simply to form a Wyoming LLC. EIN application information depends on the responsible party and IRS process.",
      },
    ],
    closingEyebrow: "Your next step",
    closingTitle: "Let’s make your company happen.",
    closingBody:
      "Tell us where you are based and what you are building. We will explain the package and next steps in English or Spanish.",
  },
  es: {
    eyebrow:
      "Formación de LLC en Wyoming para fundadores en EE. UU. y en el extranjero",
    headline: "Forma tu LLC en Wyoming.",
    accent: "Con apoyo personal.",
    lede: "Un contacto bilingüe para crear tu LLC en Wyoming, solicitar el EIN y preparar tu solicitud bancaria.",
    primaryCta: "Empezar mi LLC",
    secondaryCta: "Ver el paquete",
    priceLine: "$699 pago único · $449/año desde el segundo año",
    proof: [
      {
        value: "100+",
        title: "LLC constituidas",
        detail: "Experiencia práctica en formación.",
      },
      {
        value: "ES / EN",
        title: "Atención bilingüe",
        detail: "Hablamos contigo en español o inglés.",
      },
      {
        value: "$699",
        title: "Precio publicado",
        detail: "Tasa de creación en Wyoming incluida.",
      },
    ],
    whyEyebrow: "Una estructura para tu negocio",
    whyTitle: "¿Por qué crear una LLC en Estados Unidos?",
    whyIntro:
      "Una LLC (Limited Liability Company) da a tu negocio una estructura legal formal bajo la legislación estatal. Puede ayudarte a organizar la actividad separada de tus asuntos personales y ofrecer a clientes y proveedores una empresa clara con la que trabajar.",
    reasons: [
      {
        title: "Una empresa con la que trabajar",
        body: "Firma contratos y organiza facturas a nombre de tu empresa. Da a tu actividad freelance, agencia o marca digital una identidad empresarial formal.",
      },
      {
        title: "Finanzas personales y empresariales separadas",
        body: "Organiza los registros de tu empresa y prepara la solicitud de una cuenta empresarial. Una estructura financiera clara facilita la administración diaria.",
      },
      {
        title: "Una estructura para crecer",
        body: "Una LLC ofrece responsabilidad limitada bajo la legislación estatal y una estructura para la propiedad y la actividad. Separar los asuntos de la empresa ayuda a conservar esa protección.",
      },
    ],
    guideLink: "Lee nuestra guía sobre LLC en EE. UU.",
    offerEyebrow: "El paquete de formación",
    offerTitle: "Un comienzo claro para tu LLC en Wyoming.",
    offerBody:
      "Esto es exactamente lo que cubre el paquete de formación de $699 en Wyoming, con un contacto directo desde la presentación hasta la preparación bancaria.",
    offerNote:
      "Puedes empezar con un email breve. No necesitas reservar una llamada ni subir documentos para hacer la primera consulta.",
    stateChoiceNote:
      "El paquete publicado es para Wyoming. Si estás considerando otro estado, escríbenos antes y confirmaremos disponibilidad, alcance y precio.",
    audienceEyebrow: "Para fundadores, vivan donde vivan",
    audienceTitle: "Acompañamiento para crear tu empresa, vivas donde vivas.",
    audienceIntro:
      "Valls Solutions trabaja con ciudadanos y residentes de EE. UU. y con emprendedores internacionales que quieren crear una LLC en Wyoming.",
    audiences: [
      {
        label: "Fundadores en EE. UU.",
        title: "Ten en cuenta dónde desarrollas la actividad.",
        body: "Te ayudamos a organizar la formación en Wyoming y explicamos los pasos de presentación. Si resides u operas en otro estado, podemos comentar qué conviene revisar antes de elegir Wyoming.",
      },
      {
        label: "Fundadores en el extranjero",
        title: "Crea tu empresa desde otro país.",
        body: "No necesitas ser ciudadano estadounidense ni tener un ITIN para crear una LLC. Te explicamos los pasos del EIN y la solicitud según la información relevante para tu situación.",
      },
    ],
    processEyebrow: "Cómo funciona",
    processTitle: "Un proceso claro, con apoyo personal.",
    processIntro:
      "Sabrás qué está ocurriendo y qué necesitamos de ti en cada paso.",
    steps: [
      {
        title: "Cuéntanos sobre tu negocio",
        body: "Escríbenos tu país o estado de residencia, a qué se dedica tu negocio y tus preguntas.",
      },
      {
        title: "Revisamos juntos el paquete",
        body: "Confirmamos el servicio, el precio y la información necesaria antes de iniciar la presentación en Wyoming.",
      },
      {
        title: "Recibe los documentos de tu empresa",
        body: "Coordinamos la formación, la gestión de la solicitud del EIN y los servicios incluidos del primer año.",
      },
    ],
    bankingEyebrow: "Preparación bancaria empresarial",
    bankingTitle: "Prepara tu solicitud con orientación personalizada.",
    bankingBody:
      "Te explicamos los pasos habituales y te ayudamos a preparar los documentos para solicitar una cuenta empresarial, incluidas opciones como Mercury o Wise cuando encajen. Presentas la solicitud directamente al proveedor, que la revisará según sus propios requisitos.",
    bankingSteps: [
      {
        title: "Te ayudamos a prepararla",
        body: "Entiende el proceso y organiza la información de la empresa que te soliciten.",
      },
      {
        title: "Solicitas directamente",
        body: "Presenta la solicitud al banco o plataforma financiera que elijas.",
      },
      {
        title: "El proveedor la revisa",
        body: "Cada proveedor define sus requisitos y toma su propia decisión.",
      },
    ],
    guidesEyebrow: "Recursos para emprendedores",
    guidesTitle: "Respuestas útiles para crear una empresa en EE. UU.",
    guidesBody:
      "Guías claras sobre LLC, Wyoming, EIN, impuestos y gestión de una empresa.",
    guidesLink: "Ver todas las guías empresariales",
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Conoce el proceso antes de empezar.",
    faqs: [
      {
        question: "¿Qué incluye el paquete de LLC en Wyoming de $699?",
        answer:
          "Incluye la presentación de la formación en Wyoming y su tasa estatal, la gestión de la solicitud del EIN, el primer año de Registered Agent y dirección postal de Wyoming, una página web y un correo empresarial, y orientación para preparar una solicitud bancaria empresarial.",
      },
      {
        question: "¿Qué incluye la renovación anual de $449?",
        answer:
          "Desde el segundo año, incluye Registered Agent, dirección postal de Wyoming, presentación y tasa estatal del Annual Report, y alojamiento y mantenimiento de la página web. Si no renuevas, la web deja de estar publicada y te entregamos sus archivos.",
      },
      {
        question:
          "¿Pueden contratar el servicio ciudadanos y residentes de EE. UU.?",
        answer:
          "Sí. Trabajamos con fundadores que viven en Estados Unidos y en otros países. La información necesaria para el EIN y la solicitud bancaria depende del fundador y del negocio.",
      },
      {
        question: "¿Abrís la cuenta bancaria empresarial?",
        answer:
          "Te orientamos y te ayudamos a preparar los documentos de la solicitud. Tú la presentas directamente y el proveedor financiero decide sobre la apertura de la cuenta.",
      },
      {
        question: "¿Necesito un ITIN para crear una LLC?",
        answer:
          "No necesitas un ITIN simplemente para crear una LLC en Wyoming. La información para solicitar el EIN depende del responsable y del proceso del IRS.",
      },
    ],
    closingEyebrow: "El siguiente paso",
    closingTitle: "Demos forma a tu empresa.",
    closingBody:
      "Cuéntanos dónde resides y qué negocio estás poniendo en marcha. Te explicamos el paquete y los siguientes pasos en español o inglés.",
  },
};

export function HomePage({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const content = copy[locale];
  const prefix = english ? "" : "/es";
  const pricing = english ? "/pricing/" : "/es/precios/";
  const llcGuide = findBlogArticle(
    locale,
    english ? "do-i-need-an-llc" : "necesito-una-llc",
  )!;
  const guides = (
    english
      ? [
          "wyoming-llc",
          "choosing-llc-formation-service",
          "business-bank-account-llc",
        ]
      : ["llc-wyoming", "elegir-servicio-creacion-llc", "cuenta-bancaria-llc"]
  )
    .map((slug) => findBlogArticle(locale, slug)!)
    .filter(Boolean);
  const services: Array<{
    icon: FormationServiceIconName;
    title: string;
    body: string;
  }> = english
    ? [
        {
          icon: "formation",
          title: "Wyoming LLC formation",
          body: "State filing, formation fee and your company formation documents.",
        },
        {
          icon: "ein",
          title: "EIN application",
          body: "Application handling for your federal business identification number.",
        },
        {
          icon: "agent",
          title: "Registered Agent",
          body: "A registered contact for official state correspondence. Year one included.",
        },
        {
          icon: "address",
          title: "Wyoming mailing address",
          body: "An address for company correspondence, included for year one. Not a physical office.",
        },
        {
          icon: "website",
          title: "Website & business email",
          body: "A company website and business email set up for your business.",
        },
        {
          icon: "banking",
          title: "Business banking guidance",
          body: "Support preparing your application; you apply directly to the provider.",
        },
      ]
    : [
        {
          icon: "formation",
          title: "Creación de la LLC en Wyoming",
          body: "Presentación, tasa estatal y documentos de constitución de tu empresa.",
        },
        {
          icon: "ein",
          title: "Solicitud del EIN",
          body: "Gestión de la solicitud del número de identificación empresarial del IRS.",
        },
        {
          icon: "agent",
          title: "Agente registrado",
          body: "Un contacto registrado para comunicaciones oficiales. Primer año incluido.",
        },
        {
          icon: "address",
          title: "Dirección postal en Wyoming",
          body: "Para la correspondencia de tu empresa. Primer año incluido; no es una oficina física.",
        },
        {
          icon: "website",
          title: "Página web y correo empresarial",
          body: "Una web y un correo empresarial configurados para tu negocio.",
        },
        {
          icon: "banking",
          title: "Orientación bancaria empresarial",
          body: "Ayuda para preparar la solicitud; la presentas directamente al proveedor.",
        },
      ];
  return (
    <main id="contenido" className="home-page premium-home founder-home">
      <section className="premium-hero-band founder-hero-band">
        <div className="section-shell premium-hero founder-hero">
          <div className="premium-hero-copy founder-hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {content.eyebrow}
            </p>
            <h1>
              {content.headline}{" "}
              <em>{content.accent}</em>
            </h1>
            <p className="premium-lede">{content.lede}</p>
            <div className="hero-actions">
              <ContactActions locale={locale} ctaLabel={content.primaryCta} />
              <Link className="text-link" href="#package">
                {content.secondaryCta}
              </Link>
            </div>
            <p className="founder-price-line">{content.priceLine}</p>
          </div>
          <div className="premium-hero-media">
            <HeroVideo locale={locale} />
          </div>
        </div>
        <div className="section-shell founder-proof-band" aria-label={english ? "Valls Solutions experience" : "Experiencia de Valls Solutions"}>
          {content.proof.map((item) => (
            <div key={item.title}>
              <strong>{item.value}</strong>
              <span>{item.title}<small>{item.detail}</small></span>
            </div>
          ))}
        </div>
        <Link className="hero-scroll-cue" href="#package">
          {english ? "Discover your company package" : "Descubre tu paquete de empresa"}
          <span className="hero-scroll-rule" aria-hidden="true" />
        </Link>
      </section>
      <section className="premium-offer-band" id="package">
        <div className="section-shell premium-offer">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {content.offerEyebrow}
            </p>
            <h2>{content.offerTitle}</h2>
            <p className="premium-offer-intro">{content.offerBody}</p>
          </div>
          <p className="service-list-intro">
            {english
              ? "Included in the $699 Wyoming package"
              : "Incluido en el paquete de $699 en Wyoming"}
          </p>
          <ol className="premium-service-list">
            {services.map(({ icon, title, body }) => (
              <li key={title}>
                <FormationServiceIcon name={icon} />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="state-choice-note">{content.stateChoiceNote}</p>
        </div>
        <aside
          className="premium-price-summary"
          aria-label={
            english
              ? "Wyoming LLC package pricing"
              : "Precio del paquete de LLC en Wyoming"
          }
        >
          <div className="section-shell premium-price-inner">
            <div className="package-first-year">
              <span className="eyebrow">
                {english
                  ? "WYOMING LLC · YEAR ONE"
                  : "LLC EN WYOMING · PRIMER AÑO"}
              </span>
              <p className="premium-price">$699</p>
              <p>
                {english
                  ? "One-time formation package. State formation fee included."
                  : "Paquete de creación, pago único. Tasa estatal de creación incluida."}
              </p>
              <ContactActions
                locale={locale}
                ctaLabel={english ? "Start your LLC" : "Empezar mi LLC"}
              />
              <p className="premium-price-support">{content.offerNote}</p>
            </div>
            <div className="premium-renewal">
              <span>{english ? "FROM YEAR TWO" : "DESDE EL SEGUNDO AÑO"}</span>
              <strong>
                $449<small>/{english ? "year" : "año"}</small>
              </strong>
              <p>
                {english
                  ? "Registered Agent, mailing address, Annual Report filing and state tax, plus website hosting and maintenance."
                  : "Agente registrado, dirección postal, presentación y tasa estatal del Annual Report, alojamiento y mantenimiento web."}
              </p>
            </div>
            <Link className="text-link" href={pricing}>
              {english
                ? "All pricing details"
                : "Todos los detalles del precio"}
            </Link>
          </div>
        </aside>
      </section>
      <section
        className="premium-process-band"
        id={english ? "process" : "proceso"}
      >
        <div className="section-shell section-block">
          <div className="premium-section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-line" />
                {content.processEyebrow}
              </p>
              <h2>{content.processTitle}</h2>
            </div>
            <p>{content.processIntro}</p>
          </div>
          <FormationJourney locale={locale} steps={content.steps} />
          <p className="premium-process-after">
            {english
              ? "Then, we help you prepare for your business account application and put your included website and business email in place."
              : "Después te ayudamos a preparar la solicitud de la cuenta empresarial y ponemos en marcha la web y el correo incluidos."}
          </p>
        </div>
      </section>
      <section className="section-shell section-block premium-benefits">
        <div className="premium-section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {content.whyEyebrow}
            </p>
            <h2>{content.whyTitle}</h2>
          </div>
          <p>{content.whyIntro}</p>
        </div>
        <div className="premium-benefit-list">
          {content.reasons.map((reason, index) => (
            <article key={reason.title}>
              <span className="premium-index">0{index + 1}</span>
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </article>
          ))}
        </div>
        <Link className="text-link" href={`${prefix}/blog/${llcGuide.slug}/`}>
          {content.guideLink}
        </Link>
      </section>
      <section className="section-shell section-block premium-trust">
        <div className="premium-trust-statement">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            {english ? "WHY VALLS SOLUTIONS" : "POR QUÉ VALLS SOLUTIONS"}
          </p>
          <h2>
            {english
              ? "A real person. Clear answers. Every step explained."
              : "Una persona de contacto. Respuestas claras. Cada paso explicado."}
          </h2>
          <Link
            className="text-link"
            href={english ? "/about/" : "/es/nosotros/"}
          >
            {english ? "Meet Valls Solutions" : "Conoce Valls Solutions"}
          </Link>
        </div>
        <div className="premium-trust-points">
          {(english
            ? [
                [
                  "Experience you can build on",
                  "More than 100 LLCs formed. Practical experience with company documents, the formation process and the steps that follow.",
                ],
                [
                  "Direct answers, in your language",
                  "Communicate in English or Spanish. Start with a short email and move at your own pace.",
                ],
                [
                  "An offer you can understand",
                  "One published formation price, a clear annual renewal and a defined service scope before work begins.",
                ],
              ]
            : [
                [
                  "Experiencia para dar el siguiente paso",
                  "Más de 100 LLC constituidas. Experiencia práctica con los documentos, la creación de empresas y los pasos posteriores.",
                ],
                [
                  "Respuestas directas, en tu idioma",
                  "Atención en español e inglés. Empieza por email y avanza a tu ritmo.",
                ],
                [
                  "Una oferta que se entiende",
                  "Un precio de creación publicado, una renovación anual clara y el alcance definido antes de empezar.",
                ],
              ]
          ).map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-shell section-block premium-audience">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line" />
            {english
              ? "FOR FOUNDERS IN THE U.S. AND AROUND THE WORLD"
              : "PARA FUNDADORES EN EE. UU. Y EN OTROS PAÍSES"}
          </p>
          <h2>
            {english
              ? "One clear process, wherever you’re based."
              : "Un proceso claro, vivas donde vivas."}
          </h2>
          <p>{content.audienceIntro}</p>
        </div>
        <div>
          {content.audiences.map((a) => (
            <article key={a.label}>
              <span className="audience-label">{a.label}</span>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="premium-banking-band">
        <div className="section-shell section-block premium-banking">
          <div>
            <p className="eyebrow eyebrow-light">
              <span className="eyebrow-line" />
              {content.bankingEyebrow}
            </p>
            <h2>
              {english
                ? "Company formed. Banking next."
                : "Empresa creada. Siguiente paso: banca."}
            </h2>
            <p>{content.bankingBody}</p>
            <Link
              className="text-link"
              href={`${prefix}/blog/${english ? "business-bank-account-llc" : "cuenta-bancaria-llc"}/`}
            >
              {english
                ? "Read the banking preparation guide"
                : "Lee la guía de preparación bancaria"}
            </Link>
          </div>
          <ol>
            {content.bankingSteps.map((step, i) => (
              <li key={step.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-shell section-block premium-journal">
        <div className="premium-section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {content.guidesEyebrow}
            </p>
            <h2>
              {english
                ? "Know more. Build with confidence."
                : "Más información. Más confianza."}
            </h2>
          </div>
          <Link className="text-link" href={`${prefix}/blog/`}>
            {content.guidesLink}
          </Link>
        </div>
        <div className="premium-journal-grid">
          <Link
            className="premium-journal-feature"
            href={`${prefix}/blog/${llcGuide.slug}/`}
          >
            <span className="eyebrow">
              {english ? "THE STARTING POINT" : "EL PUNTO DE PARTIDA"}
            </span>
            <h3>{llcGuide.title}</h3>
            <p>{llcGuide.description}</p>
            <span className="text-link">
              {english ? "Read the guide" : "Leer la guía"}
            </span>
          </Link>
          <div className="premium-journal-rows">
            {guides.map((g, i) => (
              <Link href={`${prefix}/blog/${g.slug}/`} key={g.slug}>
                <span className="premium-index">0{i + 1}</span>
                <div>
                  <span className="journal-category">{g.category}</span>
                  <h3>{g.title}</h3>
                  <p>{g.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell section-block faq-section home-faq">
        <div className="section-intro">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            {content.faqEyebrow}
          </p>
          <h2>{content.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {content.faqs.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <LeadCaptureSection
        locale={locale}
        eyebrow={content.closingEyebrow}
        title={content.closingTitle}
        body={content.closingBody}
      />
    </main>
  );
}
