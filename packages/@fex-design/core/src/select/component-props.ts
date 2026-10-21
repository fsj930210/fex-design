const controlledSelectProps = [
  'children',
  'options',
  'value',
  'defaultValue',
  'multiple',
  'clearable',
  'onChange',
  'onUpdate:value',
] as const
const ownedNames = new Set<string>(
  controlledSelectProps.map((key) => key.replace(/[-_:]/g, '').toLowerCase()),
)

/** A composed single Select cannot replace its owner's options, value or commit handler. */
export function filterControlledSelectProps<T extends object>(
  props: T | undefined,
): Omit<T, (typeof controlledSelectProps)[number]> {
  return Object.fromEntries(
    Object.entries(props ?? {}).filter(
      ([key]) => !ownedNames.has(key.replace(/[-_:]/g, '').toLowerCase()),
    ),
  ) as Omit<T, (typeof controlledSelectProps)[number]>
}
