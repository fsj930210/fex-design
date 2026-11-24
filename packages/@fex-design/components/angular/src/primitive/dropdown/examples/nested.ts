import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  type MenuActivateInfo,
} from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'dropdown-nested-example',
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
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <div dropdownRoot (activate)="select($event)">
        <button button dropdownTrigger>操作</button>
        <ng-template dropdownPortal
          ><div dropdownContent>
            <button menuItem value="rename">重命名</button>
            <div subMenu value="share">
              <button subMenuTrigger>分享</button>
              <div subMenuContent [content]="shareContent"></div>
              <ng-template #shareContent
                ><button menuItem value="link">复制链接</button>
                <div subMenu value="send">
                  <button subMenuTrigger>发送到</button>
                  <div subMenuContent [content]="sendContent"></div>
                  <ng-template #sendContent
                    ><button menuItem value="email">电子邮件</button></ng-template
                  >
                </div>
              </ng-template>
            </div>
          </div></ng-template
        >
      </div>
      <output>最近操作：{{ value() }}</output>
    </div>
  `,
})
export class DropdownNestedExample {
  readonly value = signal('尚未选择')
  select(info: MenuActivateInfo) {
    this.value.set(info.value)
  }
}
