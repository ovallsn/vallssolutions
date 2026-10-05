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
        "First Wyoming Annual Report",
        "Guidance for your business bank application",
      ]
    : [
        "Presentación estatal de la LLC en Wyoming",
        "Gestión del EIN",
        "Registered Agent durante el primer año",
        "Dirección postal de Wyoming durante el primer año",
        "Primer Annual Report de Wyoming",
        "Orientación para solicitar una cuenta bancaria empresarial",
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
      <p className="price-renewal"><strong>{english ? "$449/year from year two." : "$449/año desde el segundo año."}</strong> {english ? "Includes Registered Agent renewal, mailing address and Annual Report service." : "Incluye renovación del Registered Agent, dirección postal y gestión del Annual Report."}</p>
      <p className="price-legal">{english ? "Wyoming's state Annual Report/License Tax is separate from the renewal service and starts at $60/year; the amount can vary based on the LLC's Wyoming assets." : "La tasa estatal del Annual Report/License Tax de Wyoming se paga aparte desde el segundo año y parte de $60/año; puede variar según los activos de la LLC en Wyoming."}</p>
    </div>
  );
}
