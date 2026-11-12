import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { profileData } from "@/data/portfolio";

/**
 * Footer global (Server Component) con enlaces directos a GitHub, LinkedIn y correo electrónico.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-800/80 bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Información principal */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-stone-50">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
                <Terminal className="h-4 w-4" />
              </span>
              <span className="font-bold tracking-tight">{profileData.name}</span>
              <span className="rounded-full border border-stone-800 bg-stone-900 px-2.5 py-0.5 font-mono text-xs font-medium text-stone-300">
                9.º Ciclo Ing. de Sistemas
              </span>
            </div>
            <p className="max-w-md text-sm text-stone-300">
              {profileData.role}. Construyendo software limpio, escalable y centrado en resolver problemas reales.
            </p>
          </div>

          {/* Enlaces de navegación y redes sociales */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <nav className="flex flex-wrap gap-5 text-sm font-medium text-stone-300">
              <Link
                href="/"
                className="rounded transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Inicio
              </Link>
              <Link
                href="/proyectos"
                className="rounded transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Proyectos
              </Link>
              <Link
                href="/sobre-mi"
                className="rounded transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Sobre mí
              </Link>
              <Link
                href="/contacto"
                className="rounded transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Contacto
              </Link>
            </nav>

            {/* Iconos Sociales: GitHub, LinkedIn, Email (44x44px touch targets) */}
            <div className="flex items-center gap-3">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone-800 bg-stone-900/80 text-stone-300 transition hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone-800 bg-stone-900/80 text-stone-300 transition hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                aria-label="Enviar correo electrónico"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone-800 bg-stone-900/80 text-stone-300 transition hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-stone-800/60 pt-6 text-xs text-stone-300 sm:flex-row">
          <p>
            © {currentYear} {profileData.name}. Desarrollado con Next.js, TypeScript y Tailwind CSS.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" />
            Disponible para prácticas preprofesionales y posiciones Junior Full Stack
          </p>
        </div>
      </div>
    </footer>
  );
}
