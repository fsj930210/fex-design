import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Dropdown } from '@fex-design/angular/ui/dropdown'
import type { MenuActivateInfo } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'dropdown-ui-triggers-example',
  standalone: true,
  imports: [Dropdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="flex min-h-64 flex-wrap items-center justify-center gap-3 p-6">
    @for (item of cases; track item.label) {
      <div dropdown [items]="items" [popoverProps]="item.options">{{ item.label }}</div>
    }
  </div>`,
})
export class DropdownTriggersExample {
  readonly items = [
    { value: 'rename', label: '重命名' },
    { value: 'copy', label: '复制' },
  ]
  readonly cases: { label: string; options: { trigger: ('click' | 'hover' | 'focus')[]; hoverOpenDelay?: number; hoverCloseDelay?: number } }[] = [
    { label: '点击', options: { trigger: ['click'] } },
    { label: '悬停', options: { trigger: ['hover'] } },
    { label: '聚焦', options: { trigger: ['focus'] } },
    { label: '悬停 + 聚焦', options: { trigger: ['hover', 'focus'] } },
    {
      label: '悬停延迟',
      options: { trigger: ['hover'], hoverOpenDelay: 300, hoverCloseDelay: 400 },
    },
  ]
}
