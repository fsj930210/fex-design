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
  selector: 'dropdown-dynamic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItem, Button],
  template: `
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <button button (click)="hasItems.set(!hasItems())">切换菜单项</button>
      <div dropdownRoot [closeOnSelect]="false">
        <button button dropdownTrigger>操作</button>
        <ng-template dropdownPortal
          ><div
            dropdownContent
            [attr.aria-label]="hasItems() ? '操作菜单' : '操作菜单，无可用操作'"
          >
            @if (hasItems()) {
              <button menuItem value="rename">重命名</button
              ><button menuItem value="duplicate">复制</button
              ><button menuItem value="clear" (click)="hasItems.set(false)">移除菜单项</button>
            } @else {
              <span aria-hidden="true" class="px-3 py-2 text-muted-foreground">暂无操作</span>
            }
          </div></ng-template
        >
      </div>
      <output>菜单项：{{ hasItems() ? '三个' : '无' }}</output>
    </div>
  `,
})
export class DropdownDynamicExample {
  readonly hasItems = signal(true)
}
