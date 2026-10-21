import { createMemo, splitProps, type JSX } from 'solid-js'
import { assertMenuContent } from '@fex-design/core/menu/items'
import { MenuRoot, MenuContent, type MenuOptions } from '@fex-design/solid/primitive/menu'
import { MenuItems } from './menu-items'
import type { MenuItemData, MenuItemRenderers, MenuClassNames, MenuStyles } from './types'
import { cn } from '@fex-design/utils'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
export type MenuProps = MenuOptions &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof MenuOptions | 'children'> &
  MenuItemRenderers & {
    items?: readonly MenuItemData[] | undefined
    children?: JSX.Element
    classNames?: MenuClassNames | undefined
    styles?: MenuStyles | undefined
  }
export function Menu(props: MenuProps) {
  const [local, options, native] = splitProps(
    props,
    ['items', 'children', 'renderItem', 'classNames', 'styles'],
    [
      'layout',
      'dir',
      'size',
      'disabled',
      'multiple',
      'value',
      'defaultValue',
      'openValues',
      'defaultOpenValues',
      'inlineAccordion',
      'submenuTrigger',
      'openDelay',
      'closeDelay',
      'onValueChange',
      'onOpenChange',
      'onActivate',
    ],
  )
  const hasContent = Object.prototype.hasOwnProperty.call(props, 'children')
  const items = createMemo(() => {
    assertMenuContent(local.items, hasContent)
    return local.items
  })
  return (
    <MenuRoot {...options}>
      <MenuContent
        {...native}
        class={cn(local.classNames?.root, native.class)}
        style={mergeStyle(local.styles?.root, native.style)}
      >
        {items() !== undefined ? (
          <MenuItems
            items={items()!}
            renderItem={local.renderItem}
            classNames={local.classNames}
            styles={local.styles}
          />
        ) : (
          local.children
        )}
      </MenuContent>
    </MenuRoot>
  )
}
