"use client";

import React, { useRef } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Selector de tema global (Modo Oscuro / Modo Claro) para la identidad Midnight Teal.
 * Persiste en `localStorage` bajo la clave `"theme"`, sin errores de hidratación,
 * con morphing de iconos (scale + rotate + blur bridge) y transición uniforme del DOM.
 */
export default function ThemeToggle() {
  const timeoutRef = useRef<number | null>(null);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains("dark");
    const nextTheme = isCurrentlyDark ? "light" : "dark";

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced) {
      root.classList.add("theme-transition");
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 220);
    }

    root.classList.toggle("dark", nextTheme === "dark");
    root.style.colorScheme = nextTheme;

    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {
      // Ignorar si el almacenamiento local está bloqueado
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Cambiar entre modo oscuro y modo claro"
      title="Cambiar tema"
      className="ui-icon-press relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Sun
        className="h-4 w-4 rotate-90 scale-75 opacity-0 blur-[1.5px] transition-[transform,opacity,filter] duration-200 ease-out-strong dark:rotate-0 dark:scale-100 dark:opacity-100 dark:blur-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute h-4 w-4 rotate-0 scale-100 opacity-100 blur-0 transition-[transform,opacity,filter] duration-200 ease-out-strong dark:-rotate-90 dark:scale-75 dark:opacity-0 dark:blur-[1.5px]"
        aria-hidden="true"
      />
    </button>
  );
}
