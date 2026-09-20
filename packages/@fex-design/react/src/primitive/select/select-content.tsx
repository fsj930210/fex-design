import {
  selectContentClassName,
  selectGroupLabelClassName,
  selectOptionClassName,
  selectOptionIndicatorClassName,
  selectOptionLabelClassName,
} from '@fex-design/styles/select'
import type { SelectOption } from '@fex-design/core/select/types'
import { cn } from '@fex/utils'
import { type ComponentProps, type ReactNode } from 'react'
import { PopoverContent, PopoverPortal } from '../popover/popover'
import { CheckIcon } from '../../icon/check'
import { useSelect, useSelectOption } from './use-select'

export interface SelectContentProps extends ComponentProps<'div'> {
  popupRender?: (menu: ReactNode, context: { close: () => void }) => ReactNode
}

export function SelectContent({
  className,
  children,
  popupRender,
  ...props
}: SelectContentProps) {
  const select = useSelect()
  return (
    <PopoverPortal>
      <PopoverContent
        {...props}
        role={undefined}
        className={cn(selectContentClassName, className)}
        style={props.style}
      >
        {popupRender ? popupRender(children, { close: select.controller.close }) : (
          <div id={select.listId} role="listbox" className="max-h-[inherit] overflow-y-auto p-1 overscroll-contain outline-none" aria-multiselectable={select.multiple || undefined}>
            {children}
          </div>
        )}
      </PopoverContent>
    </PopoverPortal>
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
