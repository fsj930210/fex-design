import type { SelectionValue } from '@fex-design/core/selection/types'
import { type JSX, type ParentProps, splitProps } from 'solid-js'
import { useListboxContext } from './listbox-context'

export interface ListboxItemProps extends ParentProps<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onSelect'>
> {
  value: SelectionValue
  disabled?: boolean
  onSelect?: (value: SelectionValue) => void
}

export function ListboxItem(props: ListboxItemProps) {
  const [local, rest] = splitProps(props, ['value', 'disabled', 'onSelect', 'children'])
  const context = useListboxContext('ListboxItem')
  const selected = () => context.selectedValues().includes(local.value)
  const disabled = () => local.disabled === true || context.isDisabled(local.value)
  const select = () => {
    if (disabled()) {
      return
    }
    context.selectItem(local.value)
    local.onSelect?.(local.value)
  }

  return (
    <div
      {...rest}
      role="option"
      tabIndex={disabled() ? undefined : 0}
      aria-selected={selected()}
      aria-disabled={disabled() || undefined}
      data-slot="listbox-item"
      data-selected={selected ? 'true' : 'false'}
      data-disabled={disabled() ? 'true' : undefined}
      onClick={select}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
          return
        }
        event.preventDefault()
        select()
      }}
    >
      {local.children}
    </div>
  )
}
