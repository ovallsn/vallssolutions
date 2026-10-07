import { ContactActions } from "@/components/ContactActions";
import type { Locale } from "@/lib/site";

export function PriceCard({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const included = english
    ? [
        "Wyoming LLC filing and state formation fee",
        "EIN application handling",
        "Registered Agent service for year one",
        "Wyoming mailing address for year one",
        "Company website and business email",
        "Guidance for your business bank application",
      ]
    : [
        "Presentación de la LLC y tasa estatal de creación en Wyoming",
        "Gestión de la solicitud del EIN (número de identificación empresarial)",
        "Agente registrado (Registered Agent) durante el primer año",
        "Dirección postal de Wyoming durante el primer año",
        "Página web y correo empresarial",
        "Orientación para solicitar una cuenta bancaria empresarial",
      ];

  return (
    <div className="price-card">
      <div className="price-card-top">
        <span>{english ? "WYOMING LLC PACKAGE" : "PAQUETE LLC EN WYOMING"}</span>
        <span className="price-pill">{english ? "One-time" : "Pago único"}</span>
      </div>
      <p className="price-label">{english ? "Formation and first-year essentials" : "Formación y esenciales del primer año"}</p>
      <p className="price-amount"><span>$</span>699</p>
      <p className="price-frequency">{english ? "One-time total · Wyoming state formation fee included" : "Total único · tasa estatal de creación en Wyoming incluida"}</p>
      <ul className="included-list">
        {included.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
      </ul>
      <ContactActions locale={locale} emailLabel={english ? "Get started by email" : "Empezar por email"} />
      <div className="price-renewal"><strong>{english ? "$449/year from year two" : "$449/año desde el segundo año"}</strong><p>{english ? "Renewal includes Registered Agent, Wyoming mailing address, Annual Report filing and state tax, and website hosting and maintenance." : "La renovación incluye agente registrado (Registered Agent), dirección postal de Wyoming, presentación y tasa estatal del informe anual (Annual Report), y alojamiento y mantenimiento de la web."}</p></div>
      <p className="price-legal">{english ? "The first Annual Report is filed with your first annual renewal in year two." : "El primer informe anual (Annual Report) se presenta con la primera renovación, desde el segundo año."}</p>
    </div>
  );
}
