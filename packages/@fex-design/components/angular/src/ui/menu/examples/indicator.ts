import { Component, ChangeDetectionStrategy } from '@angular/core'
import {
  Menu,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
} from '@fex-design/angular/ui/menu'

@Component({
  selector: 'menu-indicator-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent],
  templateUrl: './indicator.html',
})
export class MenuIndicatorExample {}
