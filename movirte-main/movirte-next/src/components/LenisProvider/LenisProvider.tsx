"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * LenisProvider — initialises Lenis smooth scroll globally and feeds it
 * into gsap.ticker if GSAP is loaded. Also dispatches a custom event that
 * the HeroCanvas can listen to for scroll progress.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
    if (!isDesktop) return; // No smooth scroll on mobile

    const lenis = new Lenis();
    lenisRef.current = lenis;

    // Feed scroll data to HeroCanvas via custom event
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", { detail: { scroll } })
      );

      // Also find any hero canvas on the page and call its handler
      const canvas = document.getElementById("hero-canvas");
      if (canvas && (canvas as unknown as Record<string, unknown>).__onScroll) {
        (
          (canvas as unknown as Record<string, (s: number) => void>).__onScroll
        )(scroll);
      }
    });

    // Animation loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
