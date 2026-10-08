import { PopoverTrigger, type PopoverTriggerProps } from "../popover"

export type DropdownTriggerProps = PopoverTriggerProps

export function DropdownTrigger(props: DropdownTriggerProps) {
  return <PopoverTrigger {...props} aria-haspopup="menu" />
}
