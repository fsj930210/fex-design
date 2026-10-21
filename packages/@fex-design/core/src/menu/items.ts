import type { MenuEntry } from './types'

export function getMenuEntryKey<T>(entry: MenuEntry<T>) {
  return 'value' in entry ? entry.value : entry.key
}

export function assertMenuContent(
  items: readonly unknown[] | undefined,
  hasCustomContent: boolean,
) {
  if (items !== undefined && hasCustomContent)
    throw new Error('Menu accepts either items or custom content, not both')
}
