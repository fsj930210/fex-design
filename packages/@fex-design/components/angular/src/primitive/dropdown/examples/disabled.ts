import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/angular/primitive/dropdown'
import { MenuItem } from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'dropdown-disabled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItem, Button],
  template: `
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <button button (click)="disabled.set(!disabled())">切换禁用</button>
      <div dropdownRoot [disabled]="disabled()">
        <button button dropdownTrigger>操作</button>
        <ng-template dropdownPortal
          ><div dropdownContent>
            <button menuItem value="rename">重命名</button
            ><button menuItem value="duplicate">复制</button>
          </div></ng-template
        >
      </div>
      <output>触发器状态：{{ disabled() ? '禁用' : '启用' }}</output>
    </div>
  `,
})
export class DropdownDisabledExample {
  readonly disabled = signal(false)
}
