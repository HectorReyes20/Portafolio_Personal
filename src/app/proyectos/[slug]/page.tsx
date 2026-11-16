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
  Lock,
} from "lucide-react";
import { projectsData } from "@/data/portfolio";
import FadeIn from "@/components/FadeIn";
import StackByLayer from "@/components/StackByLayer";
import { isValidHttpUrl } from "@/lib/urls";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

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
      return (
        <code
          key={index}
          className="rounded-[2px] border border-line bg-secondary px-1.5 py-0.5 font-mono text-[12px] font-medium text-accent"
        >
          {part}
        </code>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

const AXIOMA_GALLERY = [
  {
    src: "/projects/axioma-dashboard.webp",
    caption: "01 — Dashboard",
    alt: "Panel principal de Axioma con métricas clínicas y gráfico de predicción ML",
    width: 1437,
    height: 643,
    spanFull: true,
  },
  {
    src: "/projects/axioma-agenda.webp",
    caption: "02 — Agenda de citas",
    alt: "Calendario de citas médicas de Axioma sin cruces de horarios",
    width: 1444,
    height: 586,
    spanFull: false,
  },
  {
    src: "/projects/axioma-soap.webp",
    caption: "03 — Expediente clínico",
    alt: "Expediente clínico y registro de evoluciones en formato SOAP de Axioma",
    width: 1001,
    height: 798,
    spanFull: false,
  },
];

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
  const isPublicRepo = isValidHttpUrl(repoValue);
  const isPublicDemo = isValidHttpUrl(project.demoUrl);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Navegación de regreso */}
      <FadeIn>
        <Link
          href="/proyectos"
          className="ui-link group inline-flex items-center gap-2 rounded-sm font-mono text-xs text-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="ui-shift ui-hover-shift-x-neg h-4 w-4" aria-hidden="true" />
          Volver al índice de proyectos
        </Link>

        {/* Encabezado del caso de estudio adaptable a 375px */}
        <div className="mt-6 flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
              {!project.featured && (
                <span className="border border-accent bg-secondary px-2 py-0.5 font-semibold text-accent">
                  EN DOCUMENTACIÓN
                </span>
              )}
              <span className="text-accent">{project.category}</span>
              <span>·</span>
              <span className="tabular-nums">Año {project.year}</span>
            </div>

            <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {project.shortDescription}
            </p>
          </div>

          {/* Enlaces validados o aviso de repositorio privado sin desbordamiento en móvil */}
          <div className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center lg:shrink-0">
            {isPublicRepo ? (
              <a
                href={repoValue}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-press inline-flex items-center justify-center gap-2 rounded-sm border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <GithubIcon className="h-4 w-4 shrink-0" />
                Ver código en GitHub
              </a>
            ) : (
              repoValue && (
                <div className="inline-flex max-w-full items-center gap-2 rounded-sm border border-line bg-surface px-3.5 py-2 font-mono text-xs leading-snug text-muted">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden="true" />
                  <span className="break-words">{repoValue}</span>
                </div>
              )
            )}

            {isPublicDemo && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-press inline-flex items-center justify-center gap-2 rounded-sm border border-accent bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg hover:bg-accent-soft hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                Ver demo en vivo
              </a>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Captura o diagrama arquitectónico principal optimizado con next/image */}
      <FadeIn delay={60}>
        {project.slug === "axioma" ? (
          <div className="relative mt-8 w-full overflow-hidden rounded-sm border border-line bg-secondary p-2 sm:p-3">
            <Image
              src={project.image}
              alt={`Captura principal del sistema ${project.title}`}
              width={1437}
              height={643}
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 960px"
              className="h-auto w-full object-contain"
            />
          </div>
        ) : (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-sm border border-line bg-secondary">
            <Image
              src={project.image}
              alt={`Diagrama de arquitectura del proyecto ${project.title}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
            />
          </div>
        )}
      </FadeIn>

      {/* Cuerpo editorial en 2 columnas */}
      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="min-w-0 space-y-10 lg:col-span-8">
          {/* 1. Contexto y Arquitectura */}
          <FadeIn delay={100}>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Contexto y arquitectura del sistema
              </h2>
              <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-muted sm:text-base">
                {project.longDescription}
              </p>
            </section>
          </FadeIn>

          {/* 2. Mi Rol y Aporte */}
          <FadeIn delay={140}>
            <section className="border-t border-line pt-8">
              <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Mi rol y responsabilidades
              </h2>
              <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-muted sm:text-base">
                {project.myRole}
              </p>
            </section>
          </FadeIn>

          {/* 3. Retos Técnicos y Soluciones */}
          <FadeIn delay={180}>
            <section className="border-t border-line pt-8">
              <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Retos técnicos y decisiones de ingeniería
              </h2>
              <div className="mt-6 divide-y divide-line border-b border-t border-line">
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
                    <article key={idx} className="py-6">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs font-semibold tabular-nums text-accent">
                          0{idx + 1}
                        </span>
                        <h3 className="text-base font-semibold text-ink">
                          {leadTitle}
                        </h3>
                      </div>
                      <p className="mt-3 pl-7 text-sm leading-relaxed text-muted">
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
            <aside className="sticky top-24 space-y-6 rounded-sm border border-line bg-surface p-5 sm:p-6">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  Stack ({project.stack.length})
                </h2>
                <div className="mt-3">
                  <StackByLayer stack={project.stack} />
                </div>
              </div>

              <div className="border-t border-line pt-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  Puntos clave
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-line pt-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  Repositorio y demo
                </h3>
                <div className="mt-3 flex flex-col gap-2.5">
                  {isPublicRepo ? (
                    <a
                      href={repoValue}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ui-press flex items-center justify-between rounded-sm border border-line bg-secondary px-4 py-3 text-xs font-medium text-ink hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <span className="flex items-center gap-2 font-mono">
                        <GithubIcon className="h-4 w-4 shrink-0 text-accent" />
                        Repositorio en GitHub
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden="true" />
                    </a>
                  ) : (
                    repoValue && (
                      <div className="rounded-sm border border-line bg-secondary p-4 text-xs leading-relaxed text-muted">
                        <div className="flex items-start gap-2 font-mono font-medium text-ink">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                          <span className="break-words">{repoValue}</span>
                        </div>
                        <p className="mt-2 text-muted">
                          Código fuente y arquitectura disponibles para demostración en vivo durante entrevista técnica.
                        </p>
                        <Link
                          href="/contacto"
                          className="ui-link mt-3 inline-flex items-center gap-1.5 rounded-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          Solicitar revisión en entrevista
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    )
                  )}

                  {isPublicDemo && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ui-press flex items-center justify-between rounded-sm border border-accent bg-accent px-4 py-3 font-mono text-xs font-semibold text-accent-fg hover:bg-accent-soft hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                        Ver demo en vivo
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </FadeIn>
        </div>
      </div>

      {/* Galería de capturas reales exclusiva de Axioma */}
      {project.slug === "axioma" && (
        <FadeIn delay={180}>
          <section className="mt-14 border-t border-line pt-10">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Capturas del sistema
              </h2>
              <span className="font-mono text-xs font-semibold text-accent">
                03 vistas
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {AXIOMA_GALLERY.map((shot) => (
                <figure
                  key={shot.src}
                  className={shot.spanFull ? "md:col-span-2" : ""}
                >
                  {shot.spanFull ? (
                    <div className="relative w-full overflow-hidden rounded-sm border border-line bg-secondary p-2 transition-colors duration-200 hover:border-accent">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        quality={95}
                        sizes="(max-width: 1024px) 100vw, 960px"
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-line bg-secondary p-2 transition-colors duration-200 hover:border-accent">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        quality={95}
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <figcaption className="mt-2.5 border-t border-line pt-2 font-mono text-xs text-muted">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs leading-relaxed text-muted">
              Nota: Para probar la demo en vivo, utiliza los botones de acceso rápido (Admin, Recepción, Psicólogo, Paciente) en la pantalla de inicio de sesión.
            </p>
          </section>
        </FadeIn>
      )}

      {/* Navegación circular entre casos de estudio */}
      <FadeIn delay={200}>
        <nav
          aria-label="Navegación entre casos de estudio"
          className="mt-14 border-t border-line pt-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href={`/proyectos/${prevProject.slug}`}
              className="ui-card-interactive group flex flex-col justify-between rounded-sm border border-line bg-surface p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="ui-link inline-flex items-center gap-1.5 font-mono text-xs text-muted group-hover:text-accent">
                <ArrowLeft
                  className="ui-shift ui-hover-shift-x-neg h-3.5 w-3.5"
                  aria-hidden="true"
                />
                Anterior · {prevProject.category}
              </span>
              <span className="ui-link mt-2 text-base font-semibold text-ink group-hover:text-accent">
                {prevProject.title}
              </span>
              <span className="mt-1 line-clamp-1 text-xs text-muted">
                {prevProject.shortDescription}
              </span>
            </Link>

            <Link
              href={`/proyectos/${nextProject.slug}`}
              className="ui-card-interactive group flex flex-col items-start justify-between rounded-sm border border-line bg-surface p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:items-end sm:text-right"
            >
              <span className="ui-link inline-flex items-center gap-1.5 font-mono text-xs text-muted group-hover:text-accent">
                Siguiente · {nextProject.category}
                <ArrowRight
                  className="ui-shift ui-hover-shift-x h-3.5 w-3.5"
                  aria-hidden="true"
                />
              </span>
              <span className="ui-link mt-2 text-base font-semibold text-ink group-hover:text-accent">
                {nextProject.title}
              </span>
              <span className="mt-1 line-clamp-1 text-xs text-muted">
                {nextProject.shortDescription}
              </span>
            </Link>
          </div>
        </nav>
      </FadeIn>
    </div>
  );
}
