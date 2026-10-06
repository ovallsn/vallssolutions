import { ContactActions } from "@/components/ContactActions";
import type { Locale } from "@/lib/site";

export function PriceCard({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const included = english
    ? [
        "Wyoming state formation filing",
        "EIN processing",
        "Registered Agent for year one",
        "Wyoming mailing address for year one",
        "Website and business email", "Guidance for your business bank application",
      ]
    : [
        "Presentación estatal de la LLC en Wyoming",
        "Gestión del EIN",
        "Registered Agent durante el primer año",
        "Dirección postal de Wyoming durante el primer año",
        "Página web y correo empresarial", "Orientación para solicitar una cuenta bancaria empresarial",
      ];

  return (
    <div className="price-card">
      <div className="price-card-top">
        <span>{english ? "WYOMING LLC" : "LLC EN WYOMING"}</span>
        <span className="price-pill">{english ? "Total price" : "Precio total"}</span>
      </div>
      <p className="price-label">{english ? "Formation and administrative support" : "Formación y acompañamiento administrativo"}</p>
      <p className="price-amount"><span>$</span>699</p>
      <p className="price-frequency">{english ? "One-time payment to get started" : "Pago único al iniciar"}</p>
      <ul className="included-list">
        {included.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
      </ul>
      <ContactActions locale={locale} emailLabel={english ? "Ask us about your LLC" : "Consultar sobre mi LLC"} />
      <p className="price-renewal"><strong>{english ? "$449/year from year two." : "$449/año desde el segundo año."}</strong> {english ? "Includes Registered Agent renewal, Wyoming mailing address, Annual Report filing and state tax, and website maintenance." : "Incluye Registered Agent, dirección postal de Wyoming, presentación y tasa estatal del Annual Report, y mantenimiento de la web."}</p>
      <p className="price-legal">{english ? "Annual Reports start with the first annual renewal; they are not part of the initial formation package." : "El Annual Report corresponde a la primera renovación anual, no al paquete inicial de creación."}</p>
    </div>
  );
}
