import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
  type DropdownPopoverOptions,
} from '@fex-design/angular/primitive/dropdown'
import { MenuItem } from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'dropdown-triggers-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItem, Button],
  template: `
    <div class="flex min-h-64 flex-wrap items-center justify-center gap-3 p-6">
      @for (item of cases; track item.label) {
        <div dropdownRoot [popoverProps]="item.options">
          <button button dropdownTrigger>{{ item.label }}</button>
          <ng-template dropdownPortal
            ><div dropdownContent>
              <button menuItem value="rename">重命名</button
              ><button menuItem value="copy">复制</button>
            </div></ng-template
          >
        </div>
      }
    </div>
  `,
})
export class DropdownTriggersExample {
  readonly cases: { label: string; options: DropdownPopoverOptions }[] = [
    { label: '点击', options: { trigger: ['click'] } },
    { label: '悬停', options: { trigger: ['hover'] } },
    { label: '聚焦', options: { trigger: ['focus'] } },
    { label: '悬停 + 聚焦', options: { trigger: ['hover', 'focus'] } },
    {
      label: '悬停延迟',
      options: { trigger: ['hover'], hoverOpenDelay: 300, hoverCloseDelay: 400 },
    },
  ]
}
