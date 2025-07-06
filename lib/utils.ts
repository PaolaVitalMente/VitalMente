// Función helper para combinar clases CSS de manera eficiente
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs
    .filter(Boolean)
    .join(" ")
    .trim()
}
