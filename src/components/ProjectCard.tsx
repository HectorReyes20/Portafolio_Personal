import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Lock } from "lucide-react";
import { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
}

const MAX_VISIBLE_TAGS = 4;

/**
 * Tarjeta reutilizable de proyecto (Server Component).
 * Destilada para lectura rápida: máximo 4 tags + indicador +N, y pie adaptable a 375px sin colisión horizontal.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const repoValue = (project.repoUrl || project.githubUrl || "").trim();
  const isPublicRepo = repoValue.startsWith("http");
  const isPublicDemo = Boolean(
    project.demoUrl && project.demoUrl.trim().startsWith("http")
  );
  const visibleTags = project.stack.slice(0, MAX_VISIBLE_TAGS);
  const remainingTagsCount = Math.max(0, project.stack.length - MAX_VISIBLE_TAGS);

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-800/90 bg-stone-900/65 transition-all duration-300 hover:border-amber-500/40 hover:bg-stone-900/90">
      {/* Imagen de vista previa optimizada con next/image */}
      <Link
        href={`/proyectos/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/9] w-full overflow-hidden border-b border-stone-800/80 bg-stone-950"
      >
        <Image
          src={project.image}
          alt={`Vista previa del proyecto ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3.5 top-3.5 max-w-[calc(100%-1.75rem)] truncate rounded-md border border-stone-700/90 bg-stone-950/90 px-2.5 py-1 font-mono text-[11px] font-medium text-stone-200 backdrop-blur-sm">
          {project.category}
        </span>
      </Link>

      {/* Cuerpo de la tarjeta */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 text-balance text-lg font-bold tracking-tight text-stone-50 transition-colors group-hover:text-amber-300 sm:text-xl">
              <Link
                href={`/proyectos/${project.slug}`}
                className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                {project.title}
              </Link>
            </h3>
            <span className="shrink-0 pt-0.5 font-mono text-xs tabular-nums text-stone-400">
              {project.year}
            </span>
          </div>

          <p className="mt-2.5 line-clamp-2 break-words text-sm leading-relaxed text-stone-300">
            {project.shortDescription}
          </p>

          {/* Máximo 4 tags tecnológicos monocromáticos + indicador +N */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {visibleTags.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-stone-800 bg-stone-950/90 px-2.5 py-1 font-mono text-xs font-medium text-stone-200"
              >
                {tech}
              </span>
            ))}
            {remainingTagsCount > 0 && (
              <span
                className="rounded-md border border-stone-800 bg-stone-950/60 px-2.5 py-1 font-mono text-xs font-medium text-stone-400"
                title={project.stack.slice(MAX_VISIBLE_TAGS).join(", ")}
              >
                +{remainingTagsCount}
              </span>
            )}
          </div>
        </div>

        {/* Pie de tarjeta apilable en 375px para evitar desbordamiento de avisos largos */}
        <div className="mt-6 flex flex-col items-start gap-3 border-t border-stone-800/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/proyectos/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded text-sm font-semibold text-amber-400 transition hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Ver caso de estudio
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
            {isPublicRepo ? (
              <a
                href={repoValue}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-800 bg-stone-950/90 px-2.5 py-1.5 font-mono text-xs font-medium text-stone-200 transition hover:border-amber-500/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={`Repositorio GitHub de ${project.title}`}
              >
                <Github className="h-3.5 w-3.5 shrink-0" />
                Repo
              </a>
            ) : (
              repoValue && (
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-stone-800/90 bg-stone-950/80 px-2.5 py-1.5 font-mono text-[11px] leading-snug text-stone-300">
                  <Lock className="h-3 w-3 shrink-0 text-stone-400" />
                  <span className="break-words">{repoValue}</span>
                </span>
              )
            )}
            {isPublicDemo && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/35 bg-amber-500/10 px-2.5 py-1.5 font-mono text-xs font-medium text-amber-300 transition hover:bg-amber-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={`Demo en vivo de ${project.title}`}
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
