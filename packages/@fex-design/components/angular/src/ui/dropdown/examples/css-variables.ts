import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core'
import { Dropdown } from '@fex-design/angular/ui/dropdown'
import type { MenuActivateInfo } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'dropdown-ui-css-variables-example',
  standalone: true,
  imports: [Dropdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <div
      #container
      class="[--popover-background:#f5f3ff] [--popover-border:#8b5cf6] [--popover-foreground:#4c1d95] [--menu-item-hover-background:#ddd6fe]"
    >
      <div dropdown [items]="items" [popoverProps]="popoverProps" (activate)="select($event)">
        操作
      </div>
    </div>
    <output>最近操作：{{ value() }}</output>
  </div>`,
})
export class DropdownCssVariablesExample {
  readonly value = signal('尚未选择')
  readonly container = viewChild<ElementRef<HTMLElement>>('container')
  readonly popoverProps = {
    getPopupContainer: () => this.container()?.nativeElement ?? document.body,
  }
  readonly items = [
    { value: 'rename', label: '重命名' },
    { value: 'duplicate', label: '复制' },
    { value: 'archive', label: '归档', disabled: true },
  ]
  select(info: MenuActivateInfo) {
    this.value.set(info.value)
  }
}
