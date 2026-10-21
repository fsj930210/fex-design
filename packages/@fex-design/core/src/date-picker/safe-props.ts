/** Only named, implemented capabilities may cross a composed component boundary. */
export function pickPickerProps<T extends object>(
  source: T | undefined,
  keys: readonly string[],
): Partial<T> {
  const result: Partial<T> = {}
  for (const key of keys)
    if (source && Object.hasOwn(source, key) && source[key as keyof T] !== undefined)
      result[key as keyof T] = source[key as keyof T]
  return result
}
export const pickerNativeInputKeys = [
  'id',
  'name',
  'form',
  'title',
  'placeholder',
  'autoComplete',
  'autocomplete',
  'required',
  'onFocus',
  'onBlur',
  'onClick',
  'onKeyDown',
  'onKeyUp',
  'onKeydown',
  'onKeyup',
  'onPointerDown',
  'onPointerUp',
  'onPointerdown',
  'onPointerup',
  'onfocus',
  'onblur',
  'onclick',
  'onkeydown',
  'onkeyup',
  'onpointerdown',
  'onpointerup',
] as const
export const pickerInputVisualKeys = [
  'size',
  'variant',
  'prefix',
  'suffix',
  'classNames',
  'styles',
  'class',
  'className',
  'style',
] as const
export const pickerEndpointKeys = [...pickerNativeInputKeys, 'class', 'className', 'style'] as const
export function getPickerEndpointProps<T extends object>(source?: T): Partial<T> {
  const attributes = Object.keys(source ?? {}).filter(
    (key) =>
      (key.startsWith('aria-') && !['aria-haspopup', 'aria-expanded'].includes(key)) ||
      (key.startsWith('data-') &&
        !['data-slot', 'data-state', 'data-range-part', 'data-active'].includes(key)),
  )
  return pickPickerProps(source, [...pickerEndpointKeys, ...attributes])
}
export function getPickerInputProps<T extends object>(source?: T): Partial<T> {
  return { ...getPickerEndpointProps(source), ...pickPickerProps(source, pickerInputVisualKeys) }
}
export function getPickerCalendarProps<T extends object>(source?: T): Partial<T> {
  const result = pickPickerProps(source, [
    'locale',
    'class',
    'className',
    'style',
    'classNames',
    'styles',
    'cellRender',
  ])
  if ('locale' in result)
    result.locale = pickPickerProps(result.locale as object | undefined, [
      'weekdays',
      'months',
      'year',
      'yearSuffix',
      'month',
      'datePanel',
      'monthPanel',
      'previous',
      'next',
      'today',
      'week',
    ]) as T[keyof T]
  return result
}

export function getPickerControlProps<T extends object, U extends object = {}>(
  input?: T,
  endpoint?: U,
  range = false,
): Partial<Omit<T, (typeof pickerInputVisualKeys)[number]> & U> {
  const common = getPickerEndpointProps(input)
  for (const key of ['class', 'className', 'style']) delete common[key as keyof T]
  if (range) for (const key of ['id', 'name']) delete common[key as keyof T]
  return { ...common, ...getPickerEndpointProps(endpoint) } as Partial<
    Omit<T, (typeof pickerInputVisualKeys)[number]> & U
  >
}
