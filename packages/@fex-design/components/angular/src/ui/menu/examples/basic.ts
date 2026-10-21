import { Component, ChangeDetectionStrategy, signal } from '@angular/core'
import { Menu } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'menu-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menu],
  templateUrl: './basic.html',
})
export class MenuBasicExample {
  readonly items = [
    { value: 'overview', label: '概览' },
    { value: 'members', label: '成员' },
    { value: 'billing', label: '账单', disabled: true },
  ]
  readonly value = signal<string[]>([])
}
