import type { NativeStyle } from '@fex-design/angular/signals/merge-style'
import type { MenuSemanticPart } from '@fex-design/core/menu/types'

export type { MenuClassNames, MenuSemanticPart } from '@fex-design/core/menu/types'
export type MenuStyles = Partial<Record<MenuSemanticPart, NativeStyle>>
