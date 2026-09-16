import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@fex-design/angular/primitive/tooltip'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'tooltip-basic-example',
  standalone: true,
  imports: [Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class BasicExample {}
