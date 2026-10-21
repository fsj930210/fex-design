import { Component, ChangeDetectionStrategy, signal } from '@angular/core'
import {
  MenuRoot,
  MenuContent,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
} from '@fex-design/angular/primitive/menu'

@Component({
  selector: 'menu-custom-item-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MenuRoot,
    MenuContent,
    MenuItem,
    SubMenu,
    SubMenuTrigger,
    SubMenuContent,
    MenuGroup,
    MenuGroupLabel,
    MenuSeparator,
  ],
  templateUrl: './custom-item.html',
})
export class MenuCustomItemExample {
  readonly selected = signal(['members'])
}
