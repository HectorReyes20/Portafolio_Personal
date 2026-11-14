"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  isPreloaderDone,
  prefersReducedMotion,
  registerGsapPlugins,
} from "@/lib/motion";

/**
 * Transición sutil de entrada entre rutas internas sin interceptar `<Link>` ni alterar el historial.
 * Solo se ejecuta tras haber finalizado el preloader inicial.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;
      if (!isPreloaderDone() || prefersReducedMotion()) return;

      registerGsapPlugins();

      gsap.from(wrapperRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.32,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: wrapperRef }
  );

  return <div ref={wrapperRef}>{children}</div>;
}
