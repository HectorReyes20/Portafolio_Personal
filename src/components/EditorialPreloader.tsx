"use client";

import React, { useEffect, useState } from "react";
import { markPreloaderDone } from "@/lib/motion";

/**
 * Preloader editorial minimalista con iniciales SR en paleta Midnight Teal.
 * Se ejecuta una sola vez al montar el RootLayout (no se repite en navegaciones internas),
 * respeta `prefers-reduced-motion` y notifica su finalización para coordinar el Hero.
 */
export default function EditorialPreloader() {
  const [phase, setPhase] = useState<"entering" | "exiting" | "done">("entering");

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setPhase("done");
      markPreloaderDone();
      return;
    }

    const exitTimer = window.setTimeout(() => {
      setPhase("exiting");
    }, 900);

    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      markPreloaderDone();
    }, 1250);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-canvas px-4 transition-opacity duration-300 ease-out motion-reduce:hidden ${
        phase === "exiting" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="overflow-hidden py-1">
          <span className="sr-preloader-letters block font-sans text-6xl font-semibold tracking-[-0.04em] text-ink sm:text-8xl">
            SR
          </span>
        </div>
        <div className="mt-3 h-px w-28 overflow-hidden bg-line sm:w-36">
          <div className="sr-preloader-line h-full w-full origin-left bg-accent" />
        </div>
        <p className="sr-preloader-meta mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          PORTAFOLIO — 2026
        </p>
      </div>
    </div>
  );
}
