import React from "react";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { profileData } from "@/data/portfolio";

const LINK_CLASS =
  "rounded-sm py-0.5 text-neutral-300 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]";

const SITE_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

/**
 * Footer editorial minimalista de 3 columnas (Sitio, Perfiles, Correo).
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050505] text-neutral-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Columna 1: Sitio */}
          <div>
            <p className="text-sm font-semibold text-neutral-50">Sitio</p>
            <nav
              aria-label="Pie de página"
              className="mt-4 flex flex-col items-start gap-2.5 text-sm"
            >
              {SITE_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={LINK_CLASS}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Columna 2: Perfiles */}
          <div>
            <p className="text-sm font-semibold text-neutral-50">Perfiles</p>
            <div className="mt-4 flex flex-col items-start gap-2.5 text-sm">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 ${LINK_CLASS}`}
              >
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 ${LINK_CLASS}`}
              >
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="/cv.pdf"
                download
                className={`inline-flex items-center gap-1 ${LINK_CLASS}`}
              >
                Descargar CV
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Columna 3: Correo */}
          <div>
            <p className="text-sm font-semibold text-neutral-50">Correo</p>
            <div className="mt-4 flex flex-col items-start gap-2 text-sm">
              <a
                href={`mailto:${profileData.email}`}
                className="break-all rounded-sm py-0.5 text-neutral-200 underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#bef264] hover:decoration-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
              >
                {profileData.email}
              </a>
              <p className="text-xs leading-relaxed text-neutral-400">
                Lima, Perú
              </p>
              <p className="text-xs leading-relaxed text-neutral-400">
                Ingeniería de Sistemas e Informática
              </p>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-neutral-400 sm:flex-row sm:items-center">
          <p>
            © {currentYear} {profileData.name}
          </p>
          <p>Hecho con Next.js, TypeScript y Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}