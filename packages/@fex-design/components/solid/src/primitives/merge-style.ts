import type { JSX } from 'solid-js'

type Style = JSX.CSSProperties | string | undefined

/** Preserve Solid's native string/object styles and apply later declarations last. */
export function mergeStyle(...styles: Style[]): JSX.CSSProperties | string {
  if (styles.every((style) => typeof style !== 'string')) {
    return Object.assign({}, ...styles.filter(Boolean))
  }
  return styles
    .map((style) => {
      if (typeof style === 'string') return style
      return Object.entries(style ?? {})
        .filter(([, value]) => value !== undefined && value !== null)
        .map(
          ([key, value]) =>
            `${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${value}`,
        )
        .join(';')
    })
    .filter(Boolean)
    .join(';')
}
