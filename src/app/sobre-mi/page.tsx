import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  profileData,
  academicTimeline,
  skillsData,
  professionalInterests,
  Skill,
} from "@/data/portfolio";
import FadeIn from "@/components/FadeIn";
import TechIcon from "@/components/TechIcon";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: `Conoce la trayectoria académica en Ingeniería de Sistemas e Informática (9.º ciclo), stack tecnológico por capas e intereses profesionales de ${profileData.name}.`,
};

const SKILL_CATEGORIES: Skill["category"][] = [
  "Frontend",
  "Backend",
  "Bases de datos",
  "ORM/herramientas",
];

/**
 * Página "Sobre mí" (/sobre-mi) — Server Component.
 * Incluye: Trayectoria académica, Tecnologías agrupadas en 4 capas e Intereses profesionales.
 */
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      {/* Encabezado e Introducción */}
      <FadeIn>
        <div className="max-w-3xl">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-stone-50 sm:text-4xl lg:text-5xl">
            Ingeniería de Sistemas con enfoque en desarrollo Full Stack
          </h1>
          <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-stone-800 bg-stone-900/90 px-3 py-1 font-mono text-xs text-stone-200">
            {profileData.academicStatus}
          </div>
          <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-stone-300 sm:text-lg">
            Soy <strong className="font-semibold text-stone-50">{profileData.name}</strong>, estudiante del{" "}
            <span className="font-medium text-amber-300">
              9.º ciclo de Ingeniería de Sistemas e Informática
            </span>
            . Durante mi formación universitaria he desarrollado una mentalidad analítica enfocada en transformar requerimientos complejos en software mantenible, seguro y bien estructurado.
          </p>
        </div>
      </FadeIn>

      {/* 1. TRAYECTORIA ACADÉMICA */}
      <section className="mt-16 border-t border-stone-800/80 pt-14">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight text-stone-50 sm:text-3xl">
            Trayectoria Académica
          </h2>
          <p className="mt-2 text-sm text-stone-300">
            Evolución por etapas a lo largo de la carrera de Ingeniería de Sistemas e Informática.
          </p>
        </FadeIn>

        <div className="mt-8 space-y-6">
          {academicTimeline.map((item, idx) => (
            <FadeIn key={item.period} delay={idx * 90}>
              <div className="relative rounded-2xl border border-stone-800/90 bg-stone-900/50 p-6 transition hover:border-amber-500/40 sm:p-8">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <span className="inline-block rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-amber-300">
                      {item.period}
                    </span>
                    <h3 className="mt-2.5 text-xl font-bold text-stone-50">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-medium text-stone-400">
                    {item.institution}
                  </span>
                </div>

                <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-stone-300">
                  {item.description}
                </p>

                <ul className="mt-4 grid grid-cols-1 gap-2.5 border-t border-stone-800/70 pt-4 sm:grid-cols-2">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-xs text-stone-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 2. TECNOLOGÍAS QUE MANEJO (4 Capas: Frontend, Backend, Bases de datos, ORM/herramientas) */}
      <section className="mt-16 border-t border-stone-800/80 pt-14">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight text-stone-50 sm:text-3xl">
            Tecnologías por Capa Arquitectónica
          </h2>
          <p className="mt-2 text-sm text-stone-300">
            Herramientas empleadas en proyectos académicos y personales organizadas por responsabilidad técnica.
          </p>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category, idx) => {
            const categorySkills = skillsData.filter((s) => s.category === category);
            return (
              <FadeIn key={category} delay={idx * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-stone-800/90 bg-stone-900/50 p-6">
                  <h3 className="border-b border-stone-800 pb-3 font-mono text-sm font-bold text-amber-300">
                    {category}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="flex items-start gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${skill.badgeColor}`}
                        >
                          <TechIcon name={skill.name} className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-sm font-semibold text-stone-50">
                            {skill.name}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-stone-300">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* 3. INTERESES PROFESIONALES */}
      <section className="mt-16 border-t border-stone-800/80 pt-14">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight text-stone-50 sm:text-3xl">
            Intereses Profesionales
          </h2>
          <p className="mt-2 text-sm text-stone-300">
            Áreas de ingeniería de software en las que busco aportar valor durante mis prácticas preprofesionales o posición Junior.
          </p>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {professionalInterests.map((interest, idx) => (
            <FadeIn key={interest.title} delay={idx * 75}>
              <div className="h-full rounded-2xl border border-stone-800/90 bg-stone-900/50 p-6 transition hover:border-amber-500/40">
                <h3 className="text-lg font-bold text-stone-50">
                  {interest.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">
                  {interest.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Llamado a la acción final */}
        <FadeIn delay={200}>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold text-stone-50">
                ¿Te gustaría ver cómo aplico estas tecnologías en proyectos reales?
              </h3>
              <p className="mt-1 text-sm text-stone-300">
                Revisa mis casos de estudio o contáctame directamente para una entrevista.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                Ver proyectos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-700 bg-stone-950/70 px-5 py-2.5 text-sm font-semibold text-stone-200 transition hover:border-amber-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Contactar
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
