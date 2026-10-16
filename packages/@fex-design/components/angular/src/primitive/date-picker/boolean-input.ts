import { booleanAttribute } from '@angular/core'

/** Attribute coercion preserves absence; core owns all picker defaults. */
export function optionalPickerBoolean(value: unknown): boolean | undefined {
  return value === undefined || value === null ? undefined : booleanAttribute(value)
}
