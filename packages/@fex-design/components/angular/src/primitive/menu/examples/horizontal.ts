import { Component, ChangeDetectionStrategy, signal } from '@angular/core'
import {
  MenuRoot,
  MenuContent,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
} from '@fex-design/angular/primitive/menu'
@Component({
  selector: 'menu-horizontal-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuRoot, MenuContent, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent],
  templateUrl: './horizontal.html',
})
export class MenuHorizontalExample {}
