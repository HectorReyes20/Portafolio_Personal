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
 */
export default function ProjectsPage() {
  const verifiedProjects = projectsData.filter((project) => project.featured);
  const upcomingProjects = projectsData.filter((project) => !project.featured);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <FadeIn>
        <div className="max-w-3xl border-b border-line pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            02 // Índice de proyectos
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Casos de estudio de ingeniería
          </h1>
          <p className="mt-4 max-w-[66ch] text-sm leading-relaxed text-muted sm:text-base">
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
        <section className="mt-14 border-t border-line pt-8">
          <FadeIn>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              En documentación
            </h2>
            <div className="mt-4 divide-y divide-line rounded-sm border border-line bg-surface px-5">
              {upcomingProjects.map((project) => (
                <div
                  key={project.slug}
                  className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-semibold text-ink">
                        {project.title}
                      </h3>
                      <span className="font-mono text-xs text-muted">
                        {project.category}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {project.shortDescription}
                    </p>
                  </div>

                  <Link
                    href={`/proyectos/${project.slug}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-sm font-mono text-xs font-semibold text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Ver ficha preliminar
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
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
