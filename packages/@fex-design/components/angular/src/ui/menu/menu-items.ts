import { NgTemplateOutlet } from '@angular/common'
import {
  Component,
  ChangeDetectionStrategy,
  TemplateRef,
  Injector,
  inject,
  input,
} from '@angular/core'
import { getMenuEntryKey } from '@fex-design/core/menu/items'
import { SubMenu, SubMenuContent, MenuSeparator } from '@fex-design/angular/primitive/menu'
import { MenuItem } from './menu-item'
import { SubMenuTrigger } from './sub-menu-trigger'
import { MenuGroup } from './menu-group'
import {
  asMenuTemplate,
  menuValueText,
  type MenuItemData,
  type MenuItemTemplateContext,
  type MenuClassNames,
  type MenuStyles,
} from './types'
@Component({
  selector: 'div[menuItems]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.display]': "'contents'" },
  imports: [
    NgTemplateOutlet,
    SubMenu,
    SubMenuContent,
    MenuSeparator,
    MenuItem,
    SubMenuTrigger,
    MenuGroup,
  ],
  templateUrl: './menu-items.html',
})
export class MenuItems {
  readonly items = input.required<readonly MenuItemData[]>()
  readonly itemTemplate = input<TemplateRef<MenuItemTemplateContext>>()
  readonly classNames = input<MenuClassNames>()
  readonly styles = input<MenuStyles>()
  protected readonly contentInjector = inject(Injector)
  protected readonly key = getMenuEntryKey
  protected readonly asTemplate = asMenuTemplate
  protected readonly text = menuValueText
}
