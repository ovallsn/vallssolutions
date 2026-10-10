"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/site";

type Step = { title: string; body: string };

export function FormationJourney({
  locale,
  steps,
}: {
  locale: Locale;
  steps: Step[];
}) {
  const [selected, setSelected] = useState(0);
  const mobileTrack = useRef<HTMLDivElement>(null);
  const en = locale === "en";
  const details: [string, string, string, string][] = en ? [
    ["A conversation, not a complicated form.", "Tell us where you live, what your business does and the company name you have in mind. We answer your questions before you decide.", "Your first step", "Email · English or Spanish"],
    ["The scope is clear before we start.", "Review the Wyoming package or ask for another state. We confirm the included services, filing scope and price before work begins.", "Your formation plan", "$699 · Wyoming package"],
    ["Your company takes shape.", "We coordinate the filing in your selected state. The Wyoming package includes EIN application handling and first-year services; other state-specific services are confirmed in your quote.", "Your business essentials", "LLC · EIN · Address · Website"],
  ] : [
    ["Una conversación, sin formularios complicados.", "Cuéntanos dónde resides, a qué se dedica tu negocio y qué nombre tienes en mente. Respondemos tus preguntas antes de que decidas.", "Tu primer paso", "Email · Español o inglés"],
    ["El alcance queda claro antes de empezar.", "Revisa el paquete de Wyoming o consúltanos por otro estado. Confirmamos los servicios, el trámite y el precio antes de empezar.", "Tu plan de formación", "$699 · Paquete de Wyoming"],
    ["Tu empresa empieza a tomar forma.", "Coordinamos la presentación en el estado que elijas. El paquete de Wyoming incluye la gestión del EIN y los servicios del primer año; los servicios de otro estado se confirman en el presupuesto.", "Los esenciales de tu negocio", "LLC · EIN · Dirección · Web"],
  ];

  function selectStep(index: number) {
    const next = Math.max(0, Math.min(index, steps.length - 1));
    setSelected(next);
    mobileTrack.current?.scrollTo({
      left: next * mobileTrack.current.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  function handleMobileScroll() {
    const track = mobileTrack.current;
    if (!track || !track.clientWidth) return;
    const next = Math.max(0, Math.min(Math.round(track.scrollLeft / track.clientWidth), steps.length - 1));
    setSelected((current) => current === next ? current : next);
  }
  return (
    <div className="formation-journey">
      <ol className="journey-controls">
        {steps.map((step, index) => (
          <li key={step.title}>
            <button
              type="button"
              aria-expanded={selected === index}
              aria-controls="journey-detail"
              onClick={() => selectStep(index)}
            >
              <span className="journey-number">0{index + 1}</span>
              <span>
                <strong>{step.title}</strong>
                <small>{step.body}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div className="journey-detail" id="journey-detail" aria-live="polite" aria-atomic="true">
        <span className="journey-detail-kicker">{details[selected][2]}</span>
        <span className="journey-detail-number" aria-hidden="true">
          0{selected + 1}
        </span>
        <h3>{details[selected][0]}</h3>
        <p>{details[selected][1]}</p>
        <span className="journey-detail-meta">{details[selected][3]}</span>
        <div className="journey-progress" aria-hidden="true">
          <i style={{ width: `${((selected + 1) / steps.length) * 100}%` }} />
        </div>
      </div>
      <div className="journey-mobile">
        <div className="journey-mobile-controls">
          <button type="button" onClick={() => selectStep(selected - 1)} disabled={selected === 0}>
            {en ? "Previous" : "Anterior"}
          </button>
          <span aria-live="polite" aria-atomic="true">
            {en ? "Step " : "Paso "}{selected + 1} {en ? "of" : "de"} {steps.length}
          </span>
          <button type="button" onClick={() => selectStep(selected + 1)} disabled={selected === steps.length - 1}>
            {en ? "Next" : "Siguiente"}
          </button>
        </div>
        <p className="journey-swipe-hint">
          {en ? "Swipe to explore each step" : "Desliza para ver cada paso"}
        </p>
        <div className="journey-mobile-progress" aria-hidden="true">
          <i style={{ width: String(((selected + 1) / steps.length) * 100) + "%" }} />
        </div>
        <div
          className="journey-mobile-track"
          ref={mobileTrack}
          role="region"
          aria-roledescription="carousel"
          aria-label={en ? "LLC formation steps" : "Pasos para crear tu LLC"}
          tabIndex={0}
          onScroll={handleMobileScroll}
        >
          {steps.map((step, index) => (
            <article
              className="journey-mobile-slide"
              key={step.title}
              role="group"
              aria-roledescription="slide"
              aria-label={(en ? "Step " : "Paso ") + (index + 1) + (en ? " of " : " de ") + steps.length + ": " + step.title}
            >
              <span className="journey-mobile-step">{en ? "STEP " : "PASO "}0{index + 1} · {step.title}</span>
              <h3>{details[index][0]}</h3>
              <p>{details[index][1]}</p>
              <span className="journey-detail-meta">{details[index][3]}</span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
