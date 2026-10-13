export interface SelectValueLayoutOptions {
  multiple: boolean
  showSearch: boolean
  open: boolean
  searchValue: string
  maxTagCount?: number | undefined
}

export function getSelectValueLayout<T>(
  selectedOptions: readonly T[],
  options: SelectValueLayoutOptions,
) {
  const visibleOptions = options.maxTagCount === undefined
    ? selectedOptions
    : selectedOptions.slice(0, Math.max(0, options.maxTagCount))
  const hasValue = selectedOptions.length > 0
  return {
    visibleOptions,
    overflowCount: selectedOptions.length - visibleOptions.length,
    showPlaceholder: !hasValue && !options.showSearch && !options.searchValue,
    showSingle: hasValue && !options.multiple && !(options.showSearch && options.open),
    showTags: hasValue && options.multiple,
  }
}
