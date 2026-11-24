import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Dropdown } from '@fex-design/angular/ui/dropdown'
import type { MenuActivateInfo } from '@fex-design/angular/ui/menu'
@Component({
  selector: 'dropdown-ui-placement-example',
  standalone: true,
  imports: [Dropdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="grid w-full gap-4 p-6">
    <p>四个方向、三种对齐；关闭自动避让以展示所选位置。</p>
    <div
      class="grid grid-cols-[repeat(5,max-content)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 py-28"
    >
      @for (placement of placements; track placement; let index = $index) {
        <div [class]="positions[index]">
          <div
            dropdown
            [items]="items"
            [popoverProps]="{ placement: placement, avoidCollisions: false }"
          >
            {{ placement }}
          </div>
        </div>
      }
    </div>
  </div>`,
})
export class DropdownPlacementExample {
  readonly items = [
    { value: 'rename', label: '重命名' },
    { value: 'copy', label: '复制' },
  ]
  readonly placements = [
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
  ] as const
  readonly positions = [
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
}
