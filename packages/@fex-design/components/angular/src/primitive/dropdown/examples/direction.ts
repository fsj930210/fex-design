import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/angular/primitive/dropdown'
import {
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
} from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'dropdown-direction-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
    MenuItem,
    SubMenu,
    SubMenuTrigger,
    SubMenuContent,
    Button,
  ],
  template: `
    <div class="flex min-h-64 flex-wrap justify-around gap-8 p-6">
      @for (dir of directions; track dir) {
        <div [attr.dir]="dir" class="flex flex-col items-start gap-3">
          <span>{{ dir.toUpperCase() }}</span>
          <div dropdownRoot [menuProps]="{ dir }">
            <button button dropdownTrigger>操作</button>
            <ng-template dropdownPortal
              ><div dropdownContent>
                <button menuItem value="rename">重命名</button>
                <div subMenu value="share">
                  <button subMenuTrigger>分享</button>
                  <div subMenuContent [content]="shareContent"></div>
                  <ng-template #shareContent
                    ><button menuItem value="link">复制链接</button></ng-template
                  >
                </div>
              </div></ng-template
            >
          </div>
        </div>
      }
    </div>
  `,
})
export class DropdownDirectionExample {
  readonly directions = ['ltr', 'rtl'] as const
}
