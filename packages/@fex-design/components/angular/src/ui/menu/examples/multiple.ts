import { Button } from '@fex-design/angular/ui/button'
import { Component, ChangeDetectionStrategy, signal } from '@angular/core'
import { Menu, MenuItem } from '@fex-design/angular/ui/menu'
import { menuSelectionItems } from '@fex-design/docs-shared/menu-demo'
@Component({
  selector: 'menu-multiple-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Menu, MenuItem],
  templateUrl: './multiple.html',
})
export class MenuMultipleExample {
  readonly multiple = signal(false)
  readonly value = signal(['users'])
  readonly items = menuSelectionItems
  toggle() {
    this.multiple.update((value) => !value)
    if (!this.multiple()) this.value.update((value) => value.slice(0, 1))
  }
}
