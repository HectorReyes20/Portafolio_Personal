"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/portfolio";
import Magnetic from "@/components/Magnetic";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { num: "01", label: "Inicio", href: "/" },
  { num: "02", label: "Proyectos", href: "/proyectos" },
  { num: "03", label: "Sobre mí", href: "/sobre-mi" },
  { num: "04", label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cerrar menú móvil automáticamente al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Permitir cerrar el menú móvil con la tecla Escape (sin retraso de animación en teclado)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Marca personal tipográfica */}
        <Magnetic>
          <Link
            href="/"
            className="ui-link group inline-flex items-center gap-2.5 rounded-sm text-sm font-semibold tracking-tight text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-base"
          >
            <span
              aria-hidden="true"
              className="ui-shift ui-hover-scale h-2 w-2 rounded-full bg-accent"
            />
            <span>{profileData.name}</span>
            <span className="hidden border-l border-line pl-2.5 font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-muted lg:inline-block">
              Full Stack
            </span>
          </Link>
        </Magnetic>

        {/* Navegación Desktop */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {navItems.slice(0, 3).map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`ui-link relative rounded-sm py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active
                    ? "font-semibold text-accent"
                    : "text-muted hover:text-ink"
                }`}
              >
                <span className="mr-1 font-mono text-[10px] text-accent/80">
                  {item.num}
                </span>
                {item.label}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left bg-accent transition-transform duration-200 ease-out-strong ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-link group inline-flex items-center gap-1 rounded-sm py-1.5 text-sm text-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>GitHub</span>
            <ArrowUpRight
              className="ui-shift ui-hover-shift-x h-3.5 w-3.5"
              aria-hidden="true"
            />
          </a>
        </nav>

        {/* Controles Desktop: Toggle de Tema + CTA Contacto */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Magnetic>
            <Link
              href="/contacto"
              aria-current={isActive("/contacto") ? "page" : undefined}
              className={`ui-press inline-flex items-center justify-center rounded-sm border px-4 py-2 text-xs font-mono uppercase tracking-[0.16em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive("/contacto")
                  ? "border-accent bg-accent font-semibold text-accent-fg"
                  : "border-accent bg-surface text-accent hover:bg-accent hover:text-accent-fg"
              }`}
            >
              Contacto
            </Link>
          </Magnetic>
        </div>

        {/* Controles Móvil: Toggle de Tema + Botón Menú (44x44px) */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="ui-icon-press relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-line bg-surface text-ink hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={
              mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
            }
          >
            <Menu
              className={`h-5 w-5 transition-[transform,opacity,filter] duration-150 ease-out-strong ${
                mobileMenuOpen
                  ? "rotate-90 scale-75 opacity-0 blur-[1.5px]"
                  : "rotate-0 scale-100 opacity-100 blur-0"
              }`}
              aria-hidden="true"
            />
            <X
              className={`absolute h-5 w-5 transition-[transform,opacity,filter] duration-150 ease-out-strong ${
                mobileMenuOpen
                  ? "rotate-0 scale-100 opacity-100 blur-0"
                  : "-rotate-90 scale-75 opacity-0 blur-[1.5px]"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil interrumpible con origin-top y tiempos asimétricos */}
      <div
        id="mobile-nav-menu"
        aria-hidden={!mobileMenuOpen}
        className={`grid origin-top transition-[grid-template-rows,opacity,transform] md:hidden ${
          mobileMenuOpen
            ? "grid-rows-[1fr] translate-y-0 border-t border-line bg-canvas opacity-100 duration-200 ease-drawer"
            : "pointer-events-none grid-rows-[0fr] -translate-y-1 opacity-0 duration-150 ease-out-strong"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            className="flex flex-col divide-y divide-line px-4 pb-6 pt-2"
            aria-label="Móvil"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`ui-link flex items-baseline justify-between py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    active
                      ? "font-semibold text-accent"
                      : "text-ink hover:text-accent"
                  }`}
                >
                  <span className="text-base font-medium">{item.label}</span>
                  <span className="font-mono text-xs text-muted">
                    {item.num}
                  </span>
                </Link>
              );
            })}
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={() => setMobileMenuOpen(false)}
              className="ui-link flex items-center justify-between py-3.5 text-sm text-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
