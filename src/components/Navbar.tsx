"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/portfolio";
import Magnetic from "@/components/Magnetic";

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

  // Permitir cerrar el menú móvil con la tecla Escape
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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Marca personal tipográfica */}
        <Magnetic>
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-sm text-sm font-semibold tracking-tight text-neutral-50 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] sm:text-base"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#bef264] transition-transform duration-200 group-hover:scale-125 motion-reduce:transition-none"
            />
            <span>{profileData.name}</span>
          </Link>
        </Magnetic>

        {/* Navegación Desktop */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
          {navItems.slice(0, 3).map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-sm py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] ${
                  active
                    ? "font-medium text-[#bef264]"
                    : "text-neutral-300 hover:text-neutral-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-sm py-1 text-sm text-neutral-300 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </nav>

        {/* CTA Desktop */}
        <div className="hidden items-center md:flex">
          <Magnetic>
            <Link
              href="/contacto"
              aria-current={isActive("/contacto") ? "page" : undefined}
              className={`inline-flex items-center justify-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] ${
                isActive("/contacto")
                  ? "border-[#bef264] bg-[#bef264] text-[#050505]"
                  : "border-[#bef264]/60 text-[#bef264] hover:border-[#bef264] hover:bg-[#bef264] hover:text-[#050505]"
              }`}
            >
              Contacto
            </Link>
          </Magnetic>
        </div>

        {/* Botón Menú Móvil (44x44px) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-neutral-200 transition-colors hover:border-[#bef264]/60 hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={
            mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
          }
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menú Desplegable Móvil con secciones numeradas 01-04 */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="border-t border-white/10 bg-[#050505] px-4 pb-6 pt-2 md:hidden"
        >
          <nav className="flex flex-col divide-y divide-white/10" aria-label="Móvil">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-baseline justify-between py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] ${
                    active
                      ? "text-[#bef264]"
                      : "text-neutral-200 hover:text-[#bef264]"
                  }`}
                >
                  <span className="text-base font-medium">{item.label}</span>
                  <span className="font-mono text-xs text-neutral-400">
                    {item.num}
                  </span>
                </Link>
              );
            })}
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3.5 text-sm text-neutral-300 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
