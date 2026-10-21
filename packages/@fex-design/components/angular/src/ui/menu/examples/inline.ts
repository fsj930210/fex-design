import { Component, ChangeDetectionStrategy, signal } from '@angular/core'
import {
  Menu,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
} from '@fex-design/angular/ui/menu'
@Component({
  selector: 'menu-inline-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent],
  templateUrl: './inline.html',
})
export class MenuInlineExample {}
