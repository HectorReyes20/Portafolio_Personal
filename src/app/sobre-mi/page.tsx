import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
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

const TECHNICAL_SHEET = [
  { label: "Enfoque", value: "Backend y Full Stack" },
  { label: "Educación", value: "Universidad Tecnológica del Perú" },
  { label: "Stack", value: "TypeScript, Python, Java" },
];

const NOISE_BG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/** Encabezado de sección: título a la izquierda, fijo al hacer scroll en pantallas grandes. */
function SectionHeading({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight text-neutral-50 sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-neutral-400">
        {children}
      </p>
    </div>
  );
}

/**
 * Página "Sobre mí" (/sobre-mi) — Server Component.
 */
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* ───────────── HERO ───────────── */}
      <FadeIn>
        <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#080808]">
          {/* Resplandor detrás de la foto, para separarla del fondo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_78%_72%,rgba(190,242,100,0.16),transparent_70%)]"
          />
          {/* Grano sutil */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-overlay"
            style={{ backgroundImage: NOISE_BG }}
          />

          {/* Nombre grande */}
          <div className="relative z-0 px-6 pt-8 sm:px-10 md:px-14 md:pt-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-neutral-300">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#bef264]"
                aria-hidden="true"
              />
              Busco prácticas preprofesionales
            </p>
            <h1 className="mt-6 text-balance font-semibold leading-[0.92] tracking-tighter text-neutral-50 text-[length:clamp(2.75rem,9vw,7rem)]">
              {profileData.name}
            </h1>
          </div>

          {/* Contenido + foto (la foto sube y toca el nombre) */}
          <div className="relative z-10 mt-6 md:mt-8">
            <div className="relative z-20 px-6 pb-8 sm:px-10 md:max-w-[58%] md:px-10 md:pb-12 lg:max-w-[60%] lg:px-14">
              <p className="text-xl font-medium leading-snug text-neutral-100 sm:text-2xl">
                Ingeniería de Sistemas con enfoque en desarrollo Full Stack
              </p>
              <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-neutral-300">
                Estudiante del 9.º ciclo de Ingeniería de Sistemas e Informática.
                Transformo requerimientos complejos en software mantenible,
                seguro y bien estructurado.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/proyectos"
                  className="inline-flex items-center rounded-full bg-[#bef264] px-5 py-2.5 text-sm font-semibold text-[#050505] transition-colors hover:bg-[#d9f99d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
                >
                  Ver proyectos
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-neutral-100 transition-colors hover:border-[#bef264]/60 hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
                >
                  Contactar
                </Link>
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-neutral-100 transition-colors hover:border-[#bef264]/60 hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Descargar CV
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-sm text-neutral-300 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
                >
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-sm text-neutral-300 transition-colors hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
                >
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <dl className="mt-10 grid grid-cols-1 gap-5 border-t border-white/10 pt-5 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                {TECHNICAL_SHEET.map((row) => (
                  <div key={row.label}>
                    <dt className="text-xs text-neutral-400">{row.label}</dt>
                    <dd className="mt-1 text-sm text-neutral-100">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Foto: en móvil va debajo del texto; desde md se ancla abajo a la derecha y sube hacia el nombre */}
            <div className="relative z-10 ml-auto w-4/5 max-w-xs md:absolute md:bottom-0 md:right-0 md:w-[40%] md:max-w-none lg:w-[38%] lg:max-w-[480px] [mask-image:linear-gradient(to_top,transparent,black_22%)]">
              <Image
                src="/images/profile.jpg"
                alt={`Retrato de ${profileData.name}, desarrollador Full Stack en Lima, Perú`}
                width={1083}
                height={1452}
                quality={90}
                priority
                sizes="(max-width: 768px) 80vw, 480px"
                className="h-auto w-full [mask-image:linear-gradient(to_right,transparent,black_14%)]"
              />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───────────── TRAYECTORIA ACADÉMICA ───────────── */}
      <section
        aria-labelledby="trayectoria"
        className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
      >
        <SectionHeading id="trayectoria" title="Trayectoria académica">
          Cómo he avanzado, etapa por etapa, en la carrera de Ingeniería de
          Sistemas e Informática.
        </SectionHeading>

        <ol className="relative ml-1.5 space-y-12 border-l border-white/10 pl-8 lg:col-span-8">
          {academicTimeline.map((item) => (
            <li key={item.period} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-2 h-3 w-3 rounded-full bg-[#bef264] ring-4 ring-[#050505]"
                style={{ left: "calc(-2rem - 6.5px)" }}
              />
              <p className="text-sm font-medium text-[#bef264]">{item.period}</p>
              <h3 className="mt-1 text-xl font-semibold text-neutral-50">
                {item.title}
              </h3>
              <p className="mt-0.5 text-sm text-neutral-400">{item.institution}</p>

              <p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-neutral-300">
                {item.description}
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-neutral-300"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#bef264]"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────────── 04 — EXPERIENCIA ───────────── */}
      <section
        aria-labelledby="experiencia"
        className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
      >
        <SectionHeading id="experiencia" title="04 — EXPERIENCIA">
          Experiencia operativa en monitoreo y registro de incidencias.
        </SectionHeading>

        <div className="border-b border-t border-white/10 py-7 lg:col-span-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <div>
              <h3 className="text-xl font-semibold text-neutral-50">
                Operador de Monitoreo
              </h3>
              <p className="mt-0.5 text-sm text-neutral-400">
                CECOVI, Municipalidad de Lurín
              </p>
            </div>
            <p className="font-mono text-xs text-[#bef264]">
              Jul. 2026 – Oct. 2026
            </p>
          </div>

          <p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-neutral-300">
            Monitoreo de cámaras de videovigilancia, identificación de incidencias y registro de reportes en la vía pública.
          </p>
        </div>
      </section>

      {/* ───────────── TECNOLOGÍAS POR CAPA ───────────── */}
      <section
        aria-labelledby="tecnologias"
        className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
      >
        <SectionHeading id="tecnologias" title="Tecnologías por capa">
          Las herramientas que uso en proyectos académicos y personales,
          ordenadas por responsabilidad técnica.
        </SectionHeading>

        <div className="border-b border-white/10 lg:col-span-8">
          {SKILL_CATEGORIES.map((category) => {
            const categorySkills = skillsData.filter((s) => s.category === category);
            return (
              <div
                key={category}
                className="grid grid-cols-1 gap-5 border-t border-white/10 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8"
              >
                <h3 className="text-lg font-semibold text-neutral-50">{category}</h3>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  {categorySkills.map((skill) => (
                    <li key={skill.name} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-neutral-200">
                        <TechIcon name={skill.name} className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-50">
                          {skill.name}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-neutral-400">
                          {skill.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────────── INTERESES PROFESIONALES ───────────── */}
      <section
        aria-labelledby="intereses"
        className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
      >
        <SectionHeading id="intereses" title="Intereses profesionales">
          Áreas de ingeniería de software en las que busco aportar valor
          durante mis prácticas preprofesionales o en una posición Junior.
        </SectionHeading>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {professionalInterests.map((interest) => (
            <li key={interest.title} className="border-t border-white/10 pt-5">
              <h3 className="text-lg font-semibold text-neutral-50">
                {interest.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                {interest.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────────── CIERRE ───────────── */}
      <section className="mt-24 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 sm:flex-row sm:items-center sm:p-10">
        <div>
          <h2 className="text-xl font-semibold text-neutral-50 sm:text-2xl">
            ¿Quieres ver cómo aplico estas tecnologías en proyectos reales?
          </h2>
          <p className="mt-2 max-w-[56ch] text-sm text-neutral-300">
            Revisa mis casos de estudio o escríbeme directamente para coordinar una entrevista.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/proyectos"
            className="inline-flex items-center rounded-full bg-[#bef264] px-5 py-2.5 text-sm font-semibold text-[#050505] transition-colors hover:bg-[#d9f99d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Ver proyectos
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-neutral-100 transition-colors hover:border-[#bef264]/60 hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Contactar
          </Link>
        </div>
      </section>
    </div>
  );
}