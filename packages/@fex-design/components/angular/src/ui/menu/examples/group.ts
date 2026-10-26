import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Menu, MenuGroup, MenuItem } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'menu-group-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menu, MenuGroup, MenuItem],
  templateUrl: './group.html',
})
export class MenuGroupExample {}
