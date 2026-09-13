import type { CheckboxValue } from './types'

export function normalizeCheckboxValue(value: readonly CheckboxValue[] | undefined) {
  const normalized: CheckboxValue[] = []
  const seen = new Set<CheckboxValue>()

  for (const item of value ?? []) {
    if (seen.has(item)) {
      continue
    }
    seen.add(item)
    normalized.push(item)
  }

  return normalized
}

export function checkboxValuesEqual(
  left: readonly CheckboxValue[],
  right: readonly CheckboxValue[],
) {
  if (left.length !== right.length) {
    return false
  }

  return left.every((value, index) => Object.is(value, right[index]))
}
