"use client";

import { useEffect } from "react";

// Content stays visible without JavaScript. Only elements entering the viewport animate.
export function HomeMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!window.IntersectionObserver || !Element.prototype.animate || preference.matches) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (preference.matches) return;
        const animation = target.animate(
          [{ opacity: 0.25, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 580, easing: "cubic-bezier(.22,1,.36,1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".founder-home .premium-section-heading, .founder-home .premium-benefit-list article, .founder-home .premium-service-list li, .founder-home .premium-journal-grid > a, .founder-home .premium-trust-statement, .founder-home .closing-layout").forEach((element) => observer.observe(element));
    const stop = () => { if (preference.matches) animations.forEach((animation) => animation.cancel()); };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stop);
    };
  }, []);
  return null;
}
