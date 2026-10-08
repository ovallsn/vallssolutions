import type { Locale } from "@/lib/site";

export function FormationVisual({ locale }: { locale: Locale }) {
  const en = locale === "en";
  return (
    <figure className="formation-visual">
      <div className="formation-art" aria-hidden="true">
        <div className="formation-orbit" />
        <div className="formation-paper">
          <img src="/assets/media/valls-single-ribbon.svg" alt="" width="32" height="32" />
          <span className="art-label">WYOMING · USA</span>
          <strong>{en ? "Your company.\nA new beginning." : "Tu empresa.\nUn nuevo comienzo."}</strong>
          <div className="paper-rule" />
          <dl>
            <div><dt>{en ? "Company" : "Empresa"}</dt><dd>Your Company LLC</dd></div>
            <div><dt>Registered Agent</dt><dd>{en ? "Year one included" : "Primer año incluido"}</dd></div>
            <div><dt>{en ? "Mailing address" : "Dirección postal"}</dt><dd>Wyoming, U.S.</dd></div>
          </dl>
        </div>
        <div className="formation-ein">
          <span className="art-label">EIN</span>
          <strong>{en ? "Your business ID" : "Tu ID empresarial"}</strong>
          <span>{en ? "Application handling included" : "Gestión de solicitud incluida"}</span>
        </div>
        <div className="formation-web">
          <div className="web-bar"><i /><i /><i /><span>yourcompany.com</span></div>
          <strong>Your Company LLC</strong>
          <span>hello@yourcompany.com</span>
          <div className="web-lines"><i /><i /></div>
        </div>
        <span className="formation-seal">{en ? "Built around your business" : "Pensado para tu negocio"}</span>
      </div>
      <figcaption>{en ? "Formation, EIN and business essentials. One coordinated package." : "Creación, EIN y esenciales del negocio. Un paquete coordinado."}</figcaption>
    </figure>
  );
}
