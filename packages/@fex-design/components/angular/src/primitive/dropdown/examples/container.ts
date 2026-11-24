import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/angular/primitive/dropdown'
import { MenuItem } from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'dropdown-container-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItem, Button],
  template: `
    <div class="grid gap-3 p-6">
      <p>浮层挂载到虚线区域，定位仍以触发器为参照。</p>
      <div #container class="relative min-h-48 rounded-lg border-2 border-dashed p-6">
        <div dropdownRoot>
          <button button dropdownTrigger>操作</button>
          <ng-template dropdownPortal [container]="container"
            ><div dropdownContent>
              <button menuItem value="rename">重命名</button
              ><button menuItem value="duplicate">复制</button>
            </div></ng-template
          >
        </div>
      </div>
    </div>
  `,
})
export class DropdownContainerExample {}
