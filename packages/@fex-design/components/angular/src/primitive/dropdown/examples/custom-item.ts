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
  selector: 'dropdown-custom-item-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItem, Button],
  template: `
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <div dropdownRoot (activate)="select($event)">
        <button button dropdownTrigger>选择操作</button>
        <ng-template dropdownPortal
          ><div dropdownContent>
            <button
              menuItem
              value="edit"
              textValue="编辑"
              class="flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm"
            >
              <span>编辑资料</span><kbd>⌘ E</kbd>
            </button>
            <button
              menuItem
              value="archive"
              textValue="归档"
              class="flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm"
            >
              <span>归档项目</span><kbd>⌘ A</kbd>
            </button>
          </div></ng-template
        >
      </div>
      <output>最近操作：{{ selected() }}</output>
    </div>
  `,
})
export class DropdownCustomItemExample {
  readonly selected = signal('尚未选择')
  select(info: MenuActivateInfo) {
    this.selected.set(info.value)
  }
}
