import type { ComponentApi, Framework } from './types'

export function resolveComponentApi(value: ComponentApi, framework: Framework) {
  const native = value.frameworks?.[framework]
  return {
    props: (native?.props ?? value.props)
      .filter((property) => !native?.omitProps?.includes(property.name))
      .map((property) => ({
        ...property,
        type: Object.entries(native?.typeOverrides ?? {}).reduce(
          (type, [from, to]) => type.replaceAll(from, to),
          property.type,
        ),
      })),
    events: native?.events ?? value.events,
    slots: native?.slots ?? value.slots ?? [],
    slotLabel: native?.slotLabel ?? 'Slots',
  }
}
