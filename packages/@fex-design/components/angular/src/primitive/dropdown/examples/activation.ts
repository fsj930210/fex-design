import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/angular/primitive/dropdown'
import { MenuItem, type MenuActivateInfo } from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'dropdown-activation-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItem, Button],
  template: `
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <div
        dropdownRoot
        [closeOnSelect]="false"
        [menuProps]="menu()"
        (activate)="select($event)"
        (valueChange)="selected.set($event.value)"
      >
        <button button dropdownTrigger>操作</button>
        <ng-template dropdownPortal
          ><div dropdownContent>
            <button menuItem value="keep">选择并保持打开</button
            ><button menuItem value="cancel">取消激活</button>
          </div></ng-template
        >
      </div>
      <output>{{ message() }}；选中：{{ selected().join(', ') || '无' }}</output>
    </div>
  `,
})
export class DropdownActivationExample {
  readonly message = signal('尚未操作')
  readonly selected = signal<string[]>([])
  readonly menu = computed(() => ({ value: this.selected() }))
  select(info: MenuActivateInfo) {
    if (info.value === 'cancel') {
      info.preventDefault()
      this.message.set('激活已取消')
      return
    }
    this.message.set('已选择，菜单保持打开')
  }
}
