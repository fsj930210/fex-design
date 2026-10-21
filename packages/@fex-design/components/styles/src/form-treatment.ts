/**
 * Validation-display treatment shared by form control surfaces.
 *
 * Contract: error rides the native `aria-invalid` attribute (semantic + visual,
 * screen-reader truth); warning rides the presentational `data-warning`
 * attribute (ARIA has no warning state — announce warnings through text via
 * `aria-describedby`). Components never own validation state; they only paint
 * these attributes.
 *
 * `variant` is the Tailwind variant prefix of the surface that paints the
 * border/ring: the control itself (`aria-invalid=true`, `data-[warning=true]`)
 * or its wrapping surface (`has-[[aria-invalid=true]]`). `accent` is the system
 * status token (`var(--danger)` / `var(--warning)`); instance overrides work by
 * redefining the token on a scope or the instance itself.
 */
export function formTreatment(variant: string, accent: string): string {
  const ring = `ring-[color-mix(in_oklch,${accent}_20%,transparent)]`
  return [
    `${variant}:border-[${accent}]`,
    `${variant}:hover:border-[${accent}]`,
    `${variant}:focus-within:border-[${accent}]`,
    `${variant}:focus-within:outline-[${accent}]`,
    `${variant}:ring-3`,
    `${variant}:${ring}`,
    `${variant}:focus-within:ring-3`,
    `${variant}:focus-within:${ring}`,
  ].join(' ')
}
