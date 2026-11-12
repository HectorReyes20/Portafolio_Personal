import React from "react";
import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/portfolio";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Ponte en contacto con ${profileData.name} para oportunidades de prácticas preprofesionales o empleo como Full Stack Developer.`,
};

/**
 * Página de Contacto (/contacto) — Server Component con formulario interactivo hijo.
 * Incluye enlaces directos a GitHub, LinkedIn y Correo Electrónico + Formulario sin backend.
 */
export default function ContactPage() {
  const directLinks = [
    {
      label: "Correo Electrónico",
      value: profileData.email,
      href: `mailto:${profileData.email}`,
      icon: Mail,
      description:
        "Respuesta rápida para procesos de selección, entrevistas y consultas técnicas.",
    },
    {
      label: "LinkedIn Profesional",
      value: profileData.linkedin.replace("https://", ""),
      href: profileData.linkedin,
      icon: Linkedin,
      description:
        "Conecta conmigo para revisar mi trayectoria académica y disponibilidad.",
    },
    {
      label: "GitHub & Repositorios",
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
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-stone-50 sm:text-4xl lg:text-5xl">
            Construyamos algo juntos
          </h1>
          <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-stone-300 sm:text-lg">
            Actualmente busco oportunidades de{" "}
            <strong className="font-semibold text-stone-50">
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
            <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-6">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-stone-50">
                  Disponible para incorporación
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Activo
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-300">
                {profileData.academicStatus}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-stone-300">
                <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
                <span>{profileData.location}</span>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {directLinks.map((item, idx) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith("http");
              return (
                <FadeIn key={item.label} delay={100 + idx * 60}>
                  <a
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 rounded-2xl border border-stone-800/90 bg-stone-900/50 p-5 transition hover:border-amber-500/40 hover:bg-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 transition group-hover:bg-amber-500/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-stone-400">
                          {item.label}
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-stone-400 transition group-hover:text-amber-400" />
                      </div>
                      <p className="mt-0.5 truncate font-mono text-sm font-bold text-stone-50 group-hover:text-amber-300">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-stone-300">
                        {item.description}
                      </p>
                    </div>
                  </a>
                </FadeIn>
              );
            })}
          </div>
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
