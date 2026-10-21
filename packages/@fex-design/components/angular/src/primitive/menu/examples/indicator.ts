import { Component, ChangeDetectionStrategy } from '@angular/core'
import {
  MenuRoot,
  MenuContent,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
} from '@fex-design/angular/primitive/menu'

@Component({
  selector: 'menu-indicator-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuRoot, MenuContent, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent],
  templateUrl: './indicator.html',
})
export class MenuIndicatorExample {}
