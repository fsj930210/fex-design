export type NativeStyle = string | Record<string, string | number | null | undefined>
/** Angular accepts native style text/maps; later declarations take precedence. */
export function mergeStyle(...styles: (NativeStyle | null | undefined)[]) {
  return styles
    .map((style) =>
      typeof style === 'string'
        ? style
        : Object.entries(style ?? {})
            .filter(([, value]) => value != null)
            .map(([key, value]) => {
              const [property = '', unit = ''] = key.split('.')
              return (
                property.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase()) +
                ':' +
                value +
                unit
              )
            })
            .join(';'),
    )
    .filter(Boolean)
    .join(';')
}
