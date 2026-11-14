/**
 * Valida de forma segura que una cadena corresponda a una URL HTTP o HTTPS bien formada.
 */
export function isValidHttpUrl(value?: string | null): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
