import type { NativeStyle } from '@fex-design/angular/signals/merge-style'
import { TemplateRef } from '@angular/core'
import type { MenuEntry } from '@fex-design/core/menu/types'
export type MenuContentValue = string | number | TemplateRef<unknown> | null | undefined | false
export type MenuItemData = MenuEntry<MenuContentValue, NativeStyle>
export interface MenuItemTemplateContext {
  $implicit: MenuItemData
  item: MenuItemData
}
export function asMenuTemplate(value: MenuContentValue) {
  return value instanceof TemplateRef ? value : null
}
export function menuValueText(value: MenuContentValue) {
  return typeof value === 'string' || typeof value === 'number' ? value : ''
}

export type { MenuClassNames, MenuStyles } from '@fex-design/angular/primitive/menu'
