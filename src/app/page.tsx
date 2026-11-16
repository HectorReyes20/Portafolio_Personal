import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Lock } from "lucide-react";
import { profileData, projectsData } from "@/data/portfolio";
import FadeIn from "@/components/FadeIn";
import StackByLayer from "@/components/StackByLayer";
import LimaClock from "@/components/LimaClock";
import LineMaskHeadline from "@/components/LineMaskHeadline";
import Magnetic from "@/components/Magnetic";
import ProjectsScrollReveal from "@/components/ProjectsScrollReveal";
import ArchitectureTrace from "@/components/ArchitectureTrace";
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
    <div className="bg-canvas text-ink">
      {/* HERO EDITORIAL ASIMÉTRICO — 2 COLUMNAS */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12 lg:px-8">
        {/* Barra superior de metadatos */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <LimaClock />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            MIDNIGHT TEAL // PORTAFOLIO 2026
          </span>
        </div>

        {/* Composición asimétrica en 2 columnas (Desktop) / Apilada (Mobile) */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* Columna izquierda: Indicador + Titular + Bio + 2 Botones */}
          <div className="min-w-0 lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 rounded-sm border border-line bg-secondary px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                {profileData.role} · 9.º Ciclo Ing. de Sistemas
              </span>
            </div>

            <LineMaskHeadline
              text="Construyo aplicaciones web conectando interfaces, lógica de negocio y datos."
              className="mt-6 text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px]"
            />

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {profileData.shortBio}
            </p>

            {/* Únicamente dos botones en el Hero: Descargar CV + Explorar proyectos */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
              <Magnetic>
                <a
                  href="/cv.pdf"
                  download="CV_Hector_Reyes.pdf"
                  className="ui-press group inline-flex items-center gap-2.5 rounded-sm border border-accent bg-accent px-5 py-3 text-sm font-semibold text-accent-fg hover:bg-accent-soft hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  <Download
                    className="ui-shift ui-hover-shift-y h-4 w-4"
                    aria-hidden="true"
                  />
                  <span>Descargar CV</span>
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="#proyectos"
                  className="ui-press group inline-flex items-center gap-2.5 rounded-sm border border-line bg-surface px-5 py-3 text-sm font-medium text-ink hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  <span>Explorar proyectos</span>
                  <ArrowDown
                    className="ui-shift ui-hover-shift-y h-4 w-4 text-accent"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Columna derecha: Foto recortada + Recorrido técnico de una petición */}
          <div className="min-w-0 space-y-6 lg:col-span-5">
            {/* Retrato recortado del Hero */}
            <div className="relative isolate mx-auto w-3/4 max-w-[260px] overflow-hidden rounded-sm border border-line bg-secondary pt-4 sm:max-w-[280px] lg:ml-auto lg:mr-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(55% 65% at 65% 70%, var(--accent), transparent 75%)",
                }}
              />
              <div className="[mask-image:linear-gradient(to_top,transparent,black_18%)]">
                <Image
                  src="/images/profile.jpg"
                  alt={`Retrato de ${profileData.name}, desarrollador Full Stack en Lima, Perú`}
                  width={1083}
                  height={1452}
                  quality={90}
                  priority
                  sizes="(max-width: 768px) 260px, 280px"
                  className="h-auto w-full [mask-image:linear-gradient(to_right,transparent,black_12%)]"
                />
              </div>
            </div>

            {/* Detalle visual técnico debajo de la foto */}
            <div className="space-y-3">
              <p className="font-mono text-xs text-muted">
                Así viaja una petición en mis proyectos: de la pantalla a la base de datos.
              </p>
              <ArchitectureTrace />
            </div>
          </div>
        </div>
      </section>

      {/* 01 — PROYECTOS SELECCIONADOS */}
      <section
        id="proyectos"
        className="mx-auto max-w-6xl border-t border-line px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-4 pb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                01
              </span>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Proyectos seleccionados
              </h2>
            </div>
            <span className="font-mono text-xs text-muted">
              {String(featuredProjects.length).padStart(2, "0")} casos destacados
            </span>
          </div>
        </FadeIn>

        <ProjectsScrollReveal className="divide-y divide-line border-b border-t border-line">
          {featuredProjects.map((project, index) => {
            const num = String(index + 1).padStart(2, "0");
            const hasRepo = isValidHttpUrl(project.repoUrl);
            const hasDemo = isValidHttpUrl(project.demoUrl);

            return (
              <article
                key={project.slug}
                data-project-row
                className="group py-8 sm:py-10"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                  {/* Número y metadatos */}
                  <div className="flex items-baseline justify-between gap-4 lg:col-span-3 lg:flex-col lg:justify-start lg:gap-2">
                    <span
                      data-reveal-item
                      className="inline-block rounded-sm border border-line bg-surface px-2.5 py-1 font-mono text-xs font-semibold text-accent"
                    >
                      {num}
                    </span>
                    <div className="font-mono text-xs text-muted">
                      <p className="text-ink/90">{project.category}</p>
                      <p className="mt-0.5">{project.year}</p>
                    </div>
                  </div>

                  {/* Contenido principal */}
                  <div className="space-y-5 lg:col-span-9">
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        data-reveal-item
                        className="ui-link text-2xl font-semibold tracking-tight text-ink group-hover:text-accent sm:text-3xl"
                      >
                        <Link
                          href={`/proyectos/${project.slug}`}
                          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {project.title}
                        </Link>
                      </h3>
                      <Link
                        href={`/proyectos/${project.slug}`}
                        aria-label={`Ver caso de estudio de ${project.title}`}
                        className="ui-shift ui-hover-shift-x mt-1 shrink-0 rounded-sm border border-transparent p-1.5 text-muted group-hover:border-line group-hover:bg-surface group-hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </Link>
                    </div>

                    <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                      {project.shortDescription}
                    </p>

                    <div className="rounded-sm border border-line bg-surface p-4">
                      <StackByLayer stack={project.stack} />
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs">
                      <Link
                        href={`/proyectos/${project.slug}`}
                        className="ui-link inline-flex items-center gap-1.5 rounded-sm font-medium text-ink underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <span>Caso de estudio</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>

                      {hasRepo ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ui-link inline-flex items-center gap-1 rounded-sm font-mono text-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <span>Repositorio</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-mono text-muted">
                          <Lock className="h-3 w-3" aria-hidden="true" />
                          <span>{project.repoUrl}</span>
                        </span>
                      )}

                      {hasDemo && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ui-link inline-flex items-center gap-1 rounded-sm font-mono font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
            className="ui-press group inline-flex items-center gap-2 rounded-sm border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Ver todos los proyectos</span>
            <ArrowRight
              className="ui-shift ui-hover-shift-x h-4 w-4 text-accent"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      {/* 02 — CIFRAS DE IMPLEMENTACIÓN */}
      <section className="mx-auto max-w-6xl border-t border-line px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              02
            </span>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Cifras de implementación
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="ui-card-interactive rounded-sm border border-line bg-surface p-6"
              >
                <p className="text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">
                  {metric.label}
                </p>
                <p className="mt-1.5 font-mono text-xs text-muted">
                  {metric.source}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 03 — CAPACIDADES */}
      <section className="mx-auto max-w-6xl border-t border-line px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              03
            </span>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Capacidades técnicas
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="rounded-sm border border-line bg-surface p-6 sm:p-8">
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  Interfaz y lógica de negocio
                </h3>
                <span className="font-mono text-xs font-semibold text-accent">
                  CAPA 01 // 02
                </span>
              </div>
              <ol className="divide-y divide-line">
                {interfaceAndLogicSkills.map((skill, idx) => (
                  <li
                    key={skill}
                    className="flex items-baseline justify-between py-3.5 text-sm text-ink sm:text-base"
                  >
                    <span>{skill}</span>
                    <span className="font-mono text-xs text-muted">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-sm border border-line bg-surface p-6 sm:p-8">
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  Datos, persistencia y acceso
                </h3>
                <span className="font-mono text-xs font-semibold text-accent">
                  CAPA 03
                </span>
              </div>
              <ol className="divide-y divide-line">
                {dataAndAccessSkills.map((skill, idx) => (
                  <li
                    key={skill}
                    className="flex items-baseline justify-between py-3.5 text-sm text-ink sm:text-base"
                  >
                    <span>{skill}</span>
                    <span className="font-mono text-xs text-muted">
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
      <section className="mx-auto max-w-6xl border-t border-line px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <FadeIn>
          <div className="rounded-sm border border-line bg-secondary p-8 sm:p-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                04
              </span>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Contacto
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                  ¿Conversamos?
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  Disponible para prácticas preprofesionales y proyectos de desarrollo Full Stack o Backend en {profileData.location}.
                </p>
                <a
                  href={`mailto:${profileData.email}`}
                  className="ui-link mt-6 inline-block break-all text-lg font-medium text-accent underline decoration-accent/40 underline-offset-8 hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-2xl"
                >
                  {profileData.email}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-5 lg:col-span-4 lg:justify-end">
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-link group inline-flex items-center gap-1 rounded-sm py-1 text-sm font-medium text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="ui-shift ui-hover-shift-x h-4 w-4 text-accent" aria-hidden="true" />
                </a>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-link group inline-flex items-center gap-1 rounded-sm py-1 text-sm font-medium text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="ui-shift ui-hover-shift-x h-4 w-4 text-accent" aria-hidden="true" />
                </a>
                <Link
                  href="/contacto"
                  className="ui-press group inline-flex items-center gap-2 rounded-sm border border-accent bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg hover:bg-accent-soft hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>Escribir mensaje</span>
                  <ArrowRight className="ui-shift ui-hover-shift-x h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
