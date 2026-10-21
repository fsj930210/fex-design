import type { StyleValue } from 'vue'
import type { MenuSemanticPart } from '@fex-design/core/menu/types'

export type { MenuClassNames, MenuSemanticPart } from '@fex-design/core/menu/types'
export type MenuStyles = Partial<Record<MenuSemanticPart, StyleValue>>
