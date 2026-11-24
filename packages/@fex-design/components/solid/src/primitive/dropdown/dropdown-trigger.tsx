import { splitProps } from 'solid-js'
import { PopoverTrigger, type PopoverTriggerProps } from '../popover'
import { callEventHandler } from '../popover/event-info'
import { useDropdownContext } from './context'

export type DropdownTriggerProps = Omit<PopoverTriggerProps, 'id'>
export function DropdownTrigger(props: DropdownTriggerProps) {
  const [local, rest] = splitProps(props, ['children', 'onKeyDown'])
  const context = useDropdownContext()
  return (
    <PopoverTrigger
      {...rest}
      id={context.triggerId}
      data-dropdown-trigger=""
      aria-haspopup="menu"
      aria-disabled={context.disabled || props['aria-disabled']}
      onKeyDown={(event) => {
        callEventHandler(local.onKeyDown, event)
        if (!event.defaultPrevented) context.controller.triggerKeyDown(event)
      }}
    >
      {(slot) => local.children(slot)}
    </PopoverTrigger>
  )
}
