"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import {
  isPreloaderDone,
  PRELOADER_DONE_EVENT,
  prefersReducedMotion,
  registerGsapPlugins,
} from "@/lib/motion";

interface LineMaskHeadlineProps {
  text: string;
  className?: string;
}

/**
 * Titular editorial con revelado por líneas mediante máscara (`overflow: hidden` por línea)
 * usando GSAP SplitText, coordinado con la finalización del preloader SR.
 */
export default function LineMaskHeadline({
  text,
  className = "",
}: LineMaskHeadlineProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [readyToReveal, setReadyToReveal] = useState(false);

  useEffect(() => {
    if (isPreloaderDone()) {
      setReadyToReveal(true);
      return;
    }

    const handlePreloaderDone = () => {
      setReadyToReveal(true);
    };

    window.addEventListener(PRELOADER_DONE_EVENT, handlePreloaderDone, {
      once: true,
    });

    return () => {
      window.removeEventListener(PRELOADER_DONE_EVENT, handlePreloaderDone);
    };
  }, []);

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!readyToReveal || !heading) return;
      if (prefersReducedMotion()) return;

      registerGsapPlugins();

      let split: SplitText | null = null;
      let cancelled = false;

      const runReveal = () => {
        if (cancelled || !headingRef.current) return;

        split = SplitText.create(headingRef.current, {
          type: "lines",
          mask: "lines",
          aria: "auto",
        });

        gsap.from(split.lines, {
          yPercent: 105,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "transform",
          onComplete: () => {
            split?.revert();
            split = null;
          },
        });
      };

      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(runReveal);
      } else {
        runReveal();
      }

      return () => {
        cancelled = true;
        split?.revert();
        split = null;
      };
    },
    { scope: headingRef, dependencies: [readyToReveal, text] }
  );

  return (
    <h1 ref={headingRef} className={className}>
      {text}
    </h1>
  );
}
