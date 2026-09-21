import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@fex-design/angular/primitive/tooltip'
import { Button } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'tooltip-direction-example',
  standalone: true,
  imports: [Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class DirectionExample {}
