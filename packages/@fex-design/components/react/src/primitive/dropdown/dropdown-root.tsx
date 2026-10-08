import { PopoverRoot, type PopoverRootProps } from "../popover"

export type DropdownRootProps = PopoverRootProps

export function DropdownRoot(props: DropdownRootProps) {
  return <PopoverRoot {...props} />
}
