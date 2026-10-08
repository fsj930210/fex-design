import { createSelectionController } from '@fex-design/core/selection/create-selection-controller'
import type { SelectionValue } from '@fex-design/core/selection/types'
import { cn } from '@fex-design/utils'
import { type ComponentProps, useRef } from 'react'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import {
  ListboxContext,
  type ListboxOrientation,
} from './listbox-context'

export type ListboxChangeMeta<TItem> = {
  selectedItem?: TItem | undefined
  selectedItems: TItem[]
  selectedValues: SelectionValue[]
  previousSelectedValues: SelectionValue[]
  changedValues: SelectionValue[]
}

type BaseListboxRootProps<TItem> = Omit<ComponentProps<'div'>, 'defaultValue' | 'onChange'> & {
  items?: readonly TItem[]
  getItemValue?: (item: TItem) => SelectionValue
  getItemDisabled?: (item: TItem) => boolean
  orientation?: ListboxOrientation
  disabled?: boolean
}

export type ListboxRootProps<TItem = unknown> = BaseListboxRootProps<TItem> & {
  multiple?: boolean
  value?: SelectionValue | readonly SelectionValue[] | undefined
  defaultValue?: SelectionValue | readonly SelectionValue[] | undefined
  onChange?: (
    value: SelectionValue | SelectionValue[] | undefined,
    meta: ListboxChangeMeta<TItem>,
  ) => void
}

export function ListboxRoot<TItem = unknown>({
  items = [],
  getItemValue,
  getItemDisabled,
  orientation = 'vertical',
  disabled = false,
  multiple,
  value,
  defaultValue,
  onChange,
  className,
  children,
  ...props
}: ListboxRootProps<TItem>) {
  const optionMap = new Map<SelectionValue, TItem>()
  const disabledValues: SelectionValue[] = []

  for (const item of items) {
    const itemValue = getItemValue ? getItemValue(item) : (item as { value: SelectionValue }).value
    optionMap.set(itemValue, item)
    if (getItemDisabled?.(item) === true || (item as { disabled?: boolean }).disabled === true) {
      disabledValues.push(itemValue)
    }
  }

  const handleChange = (
    values: SelectionValue[],
    meta: { previousValues: SelectionValue[]; changedValues: SelectionValue[] },
  ) => {
    const selectedItems = values
      .map((itemValue) => optionMap.get(itemValue))
      .filter((item): item is TItem => item !== undefined)
    const changeMeta: ListboxChangeMeta<TItem> = {
      selectedItem: selectedItems[0],
      selectedItems,
      selectedValues: values,
      previousSelectedValues: meta.previousValues,
      changedValues: meta.changedValues,
    }

    if (multiple) {
      ;(
        onChange as ((values: SelectionValue[], meta: ListboxChangeMeta<TItem>) => void) | undefined
      )?.(values, changeMeta)
      return
    }

    ;(
      onChange as
        | ((value: SelectionValue | undefined, meta: ListboxChangeMeta<TItem>) => void)
        | undefined
    )?.(values[0], changeMeta)
  }

  const optionsRef = useRef({
    value: Array.isArray(value) ? [...value] : (value as SelectionValue | undefined),
    defaultValue: Array.isArray(defaultValue)
      ? [...defaultValue]
      : (defaultValue as SelectionValue | undefined),
    multiple,
    disabledValues,
    onChange: handleChange,
  })

  Object.assign(optionsRef.current, {
    value,
    defaultValue,
    multiple,
    disabledValues: disabled
      ? [...disabledValues, ...Array.from(optionMap.keys())]
      : disabledValues,
    onChange: handleChange,
  })

  const controllerRef = useRef<ReturnType<typeof createSelectionController> | null>(null)
  controllerRef.current ??= createSelectionController(optionsRef.current)
  const snapshot = useCoreStore(controllerRef.current)

  return (
    <ListboxContext
      value={{
        multiple: snapshot.multiple,
        orientation,
        isSelected: controllerRef.current.isSelected,
        isDisabled: controllerRef.current.isDisabled,
        selectItem: (itemValue) => {
          if (snapshot.multiple) {
            controllerRef.current?.toggle(itemValue)
            return
          }
          controllerRef.current?.replace(itemValue)
        },
      }}
    >
      <div
        {...props}
        role="listbox"
        aria-multiselectable={snapshot.multiple || undefined}
        aria-orientation={orientation}
        data-orientation={orientation}
        data-slot="listbox"
        className={cn(className)}
      >
        {children}
      </div>
    </ListboxContext>
  )
}
