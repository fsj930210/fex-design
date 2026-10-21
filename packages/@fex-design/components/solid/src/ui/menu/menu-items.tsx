import { For } from 'solid-js'
import { SubMenu, SubMenuContent, MenuSeparator } from '@fex-design/solid/primitive/menu'
import { MenuItem } from './menu-item'
import { SubMenuTrigger } from './sub-menu-trigger'
import { MenuGroup } from './menu-group'
import type { MenuItemData, MenuItemRenderers, MenuClassNames, MenuStyles } from './types'
type Appearance = { classNames?: MenuClassNames | undefined; styles?: MenuStyles | undefined }
function Entry(props: { item: MenuItemData } & MenuItemRenderers & Appearance) {
  const item = props.item
  if (item.type === 'separator')
    return <MenuSeparator class={props.classNames?.separator} style={props.styles?.separator} />
  if (item.type === 'group')
    return (
      <MenuGroup class={props.classNames?.group} style={props.styles?.group} label={item.label}>
        <MenuItems
          items={item.children}
          renderItem={props.renderItem}
          classNames={props.classNames}
          styles={props.styles}
        />
      </MenuGroup>
    )
  if (item.children !== undefined)
    return (
      <SubMenu value={item.value} popoverProps={item.popoverProps}>
        <SubMenuTrigger
          class={props.classNames?.subMenuTrigger}
          style={props.styles?.subMenuTrigger}
          disabled={item.disabled || !item.children.length}
          textValue={item.textValue}
          icon={item.icon}
          suffix={item.suffix}
        >
          {item.label}
        </SubMenuTrigger>
        <SubMenuContent
          class={props.classNames?.subMenuContent}
          style={props.styles?.subMenuContent}
        >
          <MenuItems
            items={item.children}
            renderItem={props.renderItem}
            classNames={props.classNames}
            styles={props.styles}
          />
        </SubMenuContent>
      </SubMenu>
    )
  return (
    <MenuItem
      class={props.classNames?.item}
      style={props.styles?.item}
      value={item.value}
      disabled={item.disabled}
      textValue={item.textValue}
      icon={item.icon}
      suffix={item.suffix}
      href={item.href}
      target={item.target}
      rel={item.rel}
      render={props.renderItem ? (binding) => props.renderItem?.(item, binding) : undefined}
    >
      {item.label}
    </MenuItem>
  )
}
export function MenuItems(
  props: { items: readonly MenuItemData[] } & MenuItemRenderers & Appearance,
) {
  return (
    <For each={props.items}>
      {(item) => (
        <Entry
          item={item}
          renderItem={props.renderItem}
          classNames={props.classNames}
          styles={props.styles}
        />
      )}
    </For>
  )
}
