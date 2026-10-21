import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { cn } from '@fex-design/utils'
import {
  normalizeSelectOptions,
  type SelectFieldNames,
  type SelectItem,
} from '@fex-design/core/select/normalize-options'
import type {
  SelectFilterOption,
  SelectOption,
  SelectVirtualOptions,
} from '@fex-design/core/select/types'
import type { SelectionValue } from '@fex-design/core/selection/types'
import { createMemo, splitProps, type ComponentProps, type JSX } from 'solid-js'
import type { PopoverProps } from '@fex-design/solid/primitive/popover'
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
  type SelectChangeMeta,
  type SelectInputProps,
} from '@fex-design/solid/primitive/select'

export type SelectPopoverProps = Omit<PopoverProps, 'children' | 'getPopupContainer'>
export interface SelectProps<TItem extends object = SelectOption> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  triggerProps?: Omit<ComponentProps<typeof SelectTrigger>, 'children'> | undefined
  contentProps?:
    | Omit<ComponentProps<typeof SelectContent>, 'optionRender' | 'popupRender' | 'emptyContent'>
    | undefined
  options: readonly SelectItem<TItem>[]
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
  inputProps?: SelectInputProps
  popoverProps?: SelectPopoverProps
  getPopupContainer?: PopoverProps['getPopupContainer']
  emptyContent?: JSX.Element
  popupRender?: (menu: JSX.Element, context: { close: () => void }) => JSX.Element
}

export function Select<TItem extends object = SelectOption>(props: SelectProps<TItem>) {
  const [local, triggerProps] = splitProps(props, [
    'options',
    'fieldNames',
    'value',
    'defaultValue',
    'multiple',
    'onChange',
    'searchable',
    'filterOption',
    'onSearch',
    'clearable',
    'disabled',
    'loading',
    'placeholder',
    'maxCount',
    'maxTagCount',
    'virtual',
    'triggerProps',
    'contentProps',
    'inputProps',
    'popoverProps',
    'getPopupContainer',
    'emptyContent',
    'popupRender',
  ])
  const options = createMemo(() =>
    normalizeSelectOptions(
      local.options,
      local.fieldNames ?? ({ value: 'value', label: 'label' } as SelectFieldNames<TItem>),
    ),
  )
  return (
    <SelectRoot
      options={options()}
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
      popoverProps={{ ...local.popoverProps, getPopupContainer: local.getPopupContainer }}
      open={local.popoverProps?.open}
      defaultOpen={local.popoverProps?.defaultOpen}
      onOpenChange={local.popoverProps?.onOpenChange}
    >
      <SelectTrigger
        {...local.triggerProps}
        {...triggerProps}
        class={cn(local.triggerProps?.class, triggerProps.class)}
        style={mergeStyle(local.triggerProps?.style, triggerProps.style)}
        inputProps={local.inputProps ?? local.triggerProps?.inputProps}
        placeholder={local.placeholder ?? local.triggerProps?.placeholder}
        maxTagCount={local.maxTagCount ?? local.triggerProps?.maxTagCount}
      />
      <SelectContent
        {...local.contentProps}
        emptyContent={local.emptyContent}
        popupRender={local.popupRender}
      />
    </SelectRoot>
  )
}

export type { SelectFieldNames, SelectFilterOption, SelectOption, SelectVirtualOptions }
