import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
  type DropdownRootOptions,
} from '@fex-design/angular/primitive/dropdown'
import { MenuItem } from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/primitive/button'

type Placement = NonNullable<NonNullable<DropdownRootOptions['popoverProps']>['placement']>
@Component({
  selector: 'dropdown-placement-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItem, Button],
  template: `
    <div class="grid w-full gap-4 p-6">
      <p>四个方向、三种对齐；关闭自动避让以展示所选位置。</p>
      <div
        class="grid grid-cols-[repeat(5,max-content)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 py-28"
      >
        @for (item of placements; track item.placement) {
          <div [class]="item.position">
            <div dropdownRoot [popoverProps]="item.options">
              <button button dropdownTrigger>{{ item.placement }}</button>
              <ng-template dropdownPortal
                ><div dropdownContent>
                  <button menuItem value="rename">重命名</button
                  ><button menuItem value="copy">复制</button>
                </div></ng-template
              >
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class DropdownPlacementExample {
  private readonly values: readonly Placement[] = [
    'topLeft',
    'top',
    'topRight',
    'leftTop',
    'rightTop',
    'left',
    'right',
    'leftBottom',
    'rightBottom',
    'bottomLeft',
    'bottom',
    'bottomRight',
  ]
  private readonly positions = [
    'col-start-2 row-start-1',
    'col-start-3 row-start-1',
    'col-start-4 row-start-1',
    'col-start-1 row-start-2',
    'col-start-5 row-start-2',
    'col-start-1 row-start-3',
    'col-start-5 row-start-3',
    'col-start-1 row-start-4',
    'col-start-5 row-start-4',
    'col-start-2 row-start-5',
    'col-start-3 row-start-5',
    'col-start-4 row-start-5',
  ]
  readonly placements = this.values.map((placement, index) => ({
    placement,
    position: this.positions[index],
    options: { placement, avoidCollisions: false },
  }))
}
