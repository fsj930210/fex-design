import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/angular/primitive/dropdown'
import { MenuItem, type MenuActivateInfo } from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'dropdown-semantic-styles-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItem, Button],
  template: `
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <div dropdownRoot (activate)="select($event)">
        <button button dropdownTrigger>操作</button>
        <ng-template dropdownPortal
          ><div dropdownContent class=" border-blue-500 bg-blue-50 text-blue-950">
            <button menuItem value="rename" class="font-semibold hover:bg-blue-200">重命名</button>
            <button menuItem value="duplicate" class="font-semibold hover:bg-blue-200">复制</button>
            <button menuItem value="archive" disabled>归档</button>
          </div></ng-template
        >
      </div>
      <output>最近操作：{{ value() }}</output>
    </div>
  `,
})
export class DropdownSemanticStylesExample {
  readonly value = signal('尚未选择')
  select(info: MenuActivateInfo) {
    this.value.set(info.value)
  }
}
