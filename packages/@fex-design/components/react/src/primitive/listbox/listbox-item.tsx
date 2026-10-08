import type { SelectionValue } from '@fex-design/core/selection/types'
import type { ComponentProps } from 'react'
import { useListboxContext } from './listbox-context'

export interface ListboxItemProps extends Omit<ComponentProps<'div'>, 'onSelect'> {
  value: SelectionValue
  disabled?: boolean
  onSelect?: (value: SelectionValue) => void
}

export function ListboxItem({
  value,
  disabled,
  onSelect,
  className,
  onClick,
  children,
  ...props
}: ListboxItemProps) {
  const context = useListboxContext('ListboxItem')
  const selected = context.isSelected(value)
  const itemDisabled = disabled === true || context.isDisabled(value)

  return (
    <div
      {...props}
      role="option"
      aria-selected={selected}
      aria-disabled={itemDisabled || undefined}
      tabIndex={itemDisabled ? undefined : 0}
      data-slot="listbox-item"
      data-selected={selected ? 'true' : 'false'}
      data-disabled={itemDisabled ? 'true' : undefined}
      className={className}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || itemDisabled) {
          return
        }
        context.selectItem(value)
        onSelect?.(value)
      }}
      onKeyDown={(event) => {
        if (itemDisabled || (event.key !== 'Enter' && event.key !== ' ')) {
          return
        }
        event.preventDefault()
        context.selectItem(value)
        onSelect?.(value)
      }}
    >
      {children}
    </div>
  )
}
