import type { HTMLAttributes } from 'svelte/elements'
import type { Snippet, ComponentProps } from 'svelte'
import type { MenuEntry } from '@fex-design/core/menu/types'
import type { MenuItem, SubMenuTrigger } from '@fex-design/svelte/primitive/menu'
export type MenuContentValue = string | number | Snippet | null | undefined | false
export type MenuItemData = MenuEntry<MenuContentValue, HTMLAttributes<HTMLDivElement>['style']>
export type MenuItemBinding = Parameters<
  NonNullable<ComponentProps<typeof MenuItem>['trigger']>
>[0] & { content: Snippet }
export type SubMenuTriggerBinding = Parameters<
  NonNullable<ComponentProps<typeof SubMenuTrigger>['trigger']>
>[0] & { content: Snippet }

export type { MenuClassNames, MenuStyles } from '@fex-design/svelte/primitive/menu'
