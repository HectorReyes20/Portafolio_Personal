import React from "react";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
        <Terminal className="h-7 w-7" />
      </div>
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
        Página o proyecto no encontrado
      </h1>
      <p className="mt-2 font-mono text-xs font-semibold text-cyan-400">
        HTTP 404 // RUTA NO DISPONIBLE
      </p>
      <p className="mt-3 max-w-md text-sm text-slate-300">
        La ruta que intentas visitar no existe o fue movida. Puedes regresar al inicio o explorar el listado completo de casos de estudio.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/40"
        >
          Ver proyectos
        </Link>
      </div>
    </div>
  );
}
