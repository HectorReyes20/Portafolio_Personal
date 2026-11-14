"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion, registerGsapPlugins } from "@/lib/motion";

interface ProjectsScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Anima secuencialmente la aparición del número y título de cada fila de proyecto
 * mediante GSAP + ScrollTrigger (y: 50 -> 0, opacity: 0 -> 1, once: true).
 */
export default function ProjectsScrollReveal({
  children,
  className = "",
}: ProjectsScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || prefersReducedMotion()) return;

      registerGsapPlugins();

      const rows = gsap.utils.toArray<HTMLElement>("[data-project-row]", container);

      rows.forEach((row) => {
        const targets = row.querySelectorAll<HTMLElement>("[data-reveal-item]");
        if (!targets.length) return;

        gsap.fromTo(
          targets,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: row,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
