import React from "react";
import { skillsData, Skill } from "@/data/portfolio";

const LAYERS: {
  category: Skill["category"];
  title: string;
  action: string;
}[] = [
  {
    category: "Frontend",
    title: "Frontend",
    action: "Pinta la pantalla y envía la petición.",
  },
  {
    category: "Backend",
    title: "Backend",
    action: "Valida con JWT y aplica las reglas de negocio.",
  },
  {
    category: "Bases de datos",
    title: "Bases de datos",
    action: "Guarda todo dentro de una transacción.",
  },
  {
    category: "ORM/herramientas",
    title: "ORM/herramientas",
    action: "Impone las restricciones desde el esquema.",
  },
];

export default function ArchitectureTrace() {
  return (
    <ol
      aria-label="Recorrido de una petición"
      className="relative space-y-2.5 pl-7 before:absolute before:bottom-5 before:left-[9px] before:top-5 before:w-px before:bg-line"
    >
      {LAYERS.map((layer, i) => {
        const techs = skillsData.filter((s) => s.category === layer.category);
        const delay = { animationDelay: `${i * 1.2}s` };

        return (
          <li
            key={layer.category}
            className="trace-layer relative rounded-sm border border-line bg-surface p-3.5 transition-colors duration-200"
            style={delay}
          >
            <span
              aria-hidden="true"
              className="trace-node absolute -left-[23px] top-4 h-2.5 w-2.5 rounded-full border-2 border-line bg-surface"
              style={delay}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="text-sm font-semibold text-ink">{layer.title}</h3>
              <span className="font-mono text-xs text-muted">
                {techs.map((t) => t.name).join(", ")}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
              {layer.action}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
