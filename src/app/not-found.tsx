import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start justify-center px-4 py-24 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        HTTP 404 // Ruta no disponible
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
        Página o proyecto no encontrado
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
        La ruta que intentas visitar no existe o fue movida. Puedes regresar al inicio o explorar el listado completo de casos de estudio.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="/"
          className="ui-press group inline-flex items-center gap-2 rounded-sm border border-accent bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg hover:bg-accent-soft hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="ui-shift ui-hover-shift-x-neg h-4 w-4" aria-hidden="true" />
          Volver al inicio
        </Link>
        <Link
          href="/proyectos"
          className="ui-press inline-flex items-center gap-2 rounded-sm border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Ver proyectos
        </Link>
      </div>
    </div>
  );
}
