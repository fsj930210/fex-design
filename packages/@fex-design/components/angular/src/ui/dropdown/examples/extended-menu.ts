import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Dropdown } from '@fex-design/angular/ui/dropdown'
import { Button } from '@fex-design/angular/ui/button'
import type { MenuActivateInfo } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'dropdown-ui-extended-menu-example',
  standalone: true,
  imports: [Dropdown, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <button button (click)="toggle()">{{ extended() ? '隐藏' : '显示' }}扩展操作</button>
    <div dropdown [items]="items()" (activate)="select($event)">操作</div>
    <output>最近操作：{{ selected() }}</output>
  </div>`,
})
export class DropdownExtendedMenuExample {
  readonly extended = signal(true)
  readonly selected = signal('尚未选择')
  readonly base = [
    { value: 'edit', label: '编辑' },
    { value: 'copy', label: '复制' },
  ]
  readonly expandedItems = [
    ...this.base,
    { type: 'separator' as const, key: 'line' },
    {
      type: 'group' as const,
      key: 'extra',
      label: '扩展操作',
      children: [
        { value: 'archive', label: '归档' },
        { value: 'export', label: '导出' },
      ],
    },
  ]
  readonly items = signal<readonly any[]>(this.expandedItems)
  toggle() {
    this.extended.update((value) => !value)
    this.items.set(this.extended() ? this.expandedItems : this.base)
  }
  select(info: MenuActivateInfo) {
    this.selected.set(info.value)
  }
}
