"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isFinePointer, prefersReducedMotion, registerGsapPlugins } from "@/lib/motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  maxOffset?: number;
}

/**
 * Contenedor magnético sutil basado en `gsap.quickTo()`.
 * Solo se activa en dispositivos con puntero fino (mouse) y respeta `prefers-reduced-motion`.
 * El elemento interno recibe la transformación para no alterar el área de clic del contenedor.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 0.25,
  maxOffset = 8,
}: MagneticProps) {
  const outerRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      if (prefersReducedMotion() || !isFinePointer()) return;

      registerGsapPlugins();

      const xTo = gsap.quickTo(inner, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(inner, "y", {
        duration: 0.35,
        ease: "power3.out",
      });

      const clamp = (val: number, limit: number) =>
        Math.max(-limit, Math.min(limit, val));

      const handlePointerMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const rect = outer.getBoundingClientRect();
        const relX = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const relY = (e.clientY - (rect.top + rect.height / 2)) * strength;
        xTo(clamp(relX, maxOffset));
        yTo(clamp(relY, maxOffset));
      };

      const handlePointerLeave = () => {
        xTo(0);
        yTo(0);
      };

      outer.addEventListener("pointermove", handlePointerMove);
      outer.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        outer.removeEventListener("pointermove", handlePointerMove);
        outer.removeEventListener("pointerleave", handlePointerLeave);
        gsap.set(inner, { clearProps: "transform" });
      };
    },
    { scope: outerRef, dependencies: [strength, maxOffset] }
  );

  return (
    <span ref={outerRef} className={`inline-flex ${className}`}>
      <span ref={innerRef} className="inline-flex items-center">
        {children}
      </span>
    </span>
  );
}
