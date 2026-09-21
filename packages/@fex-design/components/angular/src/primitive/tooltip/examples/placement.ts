import { ChangeDetectionStrategy, Component } from '@angular/core'
import type { FloatingPlacement } from '@fex-design/core/floating/placement'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@fex-design/angular/primitive/tooltip'
import { Button } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'tooltip-placement-example',
  standalone: true,
  imports: [Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './placement.html',
})
export class PlacementExample {
  readonly placements: FloatingPlacement[] = [
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
  readonly cells = [
    '1 / 2',
    '1 / 3',
    '1 / 4',
    '2 / 1',
    '2 / 5',
    '3 / 1',
    '3 / 5',
    '4 / 1',
    '4 / 5',
    '5 / 2',
    '5 / 3',
    '5 / 4',
  ]
  readonly cases = this.placements.map((placement, index) => ({
    placement,
    cell: this.cells[index],
  }))
}
