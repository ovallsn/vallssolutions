"use client";

import { useState } from "react";
import type { Locale } from "@/lib/site";

type Step = { title: string; body: string };

export function FormationJourney({ locale, steps }: { locale: Locale; steps: Step[] }) {
  const [selected, setSelected] = useState(0);
  const en = locale === "en";
  const details = en ? [
    ["A conversation, not a complicated form.", "Tell us where you live, what your business does and the company name you have in mind. We answer your questions before you decide.", "Your first step", "Email · English or Spanish"],
    ["The scope is clear before we start.", "Review the $699 package, the included services and the $449 renewal from year two. We explain the information needed to move forward.", "Your formation package", "$699 · Wyoming formation fee included"],
    ["Your company takes shape.", "We coordinate the Wyoming filing and EIN application handling, then help organize your banking application and company website. Processing times depend on the authorities and providers.", "Your business essentials", "LLC · EIN · Address · Website"],
  ] : [
    ["Una conversación, sin formularios complicados.", "Cuéntanos dónde resides, a qué se dedica tu negocio y qué nombre tienes en mente. Respondemos tus preguntas antes de que decidas.", "Tu primer paso", "Email · Español o inglés"],
    ["El alcance queda claro antes de empezar.", "Revisa el paquete de $699, los servicios incluidos y la renovación de $449 desde el segundo año. Te explicamos la información necesaria para avanzar.", "Tu paquete de creación", "$699 · Tasa de creación de Wyoming incluida"],
    ["Tu empresa empieza a tomar forma.", "Coordinamos la presentación en Wyoming y la gestión del EIN; después te ayudamos con la solicitud bancaria y la web. Los plazos dependen de autoridades y proveedores.", "Los esenciales de tu negocio", "LLC · EIN · Dirección · Web"],
  ];
  return (
    <div className="formation-journey">
      <ol className="journey-controls">
        {steps.map((step, index) => (
          <li key={step.title}>
            <button type="button" aria-expanded={selected === index} aria-controls="journey-detail" onClick={() => setSelected(index)}>
              <span className="journey-number">0{index + 1}</span>
              <span><strong>{step.title}</strong><small>{step.body}</small></span>
              <span aria-hidden="true">↗</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="journey-detail" id="journey-detail" aria-live="polite" aria-atomic="true">
        <div className="journey-preview" aria-hidden="true">
          <span className="art-label">VALLS SOLUTIONS · 0{selected + 1}</span>
          <img src="/assets/media/valls-single-ribbon.svg" alt="" width="42" height="42" />
          <strong>{details[selected][2]}</strong>
          <span>{details[selected][3]}</span>
          <div className="journey-progress"><i style={{ width: `${((selected + 1) / steps.length) * 100}%` }} /></div>
        </div>
        <h3>{details[selected][0]}</h3>
        <p>{details[selected][1]}</p>
      </div>
    </div>
  );
}
