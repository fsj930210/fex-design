import { Component, ChangeDetectionStrategy, signal } from '@angular/core'
import { MenuRoot, MenuContent, MenuItem } from '@fex-design/angular/primitive/menu'
@Component({
  selector: 'menu-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuRoot, MenuContent, MenuItem],
  templateUrl: './basic.html',
})
export class MenuBasicExample {
  readonly value = signal<string[]>([])
}
