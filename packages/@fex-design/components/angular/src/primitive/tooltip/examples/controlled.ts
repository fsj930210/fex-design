import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@fex-design/angular/primitive/tooltip'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'tooltip-controlled-example',
  standalone: true,
  imports: [Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controlled.html',
})
export class ControlledExample {
  readonly open = signal(false)
}
