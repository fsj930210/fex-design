import { InjectionToken } from '@angular/core'
import type { MenuBranch } from '@fex-design/core/menu/dom-types'
export const MENU_LEVEL = new InjectionToken<MenuBranch | undefined>('MenuLevel')
