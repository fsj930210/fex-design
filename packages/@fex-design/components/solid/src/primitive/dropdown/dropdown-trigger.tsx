import { PopoverTrigger, type PopoverTriggerProps } from "../popover"

export type DropdownTriggerProps = PopoverTriggerProps

export function DropdownTrigger(props: PopoverTriggerProps) {
  return (
    <PopoverTrigger {...props}>
      {(slot) => props.children({ ...slot, props: { ...slot.props, "aria-haspopup": "menu" } })}
    </PopoverTrigger>
  )
}
