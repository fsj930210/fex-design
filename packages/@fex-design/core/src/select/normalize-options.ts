import type { SelectionValue } from '../selection/types'
import type { SelectOption } from './types'

export interface SelectFieldNames<TItem> {
  value: keyof TItem
  label: keyof TItem
}

export type SelectItem<TItem> = TItem & {
  disabled?: boolean | undefined
  options?: readonly SelectItem<TItem>[] | undefined
}

export function normalizeSelectOptions<TItem>(
  items: readonly SelectItem<TItem>[],
  fieldNames: SelectFieldNames<TItem>,
): SelectOption[] {
  const result: SelectOption[] = []
  for (const item of items) {
    const group = item.options
    if (group) {
      const groupLabel = String(item[fieldNames.label])
      for (const child of group)
        result.push({
          value: child[fieldNames.value] as unknown as SelectionValue,
          label: String(child[fieldNames.label]),
          disabled: child.disabled,
          group: groupLabel,
          data: child,
        })
      continue
    }
    result.push({
      value: item[fieldNames.value] as unknown as SelectionValue,
      label: String(item[fieldNames.label]),
      disabled: item.disabled,
      data: item,
    })
  }
  return result
}
