import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/angular/primitive/dropdown'
import {
  MenuItem,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
  type MenuActivateInfo,
} from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'dropdown-extended-menu-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
    MenuItem,
    MenuGroup,
    MenuGroupLabel,
    MenuSeparator,
    Button,
  ],
  template: `
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <button button (click)="extended.set(!extended())">
        {{ extended() ? '隐藏' : '显示' }}扩展操作
      </button>
      <div dropdownRoot (activate)="select($event)">
        <button button dropdownTrigger>操作</button>
        <ng-template dropdownPortal
          ><div dropdownContent>
            <button menuItem value="edit">编辑</button><button menuItem value="copy">复制</button>
            @if (extended()) {
              <div menuSeparator></div>
              <div menuGroup>
                <div menuGroupLabel>扩展操作</div>
                <button menuItem value="archive">归档</button
                ><button menuItem value="export">导出</button>
              </div>
            }
          </div></ng-template
        >
      </div>
      <output>最近操作：{{ selected() }}</output>
    </div>
  `,
})
export class DropdownExtendedMenuExample {
  readonly extended = signal(true)
  readonly selected = signal('尚未选择')
  select(info: MenuActivateInfo) {
    this.selected.set(info.value)
  }
}
