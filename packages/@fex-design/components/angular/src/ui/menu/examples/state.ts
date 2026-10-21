import { Component, ChangeDetectionStrategy, signal } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'
import {
  Menu,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
} from '@fex-design/angular/ui/menu'

@Component({
  selector: 'menu-state-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent],
  templateUrl: './state.html',
})
export class MenuStateExample {
  readonly value = signal(['members'])
  readonly open = signal(['workspace'])
}
