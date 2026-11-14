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
import StackByLayer from "@/components/StackByLayer";
import { isValidHttpUrl } from "@/lib/urls";

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
          className={`border border-white/15 bg-[#0f0f0f] px-1.5 py-0.5 font-mono text-[12px] font-medium ${
            isMetric ? "text-emerald-400" : "text-[#bef264]"
          }`}
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
          className="inline-flex items-center gap-2 rounded-sm font-mono text-xs text-neutral-300 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al índice de proyectos
        </Link>

        {/* Encabezado del caso de estudio adaptable a 375px */}
        <div className="mt-6 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-400">
              {!project.featured && (
                <span className="border border-orange-400/40 bg-orange-400/10 px-2 py-0.5 font-semibold text-orange-300">
                  EN DOCUMENTACIÓN
                </span>
              )}
              <span>{project.category}</span>
              <span>·</span>
              <span className="tabular-nums">Año {project.year}</span>
            </div>

            <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-neutral-50 sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
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
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-[#0a0a0a] px-5 py-2.5 text-sm font-medium text-neutral-100 transition-colors hover:border-[#bef264]/60 hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
              >
                <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
                Ver código en GitHub
              </a>
            ) : (
              repoValue && (
                <div className="inline-flex max-w-full items-center gap-2 border border-white/10 bg-[#0a0a0a] px-3.5 py-2 font-mono text-xs leading-snug text-neutral-300">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-neutral-400" aria-hidden="true" />
                  <span className="break-words">{repoValue}</span>
                </div>
              )
            )}

            {isPublicDemo && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#bef264] px-5 py-2.5 text-sm font-semibold text-[#050505] transition-colors hover:bg-[#d9f99d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
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
          <div className="relative mt-8 w-full overflow-hidden border border-white/10 bg-[#0a0a0a]">
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
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden border border-white/10 bg-[#0a0a0a]">
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
              <h2 className="text-xl font-semibold tracking-tight text-neutral-50 sm:text-2xl">
                Contexto y arquitectura del sistema
              </h2>
              <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-neutral-300 sm:text-base">
                {project.longDescription}
              </p>
            </section>
          </FadeIn>

          {/* 2. Mi Rol y Aporte */}
          <FadeIn delay={140}>
            <section className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-50 sm:text-2xl">
                Mi rol y responsabilidades
              </h2>
              <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-neutral-300 sm:text-base">
                {project.myRole}
              </p>
            </section>
          </FadeIn>

          {/* 3. Retos Técnicos y Soluciones */}
          <FadeIn delay={180}>
            <section className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-50 sm:text-2xl">
                Retos técnicos y decisiones de ingeniería
              </h2>
              <div className="mt-6 divide-y divide-white/10 border-b border-t border-white/10">
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
                        <span className="font-mono text-xs font-medium tabular-nums text-[#bef264]">
                          0{idx + 1}
                        </span>
                        <h3 className="text-base font-semibold text-neutral-50">
                          {leadTitle}
                        </h3>
                      </div>
                      <p className="mt-3 pl-7 text-sm leading-relaxed text-neutral-300">
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
            <aside className="sticky top-24 space-y-6 border border-white/10 bg-[#0a0a0a] p-5 sm:p-6">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Stack ({project.stack.length})
                </h2>
                <div className="mt-3">
                  <StackByLayer stack={project.stack} />
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Puntos clave
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-relaxed text-neutral-300"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#bef264]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Repositorio y demo
                </h3>
                <div className="mt-3 flex flex-col gap-2.5">
                  {isPublicRepo ? (
                    <a
                      href={repoValue}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-white/15 bg-[#050505] px-4 py-3 text-xs font-medium text-neutral-200 transition-colors hover:border-[#bef264]/60 hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
                    >
                      <span className="flex items-center gap-2 font-mono">
                        <Github className="h-4 w-4 shrink-0 text-[#bef264]" aria-hidden="true" />
                        Repositorio en GitHub
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-neutral-400" aria-hidden="true" />
                    </a>
                  ) : (
                    repoValue && (
                      <div className="border border-white/10 bg-[#050505] p-4 text-xs leading-relaxed text-neutral-300">
                        <div className="flex items-start gap-2 font-mono font-medium text-neutral-100">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" aria-hidden="true" />
                          <span className="break-words">{repoValue}</span>
                        </div>
                        <p className="mt-2 text-neutral-300">
                          Código fuente y arquitectura disponibles para demostración en vivo durante entrevista técnica.
                        </p>
                        <Link
                          href="/contacto"
                          className="mt-3 inline-flex items-center gap-1.5 rounded-sm font-medium text-[#bef264] transition-colors hover:text-[#d9f99d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
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
                      className="flex items-center justify-between border border-[#bef264]/50 bg-[#bef264]/10 px-4 py-3 font-mono text-xs font-medium text-[#bef264] transition-colors hover:bg-[#bef264] hover:text-[#050505] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
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
          <section className="mt-14 border-t border-white/10 pt-10">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Capturas del sistema
              </h2>
              <span className="font-mono text-xs text-[#bef264]">03 vistas</span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {AXIOMA_GALLERY.map((shot) => (
                <figure
                  key={shot.src}
                  className={shot.spanFull ? "md:col-span-2" : ""}
                >
                  {shot.spanFull ? (
                    <div className="relative w-full overflow-hidden rounded-none border border-white/10 bg-[#050505] transition-colors duration-200 hover:border-[#bef264]/40">
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
                    <div className="relative aspect-video w-full overflow-hidden rounded-none border border-white/10 bg-[#050505] transition-colors duration-200 hover:border-[#bef264]/40">
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
                  <figcaption className="mt-2.5 border-t border-neutral-800 pt-2 font-mono text-xs text-neutral-400">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs leading-relaxed text-neutral-400">
              Nota: Para probar la demo en vivo, utiliza los botones de acceso rápido (Admin, Recepción, Psicólogo, Paciente) en la pantalla de inicio de sesión.
            </p>
          </section>
        </FadeIn>
      )}

      {/* Navegación circular entre casos de estudio */}
      <FadeIn delay={200}>
        <nav
          aria-label="Navegación entre casos de estudio"
          className="mt-14 border-t border-white/10 pt-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href={`/proyectos/${prevProject.slug}`}
              className="group flex flex-col justify-between border border-white/10 bg-[#0a0a0a] p-5 transition-colors hover:border-[#bef264]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 group-hover:text-[#bef264]">
                <ArrowLeft
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                Anterior · {prevProject.category}
              </span>
              <span className="mt-2 text-base font-semibold text-neutral-50 group-hover:text-[#bef264]">
                {prevProject.title}
              </span>
              <span className="mt-1 line-clamp-1 text-xs text-neutral-400">
                {prevProject.shortDescription}
              </span>
            </Link>

            <Link
              href={`/proyectos/${nextProject.slug}`}
              className="group flex flex-col items-start justify-between border border-white/10 bg-[#0a0a0a] p-5 text-left transition-colors hover:border-[#bef264]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] sm:items-end sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 group-hover:text-[#bef264]">
                Siguiente · {nextProject.category}
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 text-base font-semibold text-neutral-50 group-hover:text-[#bef264]">
                {nextProject.title}
              </span>
              <span className="mt-1 line-clamp-1 text-xs text-neutral-400">
                {nextProject.shortDescription}
              </span>
            </Link>
          </div>
        </nav>
      </FadeIn>
    </div>
  );
}
