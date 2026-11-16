import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, ArrowUpRight, Download } from "lucide-react";
import { profileData } from "@/data/portfolio";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";

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

function LinkedinIcon({ className }: { className?: string }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contacto",
  description: `Ponte en contacto con ${profileData.name} para oportunidades de prácticas preprofesionales o empleo como Full Stack Developer.`,
};

/**
 * Página de Contacto (/contacto) — Server Component con formulario interactivo hijo.
 */
export default function ContactPage() {
  const directLinks = [
    {
      label: "Correo electrónico",
      value: profileData.email,
      href: `mailto:${profileData.email}`,
      icon: Mail,
      description:
        "Respuesta rápida para procesos de selección, entrevistas y consultas técnicas.",
    },
    {
      label: "LinkedIn profesional",
      value: profileData.linkedin.replace("https://", ""),
      href: profileData.linkedin,
      icon: LinkedinIcon,
      description:
        "Conecta conmigo para revisar mi trayectoria académica y disponibilidad.",
    },
    {
      label: "GitHub & repositorios",
      value: profileData.github.replace("https://", ""),
      href: profileData.github,
      icon: GithubIcon,
      description:
        "Explora el código fuente público de Axioma y Nexo V o solicita acceso de revisión para otros módulos.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <FadeIn>
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            04 // Contacto
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Construyamos algo juntos
          </h1>
          <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-muted sm:text-lg">
            Actualmente busco oportunidades de{" "}
            <strong className="font-semibold text-ink">
              prácticas preprofesionales o empleo Junior como Full Stack Developer
            </strong>
            . Si tienes una vacante o deseas revisar en vivo el código de mis proyectos, estaré encantado de conversar.
          </p>
        </div>
      </FadeIn>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Columna izquierda: Enlaces directos y disponibilidad */}
        <div className="min-w-0 space-y-6 lg:col-span-5">
          <FadeIn delay={60}>
            <figure>
              <div className="relative overflow-hidden rounded-sm border border-line bg-[#0D1015]">
                <Image
                  src="/images/about-bg.jpg"
                  alt="Entorno personal de descanso en Lima, Perú"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#0D1015]/70 bg-gradient-to-t from-[#0D1015]/95 via-[#0D1015]/60 to-[#0D1015]/40"
                />
                <div className="relative z-10 flex min-h-[210px] flex-col justify-end p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-semibold text-[#F5F5F5]">
                      Disponible para incorporación
                    </h2>
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-[#75CEC5]/40 bg-[#171B23]/90 px-2.5 py-0.5 font-mono text-xs font-medium text-[#75CEC5]">
                      <span className="h-2 w-2 rounded-full bg-[#75CEC5]" />
                      Activo
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#F5F5F5]/85">
                    {profileData.academicStatus}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-[#F5F5F5]/90">
                    <MapPin className="h-4 w-4 shrink-0 text-[#75CEC5]" aria-hidden="true" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
              </div>
              <figcaption className="mt-3 font-mono text-xs text-muted">
                Desconectando. Lima, Perú.
              </figcaption>
            </figure>
          </FadeIn>

          <div className="divide-y divide-line border-b border-t border-line">
            {directLinks.map((item, idx) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith("http");
              return (
                <FadeIn key={item.label} delay={100 + idx * 60}>
                  <a
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="ui-link group flex items-start gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div className="ui-shift flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-line bg-surface text-accent group-hover:border-accent">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs uppercase tracking-wider text-muted">
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className="ui-shift ui-hover-shift-x h-4 w-4 shrink-0 text-muted group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ui-link mt-1 truncate font-mono text-sm font-medium text-ink group-hover:text-accent">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </a>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={280}>
            <a
              href="/cv.pdf"
              download="CV_Hector_Reyes.pdf"
              className="ui-press group flex items-center justify-between gap-4 rounded-sm border border-accent bg-surface px-5 py-4 hover:bg-accent hover:text-accent-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="min-w-0">
                <span className="block font-mono text-xs uppercase tracking-wider text-accent group-hover:text-accent-fg">
                  Currículum Vitae
                </span>
                <span className="mt-1 block text-sm font-semibold text-ink group-hover:text-accent-fg">
                  Descargar CV
                </span>
              </div>
              <Download
                className="ui-shift ui-hover-shift-y h-4 w-4 shrink-0 text-accent group-hover:text-accent-fg"
                aria-hidden="true"
              />
            </a>
          </FadeIn>
        </div>

        {/* Columna derecha: Formulario de Contacto */}
        <div className="min-w-0 lg:col-span-7">
          <FadeIn delay={140}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
