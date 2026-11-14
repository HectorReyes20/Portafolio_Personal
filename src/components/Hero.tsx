import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { profileData } from "@/data/portfolio";
import ArchitectureTrace from "@/components/ArchitectureTrace";

const iconLink =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-stone-800 bg-stone-900/70 text-stone-300 transition hover:border-amber-500/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400";

export default function Hero() {
  return (
    <section className="hero-grid border-b border-stone-800/80 py-14 sm:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Disponible para prácticas y puestos junior
          </p>

          <h1 className="mt-6 text-balance text-5xl font-extrabold tracking-tight text-stone-50 sm:text-6xl lg:text-7xl">
            {profileData.name}
          </h1>
          <p className="mt-3 text-xl font-semibold text-amber-400 sm:text-2xl">
            {profileData.role}
          </p>
          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-stone-300 sm:text-lg">
            {profileData.shortBio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Ver proyectos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-stone-700 bg-stone-900/80 px-6 py-3.5 text-sm font-semibold text-stone-200 transition hover:border-amber-500/50 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Download className="h-4 w-4 text-amber-400" />
              Descargar CV
            </a>
            <a href={profileData.github} target="_blank" rel="noopener noreferrer" aria-label="Perfil de GitHub" className={iconLink}>
              <Github className="h-5 w-5" />
            </a>
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Perfil de LinkedIn" className={iconLink}>
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="mb-4 text-sm text-stone-400">
            Así viaja una petición en mis proyectos: de la pantalla a la base de datos.
          </p>
          <ArchitectureTrace />
        </div>
      </div>
    </section>
  );
}