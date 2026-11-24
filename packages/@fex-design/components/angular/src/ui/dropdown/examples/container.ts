import { ChangeDetectionStrategy, Component, viewChild, ElementRef } from '@angular/core'
import { Dropdown } from '@fex-design/angular/ui/dropdown'
import type { MenuActivateInfo } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'dropdown-ui-container-example',
  standalone: true,
  imports: [Dropdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="grid gap-3 p-6">
    <p>浮层挂载到虚线区域，定位仍以触发器为参照。</p>
    <div #container class="relative min-h-48 rounded-lg border-2 border-dashed p-6">
      <div dropdown [items]="items" [popoverProps]="popoverProps">操作</div>
    </div>
  </div>`,
})
export class DropdownContainerExample {
  readonly container = viewChild<ElementRef<HTMLElement>>('container')
  readonly items = [
    { value: 'rename', label: '重命名' },
    { value: 'duplicate', label: '复制' },
  ]
  readonly popoverProps = {
    getPopupContainer: () => this.container()?.nativeElement ?? document.body,
  }
}
