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
  selector: 'dropdown-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItem, Button],
  template: `
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <button button (click)="open.set(!open())">外部切换</button>
      <div dropdownRoot [open]="open()" (openChange)="open.set($event)">
        <button button dropdownTrigger>受控菜单</button>
        <ng-template dropdownPortal
          ><div dropdownContent>
            <button menuItem value="rename">重命名</button
            ><button menuItem value="duplicate">复制</button>
          </div></ng-template
        >
      </div>
      <output>菜单状态：{{ open() ? '打开' : '关闭' }}</output>
      <div dropdownRoot [defaultOpen]="false" (openChange)="uncontrolledOpen.set($event)">
        <button button dropdownTrigger>非受控菜单</button>
        <ng-template dropdownPortal
          ><div dropdownContent>
            <button menuItem value="rename">重命名</button
            ><button menuItem value="duplicate">复制</button>
          </div></ng-template
        >
      </div>
      <output>非受控菜单状态：{{ uncontrolledOpen() ? '打开' : '关闭' }}</output>
    </div>
  `,
})
export class DropdownControlledExample {
  readonly open = signal(false)
  readonly uncontrolledOpen = signal(false)
}
