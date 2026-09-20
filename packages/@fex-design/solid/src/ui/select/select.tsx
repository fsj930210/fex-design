import { normalizeSelectOptions, type SelectFieldNames, type SelectItem } from '@fex-design/core/select/normalize-options'
import type { SelectFilterOption, SelectOption, SelectVirtualOptions } from '@fex-design/core/select/types'
import type { SelectionValue } from '@fex-design/core/selection/types'
import { createMemo, splitProps, type JSX } from 'solid-js'
import type { PopoverProps } from '../../primitive/popover/popover'
import { SelectContent, SelectRoot, SelectTrigger, type SelectChangeMeta, type SelectInputProps } from '../../primitive/select/select'

export type SelectPopoverProps = Omit<PopoverProps, 'children' | 'getPopupContainer'>
export interface SelectProps<TItem extends object = SelectOption>
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: readonly SelectItem<TItem>[]
  fieldNames?: SelectFieldNames<TItem>
  value?: SelectionValue | SelectionValue[]
  defaultValue?: SelectionValue | SelectionValue[]
  multiple?: boolean
  onChange?: (value: SelectionValue | SelectionValue[] | undefined, meta: SelectChangeMeta) => void
  searchable?: boolean
  filterOption?: SelectFilterOption
  onSearch?: (keyword: string) => void
  clearable?: boolean
  disabled?: boolean
  loading?: boolean
  placeholder?: string
  maxCount?: number
  maxTagCount?: number
  virtual?: SelectVirtualOptions
  status?: 'error' | 'warning'
  inputProps?: SelectInputProps
  popoverProps?: SelectPopoverProps
  getPopupContainer?: PopoverProps['getPopupContainer']
}

export function Select<TItem extends object = SelectOption>(props: SelectProps<TItem>) {
  const [local, triggerProps] = splitProps(props, [
    'items', 'fieldNames', 'value', 'defaultValue', 'multiple', 'onChange', 'searchable',
    'filterOption', 'onSearch', 'clearable', 'disabled', 'loading', 'placeholder',
    'maxCount', 'maxTagCount', 'virtual', 'status', 'inputProps', 'popoverProps',
    'getPopupContainer',
  ])
  const options = createMemo(() => normalizeSelectOptions(
    local.items,
    local.fieldNames ?? ({ value: 'value', label: 'label' } as SelectFieldNames<TItem>),
  ))
  return (
    <SelectRoot
      items={options()}
      value={local.value}
      defaultValue={local.defaultValue}
      multiple={local.multiple}
      onChange={local.onChange}
      showSearch={local.searchable}
      filterOption={local.filterOption}
      onSearch={local.onSearch}
      clearable={local.clearable}
      disabled={local.disabled}
      loading={local.loading}
      maxCount={local.maxCount}
      virtual={local.virtual}
      status={local.status}
      popoverProps={{ ...local.popoverProps, getPopupContainer: local.getPopupContainer }}
      open={local.popoverProps?.open}
      defaultOpen={local.popoverProps?.defaultOpen}
      onOpenChange={local.popoverProps?.onOpenChange}
    >
      <SelectTrigger {...triggerProps} inputProps={local.inputProps} placeholder={local.placeholder} maxTagCount={local.maxTagCount} />
      <SelectContent />
    </SelectRoot>
  )
}

export type { SelectFieldNames, SelectFilterOption, SelectOption, SelectVirtualOptions }
