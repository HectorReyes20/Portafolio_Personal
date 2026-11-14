import { skillsData, Skill } from "@/data/portfolio";

const LAYERS: { category: Skill["category"]; name: string; action: string }[] = [
  { category: "Frontend", name: "Interfaz", action: "Pinta la pantalla y envía la petición." },
  { category: "Backend", name: "Lógica y APIs", action: "Valida con JWT y aplica las reglas de negocio." },
  { category: "Bases de datos", name: "Persistencia", action: "Guarda todo dentro de una transacción." },
  { category: "ORM/herramientas", name: "Acceso tipado", action: "Impone las restricciones desde el esquema." },
];

export default function ArchitectureTrace() {
  return (
    <ol
      aria-label="Recorrido de una petición por las capas de un sistema"
      className="relative space-y-3 pl-8 before:absolute before:bottom-6 before:left-[11px] before:top-6 before:w-px before:bg-stone-700"
    >
      {LAYERS.map((layer, i) => {
        const techs = skillsData.filter((s) => s.category === layer.category);
        const delay = { animationDelay: `${i * 1.2}s` };
        return (
          <li
            key={layer.category}
            className="trace-layer relative rounded-xl border border-stone-800 bg-stone-900/70 p-4"
            style={delay}
          >
            <span
              aria-hidden="true"
              className="trace-node absolute -left-[27px] top-5 h-3 w-3 rounded-full border-2 border-stone-600 bg-stone-950"
              style={delay}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="font-semibold text-stone-50">{layer.name}</h3>
              <span className="font-mono text-xs text-stone-400">
                {techs.map((t) => t.name).join(", ")}
              </span>
            </div>
            <p className="mt-1 text-sm text-stone-300">{layer.action}</p>
          </li>
        );
      })}
    </ol>
  );
}