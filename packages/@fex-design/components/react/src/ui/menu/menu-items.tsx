import { getMenuEntryKey } from '@fex-design/core/menu/items'
import { SubMenu, SubMenuContent, MenuSeparator } from '@fex-design/react/primitive/menu'
import { MenuItem } from './menu-item'
import { SubMenuTrigger } from './sub-menu-trigger'
import { MenuGroup } from './menu-group'
import type { MenuItemData, MenuItemRenderers, MenuClassNames, MenuStyles } from './types'
export function MenuItems({
  items,
  renderItem,
  classNames,
  styles,
}: {
  items: readonly MenuItemData[]
  classNames?: MenuClassNames | undefined
  styles?: MenuStyles | undefined
} & MenuItemRenderers) {
  return items.map((item) => {
    const key = getMenuEntryKey(item)
    if (item.type === 'separator')
      return <MenuSeparator key={key} className={classNames?.separator} style={styles?.separator} />
    if (item.type === 'group')
      return (
        <MenuGroup key={key} label={item.label} className={classNames?.group} style={styles?.group}>
          <MenuItems
            items={item.children}
            renderItem={renderItem}
            classNames={classNames}
            styles={styles}
          />
        </MenuGroup>
      )
    if (item.children !== undefined)
      return (
        <SubMenu key={key} value={item.value} popoverProps={item.popoverProps}>
          <SubMenuTrigger
            className={classNames?.subMenuTrigger}
            style={styles?.subMenuTrigger}
            disabled={item.disabled || !item.children.length}
            textValue={item.textValue}
            icon={item.icon}
            suffix={item.suffix}
          >
            {item.label}
          </SubMenuTrigger>
          <SubMenuContent className={classNames?.subMenuContent} style={styles?.subMenuContent}>
            <MenuItems
              items={item.children}
              renderItem={renderItem}
              classNames={classNames}
              styles={styles}
            />
          </SubMenuContent>
        </SubMenu>
      )
    return (
      <MenuItem
        key={key}
        className={classNames?.item}
        style={styles?.item}
        value={item.value}
        disabled={item.disabled}
        textValue={item.textValue}
        icon={item.icon}
        suffix={item.suffix}
        href={item.href}
        target={item.target}
        rel={item.rel}
        render={renderItem ? (binding) => renderItem(item, binding) : undefined}
      >
        {item.label}
      </MenuItem>
    )
  })
}
