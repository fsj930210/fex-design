import type { MenuOptions } from '../menu/types'
import type { PopoverOptions } from '../popover/types'

export type DropdownPopoverOptions = Omit<PopoverOptions, 'trigger'> & {
  trigger?: Array<'click' | 'hover' | 'focus'> | undefined
}

/** Menu and floating configuration are separated to keep their change events unambiguous. */
export interface DropdownOptions {
  popoverProps?: DropdownPopoverOptions | undefined
  menuProps?: Omit<MenuOptions, 'layout' | 'inlineAccordion'> | undefined
  closeOnSelect?: boolean | undefined
}

/** Public Root configuration; disclosure and activation events live directly on Root. */
export interface DropdownRootOptions {
  open?: DropdownPopoverOptions['open']
  defaultOpen?: DropdownPopoverOptions['defaultOpen']
  onOpenChange?: DropdownPopoverOptions['onOpenChange']
  onActivate?: MenuOptions['onActivate']
  disabled?: boolean | undefined
  popoverProps?:
    | Omit<DropdownPopoverOptions, 'open' | 'defaultOpen' | 'onOpenChange' | 'disabled'>
    | undefined
  menuProps?:
    | Omit<MenuOptions, 'layout' | 'inlineAccordion' | 'onActivate' | 'disabled'>
    | undefined
  closeOnSelect?: boolean | undefined
}
