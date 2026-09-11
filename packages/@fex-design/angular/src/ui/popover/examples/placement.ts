import { ChangeDetectionStrategy, Component, ElementRef, computed, signal, viewChild } from '@angular/core'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover, PopoverTrigger } from '@fex-design/angular/ui/popover'
import { Button } from '@fex-design/angular/ui/button'

type DemoCase = { label: string; options: PopoverOptions }

@Component({
  selector: 'popover-placement-example',
  standalone: true,
  imports: [Popover, PopoverTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './placement.html',
})
export class PlacementExample {
readonly placements: FloatingPlacement[] = [
  'topLeft', 'top', 'topRight', 'leftTop', 'rightTop', 'left',
  'right', 'leftBottom', 'rightBottom', 'bottomLeft', 'bottom', 'bottomRight',
]
readonly cells = ['1 / 2', '1 / 3', '1 / 4', '2 / 1', '2 / 5', '3 / 1', '3 / 5', '4 / 1', '4 / 5', '5 / 2', '5 / 3', '5 / 4']
readonly cases = this.placements.map((placement, index) => ({
  label: placement, options: { placement, arrow: true }, cell: this.cells[index],
}))

  options(item: DemoCase): PopoverOptions { return item.options }
}
