"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const targets = [
  "main > .page-hero",
  ".founder-home .founder-proof-band",
  ".founder-home .premium-offer",
  ".founder-home .premium-price-summary",
  ".founder-home .premium-process-band .section-block",
  ".founder-home .premium-benefits",
  ".founder-home .premium-trust",
  ".founder-home .premium-audience",
  ".founder-home .premium-banking",
  ".founder-home .premium-journal",
  ".founder-home .home-faq",
  "main .pricing-page-grid",
  "main .pricing-website",
  "main .banking-layout",
  "main .pricing-faq",
  "main .page-columns",
  "main .about-story",
  "main .contact-page-grid",
  "main .legal-section",
  "main .blog-featured-guide",
  "main .blog-topic-section",
  "main .article-layout",
  ".lead-capture-layout",
  "main .closing-layout",
].join(", ");

// Content stays visible without JavaScript. Only elements entering the viewport animate.
export function HomeMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!window.IntersectionObserver || !Element.prototype.animate || preference.matches) return;
    const animations = new Map<Element, Animation>();
    const elements = Array.from(document.querySelectorAll<HTMLElement>(targets));
    // Prepare offscreen content before it can scroll into view. Without JS it stays visible.
    elements.forEach((element) => {
      const animation = element.animate(
        [{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 620, fill: "both", easing: "cubic-bezier(.22,1,.36,1)" },
      );
      animation.pause();
      element.setAttribute("data-motion", "pending");
      animations.set(element, animation);
      animation.onfinish = () => {
        element.setAttribute("data-motion", "complete");
        animations.delete(element);
        animation.cancel();
      };
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (preference.matches) return;
        target.setAttribute("data-motion", "entering");
        animations.get(target)?.play();
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    elements.forEach((element) => observer.observe(element));
    const reveal = (element: Element, animation: Animation) => {
      animation.cancel();
      animations.delete(element);
      element.setAttribute("data-motion", "complete");
      observer.unobserve(element);
    };
    const stop = () => { if (preference.matches) animations.forEach((animation, element) => reveal(element, animation)); };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const focused = event.target;
      animations.forEach((animation, element) => {
        if (element.contains(focused)) reveal(element, animation);
      });
    };
    preference.addEventListener("change", stop);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      elements.forEach((element) => element.removeAttribute("data-motion"));
      preference.removeEventListener("change", stop);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);
  return null;
}
