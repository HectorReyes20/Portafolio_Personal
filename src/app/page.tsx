import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Lock } from "lucide-react";
import { profileData, projectsData } from "@/data/portfolio";
import FadeIn from "@/components/FadeIn";
import StackByLayer from "@/components/StackByLayer";
import LimaClock from "@/components/LimaClock";
import LineMaskHeadline from "@/components/LineMaskHeadline";
import Magnetic from "@/components/Magnetic";
import ProjectsScrollReveal from "@/components/ProjectsScrollReveal";
import { isValidHttpUrl } from "@/lib/urls";

const metrics = [
  {
    value: "54",
    label: "Reglas de negocio",
    source: "RN-01 a RN-54 · Axioma",
  },
  {
    value: "3",
    label: "Roles diferenciados",
    source: "Administrador, Organizador, Voluntario · Nexo V",
  },
  {
    value: "18%",
    label: "IGV automático",
    source: "Facturación en Soles · Ferre-CRM",
  },
  {
    value: "0.87",
    label: "ROC-AUC (simulado)",
    source: "Sobre 1,500 historiales simulados · Axioma",
  },
];

const interfaceAndLogicSkills = [
  "Java",
  "Spring Boot",
  "TypeScript",
  "NestJS",
  "Desarrollo de APIs REST",
  "Autenticación JWT y control de roles",
];

const dataAndAccessSkills = [
  "PostgreSQL",
  "MySQL",
  "SQL Server",
  "Prisma",
  "Consultas SQL y JOIN",
  "Git y GitHub",
];

export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <div className="bg-[#050505] text-neutral-50">
      {/* HERO EDITORIAL */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <LimaClock />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Portafolio 2026
          </span>
        </div>

        <LineMaskHeadline
          text="Construyo aplicaciones web conectando interfaces, lógica de negocio y datos."
          className="mt-10 max-w-5xl text-[44px] font-semibold leading-[0.95] tracking-[-0.035em] text-neutral-50 sm:mt-12 sm:text-6xl lg:text-[92px]"
        />

        <div className="mt-8 flex flex-col justify-between gap-8 sm:mt-10 lg:flex-row lg:items-end">
          <p className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            {profileData.shortBio}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <Magnetic>
              <a
                href="/cv.pdf"
                download="CV_Hector_Reyes.pdf"
                className="group inline-flex items-center gap-2 rounded-full border border-[#bef264] bg-[#bef264] px-4 py-2 text-sm font-semibold text-[#050505] transition-colors duration-200 hover:bg-[#d9f99d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                <Download
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <span>Descargar CV</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#proyectos"
                className="group inline-flex items-center gap-2 rounded-sm py-1 text-[#bef264] transition-colors hover:text-[#d9f99d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
              >
                <span>Explorar proyectos</span>
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 rounded-sm py-1 text-neutral-200 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
              >
                <span>Contacto</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* 01 — PROYECTOS */}
      <section
        id="proyectos"
        className="mx-auto max-w-6xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-4 pb-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              01 — Proyectos seleccionados
            </h2>
            <span className="font-mono text-xs text-neutral-400">
              {String(featuredProjects.length).padStart(2, "0")} casos destacados
            </span>
          </div>
        </FadeIn>

        <ProjectsScrollReveal className="divide-y divide-white/10 border-b border-t border-white/10">
          {featuredProjects.map((project, index) => {
            const num = String(index + 1).padStart(2, "0");
            const hasRepo = isValidHttpUrl(project.repoUrl);
            const hasDemo = isValidHttpUrl(project.demoUrl);

            return (
              <article key={project.slug} data-project-row className="group py-8 sm:py-10">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                  {/* Número y metadatos */}
                  <div className="flex items-baseline justify-between gap-4 lg:col-span-3 lg:flex-col lg:justify-start lg:gap-2">
                    <span data-reveal-item className="inline-block font-mono text-sm text-[#bef264]">
                      {num}
                    </span>
                    <div className="font-mono text-xs text-neutral-400">
                      <p>{project.category}</p>
                      <p className="mt-0.5">{project.year}</p>
                    </div>
                  </div>

                  {/* Contenido principal */}
                  <div className="space-y-5 lg:col-span-9">
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        data-reveal-item
                        className="text-2xl font-semibold tracking-tight text-neutral-50 transition-colors duration-200 group-hover:text-[#bef264] sm:text-3xl"
                      >
                        <Link
                          href={`/proyectos/${project.slug}`}
                          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
                        >
                          {project.title}
                        </Link>
                      </h3>
                      <Link
                        href={`/proyectos/${project.slug}`}
                        aria-label={`Ver caso de estudio de ${project.title}`}
                        className="mt-1 shrink-0 rounded-sm p-1 text-neutral-400 transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] motion-reduce:transition-none"
                      >
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </Link>
                    </div>

                    <p className="max-w-3xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                      {project.shortDescription}
                    </p>

                    <div className="pt-1">
                      <StackByLayer stack={project.stack} />
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs">
                      <Link
                        href={`/proyectos/${project.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-sm font-medium text-neutral-100 underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#bef264] hover:decoration-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
                      >
                        <span>Caso de estudio</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>

                      {hasRepo ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-sm font-mono text-neutral-300 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
                        >
                          <span>Repositorio</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-mono text-neutral-400">
                          <Lock className="h-3 w-3" aria-hidden="true" />
                          <span>{project.repoUrl}</span>
                        </span>
                      )}

                      {hasDemo && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-sm font-mono text-[#bef264] transition-colors hover:text-[#d9f99d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
                        >
                          <span>Ver demo en vivo</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </ProjectsScrollReveal>

        <div className="mt-8 flex justify-end">
          <Link
            href="/proyectos"
            className="group inline-flex items-center gap-2 rounded-sm py-1 text-sm font-medium text-neutral-200 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
          >
            <span>Ver todos los proyectos</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      {/* 02 — CIFRAS */}
      <section className="mx-auto max-w-6xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <FadeIn>
          <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            02 — Cifras de implementación
          </h2>

          <div className="mt-10 grid grid-cols-1 divide-y divide-white/10 border-b border-t border-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="py-8 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <p className="text-4xl font-semibold tracking-tight text-[#bef264] sm:text-5xl">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm font-medium text-neutral-100">
                  {metric.label}
                </p>
                <p className="mt-1 font-mono text-xs text-neutral-400">
                  {metric.source}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 03 — CAPACIDADES */}
      <section className="mx-auto max-w-6xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <FadeIn>
          <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            03 — Capacidades
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-semibold tracking-tight text-neutral-50">
                  Interfaz y lógica
                </h3>
                <span className="font-mono text-xs text-neutral-400">01</span>
              </div>
              <ol className="divide-y divide-white/10">
                {interfaceAndLogicSkills.map((skill, idx) => (
                  <li
                    key={skill}
                    className="flex items-baseline justify-between py-3.5 text-sm text-neutral-200 sm:text-base"
                  >
                    <span>{skill}</span>
                    <span className="font-mono text-xs text-neutral-400">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-semibold tracking-tight text-neutral-50">
                  Datos y acceso
                </h3>
                <span className="font-mono text-xs text-neutral-400">02</span>
              </div>
              <ol className="divide-y divide-white/10">
                {dataAndAccessSkills.map((skill, idx) => (
                  <li
                    key={skill}
                    className="flex items-baseline justify-between py-3.5 text-sm text-neutral-200 sm:text-base"
                  >
                    <span>{skill}</span>
                    <span className="font-mono text-xs text-neutral-400">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 04 — CONTACTO */}
      <section className="mx-auto max-w-6xl border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <FadeIn>
          <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            04 — Contacto
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-4xl font-semibold tracking-tight text-neutral-50 sm:text-6xl">
                ¿Conversamos?
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                {profileData.location}.
              </p>
              <a
                href={`mailto:${profileData.email}`}
                className="mt-6 inline-block break-all text-lg font-medium text-[#bef264] underline decoration-[#bef264]/40 underline-offset-8 transition-colors hover:text-[#d9f99d] hover:decoration-[#d9f99d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] sm:text-2xl"
              >
                {profileData.email}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 lg:col-span-4 lg:justify-end">
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-sm py-1 text-sm text-neutral-200 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-sm py-1 text-sm text-neutral-200 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#bef264]/60 px-4 py-2 text-sm font-medium text-[#bef264] transition-colors hover:bg-[#bef264] hover:text-[#050505] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
              >
                <span>Escribir mensaje</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
