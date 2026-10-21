import type { HTMLAttributes } from 'svelte/elements'
import type { MenuSemanticPart } from '@fex-design/core/menu/types'

export type { MenuClassNames, MenuSemanticPart } from '@fex-design/core/menu/types'
export type MenuStyles = Partial<Record<MenuSemanticPart, HTMLAttributes<HTMLDivElement>['style']>>
