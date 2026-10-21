import type { ComponentProps, ReactNode } from 'react'
import { assertMenuContent } from '@fex-design/core/menu/items'
import { MenuRoot, MenuContent, type MenuOptions } from '@fex-design/react/primitive/menu'
import { MenuItems } from './menu-items'
import type { MenuItemData, MenuItemRenderers, MenuClassNames, MenuStyles } from './types'
import { cn } from '@fex-design/utils'
export interface MenuProps
  extends
    MenuOptions,
    Omit<ComponentProps<'div'>, keyof MenuOptions | 'children'>,
    MenuItemRenderers {
  items?: readonly MenuItemData[] | undefined
  children?: ReactNode
  classNames?: MenuClassNames | undefined
  styles?: MenuStyles | undefined
}
export function Menu({
  items,
  children,
  renderItem,
  classNames,
  styles,
  layout,
  dir,
  size,
  disabled,
  multiple,
  value,
  defaultValue,
  openValues,
  defaultOpenValues,
  inlineAccordion,
  submenuTrigger,
  openDelay,
  closeDelay,
  onValueChange,
  onOpenChange,
  onActivate,
  ...native
}: MenuProps) {
  assertMenuContent(items, children !== undefined && children !== null)
  return (
    <MenuRoot
      {...{
        layout,
        dir,
        size,
        disabled,
        multiple,
        value,
        defaultValue,
        openValues,
        defaultOpenValues,
        inlineAccordion,
        submenuTrigger,
        openDelay,
        closeDelay,
        onValueChange,
        onOpenChange,
        onActivate,
      }}
    >
      <MenuContent
        {...native}
        className={cn(classNames?.root, native.className)}
        style={{ ...styles?.root, ...native.style }}
      >
        {items !== undefined ? (
          <MenuItems
            items={items}
            renderItem={renderItem}
            classNames={classNames}
            styles={styles}
          />
        ) : (
          children
        )}
      </MenuContent>
    </MenuRoot>
  )
}
