import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Lock } from "lucide-react";
import { Project } from "@/data/portfolio";
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

export default function ProjectCard({ project }: { project: Project }) {
  const repoValue = (project.repoUrl || project.githubUrl || "").trim();
  const isPublicRepo = isValidHttpUrl(repoValue);
  const isPublicDemo = isValidHttpUrl(project.demoUrl);

  return (
    <article className="ui-card-interactive group relative flex h-full min-w-0 flex-col rounded-sm border border-line bg-surface">
      <Link
        href={`/proyectos/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/9] w-full overflow-hidden border-b border-line bg-secondary"
      >
        <Image
          src={project.image}
          alt={`Vista previa del proyecto ${project.title}`}
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, 540px"
          className={
            project.image.endsWith(".webp")
              ? "ui-card-media object-contain bg-secondary p-2"
              : "ui-card-media object-cover"
          }
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs text-muted">
              {project.category} · {project.year}
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              CASO DE ESTUDIO
            </span>
          </div>

          <h3 className="ui-link mt-2.5 text-balance text-lg font-semibold tracking-tight text-ink group-hover:text-accent sm:text-xl">
            <Link
              href={`/proyectos/${project.slug}`}
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {project.shortDescription}
          </p>

          <div className="mt-5 border-t border-line pt-4">
            <StackByLayer stack={project.stack} />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/proyectos/${project.slug}`}
            className="ui-link inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Ver caso de estudio</span>
            <ArrowRight
              className="ui-shift ui-hover-shift-x h-4 w-4 shrink-0"
              aria-hidden="true"
            />
          </Link>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
            {isPublicRepo ? (
              <a
                href={repoValue}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Repositorio de ${project.title}`}
                className="ui-press inline-flex items-center gap-1.5 rounded-sm border border-line bg-secondary px-3 py-1 font-mono text-xs text-ink hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <GithubIcon className="h-3.5 w-3.5 shrink-0" /> Repo
              </a>
            ) : (
              repoValue && (
                <span className="inline-flex max-w-full items-center gap-1.5 font-mono text-[11px] leading-snug text-muted">
                  <Lock className="h-3 w-3 shrink-0 text-muted" aria-hidden="true" />
                  <span className="break-words">{repoValue}</span>
                </span>
              )
            )}
            {isPublicDemo && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver demo en vivo de ${project.title}`}
                className="ui-press inline-flex items-center gap-1.5 rounded-sm border border-accent bg-accent px-3 py-1 font-mono text-xs font-semibold text-accent-fg hover:bg-accent-soft hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Ver demo en vivo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
