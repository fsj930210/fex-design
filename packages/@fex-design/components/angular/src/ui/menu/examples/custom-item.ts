import { Component, ChangeDetectionStrategy, signal } from '@angular/core'
import {
  Menu,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
  MenuGroup,
  MenuSeparator,
} from '@fex-design/angular/ui/menu'

@Component({
  selector: 'menu-custom-item-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent, MenuGroup, MenuSeparator],
  templateUrl: './custom-item.html',
})
export class MenuCustomItemExample {
  readonly selected = signal(['members'])
}
