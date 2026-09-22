import {
  selectContentClassName,
  selectEmptyClassName,
  selectGroupLabelClassName,
  selectListClassName,
  selectLoadingClassName,
  selectOptionClassName,
  selectOptionIndicatorClassName,
  selectOptionLabelClassName,
} from '@fex-design/components-styles/select'
import { groupSelectOptions } from '@fex-design/core/select/filter-options'
import { getSelectVirtualRange } from '@fex-design/core/select/virtual'
import type { SelectOption } from '@fex-design/core/select/types'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type ReactNode, useState } from 'react'
import { PopoverContent, PopoverPortal } from '../popover/popover'
import { CheckIcon } from '@fex-design/react/icons/check'
import { useSelect, useSelectOption } from './use-select'

export interface SelectContentProps extends ComponentProps<'div'> {
  popupRender?: (menu: ReactNode, context: { close: () => void }) => ReactNode
  emptyContent?: ReactNode
  loadingContent?: ReactNode
  optionRender?: (
    option: SelectOption,
    state: { selected: boolean; active: boolean; disabled: boolean },
  ) => ReactNode
}

export function SelectContent({
  className,
  children,
  popupRender,
  emptyContent,
  loadingContent,
  optionRender,
  ...props
}: SelectContentProps) {
  const select = useSelect()
  const menu = (
    <SelectList
      emptyContent={emptyContent}
      loadingContent={loadingContent}
      optionRender={optionRender}
    >
      {children}
    </SelectList>
  )
  return (
    <PopoverPortal>
      <PopoverContent
        {...props}
        role="presentation"
        className={cn(selectContentClassName, className)}
        style={props.style}
      >
        {popupRender ? popupRender(menu, { close: select.controller.close }) : menu}
      </PopoverContent>
    </PopoverPortal>
  )
}

export interface SelectListProps extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ReactNode
  emptyContent?: ReactNode
  loadingContent?: ReactNode
  optionRender?: SelectContentProps['optionRender']
}

function AutomaticItem({ option, optionRender }: { option: SelectOption; optionRender?: SelectContentProps['optionRender'] }) {
  const state = useSelectOption(option.value)
  return (
    <SelectItem value={option.value}>
      {optionRender ? optionRender(option, state) : option.label}
    </SelectItem>
  )
}

export function SelectList({
  children,
  className,
  emptyContent = 'No options',
  loadingContent = 'Loading…',
  optionRender,
  onScroll,
  ...props
}: SelectListProps) {
  const select = useSelect()
  const [viewport, setViewport] = useState({ scrollTop: 0, height: 320 })
  const range = select.virtual
    ? getSelectVirtualRange(
        select.visibleOptions.length,
        viewport.scrollTop,
        viewport.height,
        select.virtual,
      )
    : undefined
  const groups = groupSelectOptions(select.visibleOptions)
  let content = children
  if (content == null) {
    if (select.loading) content = <div className={selectLoadingClassName}>{loadingContent}</div>
    else if (!select.visibleOptions.length)
      content = <div className={selectEmptyClassName}>{emptyContent}</div>
    else if (range)
      content = (
        <div style={{ height: range.totalSize, position: 'relative' }}>
          <div style={{ position: 'absolute', insetInline: 0, top: range.offset }}>
            {select.visibleOptions.slice(range.start, range.end).map((option) => (
              <AutomaticItem key={option.value} option={option} optionRender={optionRender} />
            ))}
          </div>
        </div>
      )
    else
      content = groups.map((group) => (
        <SelectGroup key={group.label ?? 'ungrouped'} label={group.label}>
          {group.options.map((option) => (
            <AutomaticItem key={option.value} option={option} optionRender={optionRender} />
          ))}
        </SelectGroup>
      ))
  }
  return (
    <div
      {...props}
      id={select.listId}
      role="listbox"
      aria-multiselectable={select.multiple || undefined}
      className={cn(selectListClassName, className)}
      onScroll={(event) => {
        onScroll?.(event)
        if (event.defaultPrevented) return
        setViewport({ scrollTop: event.currentTarget.scrollTop, height: event.currentTarget.clientHeight })
      }}
    >
      {content}
    </div>
  )
}

export function SelectItem({
  value,
  className,
  children,
  ...props
}: Omit<ComponentProps<'div'>, 'children'> & {
  value: SelectOption['value']
  children?: ReactNode
}) {
  const select = useSelect()
  const option = select.options.find((item) => item.value === value) ?? { value, label: String(value) }
  const state = useSelectOption(value)
  return (
    <div
      {...props}
      id={`${select.listId}-${value}`}
      role="option"
      aria-selected={state.selected}
      aria-disabled={state.disabled || undefined}
      data-active={state.active ? 'true' : undefined}
      data-selected={state.selected ? 'true' : undefined}
      data-disabled={state.disabled ? 'true' : undefined}
      className={cn(selectOptionClassName, className)}
      onPointerMove={state.activate}
      onClick={(event) => {
        event.stopPropagation()
        state.select()
      }}
    >
      <span className={selectOptionLabelClassName}>
        {children ?? option.label}
      </span>
      <span aria-hidden="true" className={selectOptionIndicatorClassName}>
        <CheckIcon />
      </span>
    </div>
  )
}

export function SelectGroup({
  label,
  children,
}: {
  label?: string | undefined
  children?: ReactNode
}) {
  return (
    <div role="group" aria-label={label}>
      {label && <div className={selectGroupLabelClassName}>{label}</div>}
      {children}
    </div>
  )
}
export function SelectLabel({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn(selectGroupLabelClassName, className)} />
}

export function SelectSeparator({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} role="separator" className={cn('my-1 h-px bg-border', className)} />
}
