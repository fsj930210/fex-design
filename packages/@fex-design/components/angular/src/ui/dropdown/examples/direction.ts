import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Dropdown } from '@fex-design/angular/ui/dropdown'
@Component({
  selector: 'dropdown-ui-direction-example',
  standalone: true,
  imports: [Dropdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="flex min-h-64 flex-wrap justify-around gap-8 p-6">
    @for (dir of dirs; track dir) {
      <div [attr.dir]="dir" class="flex flex-col items-start gap-3">
        <span>{{ dir.toUpperCase() }}</span>
        <div dropdown [items]="items" [menuProps]="{ dir: dir }">操作</div>
      </div>
    }
  </div>`,
})
export class DropdownDirectionExample {
  readonly dirs = ['ltr', 'rtl'] as const
  readonly items = [
    { value: 'rename', label: '重命名' },
    { value: 'share', label: '分享', children: [{ value: 'link', label: '复制链接' }] },
  ]
}
