"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const targets = [
  "main > .page-hero",
  ".premium-offer > div:first-child",
  ".premium-service-list li",
  ".premium-price-summary",
  ".premium-section-heading",
  ".journey-controls li",
  ".journey-detail",
  ".premium-process-after",
  ".premium-benefit-list article",
  ".premium-trust-statement",
  ".premium-trust-points article",
  ".premium-audience > div:first-child",
  ".premium-audience article",
  ".premium-banking > div:first-child",
  ".premium-banking li",
  ".premium-journal-feature",
  ".premium-journal-rows > a",
  "main .section-intro",
  "main .faq-list details",
  "main .closing-layout",
  ".pricing-page-grid > div",
  ".formation-details li",
  ".contact-panel",
  "main .page-columns > .page-copy",
].join(", ");

// Content stays visible without JavaScript. Only elements entering the viewport animate.
export function HomeMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!window.IntersectionObserver || !Element.prototype.animate || preference.matches) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (preference.matches) return;
        const siblings = target.parentElement ? Array.from(target.parentElement.children) : [];
        const delay = target.matches("li, article, .premium-journal-rows > a")
          ? Math.max(0, siblings.indexOf(target) % 3) * 100
          : 0;
        target.setAttribute("data-motion", "entering");
        const animation = target.animate(
          [{ opacity: 0, transform: "translateY(44px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 850, delay, fill: "backwards", easing: "cubic-bezier(.22,1,.36,1)" },
        );
        animations.add(animation);
        const finish = () => {
          animations.delete(animation);
          target.setAttribute("data-motion", "complete");
        };
        animation.onfinish = finish;
        animation.oncancel = finish;
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });
    document.querySelectorAll(targets).forEach((element) => observer.observe(element));
    const stop = () => { if (preference.matches) animations.forEach((animation) => animation.cancel()); };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stop);
    };
  }, [pathname]);
  return null;
}
