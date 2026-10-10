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
  otherStatePrompt: string;
  otherStateCta: string;
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
    eyebrow: "U.S. LLC formation for founders at home and abroad",
    headline: "Start your U.S. LLC.",
    accent: "With real guidance.",
    lede: "We form LLCs in Wyoming and other U.S. states, with EIN assistance and guidance for a business bank application. Support in English or Spanish.",
    primaryCta: "Start your LLC",
    secondaryCta: "See the package",
    priceLine: "Wyoming package: $699 one-time · $449/year from year two",
    otherStatePrompt: "We recommend Wyoming for its published price. We also form LLCs in other U.S. states; ask for a state-specific quote.",
    otherStateCta: "Ask about another state",
    proof: [
      {
        value: "100+",
        title: "LLCs formed",
        detail: "Practical formation experience.",
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
      "We also form LLCs in other U.S. states. Tell us where your business will operate, and we will confirm the scope and price for that state before we begin.",
    audienceEyebrow: "For founders wherever they live",
    audienceTitle: "Support for founders in the U.S. and around the world.",
    audienceIntro:
      "We work with U.S. citizens, U.S. residents and international founders. We can form LLCs in other states; the $699 formation and $449 annual renewal prices shown here apply to Wyoming. We confirm scope and pricing for another state before work begins.",
    audiences: [
      {
        label: "U.S.-based founders",
        title: "Build around where you do business.",
        body: "We can coordinate an LLC formation in Wyoming or another U.S. state. Tell us where your business operates and we will confirm the filing scope and price before we begin.",
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
        title: "Confirm the state and scope",
        body: "We agree on the state, included services, price and information needed before beginning the filing.",
      },
      {
        title: "Receive your company documents",
        body: "We coordinate the state filing and the services included in your confirmed package.",
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
        question: "Can you form an LLC outside Wyoming?",
        answer:
          "Yes. We also form LLCs in other U.S. states. The published $699 formation package and $449 annual renewal apply to Wyoming; we confirm the scope and price for another state before work begins.",
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
        question: "Do I need an ITIN to form a U.S. LLC?",
        answer:
          "An ITIN is not required simply to form a U.S. LLC. EIN application information depends on the responsible party and IRS process.",
      },
    ],
    closingEyebrow: "Your next step",
    closingTitle: "Let’s make your company happen.",
    closingBody:
      "Tell us where you are based and what you are building. We will explain the package and next steps in English or Spanish.",
  },
  es: {
    eyebrow:
      "Creación de LLC en EE. UU. para fundadores en cualquier país",
    headline: "Crea tu LLC en EE. UU.",
    accent: "Con apoyo personal.",
    lede: "Creamos LLC en Wyoming y otros estados, con ayuda para el EIN y orientación para solicitar una cuenta empresarial. Atención en español o inglés.",
    primaryCta: "Empezar mi LLC",
    secondaryCta: "Ver el paquete",
    priceLine: "Paquete de Wyoming: $699 · $449/año desde el segundo año",
    otherStatePrompt: "Recomendamos Wyoming por su precio publicado. También creamos LLC en otros estados de EE. UU.; pide un presupuesto por estado.",
    otherStateCta: "Consultar otro estado",
    proof: [
      {
        value: "100+",
        title: "LLC constituidas",
        detail: "Experiencia práctica en formación.",
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
      "También creamos LLC en otros estados de EE. UU. Cuéntanos dónde operará tu negocio y confirmaremos el alcance y el precio antes de empezar.",
    audienceEyebrow: "Para fundadores, vivan donde vivan",
    audienceTitle: "Acompañamiento para crear tu empresa, vivas donde vivas.",
    audienceIntro:
      "Trabajamos con ciudadanos y residentes de EE. UU. y con emprendedores internacionales. También creamos LLC en otros estados; los precios publicados de $699 por la formación y $449 al año corresponden a Wyoming. Confirmaremos el alcance y el presupuesto de otro estado antes de empezar.",
    audiences: [
      {
        label: "Fundadores en EE. UU.",
        title: "Ten en cuenta dónde desarrollas la actividad.",
        body: "Podemos coordinar la creación de LLC en Wyoming o en otro estado de EE. UU. Cuéntanos dónde opera tu negocio y confirmaremos el trámite y el precio antes de empezar.",
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
        title: "Confirmamos el estado y el alcance",
        body: "Acordamos el estado, los servicios incluidos, el precio y la información necesaria antes de iniciar la presentación.",
      },
      {
        title: "Recibe los documentos de tu empresa",
        body: "Coordinamos la presentación estatal y los servicios incluidos en el paquete acordado.",
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
        question: "¿Podéis crear una LLC fuera de Wyoming?",
        answer:
          "Sí. También creamos LLC en otros estados de EE. UU. El paquete publicado de $699 y la renovación anual de $449 corresponden a Wyoming; confirmaremos el alcance y el precio de otro estado antes de empezar.",
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
        question: "¿Necesito un ITIN para crear una LLC en EE. UU.?",
        answer:
          "No necesitas un ITIN simplemente para crear una LLC en Estados Unidos. La información para solicitar el EIN depende del responsable y del proceso del IRS.",
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
  const contact = english ? "/contact/" : "/es/contacto/";
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
          title: "LLC formation",
          body: "We coordinate the state filing and confirm the documents for your selected state.",
        },
        {
          icon: "ein",
          title: "EIN application",
          body: "Application handling for your federal business identification number.",
        },
        {
          icon: "agent",
          title: "Registered Agent",
          body: "Wyoming Registered Agent service to receive official state notices for your LLC. Year one included.",
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
          title: "Creación de LLC",
          body: "Coordinamos la presentación estatal y confirmamos los documentos para el estado que elijas.",
        },
        {
          icon: "ein",
          title: "Solicitud del EIN",
          body: "Gestión de la solicitud del número de identificación empresarial del IRS.",
        },
        {
          icon: "agent",
          title: "Agente registrado",
          body: "Servicio de agente registrado en Wyoming para recibir notificaciones oficiales sobre tu LLC. Primer año incluido.",
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
            <Link className="founder-state-prompt" href={contact}>
              {content.otherStatePrompt}
            </Link>
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
          <p className="state-choice-note">
            {content.stateChoiceNote} <Link href={contact}>{content.otherStateCta}</Link>
          </p>
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
              <p className="premium-price premium-price-value">$699</p>
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
              <strong className="premium-price-value">
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
