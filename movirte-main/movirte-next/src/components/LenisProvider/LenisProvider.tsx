"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * LenisProvider — initialises Lenis smooth scroll globally.
 * Dispatches `lenis-scroll` CustomEvent so HeroCanvas and other
 * components can react to scroll position.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
    if (!isDesktop) return;

    const lenis = new Lenis();
    lenisRef.current = lenis;

    // Dispatch scroll events for any listener
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", { detail: { scroll } })
      );
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
