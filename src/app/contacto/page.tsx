import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, Download } from "lucide-react";
import { profileData } from "@/data/portfolio";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";

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
      icon: Linkedin,
      description:
        "Conecta conmigo para revisar mi trayectoria académica y disponibilidad.",
    },
    {
      label: "GitHub & repositorios",
      value: profileData.github.replace("https://", ""),
      href: profileData.github,
      icon: Github,
      description:
        "Explora el código fuente público de Nexo V y solicita acceso de revisión para proyectos académicos privados.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <FadeIn>
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Contacto
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl lg:text-5xl">
            Construyamos algo juntos
          </h1>
          <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-neutral-300 sm:text-lg">
            Actualmente busco oportunidades de{" "}
            <strong className="font-semibold text-neutral-50">
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
              <div className="relative overflow-hidden rounded-none border border-white/10 bg-[#0a0a0a]">
                <Image
                  src="/images/about-bg.jpg"
                  alt="Entorno personal de descanso en Lima, Perú"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/60 bg-gradient-to-t from-[#050505]/90 via-black/55 to-black/45"
                />
                <div className="relative z-10 flex min-h-[210px] flex-col justify-end p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-semibold text-neutral-50">
                      Disponible para incorporación
                    </h2>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/70 px-2.5 py-0.5 font-mono text-xs font-medium text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Activo
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-200">
                    {profileData.academicStatus}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-neutral-200">
                    <MapPin className="h-4 w-4 shrink-0 text-[#bef264]" aria-hidden="true" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
              </div>
              <figcaption className="mt-3 font-mono text-xs text-neutral-400">
                Desconectando. Lima, Perú.
              </figcaption>
            </figure>
          </FadeIn>

          <div className="divide-y divide-white/10 border-b border-t border-white/10">
            {directLinks.map((item, idx) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith("http");
              return (
                <FadeIn key={item.label} delay={100 + idx * 60}>
                  <a
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 py-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 bg-[#0a0a0a] text-[#bef264] transition-colors group-hover:border-[#bef264]/60">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-[#bef264]"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-1 truncate font-mono text-sm font-medium text-neutral-50 group-hover:text-[#bef264]">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-300">
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
              className="group flex items-center justify-between gap-4 border border-[#bef264]/40 bg-[#0a0a0a] px-5 py-4 transition-colors duration-200 hover:border-[#bef264] hover:bg-[#bef264]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
            >
              <div className="min-w-0">
                <span className="block font-mono text-xs uppercase tracking-wider text-[#bef264]">
                  Currículum Vitae
                </span>
                <span className="mt-1 block text-sm font-medium text-neutral-100">
                  Descargar CV
                </span>
              </div>
              <Download
                className="h-4 w-4 shrink-0 text-[#bef264] transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none"
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
