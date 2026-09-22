import type {
  SelectFieldNames,
  SelectItem as DataItem,
} from '@fex-design/core/select/normalize-options'
import { normalizeSelectOptions } from '@fex-design/core/select/normalize-options'
import type {
  SelectFilterOption,
  SelectOption,
  SelectVirtualOptions,
} from '@fex-design/core/select/types'
import type { SelectionValue } from '@fex-design/core/selection/types'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import type { PopoverRootProps } from '@fex-design/react/primitive/popover/popover'
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  type SelectChangeMeta,
  type SelectInputProps,
} from '@fex-design/react/primitive/select/select'

export type SelectPopoverProps = Omit<
  PopoverRootProps,
  'children' | 'open' | 'defaultOpen' | 'onOpenChange' | 'getPopupContainer'
> & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface SelectProps<TItem extends object = SelectOption> extends Omit<
  ComponentProps<'div'>,
  'children' | 'defaultValue' | 'onChange'
> {
  options: readonly DataItem<TItem>[]
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
  getPopupContainer?: PopoverRootProps['getPopupContainer']
  optionRender?: (
    item: TItem,
    state: { selected: boolean; active: boolean; disabled: boolean },
  ) => ReactNode
  popupRender?: (menu: ReactNode, context: { close: () => void }) => ReactNode
  emptyContent?: ReactNode
}

export function Select<TItem extends object = SelectOption>({
  options: sourceOptions,
  fieldNames = { value: 'value', label: 'label' } as SelectFieldNames<TItem>,
  className,
  style,
  inputProps,
  popoverProps,
  getPopupContainer,
  searchable,
  optionRender,
  popupRender,
  emptyContent,
  maxTagCount,
  ...props
}: SelectProps<TItem>) {
  const options = normalizeSelectOptions(sourceOptions, fieldNames)
  const renderOption = optionRender
    ? (option: SelectOption, state: { selected: boolean; active: boolean; disabled: boolean }) =>
        optionRender(option.data as TItem, state)
    : undefined
  return (
    <SelectRoot
      {...props}
      {...popoverProps}
      options={options}
      showSearch={searchable}
      getPopupContainer={getPopupContainer}
    >
      <SelectTrigger
        className={className}
        style={style}
        inputProps={inputProps}
        placeholder={props.placeholder}
        maxTagCount={maxTagCount}
      >
        <SelectValue maxTagCount={maxTagCount} placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent
        popupRender={popupRender}
        emptyContent={emptyContent}
        optionRender={renderOption}
      />
    </SelectRoot>
  )
}

export type {
  SelectFieldNames,
  SelectFilterOption,
  SelectInputProps,
  SelectOption,
  SelectVirtualOptions,
}
