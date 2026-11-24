import { ChangeDetectionStrategy, Component, signal, TemplateRef, viewChild } from '@angular/core'
import { Dropdown } from '@fex-design/angular/ui/dropdown'
import type { MenuActivateInfo, MenuItemTemplateContext } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'dropdown-ui-custom-item-example',
  standalone: true,
  imports: [Dropdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-template #item let-item
      ><span class="flex items-center justify-between gap-6"
        ><span>{{ item.label }}</span
        ><kbd>{{ item.value === 'edit' ? '⌘ E' : '⌘ A' }}</kbd></span
      ></ng-template
    >
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <div dropdown [items]="items" [itemTemplate]="item" (activate)="select($event)">选择操作</div>
      <output>最近操作：{{ selected() }}</output>
    </div>`,
})
export class DropdownCustomItemExample {
  readonly selected = signal('尚未选择')
  readonly items = [
    { value: 'edit', label: '编辑资料', textValue: '编辑' },
    { value: 'archive', label: '归档项目', textValue: '归档' },
  ]
  readonly item = viewChild.required<TemplateRef<MenuItemTemplateContext>>('item')
  select(info: MenuActivateInfo) {
    this.selected.set(info.value)
  }
}
