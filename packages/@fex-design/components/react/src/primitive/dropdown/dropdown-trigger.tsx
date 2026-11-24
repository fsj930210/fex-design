import { PopoverTrigger, type PopoverTriggerProps } from '../popover'
import { useDropdownContext } from './context'

export type DropdownTriggerProps = Omit<PopoverTriggerProps, 'id'>
export function DropdownTrigger({ onKeyDown, ...props }: DropdownTriggerProps) {
  const { controller, triggerId, disabled } = useDropdownContext()
  return (
    <PopoverTrigger
      {...props}
      id={triggerId}
      data-dropdown-trigger=""
      aria-haspopup="menu"
      aria-disabled={disabled || props['aria-disabled']}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (!event.defaultPrevented) controller.triggerKeyDown(event.nativeEvent)
      }}
    />
  )
}
