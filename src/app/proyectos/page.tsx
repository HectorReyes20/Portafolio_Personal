import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsData, profileData } from "@/data/portfolio";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Proyectos",
  description: `Explora los casos de estudio de ingeniería de software de ${profileData.name}: Axioma (Next.js 15 & NestJS), Nexo V (Spring Boot & Angular) y Ferre-CRM (PHP 8.3 & Laravel 13).`,
};

/**
 * Página de listado de proyectos (/proyectos) — Server Component.
 * Presenta los 3 casos de estudio verificados en grilla limpia y resume de forma compacta
 * los módulos en fase de documentación para evitar redundancia visual.
 */
export default function ProjectsPage() {
  const verifiedProjects = projectsData.filter((project) => project.featured);
  const upcomingProjects = projectsData.filter((project) => !project.featured);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <FadeIn>
        <div className="max-w-3xl border-b border-stone-800/80 pb-7">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-stone-50 sm:text-4xl lg:text-5xl">
            Casos de Estudio de Ingeniería
          </h1>
          <p className="mt-3 max-w-[66ch] text-sm leading-relaxed text-stone-300 sm:text-base">
            Sistemas desarrollados aplicando arquitectura por capas, control transaccional en bases de datos SQL y reglas de negocio verificables.
          </p>
        </div>
      </FadeIn>

      {/* Casos de estudio principales verificados (Axioma, Nexo V, Ferre-CRM) */}
      <section className="mt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {verifiedProjects.map((project, index) => (
            <FadeIn
              key={project.slug}
              delay={index * 70}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Módulo pendiente en formato compacto para no competir con los proyectos reales */}
      {upcomingProjects.length > 0 && (
        <section className="mt-12 border-t border-stone-800/80 pt-8">
          <FadeIn>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-300">
              En Documentación
            </h2>
            <div className="mt-4 space-y-3">
              {upcomingProjects.map((project) => (
                <div
                  key={project.slug}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-stone-800/80 bg-stone-900/40 p-5 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-stone-100">
                        {project.title}
                      </h3>
                      <span className="rounded border border-stone-800 bg-stone-950 px-2 py-0.5 font-mono text-[11px] text-stone-400">
                        {project.category}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-stone-300">
                      {project.shortDescription}
                    </p>
                  </div>

                  <Link
                    href={`/proyectos/${project.slug}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded font-mono text-xs font-semibold text-amber-400 transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    Ver ficha preliminar
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      )}
    </div>
  );
}
