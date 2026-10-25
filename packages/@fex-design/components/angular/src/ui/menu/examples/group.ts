import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Menu, MenuGroup, MenuGroupLabel, MenuItem } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'menu-group-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menu, MenuGroup, MenuGroupLabel, MenuItem],
  templateUrl: './group.html',
})
export class MenuGroupExample {}
