import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Linkedin,
  Lock,
  Mail,
} from "lucide-react";
import { profileData, skillsData, projectsData, Skill } from "@/data/portfolio";
import FadeIn from "@/components/FadeIn";
import TechIcon from "@/components/TechIcon";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: `${profileData.name} — ${profileData.role}`,
  description: profileData.shortBio,
};

const FLAGSHIP_MAX_TAGS = 5;

const SKILL_LAYERS: {
  category: Skill["category"];
  layerCode: string;
  subtitle: string;
}[] = [
  {
    category: "Frontend",
    layerCode: "CAPA 01 // INTERFAZ",
    subtitle: "SSR, Server Components y arquitectura modular",
  },
  {
    category: "Backend",
    layerCode: "CAPA 02 // LÓGICA & APIs",
    subtitle: "Reglas de negocio, servicios REST y ML en runtime",
  },
  {
    category: "Bases de datos",
    layerCode: "CAPA 03 // PERSISTENCIA SQL",
    subtitle: "Modelado relacional, transacciones ACID y bloqueos",
  },
  {
    category: "ORM/herramientas",
    layerCode: "CAPA 04 // ACCESO TIPADO",
    subtitle: "Esquemas declarativos y restricciones compuestas",
  },
];

/**
 * Página de Inicio (Server Component).
 * Dirección: Ingeniería de Sistemas Editorial — Destilada sin redundancia textual con las páginas internas,
 * con máximo 5 tags visibles en el proyecto insignia (+N), sin tarjetas anidadas y óptima en 375px.
 */
export default function HomePage() {
  const featuredProjects = projectsData.filter((project) => project.featured);
  const flagshipProject =
    featuredProjects.find((project) => project.slug === "axioma") ||
    featuredProjects[0];
  const secondaryProjects = featuredProjects.filter(
    (project) => project.slug !== flagshipProject?.slug
  );

  const flagshipRepoValue = flagshipProject
    ? (flagshipProject.repoUrl || flagshipProject.githubUrl || "").trim()
    : "";
  const isFlagshipRepoPublic = flagshipRepoValue.startsWith("http");
  const isFlagshipDemoPublic = Boolean(
    flagshipProject?.demoUrl && flagshipProject.demoUrl.trim().startsWith("http")
  );

  const flagshipVisibleTags = flagshipProject
    ? flagshipProject.stack.slice(0, FLAGSHIP_MAX_TAGS)
    : [];
  const flagshipRemainingTags = flagshipProject
    ? Math.max(0, flagshipProject.stack.length - FLAGSHIP_MAX_TAGS)
    : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* 1. HERO EDITORIAL */}
      <section className="border-b border-stone-800/80 py-14 sm:py-20">
        <FadeIn>
          <div className="max-w-3xl">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-stone-50 sm:text-5xl lg:text-6xl">
              {profileData.name}
            </h1>

            <p className="mt-3 text-xl font-semibold text-amber-400 sm:text-2xl">
              {profileData.role}
            </p>

            {/* Metadatos académicos y de disponibilidad en monoespaciada */}
            <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-stone-300">
              <span className="rounded-md border border-stone-800 bg-stone-900/90 px-3 py-1.5 text-stone-200">
                {profileData.academicStatus}
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-300">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                Disponible para Prácticas / Junior
              </span>
            </div>

            {/* Breve bio de 2 líneas */}
            <p className="mt-6 max-w-[66ch] text-base leading-relaxed text-stone-300 sm:text-lg">
              {profileData.shortBio}
            </p>

            {/* Botones de acción: "Ver proyectos" y "Contacto" */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/proyectos"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-950/40 transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                Ver proyectos
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-700/90 bg-stone-900/80 px-6 py-3.5 text-sm font-semibold text-stone-200 transition hover:border-amber-500/50 hover:bg-stone-800/80 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Mail className="h-4 w-4 text-amber-400" />
                Contacto
              </Link>

              <div className="flex items-center gap-2">
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Perfil de GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-800 bg-stone-900/70 text-stone-300 transition hover:border-amber-500/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Perfil de LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-800 bg-stone-900/70 text-stone-300 transition hover:border-amber-500/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 2. PROYECTOS DESTACADOS (Axioma como Proyecto Insignia + Nexo V y Ferre-CRM como Secundarios) */}
      <section className="border-b border-stone-800/80 py-14 sm:py-20">
        <FadeIn>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-50 sm:text-3xl">
                Proyectos Destacados
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-stone-300">
                Casos de estudio principales con arquitectura multicapa, control transaccional y reglas de negocio reales.
              </p>
            </div>

            <Link
              href="/proyectos"
              className="inline-flex items-center gap-1.5 rounded font-mono text-xs font-semibold text-amber-400 transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Índice completo de proyectos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        {/* Proyecto Insignia: AXIOMA */}
        {flagshipProject && (
          <FadeIn delay={60}>
            <article className="mt-8 overflow-hidden rounded-2xl border border-amber-500/35 bg-stone-900/75">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Columna visual */}
                <div className="flex flex-col justify-between border-b border-stone-800/90 bg-stone-950/80 p-5 sm:p-7 lg:col-span-7 lg:border-b-0 lg:border-r">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-amber-300">
                        PROYECTO INSIGNIA · {flagshipProject.category}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-stone-400">
                        {flagshipProject.year}
                      </span>
                    </div>

                    <Link
                      href={`/proyectos/${flagshipProject.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="relative mt-4 block aspect-[16/9] w-full overflow-hidden rounded-xl border border-stone-800 bg-stone-950"
                    >
                      <Image
                        src={flagshipProject.image}
                        alt={`Arquitectura del sistema ${flagshipProject.title}`}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 640px"
                        className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </Link>
                  </div>

                  {/* Stack resumido a 5 etiquetas monocromáticas + indicador +N */}
                  <div className="mt-5 flex flex-wrap items-center gap-1.5">
                    {flagshipVisibleTags.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-stone-800 bg-stone-900 px-2.5 py-1 font-mono text-xs font-medium text-stone-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {flagshipRemainingTags > 0 && (
                      <span
                        className="rounded-md border border-stone-800 bg-stone-900/60 px-2.5 py-1 font-mono text-xs font-medium text-stone-400"
                        title={flagshipProject.stack
                          .slice(FLAGSHIP_MAX_TAGS)
                          .join(", ")}
                      >
                        +{flagshipRemainingTags}
                      </span>
                    )}
                  </div>
                </div>

                {/* Columna editorial: Síntesis ejecutiva sin duplicar el párrafo largo de la vista de detalle */}
                <div className="flex flex-col justify-between p-5 sm:p-7 lg:col-span-5">
                  <div>
                    <h3 className="text-balance text-xl font-bold tracking-tight text-stone-50 sm:text-2xl">
                      <Link
                        href={`/proyectos/${flagshipProject.slug}`}
                        className="rounded transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      >
                        {flagshipProject.title}
                      </Link>
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-stone-300">
                      {flagshipProject.shortDescription}
                    </p>

                    {/* Hitos técnicos clave */}
                    <ul className="mt-5 space-y-2.5 border-t border-stone-800/80 pt-4">
                      {flagshipProject.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2.5 text-xs leading-relaxed text-stone-200"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Métricas y primitivas verificadas en font-mono */}
                    <div className="mt-5 grid grid-cols-1 gap-2 border-t border-stone-800/80 pt-4 font-mono text-xs sm:grid-cols-2">
                      <div>
                        <span className="block text-[10px] text-stone-400">
                          DEDUCCIÓN ATÓMICA
                        </span>
                        <span className="mt-0.5 block font-semibold text-amber-300">
                          @@unique([citaId, tipo])
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-stone-400">
                          ML NO-SHOW (1,500 HIST. SIMULADOS)
                        </span>
                        <span className="mt-0.5 block font-semibold text-emerald-400 tabular-nums">
                          ROC-AUC 0.87 · Acc 84.6% (simulación)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pie apilable en 375px sin colisión horizontal */}
                  <div className="mt-6 flex flex-col items-start gap-3 border-t border-stone-800/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      href={`/proyectos/${flagshipProject.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-stone-950 transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    >
                      Analizar arquitectura
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Link>

                    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
                      {isFlagshipRepoPublic ? (
                        <a
                          href={flagshipRepoValue}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-950 px-3 py-1.5 font-mono text-xs text-stone-200 transition hover:border-amber-500/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        >
                          <Github className="h-3.5 w-3.5 shrink-0" />
                          Repo
                        </a>
                      ) : (
                        flagshipRepoValue && (
                          <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-stone-800 bg-stone-950/80 px-2.5 py-1.5 font-mono text-[11px] leading-snug text-stone-300">
                            <Lock className="h-3 w-3 shrink-0 text-stone-400" />
                            <span className="break-words">{flagshipRepoValue}</span>
                          </span>
                        )
                      )}

                      {isFlagshipDemoPublic && (
                        <a
                          href={flagshipProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-1.5 font-mono text-xs text-amber-300 transition hover:bg-amber-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        >
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </FadeIn>
        )}

        {/* Proyectos Secundarios: Nexo V y Ferre-CRM */}
        {secondaryProjects.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {secondaryProjects.map((project, index) => (
              <FadeIn key={project.slug} delay={120 + index * 80}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* 3. HABILIDADES TÉCNICAS ORGANIZADAS POR CAPAS (Sin tarjetas anidadas) */}
      <section className="border-b border-stone-800/80 py-14 sm:py-20">
        <FadeIn>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-50 sm:text-3xl">
                Stack Tecnológico por Capas
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-stone-300">
                Tecnologías organizadas por responsabilidad arquitectónica.
              </p>
            </div>

            <Link
              href="/sobre-mi"
              className="inline-flex items-center gap-1.5 rounded font-mono text-xs font-semibold text-amber-400 transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Ver trayectoria académica
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_LAYERS.map((layer, layerIdx) => {
            const layerSkills = skillsData.filter(
              (skill) => skill.category === layer.category
            );

            return (
              <FadeIn key={layer.category} delay={layerIdx * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-stone-800/90 bg-stone-900/50 p-5">
                  <div className="border-b border-stone-800/90 pb-3.5">
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-amber-400">
                      {layer.layerCode}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-stone-50">
                      {layer.category}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-stone-400">
                      {layer.subtitle}
                    </p>
                  </div>

                  <ul className="mt-2 divide-y divide-stone-800/70">
                    {layerSkills.map((skill) => (
                      <li key={skill.name} className="py-3 first:pt-2 last:pb-0">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${skill.badgeColor}`}
                          >
                            <TechIcon name={skill.name} className="h-4 w-4" />
                          </span>
                          <span className="font-mono text-sm font-bold text-stone-50">
                            {skill.name}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-stone-300">
                          {skill.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* 4. CIERRE EDITORIAL */}
      <section className="py-12 sm:py-16">
        <FadeIn>
          <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold tracking-tight text-stone-50 sm:text-2xl">
                  ¿Buscas un practicante o desarrollador Full Stack para tu equipo?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">
                  Disponible para integrarme a equipos de ingeniería y demostrar en vivo el código y la arquitectura de mis proyectos en entrevista técnica.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  Coordinar entrevista
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
