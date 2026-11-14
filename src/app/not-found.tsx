import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start justify-center px-4 py-24 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-[#bef264]">
        HTTP 404 // Ruta no disponible
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-50 sm:text-5xl">
        Página o proyecto no encontrado
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base">
        La ruta que intentas visitar no existe o fue movida. Puedes regresar al inicio o explorar el listado completo de casos de estudio.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#bef264] px-5 py-2.5 text-sm font-semibold text-[#050505] transition-colors hover:bg-[#d9f99d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al inicio
        </Link>
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:border-[#bef264]/60 hover:text-[#bef264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264]"
        >
          Ver proyectos
        </Link>
      </div>
    </div>
  );
}
