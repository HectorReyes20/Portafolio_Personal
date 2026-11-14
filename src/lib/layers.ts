export type LayerKey = "Interfaz" | "Lógica" | "Datos" | "Otros";

// El orden importa: "Datos" se evalúa primero para que "Prisma ORM" no caiga en otra capa.
const RULES: [LayerKey, string[]][] = [
  ["Datos", ["postgres", "mysql", "sqlite", "prisma"]],
  ["Interfaz", ["next", "react", "angular", "tailwind", "html", "css", "typescript", "livewire", "flux"]],
  ["Lógica", ["nest", "spring", "java", "laravel", "php", "fastapi", "python", "pydantic", "jwt", "rest"]],
];

const LAYER_ORDER: LayerKey[] = ["Interfaz", "Lógica", "Datos", "Otros"];

/** Agrupa el stack de un proyecto por capa de la arquitectura. */
export function groupStackByLayer(stack: string[]) {
  const groups: Record<LayerKey, string[]> = { Interfaz: [], Lógica: [], Datos: [], Otros: [] };
  for (const tech of stack) {
    const t = tech.toLowerCase();
    const layer = RULES.find(([, keys]) => keys.some((k) => t.includes(k)))?.[0] ?? "Otros";
    groups[layer].push(tech);
  }
  return LAYER_ORDER.filter((l) => groups[l].length > 0).map((l) => ({ layer: l, techs: groups[l] }));
}