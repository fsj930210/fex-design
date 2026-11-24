import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Dropdown } from '@fex-design/angular/ui/dropdown'
import type { MenuActivateInfo } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'dropdown-ui-nested-example',
  standalone: true,
  imports: [Dropdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <div dropdown [items]="items" (activate)="select($event)">操作</div>
    <output>最近操作：{{ value() }}</output>
  </div>`,
})
export class DropdownNestedExample {
  readonly value = signal('尚未选择')
  readonly items = [
    { value: 'rename', label: '重命名' },
    {
      value: 'share',
      label: '分享',
      children: [
        { value: 'link', label: '复制链接' },
        { value: 'send', label: '发送到', children: [{ value: 'email', label: '电子邮件' }] },
      ],
    },
  ]
  select(info: MenuActivateInfo) {
    this.value.set(info.value)
  }
}
