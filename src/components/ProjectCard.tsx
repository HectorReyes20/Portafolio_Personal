import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Lock } from "lucide-react";
import { Project } from "@/data/portfolio";
import StackByLayer from "@/components/StackByLayer";
import { isValidHttpUrl } from "@/lib/urls";

export default function ProjectCard({ project }: { project: Project }) {
  const repoValue = (project.repoUrl || project.githubUrl || "").trim();
  const isPublicRepo = isValidHttpUrl(repoValue);
  const isPublicDemo = isValidHttpUrl(project.demoUrl);

  return (
    <article className="group relative flex h-full min-w-0 flex-col border border-white/10 bg-[#0a0a0a] transition-colors duration-200 hover:border-[#bef264]/50">
      <Link
        href={`/proyectos/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-[#050505]"
      >
        <Image
          src={project.image}
          alt={`Vista previa del proyecto ${project.title}`}
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, 540px"
          className={
            project.image.endsWith(".webp")
              ? "object-contain bg-[#0a0a0a]"
              : "object-cover"
          }
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
        <div className="min-w-0">
          <p className="font-mono text-xs text-neutral-400">
            {project.category} · {project.year}
          </p>
          <h3 className="mt-2 text-balance text-lg font-semibold tracking-tight text-neutral-50 transition-colors group-hover:text-[#bef264] sm:text-xl">
            <Link
              href={`/proyectos/${project.slug}`}
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-neutral-300">
            {project.shortDescription}
          </p>

          <div className="mt-5 border-t border-white/10 pt-4">
            <StackByLayer stack={project.stack} />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/proyectos/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-[#bef264] transition-colors hover:text-[#d9f99d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
          >
            Ver caso de estudio
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
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
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#050505] px-3 py-1 font-mono text-xs text-neutral-200 transition-colors hover:border-[#bef264]/60 hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
              >
                <Github className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Repo
              </a>
            ) : (
              repoValue && (
                <span className="inline-flex max-w-full items-center gap-1.5 font-mono text-[11px] leading-snug text-neutral-400">
                  <Lock className="h-3 w-3 shrink-0 text-neutral-400" aria-hidden="true" />
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
                className="inline-flex items-center gap-1.5 rounded-full border border-[#bef264]/50 bg-[#bef264]/10 px-3 py-1 font-mono text-xs text-[#bef264] transition-colors hover:bg-[#bef264] hover:text-[#050505] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
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
