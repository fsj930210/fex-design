import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Dropdown } from '@fex-design/angular/ui/dropdown'
import { Button } from '@fex-design/angular/ui/button'
import type { MenuActivateInfo } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'dropdown-ui-controlled-example',
  standalone: true,
  imports: [Dropdown, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <button button (click)="open.set(!open())">外部切换</button>
    <div dropdown [items]="items" [open]="open()" (openChange)="open.set($event)">受控菜单</div>
    <output>菜单状态：{{ open() ? '打开' : '关闭' }}</output>
    <div dropdown [items]="items" (openChange)="uncontrolledOpen.set($event)">非受控菜单</div>
    <output>非受控菜单状态：{{ uncontrolledOpen() ? '打开' : '关闭' }}</output>
  </div>`,
})
export class DropdownControlledExample {
  readonly open = signal(false)
  readonly uncontrolledOpen = signal(false)
  readonly items = [
    { value: 'rename', label: '重命名' },
    { value: 'duplicate', label: '复制' },
  ]
}
