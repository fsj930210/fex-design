import { useId, type ReactNode } from 'react'
import type { DropdownRootOptions } from '@fex-design/core/dropdown/types'
import { PopoverContext } from '../popover/popover-context'
import { MenuContext, MenuLevelContext, SubMenuContext } from '../menu/context'
import { DropdownContext } from './context'
import { useDropdownBinding } from './use-dropdown'

export interface DropdownRootProps extends DropdownRootOptions {
  children?: ReactNode
}
export function DropdownRoot({
  children,
  open,
  defaultOpen,
  onOpenChange,
  onActivate,
  disabled,
  menuProps,
  popoverProps,
  closeOnSelect,
}: DropdownRootProps) {
  const { controller, popover } = useDropdownBinding({
    popoverProps: { ...popoverProps, open, defaultOpen, onOpenChange, disabled },
    menuProps: { ...menuProps, onActivate, disabled },
    closeOnSelect,
  })
  const triggerId = useId()
  return (
    <DropdownContext value={{ controller, triggerId, disabled: Boolean(disabled) }}>
      <PopoverContext value={popover}>
        <MenuContext value={controller.dom}>
          <MenuLevelContext value={undefined}>
            <SubMenuContext value={undefined}>{children}</SubMenuContext>
          </MenuLevelContext>
        </MenuContext>
      </PopoverContext>
    </DropdownContext>
  )
}
