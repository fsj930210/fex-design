import type { ComponentApi, Framework } from './types'

export function resolveComponentApi(value: ComponentApi, framework: Framework) {
  const native = value.frameworks?.[framework]
  const props = (native?.props ?? value.props ?? [])
    .filter((property) => !native?.omitProps?.includes(property.name))
    .map((property) => ({
      ...property,
      type: Object.entries(native?.typeOverrides ?? {}).reduce(
        (type, [from, to]) => type.replaceAll(from, to),
        property.type,
      ),
    }))
  const className = framework === 'react' ? 'className' : 'class'
  const styleType = {
    react: 'CSSProperties',
    vue: 'StyleValue',
    solid: 'JSX.CSSProperties',
    svelte: 'string',
    angular: 'string',
  }[framework]
  const nativeProps = value.nativeElement
    ? [
        ...(props.some((property) => property.name === className)
          ? []
          : [
              {
                name: className,
                type: 'string',
                default: undefined,
                description: `追加到原生 ${value.nativeElement} 的 ${className}。`,
              },
            ]),
        ...(props.some((property) => property.name === 'style')
          ? []
          : [
              {
                name: 'style',
                type: styleType,
                default: undefined,
                description: `追加到原生 ${value.nativeElement} 的内联样式。`,
              },
            ]),
      ]
    : []
  return {
    props: [...props, ...nativeProps],
    events: native?.events ?? value.events ?? [],
    slots: native?.slots ?? value.slots ?? [],
    slotLabel: native?.slotLabel ?? 'Slots',
  }
}
