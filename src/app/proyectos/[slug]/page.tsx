import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Lock,
} from "lucide-react";
import { projectsData } from "@/data/portfolio";
import FadeIn from "@/components/FadeIn";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

/**
 * Términos técnicos, restricciones y métricas verificadas que se resaltan en monoespaciada
 * dentro de la explicación de los retos técnicos para facilitar el escaneo rápido.
 */
const TECHNICAL_TERMS_REGEX =
  /(@@unique\(\[citaId,\s*tipo\]\)|DB::transaction\(\)|lockForUpdate\(\)|decrement\(\)|ROC-AUC\s*0\.87|accuracy\s*84\.6%|RN-01\s*a\s*RN-54|Ley\s*N°\s*32396|IGV\s*\(18%\)|IGV\s*18%|Spring\s*Boot\s*3\.5\.5|Next\.js\s*15|NestJS\s*10|async\/await|OAuth2\/JWT)/g;

function renderHighlightedTechnicalText(text: string): React.ReactNode[] {
  const parts = text.split(TECHNICAL_TERMS_REGEX);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      const isMetric = /ROC-AUC|accuracy/i.test(part);
      return (
        <code
          key={index}
          className={`rounded border border-stone-700/90 bg-[#141210] px-1.5 py-0.5 font-mono text-[12px] font-medium ${
            isMetric ? "text-emerald-300" : "text-amber-300"
          }`}
        >
          {part}
        </code>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * Generación estática de rutas en build-time (SSG) a partir del archivo de datos.
 */
export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

/**
 * Metadatos SEO dinámicos por cada proyecto.
 */
export function generateMetadata({ params }: ProjectDetailPageProps): Metadata {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  return {
    title: `${project.title} — Caso de Estudio`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Caso de Estudio`,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

/**
 * Página estática de Detalle de Proyecto (/proyectos/[slug]) — Server Component.
 * Destilada sin tarjetas anidadas, con separación clara entre título y explicación en cada reto técnico,
 * resaltado de primitivas arquitectónicas y navegación circular entre proyectos.
 */
export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const projectIndex = projectsData.findIndex((p) => p.slug === params.slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const verifiedProjects = projectsData.filter((p) => p.featured);
  const verifiedIndex = verifiedProjects.findIndex(
    (p) => p.slug === project.slug
  );
  const prevProject =
    verifiedIndex !== -1
      ? verifiedProjects[
          (verifiedIndex - 1 + verifiedProjects.length) %
            verifiedProjects.length
        ]
      : verifiedProjects[verifiedProjects.length - 1];
  const nextProject =
    verifiedIndex !== -1
      ? verifiedProjects[(verifiedIndex + 1) % verifiedProjects.length]
      : verifiedProjects[0];

  const repoValue = (project.repoUrl || project.githubUrl || "").trim();
  const isPublicRepo = repoValue.startsWith("http");
  const isPublicDemo = Boolean(
    project.demoUrl && project.demoUrl.trim().startsWith("http")
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Navegación de regreso */}
      <FadeIn>
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 rounded-lg font-mono text-xs font-medium text-stone-300 transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al índice de proyectos
        </Link>

        {/* Encabezado del caso de estudio adaptable a 375px */}
        <div className="mt-5 flex flex-col justify-between gap-6 border-b border-stone-800/80 pb-8 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1">
            <h1 className="text-balance text-2xl font-extrabold tracking-tight text-stone-50 sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
              {project.shortDescription}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {!project.featured && (
                <span className="rounded-md border border-orange-500/40 bg-orange-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-orange-300">
                  EN DOCUMENTACIÓN
                </span>
              )}
              <span className="rounded-md border border-stone-700/90 bg-stone-900 px-2.5 py-1 font-mono text-xs font-semibold text-stone-200">
                {project.category}
              </span>
              <span className="font-mono text-xs tabular-nums text-stone-400">
                Año {project.year}
              </span>
            </div>
          </div>

          {/* Enlaces validados o aviso de repositorio privado sin desbordamiento en móvil */}
          <div className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center lg:shrink-0">
            {isPublicRepo ? (
              <a
                href={repoValue}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:border-amber-500/50 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Github className="h-4 w-4 shrink-0" />
                Ver Código en GitHub
              </a>
            ) : (
              repoValue && (
                <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-stone-800 bg-stone-900/90 px-3.5 py-2.5 font-mono text-xs leading-snug text-stone-300">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                  <span className="break-words">{repoValue}</span>
                </div>
              )
            )}

            {isPublicDemo && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-950/40 transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <ExternalLink className="h-4 w-4 shrink-0" />
                Demo en Vivo
              </a>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Diagrama arquitectónico principal optimizado con next/image */}
      <FadeIn delay={60}>
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stone-800 bg-stone-950">
          <Image
            src={project.image}
            alt={`Diagrama de arquitectura del proyecto ${project.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
          />
        </div>
      </FadeIn>

      {/* Cuerpo editorial en 2 columnas sin tarjetas anidadas */}
      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="min-w-0 space-y-10 lg:col-span-8">
          {/* 1. Contexto y Arquitectura */}
          <FadeIn delay={100}>
            <section>
              <h2 className="text-xl font-bold tracking-tight text-stone-50 sm:text-2xl">
                Contexto y Arquitectura del Sistema
              </h2>
              <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-stone-300 sm:text-base">
                {project.longDescription}
              </p>
            </section>
          </FadeIn>

          {/* 2. Mi Rol y Aporte */}
          <FadeIn delay={140}>
            <section className="border-t border-stone-800/80 pt-8">
              <h2 className="text-xl font-bold tracking-tight text-stone-50 sm:text-2xl">
                Mi Rol y Responsabilidades
              </h2>
              <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-stone-300 sm:text-base">
                {project.myRole}
              </p>
            </section>
          </FadeIn>

          {/* 3. Retos Técnicos y Soluciones (Título separado + explicación con términos resaltados) */}
          <FadeIn delay={180}>
            <section className="border-t border-stone-800/80 pt-8">
              <h2 className="text-xl font-bold tracking-tight text-stone-50 sm:text-2xl">
                Retos Técnicos y Decisiones de Ingeniería
              </h2>
              <div className="mt-6 space-y-4">
                {project.technicalChallenges.map((challenge, idx) => {
                  const colonIdx = challenge.indexOf(":");
                  const hasLeadTitle = colonIdx > 0 && colonIdx < 80;
                  const leadTitle = hasLeadTitle
                    ? challenge.slice(0, colonIdx).trim()
                    : `Reto técnico 0${idx + 1}`;
                  const bodyText = hasLeadTitle
                    ? challenge.slice(colonIdx + 1).trim()
                    : challenge;

                  return (
                    <article
                      key={idx}
                      className="rounded-xl border border-stone-800/90 bg-stone-900/50 p-5"
                    >
                      <div className="flex items-baseline gap-2.5 border-b border-stone-800/80 pb-2.5">
                        <span className="font-mono text-xs font-bold tabular-nums text-amber-400">
                          0{idx + 1}
                        </span>
                        <h3 className="text-base font-bold text-stone-50">
                          {leadTitle}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-stone-300">
                        {renderHighlightedTechnicalText(bodyText)}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          </FadeIn>
        </div>

        {/* Columna Lateral: Hitos Verificados, Stack Completo y Acceso */}
        <div className="min-w-0 lg:col-span-4">
          <FadeIn delay={120}>
            <aside className="sticky top-24 space-y-6 rounded-2xl border border-stone-800/90 bg-stone-900/50 p-5 sm:p-6">
              {/* Stack completo monocromático */}
              <div>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Stack del Proyecto ({project.stack.length})
                </h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-stone-800 bg-stone-950/90 px-2.5 py-1 font-mono text-xs font-medium text-stone-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Puntos clave de verificación */}
              <div className="border-t border-stone-800/80 pt-5">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Puntos Clave
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-relaxed text-stone-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Acceso a código / demo */}
              <div className="border-t border-stone-800/80 pt-5">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Repositorio y Demo
                </h3>
                <div className="mt-3 flex flex-col gap-2.5">
                  {isPublicRepo ? (
                    <a
                      href={repoValue}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-stone-800 bg-stone-950 px-4 py-3 text-xs font-medium text-stone-200 transition hover:border-amber-500/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span className="flex items-center gap-2 font-mono">
                        <Github className="h-4 w-4 shrink-0 text-amber-400" />
                        Repositorio en GitHub
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                    </a>
                  ) : (
                    repoValue && (
                      <div className="rounded-xl border border-stone-800 bg-[#141210] p-4 text-xs leading-relaxed text-stone-300">
                        <div className="flex items-start gap-2 font-mono font-semibold text-stone-50">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-stone-400" />
                          <span className="break-words">{repoValue}</span>
                        </div>
                        <p className="mt-2 text-stone-300">
                          Código fuente y arquitectura disponibles para demostración en vivo durante entrevista técnica.
                        </p>
                        <Link
                          href="/contacto"
                          className="mt-3 inline-flex items-center gap-1.5 rounded font-semibold text-amber-400 transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        >
                          Solicitar revisión en entrevista
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )
                  )}

                  {isPublicDemo && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 font-mono text-xs font-medium text-amber-300 transition hover:bg-amber-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 shrink-0" />
                        Abrir Demo Pública
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </FadeIn>
        </div>
      </div>

      {/* Navegación circular entre casos de estudio (Anterior / Siguiente siempre visibles) */}
      <FadeIn delay={200}>
        <nav
          aria-label="Navegación entre casos de estudio"
          className="mt-14 border-t border-stone-800/80 pt-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href={`/proyectos/${prevProject.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-stone-800/90 bg-stone-900/40 p-5 transition hover:border-amber-500/40 hover:bg-stone-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-400 group-hover:text-amber-300">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                Anterior · {prevProject.category}
              </span>
              <span className="mt-2 text-base font-bold text-stone-50 group-hover:text-amber-300">
                {prevProject.title}
              </span>
              <span className="mt-1 line-clamp-1 text-xs text-stone-400">
                {prevProject.shortDescription}
              </span>
            </Link>

            <Link
              href={`/proyectos/${nextProject.slug}`}
              className="group flex flex-col items-start justify-between rounded-2xl border border-stone-800/90 bg-stone-900/40 p-5 text-left transition hover:border-amber-500/40 hover:bg-stone-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:items-end sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-400 group-hover:text-amber-300">
                Siguiente · {nextProject.category}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-2 text-base font-bold text-stone-50 group-hover:text-amber-300">
                {nextProject.title}
              </span>
              <span className="mt-1 line-clamp-1 text-xs text-stone-400">
                {nextProject.shortDescription}
              </span>
            </Link>
          </div>
        </nav>
      </FadeIn>
    </div>
  );
}
