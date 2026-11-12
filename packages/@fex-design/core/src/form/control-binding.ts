import type { FieldBindingOptions, FormAssociation, FormControlOptions, ValuePort } from './types'

const defaultBinding = {
  valuePropName: 'value',
  trigger: 'onChange',
}

export function resolveBindOptions<TValue>(options: FieldBindingOptions<TValue> = {}) {
  return { ...defaultBinding, ...options }
}

export function resolveControlBinding<TValue>(
  port: ValuePort<TValue>,
  options: FieldBindingOptions<TValue> = {},
) {
  const config = resolveBindOptions(options)
  if (config.trigger === config.valuePropName) throw new Error('Field binding prop names conflict')
  const readValueProps = () =>
    config.getValueProps
      ? config.getValueProps(port.read())
      : ({ [config.valuePropName ?? 'value']: port.read() } as Record<string, unknown>)
  const onValue = (...args: unknown[]) => {
    const next = config.getValueFromEvent ? config.getValueFromEvent(...args) : args[0]
    port.write(next as TValue)
  }
  return {
    readValueProps,
    trigger: config.trigger,
    onValue,
  }
}

export function getFormEventValue(args: readonly unknown[], valuePropName = 'value'): unknown {
  const first = args[0]
  if (first && typeof first === 'object' && 'target' in first) {
    const target = first.target
    if (target && typeof target === 'object' && valuePropName in target)
      return Reflect.get(target, valuePropName)
  }
  return first
}

export function getFormControlValue(args: unknown[], options: FormControlOptions): unknown {
  const value = options.getValueFromEvent
    ? options.getValueFromEvent(...args)
    : getFormEventValue(args, options.valuePropName)
  if (value && typeof value === 'object' && 'then' in value && typeof value.then === 'function')
    throw new Error('FormControl getValueFromEvent must return a synchronous value.')
  return value
}

export function getFormValueProps(value: unknown, options: FormControlOptions) {
  const props = options.getValueProps?.(value) ?? { [options.valuePropName ?? 'value']: value }
  for (const key of Object.keys(props)) {
    if (/^on[A-Z:]|^on[a-z]|^aria-|^data-|^(id|ref|class|className|style)$/.test(key))
      throw new Error(`FormControl getValueProps cannot replace ${key}.`)
  }
  return props
}

export function getFormControlAttributes(
  association: FormAssociation,
  name: string,
  invalid: boolean,
  describedBy?: string,
  labelledBy?: string,
) {
  return {
    id: association.controlId,
    'data-field-name': name,
    'aria-required': association.required || undefined,
    'aria-invalid': invalid || undefined,
    'aria-labelledby':
      [
        ...new Set([...(labelledBy?.split(/\s+/).filter(Boolean) ?? []), ...association.labels]),
      ].join(' ') || undefined,
    'aria-describedby':
      [
        ...new Set([
          ...(describedBy?.split(/\s+/).filter(Boolean) ?? []),
          ...association.descriptions,
          ...association.errors,
        ]),
      ].join(' ') || undefined,
    'aria-errormessage': invalid ? association.errors.join(' ') || undefined : undefined,
  }
}

export function assertFormControlValue(
  props: Record<string, unknown>,
  options: FormControlOptions,
) {
  const valueName = options.valuePropName ?? 'value'
  if (valueName in props || 'defaultValue' in props || 'defaultChecked' in props)
    throw new Error(`FormControl owns ${valueName}; configure defaultValues on the form instead.`)
}
