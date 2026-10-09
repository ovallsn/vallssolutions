import type { Locale } from "@/lib/site";

export type LegalDocumentKey = "legalNotice" | "privacy" | "cookies" | "terms";
export type LegalText = string | { label: string; href: string };

export type LegalSection = {
  heading: string;
  paragraphs: LegalText[][];
  list?: LegalText[][];
};

export type LegalDocumentContent = {
  title: string;
  description: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export const LEGAL_DOCUMENTS: Record<LegalDocumentKey, Record<Locale, LegalDocumentContent>> = {
  legalNotice: {
    en: {
      title: "Legal notice",
      description: "Company identity, contact details and the scope of the Valls Solutions website.",
      intro: "This notice identifies the operator of vallssolutions.com and explains the purpose and limits of the information published here.",
      updated: "Last updated: 8 October 2026",
      sections: [
        {
          heading: "Website operator",
          paragraphs: [
            ["This website is operated by Valls Solutions LLC, a limited liability company formed in Wyoming, United States."],
            ["Business mailing and principal-office address: 30 N Gould St Ste N, Sheridan, WY 82801, United States. Registered agent: Northwest Registered Agent Service Inc."],
            ["Contact: ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, "."],
          ],
        },
        {
          heading: "Website purpose and information",
          paragraphs: [
            ["The website describes LLC formation and administrative support offered by Valls Solutions. Website information is general and does not replace advice from a qualified lawyer, tax professional, immigration adviser or financial institution."],
            ["Government agencies, banks and other providers make their own decisions and control their own processing times. Valls Solutions does not promise an EIN, bank account, tax result, immigration outcome or government approval."],
          ],
        },
        {
          heading: "Related information",
          paragraphs: [
            ["Read our ", { label: "privacy notice", href: "/privacy/" }, ", ", { label: "cookie notice", href: "/cookies/" }, " and ", { label: "service terms", href: "/terms/" }, ". For questions, contact us at ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, "."],
          ],
        },
      ],
    },
    es: {
      title: "Aviso legal",
      description: "Identidad de la empresa, datos de contacto y alcance de la web de Valls Solutions.",
      intro: "Este aviso identifica a quien opera vallssolutions.com y explica el propósito y los límites de la información publicada aquí.",
      updated: "Última actualización: 8 de octubre de 2026",
      sections: [
        {
          heading: "Titular de la web",
          paragraphs: [
            ["Esta web está operada por Valls Solutions LLC, una sociedad de responsabilidad limitada constituida en Wyoming, Estados Unidos."],
            ["Domicilio postal y oficina principal de la empresa: 30 N Gould St Ste N, Sheridan, WY 82801, Estados Unidos. Agente registrado: Northwest Registered Agent Service Inc."],
            ["Contacto: ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, "."],
          ],
        },
        {
          heading: "Finalidad de la web e información",
          paragraphs: [
            ["La web describe los servicios de constitución de LLC y apoyo administrativo de Valls Solutions. La información es general y no sustituye el asesoramiento de un abogado, profesional fiscal, asesor migratorio o entidad financiera cualificados."],
            ["Las autoridades, los bancos y otros proveedores toman sus propias decisiones y controlan sus plazos. Valls Solutions no garantiza la obtención de un EIN, una cuenta bancaria, un resultado fiscal, un resultado migratorio ni la aprobación de una autoridad."],
          ],
        },
        {
          heading: "Información relacionada",
          paragraphs: [
            ["Consulta nuestro ", { label: "aviso de privacidad", href: "/es/privacidad/" }, ", el ", { label: "aviso de cookies", href: "/es/cookies/" }, " y las ", { label: "condiciones del servicio", href: "/es/terminos/" }, ". Para cualquier consulta, escríbenos a ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, "."],
          ],
        },
      ],
    },
  },
  privacy: {
    en: {
      title: "Privacy notice",
      description: "How Valls Solutions handles website, enquiry and service-related personal information.",
      intro: "This notice describes personal information handled through the public website, enquiries and services. An LLC service record contains the business and contact fields and final official formation and EIN records described below. Passport copies and temporary application material are handled separately; website requests, email messages and payment records are separate records.",
      updated: "Last updated: 9 October 2026",
      sections: [
        {
          heading: "Who is responsible and how to contact us",
          paragraphs: [
            ["The data controller is Valls Solutions LLC, 30 N Gould St Ste N, Sheridan, WY 82801, United States. Contact privacy questions or requests at ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, "."],
          ],
        },
        {
          heading: "Information and purposes",
          paragraphs: [
            ["When you visit the website, service providers may process limited technical information such as your IP address, requested page, browser and device details, and request time. This is used to operate, protect and measure the performance of the website."],
            ["The website has no customer account or online payment portal. The enquiry form prepares an email in your email app; it does not submit your details to Valls Solutions unless you review and send that email. If sent, the message includes your name, email address, country or U.S. state of residence, business activity and any optional details you add."],
            ["For each customer LLC, a service record is maintained separately from this public website. Website request data, enquiry messages and payment or accounting records are handled separately for the purposes described in this notice. Do not put identity documents, SSNs, ITINs or other sensitive information in an initial enquiry or LLC administrative notes. If a requested service needs a passport or other supporting information, Valls Solutions will tell you what is needed and receive it directly through WhatsApp Business or email; source documents are not stored in the LLC service record."],
          ],
          list: [
            ["Respond to enquiries and take steps requested before entering a service agreement."],
            ["Deliver the service you request, keep business and payment records, and meet legal obligations."],
            ["Operate, secure and troubleshoot the public website."],
          ],
        },
        {
          heading: "Information in an LLC service record",
          paragraphs: [
            ["Each LLC service record contains the following business and contact fields:"],
          ],
          list: [
            ["LLC legal name and formation jurisdiction."],
            ["Primary customer or authorized contact name and email address."],
            ["Annual service amount and the date to contact the customer about optional renewal; renewal is not charged automatically."],
            ["Employer Identification Number (EIN) and state filing number."],
            ["Registered agent name and registered-agent address."],
            ["Industry or business activity, including a classification code when applicable, and the company description."],
            ["Administrative notes limited to matters concerning that LLC."],
            ["The LLC service record also keeps the filed Articles of Organization, the assigned EIN and any official IRS confirmation we receive, so we can provide these final records to you."],
          ],
        },
        {
          heading: "Supporting documents for a service",
          paragraphs: [
            ["For an EIN service, send the requested supporting information to Valls Solutions directly through WhatsApp Business or email. We use it only to prepare and submit the requested application, entering the information required for the filing into the filing platform and sharing relevant application information with the IRS as needed. Passport copies, source application details and temporary supporting material are not stored in the LLC service record. We delete our working copies of passport images, source application details and other temporary supporting information as soon as they are no longer needed for the service, unless the law requires us to retain them longer."],
            ["The filed Articles of Organization, assigned EIN and any official IRS confirmation we receive remain in the LLC service record so we can provide these final records to you. WhatsApp Business, email providers, the filing platform and the IRS may process or retain the information they receive under their own terms and rules. Deleting our working copies does not delete copies held by those services."],
          ],
        },
        {
          heading: "Lawful bases where data-protection law applies",
          paragraphs: [
            ["For enquiries and requested pre-contract steps, we use information to respond and take the steps you ask us to take. For contracted services, we use it to perform the agreement. We use limited technical information to protect and operate the website based on our legitimate interests, and retain records where required by law."],
          ],
        },
        {
          heading: "Providers and disclosures",
          paragraphs: [
            ["Website hosting, security and performance providers may process limited technical information to operate, protect and measure the website. Email and messaging providers process the messages and documents you choose to send. To provide an EIN service, we share the necessary application information with our filing service provider and the IRS. Payment providers and banks process transaction information. These providers apply their own privacy and retention rules."],
            ["We do not sell personal information or use it for cross-site targeted advertising. Information may also be disclosed where required by law."],
          ],
        },
        {
          heading: "Retention and international processing",
          paragraphs: [
            ["Enquiry messages are kept while needed to respond and manage the resulting relationship, and afterward only for applicable recordkeeping, legal claims or compliance. The filed Articles of Organization, assigned EIN and any official IRS confirmation received remain in the LLC service record for as long as needed to administer the service and provide the final records to you, subject to legal requirements. We delete our working copies of passport images, source application details and other temporary supporting information as soon as they are no longer needed for the service, unless the law requires us to retain them longer. Security and performance information is kept according to the providers' operational settings and for as long as reasonably needed for those purposes."],
            ["Valls Solutions is a U.S. company and its website and service providers may process information in other countries. Where data-protection law requires a specific safeguard for an international transfer, the applicable safeguard must be identified for the relevant provider and service before customer information is collected."],
          ],
        },
        {
          heading: "Your choices and rights",
          paragraphs: [
            ["You can email ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, " to ask about access, correction, deletion, restriction or other rights available under the law that applies to you. We may need to verify your request before acting."],
            ["If you are in the European Union, you may also complain to your local data-protection supervisory authority. Rights and response requirements depend on the law that applies to the processing."],
            ["See the separate ", { label: "cookie notice", href: "/cookies/" }, " for browser storage and security cookies. This notice may be updated when the website, service providers or data practices change."],
          ],
        },
      ],
    },
    es: {
      title: "Aviso de privacidad",
      description: "Cómo trata Valls Solutions los datos personales de la web, las consultas y los servicios.",
      intro: "Este aviso describe los datos personales tratados a través de la web pública, las consultas y los servicios. El expediente de servicio de cada LLC contiene los datos empresariales y de contacto y los documentos oficiales finales de constitución y EIN descritos abajo. Las copias del pasaporte y el material temporal de la solicitud se tratan por separado; los datos de visitas a la web, emails y pagos son registros independientes.",
      updated: "Última actualización: 9 de octubre de 2026",
      sections: [
        {
          heading: "Responsable y contacto",
          paragraphs: [
            ["El responsable del tratamiento es Valls Solutions LLC, 30 N Gould St Ste N, Sheridan, WY 82801, Estados Unidos. Para consultas o solicitudes de privacidad, escribe a ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, "."],
          ],
        },
        {
          heading: "Datos y finalidades",
          paragraphs: [
            ["Cuando visitas la web, los proveedores de servicios pueden tratar información técnica limitada, como la dirección IP, la página solicitada, el navegador y dispositivo, y la hora de la solicitud. Se utiliza para mantener, proteger y medir el rendimiento de la web."],
            ["La web no tiene cuentas de cliente ni portal de pago. El formulario de consulta prepara un email en tu aplicación de correo; no envía tus datos a Valls Solutions hasta que revises y envíes ese correo. Si lo envías, el mensaje incluye tu nombre, dirección de email, país o estado de EE. UU. de residencia, actividad empresarial y cualquier detalle adicional que incluyas."],
            ["Para cada LLC cliente, el expediente de servicio se mantiene separado de esta web pública. Los datos técnicos de las visitas a la web, los mensajes de consulta y los registros de pago o contabilidad se tratan por separado para las finalidades explicadas en este aviso. No incluyas documentos de identidad, SSN, ITIN ni otros datos sensibles en una consulta inicial ni en las notas administrativas de la LLC. Si un servicio solicitado requiere un pasaporte u otra información justificativa, Valls Solutions te indicará qué hace falta y la recibirá directamente por WhatsApp Business o email; los documentos originales no se guardan en el expediente de servicio de la LLC."],
          ],
          list: [
            ["Responder consultas y realizar las gestiones que pidas antes de contratar un servicio."],
            ["Prestar el servicio contratado, conservar registros empresariales y de pago, y cumplir obligaciones legales."],
            ["Mantener, proteger y resolver problemas de la web pública."],
          ],
        },
        {
          heading: "Información del expediente de servicio de cada LLC",
          paragraphs: [
            ["Cada expediente de servicio de LLC contiene estos datos empresariales y de contacto:"],
          ],
          list: [
            ["Nombre legal de la LLC y jurisdicción de constitución."],
            ["Nombre y email del contacto principal del cliente o de la persona autorizada."],
            ["Importe del servicio anual y fecha para contactar al cliente sobre la renovación voluntaria; no se cobra automáticamente."],
            ["Número de identificación fiscal de la empresa (EIN) y número de presentación estatal."],
            ["Nombre y dirección del agente registrado."],
            ["Sector o actividad empresarial, incluido el código de clasificación cuando corresponda, y descripción de la empresa."],
            ["Notas administrativas limitadas a asuntos de esa LLC."],
            ["El expediente de servicio de la LLC también conserva los Articles of Organization presentados, el EIN asignado y cualquier confirmación oficial del IRS que recibamos, para poder entregarte esos documentos finales."],
          ],
        },
        {
          heading: "Documentos justificativos para un servicio",
          paragraphs: [
            ["Para un servicio de EIN, envía la información justificativa requerida directamente a Valls Solutions por WhatsApp Business o email. La utilizamos únicamente para preparar y presentar la solicitud; introducimos en la plataforma de tramitación los datos necesarios para el trámite y compartimos con el IRS la información pertinente cuando sea necesario. Las copias del pasaporte, los datos originales de la solicitud y el material justificativo temporal no se guardan en el expediente de servicio de la LLC. Eliminamos nuestras copias de los pasaportes, los datos originales de la solicitud y demás información justificativa temporal de nuestros registros en cuanto dejan de ser necesarios para el servicio, salvo que la ley nos obligue a conservarlos durante más tiempo."],
            ["Los Articles of Organization presentados, el EIN asignado y cualquier confirmación oficial del IRS que recibamos permanecen en el expediente de servicio de la LLC para poder entregarte esos documentos finales. WhatsApp Business, los proveedores de correo, la plataforma de tramitación y el IRS pueden tratar o conservar la información que reciban conforme a sus propias condiciones y reglas. Eliminar nuestras copias de trabajo no elimina las copias que mantengan esos servicios."],
          ],
        },
        {
          heading: "Bases legales cuando se aplique la normativa de protección de datos",
          paragraphs: [
            ["Para responder consultas y realizar gestiones previas que solicites, usamos los datos para contestarte y hacer esas gestiones. Para los servicios contratados, los usamos para cumplir el acuerdo. Tratamos datos técnicos limitados para proteger y mantener la web conforme a nuestro interés legítimo, y conservamos registros cuando lo exija la ley."],
          ],
        },
        {
          heading: "Proveedores y comunicaciones de datos",
          paragraphs: [
            ["Los proveedores de alojamiento, seguridad y medición del rendimiento pueden tratar información técnica limitada para mantener y proteger la web y medir su rendimiento. Los proveedores de correo y mensajería tratan los mensajes y documentos que decidas enviar. Para prestar un servicio de EIN, compartimos la información necesaria de la solicitud con nuestro proveedor de tramitación y el IRS. Los proveedores de pago y las entidades bancarias tratan los datos de las transacciones. Cada proveedor aplica sus propias condiciones de privacidad y conservación."],
            ["No vendemos datos personales ni los utilizamos para publicidad dirigida entre sitios. También podremos comunicarlos cuando lo exija la ley."],
          ],
        },
        {
          heading: "Conservación y tratamiento internacional",
          paragraphs: [
            ["Conservamos los mensajes de consulta mientras sean necesarios para responder y gestionar la relación resultante, y después solo durante el tiempo necesario para cumplir las obligaciones de registro, atender reclamaciones o cumplir la ley. Los Articles of Organization presentados, el EIN asignado y cualquier confirmación oficial del IRS recibida permanecen en el expediente de servicio de la LLC durante el tiempo necesario para administrar el servicio y facilitarte esos documentos finales, conforme a las obligaciones legales. Eliminamos nuestras copias de los pasaportes, los datos originales de la solicitud y demás información justificativa temporal de nuestros registros en cuanto dejan de ser necesarios para el servicio, salvo que la ley nos obligue a conservarlos durante más tiempo. Los datos de seguridad y rendimiento se conservan según la configuración operativa de los proveedores y durante el tiempo razonablemente necesario para esas finalidades."],
            ["Valls Solutions es una empresa estadounidense y los proveedores de la web y de los servicios pueden tratar datos en otros países. Cuando la normativa de protección de datos exija garantías concretas para una transferencia internacional, habrá que identificar la garantía aplicable al proveedor y servicio antes de recoger datos de clientes."],
          ],
        },
        {
          heading: "Opciones y derechos",
          paragraphs: [
            ["Puedes escribir a ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, " para solicitar acceso, rectificación, supresión, limitación u otros derechos reconocidos por la ley aplicable. Puede ser necesario verificar tu identidad antes de tramitar la solicitud."],
            ["Si resides en la Unión Europea, también puedes presentar una reclamación ante la autoridad de protección de datos de tu país. Los derechos y plazos de respuesta dependen de la normativa aplicable al tratamiento."],
            ["Consulta el ", { label: "aviso de cookies", href: "/es/cookies/" }, " para conocer el almacenamiento del navegador y las cookies de seguridad. Actualizaremos este aviso si cambian la web, sus proveedores o los tratamientos."],
          ],
        },
      ],
    },
  },
  cookies: {
    en: {
      title: "Cookie notice",
      description: "Browser storage and a conditional security cookie used by this website.",
      intro: "This notice describes browser storage and a security cookie that may be set if a security check is triggered.",
      updated: "Last updated: 9 October 2026",
      sections: [
        {
          heading: "What we observed",
          paragraphs: [
            ["The website does not use advertising cookies or optional analytics cookies. Its performance measurement tool does not read or store cookies or other browser storage."],
          ],
        },
        {
          heading: "Conditional security cookie",
          paragraphs: [
            ["A security provider may set the following cookie when a visitor passes a security check. It was not present in ordinary page responses we checked."],
          ],
          list: [
            ["cf_clearance — Cloudflare security service — remembers that a visitor passed a security check so it does not immediately appear again. It is set only when that check is used. Its duration depends on the security settings."],
          ],
        },
        {
          heading: "Preferences and future changes",
          paragraphs: [
            ["There are currently no optional cookie services in the website's consent inventory, so no cookie banner or preference storage is active. If Valls Solutions adds a non-essential cookie or similar browser-storage technology, this notice and the consent controls will be updated before that technology is loaded."],
            ["For questions about personal information, read our ", { label: "privacy notice", href: "/privacy/" }, " or contact ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, "."],
          ],
        },
      ],
    },
    es: {
      title: "Aviso de cookies",
      description: "Almacenamiento del navegador y una cookie de seguridad condicional de esta web.",
      intro: "Este aviso describe el almacenamiento del navegador y una cookie que podría instalarse si se activa una comprobación de seguridad.",
      updated: "Última actualización: 9 de octubre de 2026",
      sections: [
        {
          heading: "Qué hemos comprobado",
          paragraphs: [
            ["La web no utiliza cookies publicitarias ni cookies opcionales de analítica. La herramienta de medición del rendimiento no lee ni guarda cookies ni otro almacenamiento del navegador."],
          ],
        },
        {
          heading: "Cookie de seguridad condicional",
          paragraphs: [
            ["Un proveedor de seguridad puede instalar la siguiente cookie cuando un visitante supera una comprobación de seguridad. No apareció en las respuestas normales que revisamos."],
          ],
          list: [
            ["cf_clearance — servicio de seguridad de Cloudflare — recuerda que el visitante ha superado una comprobación de seguridad para no mostrarla inmediatamente otra vez. Solo se instala cuando se utiliza esa comprobación. Su duración depende de la configuración de seguridad."],
          ],
        },
        {
          heading: "Preferencias y cambios futuros",
          paragraphs: [
            ["Actualmente el inventario de consentimiento de la web no contiene servicios opcionales, por lo que no hay un banner de cookies ni almacenamiento de preferencias activo. Si Valls Solutions incorpora una cookie no esencial u otra tecnología similar, actualizaremos este aviso y los controles de consentimiento antes de cargarla."],
            ["Para consultas sobre datos personales, lee el ", { label: "aviso de privacidad", href: "/es/privacidad/" }, " o escribe a ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, "."],
          ],
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Service terms",
      description: "Formation package, final pricing, payment, start time, annual opt-in renewal and service expiry.",
      intro: "These terms describe Valls Solutions' Wyoming LLC formation and administrative-support packages for customers in the United States and European Union. The exact website and email scope is agreed with you before work begins.",
      updated: "Last updated: 9 October 2026",
      sections: [
        {
          heading: "Formation package and annual service",
          paragraphs: [
            ["The one-time formation package costs $699 and includes the Wyoming formation filing and state filing fee, EIN application handling, first-year Registered Agent service, first-year Wyoming mailing address, a company website and business email, and guidance for a business-bank application. It does not include the first Annual Report."],
            ["From year two, the annual service costs $449 per year. It includes Registered Agent service, a Wyoming mailing address, filing the Wyoming Annual Report and its state fee, and website hosting and maintenance."],
            ["Banking support is application guidance only. You submit the application directly and the bank or financial provider makes its own decision. Government agencies and other providers control their own decisions and processing times."],
          ],
        },
        {
          heading: "Final price and payment",
          paragraphs: [
            ["The total amount Valls Solutions charges is $699 for formation and $449 per year for the annual service from year two. No additional tax amount is added to these prices at payment."],
            ["Payment instructions are sent privately by email for a bank transfer to Valls Solutions' business account. Account details are not published on the website. The website does not process payments."],
          ],
        },
        {
          heading: "When work starts",
          paragraphs: [
            ["Valls Solutions will begin its work within 24 hours after payment is received. This is a commitment to start Valls Solutions' work; it is not a promise that a state filing, EIN or third-party decision will be completed within 24 hours."],
          ],
        },
        {
          heading: "Annual renewal is optional",
          paragraphs: [
            ["Renewal is not automatic. Before the current service term ends, Valls Solutions will contact you about the next annual service. The $449 charge will be made only if you choose to continue. If you do not opt in, there is no automatic renewal charge."],
            ["If you do not renew, the recurring Registered Agent and Wyoming mailing-address services, Annual Report filing service, website hosting and maintenance end when the current term expires. The company website is taken offline and its files are provided to you. You are responsible for arranging any replacement services and meeting ongoing requirements if you keep the LLC active. Post-expiration transition or step-by-step compliance support is not included."],
          ],
        },
        {
          heading: "Cancellation, withdrawal and refunds",
          paragraphs: [
            ["Nothing in these terms removes consumer rights that cannot lawfully be waived. Where the law permits, fees for work already performed are not refundable except where a refund is legally required."],
            ["If a consumer in the European Union asks Valls Solutions to begin during an applicable 14-day withdrawal period, Valls Solutions will obtain the express request and required acknowledgement before starting. If the consumer withdraws after work has begun, applicable law may require payment in proportion to the service already performed. The withdrawal right ends after full performance only where the required prior consent and acknowledgement have been given."],
            ["For a cancellation or withdrawal request, email ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, ". Any mandatory rights under the law applicable to your contract remain available."],
          ],
        },
        {
          heading: "Your information and separate privacy details",
          paragraphs: [
            ["The LLC service record contains the business details and final official formation and EIN records described in the ", { label: "privacy notice", href: "/privacy/" }, ". You are responsible for ensuring that the LLC and contact details you provide are accurate. Website request data, email communications and payment records are handled separately as described in that notice. Renewal dates are used to contact you about an optional renewal; no renewal payment is taken automatically."],
            ["For an EIN filing, send any requested passport or supporting information directly to Valls Solutions through WhatsApp Business or email. We use it only for the requested application, entering necessary information into the filing platform and sharing relevant application information with the IRS as needed. We keep the filed Articles of Organization, assigned EIN and any official IRS confirmation received in the LLC service record so we can provide them to you. Passport copies, source application details and other temporary supporting information are deleted from our working records once no longer needed for the service, unless the law requires longer retention. Messaging, email, filing-service and IRS systems may process or retain their own copies under their terms; see the ", { label: "privacy notice", href: "/privacy/" }, "."],
          ],
        },
      ],
    },
    es: {
      title: "Condiciones del servicio",
      description: "Paquete de formación, precio final, pago, inicio, renovación anual voluntaria y fin del servicio.",
      intro: "Estas condiciones describen los paquetes de constitución de LLC en Wyoming y apoyo administrativo de Valls Solutions para clientes de Estados Unidos y la Unión Europea. Acordamos contigo el alcance exacto de la web y el correo antes de empezar.",
      updated: "Última actualización: 9 de octubre de 2026",
      sections: [
        {
          heading: "Paquete de formación y servicio anual",
          paragraphs: [
            ["El paquete de formación cuesta 699 USD en un pago único e incluye la presentación de constitución en Wyoming y su tasa estatal, la gestión de la solicitud del EIN, el servicio de agente registrado (Registered Agent) durante el primer año, una dirección postal en Wyoming durante el primer año, una web empresarial y un correo de empresa, y orientación para solicitar una cuenta bancaria empresarial. No incluye el primer Annual Report."],
            ["Desde el segundo año, el servicio anual cuesta 449 USD al año. Incluye el agente registrado, una dirección postal de Wyoming, la presentación del Annual Report de Wyoming y su tasa estatal, y el alojamiento y mantenimiento de la web."],
            ["El apoyo bancario consiste en orientación para preparar la solicitud. Tú la presentas directamente y el banco o proveedor financiero toma su propia decisión. Las autoridades y otros proveedores controlan sus decisiones y plazos."],
          ],
        },
        {
          heading: "Precio final y pago",
          paragraphs: [
            ["El importe total que cobra Valls Solutions es de 699 USD por la formación y 449 USD al año por el servicio anual desde el segundo año. No se añade ningún importe fiscal adicional al pagar estos precios."],
            ["Enviaremos las instrucciones de pago por email para realizar una transferencia bancaria a la cuenta empresarial de Valls Solutions. No publicamos los datos de la cuenta en la web. La web no procesa pagos."],
          ],
        },
        {
          heading: "Inicio del trabajo",
          paragraphs: [
            ["Valls Solutions comenzará su trabajo en un plazo máximo de 24 horas desde la recepción del pago. Este plazo se refiere al inicio del trabajo de Valls Solutions; no garantiza que una autoridad, el IRS u otro proveedor complete un trámite o tome una decisión en 24 horas."],
          ],
        },
        {
          heading: "La renovación anual es voluntaria",
          paragraphs: [
            ["La renovación no es automática. Antes de que termine el periodo de servicio vigente, Valls Solutions te contactará para ofrecerte el siguiente servicio anual. Solo cobraremos los 449 USD si eliges continuar. Si no aceptas, no se realizará ningún cargo automático de renovación."],
            ["Si no renuevas, al terminar el periodo vigente finalizan los servicios recurrentes de agente registrado y dirección postal en Wyoming, la presentación del Annual Report, y el alojamiento y mantenimiento de la web. La web de la empresa dejará de estar publicada y te entregaremos sus archivos. Si mantienes activa la LLC, te corresponde contratar servicios sustitutos y cumplir sus requisitos continuos. No se incluye ayuda de transición ni asesoramiento paso a paso después del vencimiento."],
          ],
        },
        {
          heading: "Cancelación, desistimiento y reembolsos",
          paragraphs: [
            ["Estas condiciones no eliminan los derechos de consumidor que no puedan excluirse legalmente. Cuando la ley lo permita, el trabajo ya realizado no es reembolsable, salvo que la ley exija un reembolso."],
            ["Si un consumidor de la Unión Europea solicita que Valls Solutions empiece durante un plazo de desistimiento aplicable de 14 días, antes de empezar pediremos su solicitud expresa y el reconocimiento que exija la ley. Si desiste después de que comience el trabajo, la normativa aplicable puede exigir el pago proporcional del servicio ya realizado. El derecho de desistimiento solo termina tras completar todo el servicio cuando se hayan obtenido previamente el consentimiento y el reconocimiento exigidos."],
            ["Para solicitar una cancelación o desistimiento, escribe a ", { label: "info@vallssolutions.com", href: "mailto:info@vallssolutions.com" }, ". Se mantienen los derechos obligatorios que establezca la normativa aplicable a tu contrato."],
          ],
        },
        {
          heading: "Tus datos e información de privacidad del servicio",
          paragraphs: [
            ["El expediente de servicio de cada LLC contiene los datos empresariales y los documentos oficiales finales de constitución y EIN descritos en el ", { label: "aviso de privacidad", href: "/es/privacidad/" }, ". Te corresponde comprobar que los datos de la LLC y del contacto que facilites sean correctos. Los datos técnicos de visitas, las comunicaciones por email y los registros de pago se tratan por separado según ese aviso. La fecha de renovación se utiliza para contactarte sobre una posible renovación voluntaria; no se realiza ningún cobro automático."],
            ["Para una solicitud de EIN, envía cualquier pasaporte o información justificativa requerida directamente a Valls Solutions por WhatsApp Business o email. La utilizamos únicamente para la solicitud; introducimos los datos necesarios en la plataforma de tramitación y compartimos la información pertinente con el IRS cuando sea necesario. Conservamos los Articles of Organization presentados, el EIN asignado y cualquier confirmación oficial del IRS recibida en el expediente de servicio de la LLC para poder entregártelos. Eliminamos las copias del pasaporte, los datos originales de la solicitud y demás información justificativa temporal de nuestros registros de trabajo cuando dejan de ser necesarios para el servicio, salvo obligación legal de conservación. Los sistemas de mensajería, correo, proveedor de tramitación y el IRS pueden tratar o conservar sus propias copias conforme a sus condiciones; consulta el ", { label: "aviso de privacidad", href: "/es/privacidad/" }, "."],
          ],
        },
      ],
    },
  },
};
