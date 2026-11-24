import { createUniqueId, splitProps, type ParentProps } from 'solid-js'
import type { DropdownRootOptions } from '@fex-design/core/dropdown/types'
import { PopoverContext } from '../popover/popover-context'
import { MenuContext, MenuLevelContext, SubMenuContext } from '../menu/context'
import { DropdownContext } from './context'
import { createDropdown } from './create-dropdown'

export type DropdownRootProps = ParentProps<DropdownRootOptions>
export function DropdownRoot(props: DropdownRootProps) {
  const [local, options] = splitProps(props, ['children'])
  const { controller, popover } = createDropdown(() => ({
    popoverProps: {
      ...options.popoverProps,
      open: options.open,
      defaultOpen: options.defaultOpen,
      onOpenChange: options.onOpenChange,
      disabled: options.disabled,
    },
    menuProps: { ...options.menuProps, onActivate: options.onActivate, disabled: options.disabled },
    closeOnSelect: options.closeOnSelect,
  }))
  const id = createUniqueId()
  return (
    <DropdownContext.Provider
      value={{
        controller,
        triggerId: id,
        get disabled() {
          return Boolean(options.disabled)
        },
      }}
    >
      <PopoverContext.Provider value={popover}>
        <MenuContext.Provider value={controller.dom}>
          <MenuLevelContext.Provider value={undefined}>
            <SubMenuContext.Provider value={undefined}>{local.children}</SubMenuContext.Provider>
          </MenuLevelContext.Provider>
        </MenuContext.Provider>
      </PopoverContext.Provider>
    </DropdownContext.Provider>
  )
}
