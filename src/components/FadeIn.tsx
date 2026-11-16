"use client";

import React, { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Componente Client para animaciones sutiles de aparición al hacer scroll.
 * Utiliza `--ease-out` (cubic-bezier(0.23, 1, 0.32, 1)), recorrido corto (12px)
 * y escala inicial sutil (0.99) siguiendo la filosofía de Emil Kowalski.
 */
export default function FadeIn({
  children,
  delay = 0,
  className = "",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-[420ms] ease-out-strong motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-3 scale-[0.99] opacity-0 will-change-transform"
      } ${className}`}
    >
      {children}
    </div>
  );
}
