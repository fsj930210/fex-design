import type { StyleValue } from 'vue'
import type { VNodeChild, VNode, HTMLAttributes, ComponentPublicInstance } from 'vue'
import type { MenuEntry } from '@fex-design/core/menu/types'
export type MenuItemData = MenuEntry<VNodeChild, StyleValue>
export interface MenuItemBinding {
  props: HTMLAttributes
  ref(element: Element | ComponentPublicInstance | null): void
  state: { disabled: boolean; selected?: boolean; open?: boolean }
  content: VNode
}

export type { MenuClassNames, MenuStyles } from '@fex-design/vue/primitive/menu'
